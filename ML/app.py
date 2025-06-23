# app.py
from flask import Flask, request, jsonify
import os
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import time

from Ats_scorer.scorer import get_gemini_score_and_feedback, get_generalized_score_and_feedback, extract_text_from_pdf

app = Flask(__name__)
CORS(app)

# Load environment variables for Gemini API
load_dotenv()

# Configure Gemini API for mock interview
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key='AIzaSyBQOnKIDrgIFe2w9E1OgRVh5ywt0y_jygQ')
model = genai.GenerativeModel('gemini-1.5-pro')


# Store interview sessions (in production, use proper database)
interview_sessions = {}

# Existing ATS Scorer endpoint - NO CHANGES
@app.route('/score', methods=['POST'])
def score_resume():
    data = request.form
    resume_file = request.files.get('resume')
    job_description = data.get('job_description', '')

    if not resume_file:
        return jsonify({'error': 'Resume file is required.'}), 400

    # Save the uploaded file temporarily
    temp_path = 'temp_resume.pdf'
    resume_file.save(temp_path)
    
    # Extract text from the resume PDF
    resume_text = extract_text_from_pdf(temp_path)
    
    # Clean up temp file
    try:
        os.remove(temp_path)
    except:
        pass

    if not resume_text:
        return jsonify({'error': 'Could not extract text from the resume PDF.'}), 400

    # Determine the scoring method based on whether a job description was provided
    if job_description:
        score, feedback_dict = get_gemini_score_and_feedback(job_description, resume_text)
    else:
        score, feedback_dict = get_generalized_score_and_feedback(resume_text)
    
    # Calculate percentile (example - you might want to adjust this logic)
    percentile = min(max(round(score * 0.92), 0), 100)  # Simple calculation for demo
    
    print(f"Score: {score}, Feedback: {feedback_dict}")
    
    return jsonify({
        'score': score,
        'percentile': percentile,
        'strengths': feedback_dict.get('strengths', []),
        'weaknesses': feedback_dict.get('weaknesses', []),
        'improvements': feedback_dict.get('improvements', []),
        'keyword_matching_score': feedback_dict.get('keyword_matching_score', 0),
        'keywords_matching': feedback_dict.get('keywords_matching', []),
        'missing_keywords': feedback_dict.get('missing_keywords', [])
    })

# NEW MOCK INTERVIEW ENDPOINTS

@app.route('/interview/start', methods=['POST'])
def start_interview():
    """Start a new mock interview session"""
    if not model:
        return jsonify({'error': 'Gemini API not configured. Please set GEMINI_API_KEY.'}), 500
    
    data = request.get_json()
    
    resume = data.get('resume', '')
    job_description = data.get('job_description', '')
    
    if not resume or not job_description:
        return jsonify({'error': 'Both resume and job description are required.'}), 400
    
    # Generate session ID
    session_id = f"session_{int(time.time())}"
    
    # Initialize interview session
    interview_sessions[session_id] = {
        'resume': resume,
        'job_description': job_description,
        'history': [],
        'question_count': 0
    }
    
    # Generate first question
    try:
        initial_message = "Hello, I'm ready for the interview."
        ai_response = get_ai_interview_response(session_id, initial_message)
        
        # Add to history
        interview_sessions[session_id]['history'].extend([
            {"role": "candidate", "content": initial_message},
            {"role": "interviewer", "content": ai_response}
        ])
        interview_sessions[session_id]['question_count'] += 1
        
        return jsonify({
            'session_id': session_id,
            'interviewer_response': ai_response,
            'question_count': interview_sessions[session_id]['question_count']
        })
        
    except Exception as e:
        return jsonify({'error': f'Failed to start interview: {str(e)}'}), 500

@app.route('/interview/respond', methods=['POST'])
def interview_respond():
    """Handle candidate response and get next question"""
    if not model:
        return jsonify({'error': 'Gemini API not configured.'}), 500
    
    data = request.get_json()
    session_id = data.get('session_id', '')
    user_response = data.get('response', '')
    
    if not session_id or session_id not in interview_sessions:
        return jsonify({'error': 'Invalid session ID.'}), 400
    
    if not user_response:
        return jsonify({'error': 'Response is required.'}), 400
    
    # Check for exit commands
    exit_commands = ["exit", "quit", "end", "stop", "bye", "goodbye"]
    if user_response.lower().strip() in exit_commands:
        return jsonify({
            'session_ended': True,
            'message': 'Interview ended by candidate.'
        })
    
    try:
        # Add user response to history
        interview_sessions[session_id]['history'].append({
            "role": "candidate", 
            "content": user_response
        })
        
        # Get AI response
        ai_response = get_ai_interview_response(session_id, user_response)
        
        # Add AI response to history
        interview_sessions[session_id]['history'].append({
            "role": "interviewer", 
            "content": ai_response
        })
        interview_sessions[session_id]['question_count'] += 1
        
        return jsonify({
            'interviewer_response': ai_response,
            'question_count': interview_sessions[session_id]['question_count']
        })
        
    except Exception as e:
        return jsonify({'error': f'Failed to process response: {str(e)}'}), 500

