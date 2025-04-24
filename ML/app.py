# app.py
from flask import Flask, request, jsonify
import os
from flask_cors import CORS

from Ats_scorer.scorer import get_gemini_score_and_feedback, get_generalized_score_and_feedback, extract_text_from_pdf
app = Flask(__name__)
CORS(app)


# @app.route('/', methods=['GET'])
# def index():
#     """Render the upload form."""
#     return render_template('index.html')

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

if __name__ == '__main__':
    app.run(debug=True)