@app.route('/interview/end', methods=['POST'])
def end_interview():
    """End interview and generate feedback"""
    if not model:
        return jsonify({'error': 'Gemini API not configured.'}), 500
    
    data = request.get_json()
    session_id = data.get('session_id', '')
    
    if not session_id or session_id not in interview_sessions:
        return jsonify({'error': 'Invalid session ID.'}), 400
    
    try:
        feedback = generate_interview_feedback(session_id)
        
        # Clean up session
        del interview_sessions[session_id]
        
        return jsonify(feedback)
        
    except Exception as e:
        return jsonify({'error': f'Failed to generate feedback: {str(e)}'}), 500

def format_conversation_history(session_id):
    """Format chat history for AI prompt"""
    history = ""
    for entry in interview_sessions[session_id]['history']:
        role = "Interviewer" if entry["role"] == "interviewer" else "Candidate"
        history += f"{role}: {entry['content']}\n\n"
    return history

def get_ai_interview_response(session_id, user_message):
    """Get response from AI interviewer"""
    session = interview_sessions[session_id]
    history = format_conversation_history(session_id)
    
    prompt = f"""
You are a professional AI interviewer conducting a job interview. Be conversational and assess the candidate thoroughly.

CONTEXT:
- Job: {session['job_description']}
- Resume: {session['resume']}
- History: {history}

GUIDELINES:
Begin with 1-2 introductory/warm-up questions.
Ask 4-5 technical questions based on the candidate's resume and job description (focus on web dev, DSA, or ML if applicable).
Include 1-2 scenario-based or problem-solving questions to assess critical thinking.
Ask 2-3 HR/culture-fit questions (like teamwork, feedback, long-term goals).
Make the follow-up questions thoughtful and based on previous answers only when necessary. No need to ask follow-ups for every answer.
Keep a professional yet conversational tone, and make sure the interview doesn't exceed 15 questions.
End the interview naturally and thank the candidate for their time.

Current candidate response: {user_message}

Provide your next question or comment as the interviewer:
"""

    response = model.generate_content(prompt)
    return response.text

def generate_interview_feedback(session_id):
    """Generate detailed interview feedback"""
    session = interview_sessions[session_id]
    history = format_conversation_history(session_id)
    
    prompt = f"""
As an expert hiring manager, provide structured feedback on this interview.

Analyze the conversation and provide scores (1-10) and detailed feedback.

INTERVIEW DATA:
Resume: {session['resume']}
Job: {session['job_description']}
Conversation: {history}

Provide your response in this JSON format:
{{
    "overall_score": <score 1-10>,
    "technical_score": <score 1-10>,
    "communication_score": <score 1-10>,
    "fit_score": <score 1-10>,
    "strengths": ["strength1", "strength2", "strength3"],
    "improvements": ["improvement1", "improvement2", "improvement3"],
    "detailed_feedback": "Detailed analysis paragraph"
}}
"""

    response = model.generate_content(prompt)
    feedback_text = response.text
    
    # Try to extract JSON from response
    try:
        import json
        import re
        
        # Find JSON in the response
        json_match = re.search(r'\{.*\}', feedback_text, re.DOTALL)
        if json_match:
            feedback_json = json.loads(json_match.group())
            return feedback_json
        else:
            raise ValueError("No JSON found in response")
    
    except:
        # Fallback to mock feedback if JSON parsing fails
        return {
            "overall_score": 7,
            "technical_score": 7,
            "communication_score": 8,
            "fit_score": 7,
            "strengths": [
                "Clear and articulate communication",
                "Good understanding of the role requirements",
                "Professional demeanor throughout the interview"
            ],
            "improvements": [
                "Could provide more specific examples",
                "Consider elaborating on technical skills",
                "Practice telling more engaging stories"
            ],
            "detailed_feedback": "Based on your interview performance, you demonstrated strong communication skills and relevant experience. Your responses showed good preparation and understanding of the role. To improve further, consider providing more specific examples from your experience and practicing storytelling techniques to make your responses more engaging."
        }

if __name__ == '__main__':
    app.run(debug=True)