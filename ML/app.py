# app.py
from flask import Flask, request, jsonify, render_template
import os
from flask_cors import CORS
from Ats_scorer.scorer import get_gemini_score_and_feedback, get_generalized_score_and_feedback, extract_text_from_pdf
app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET'])
def index():
    """Render the upload form."""
    return render_template('index.html')

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
        score, feedback = get_gemini_score_and_feedback(job_description, resume_text)
    else:
        score, feedback = get_generalized_score_and_feedback(resume_text)
    print(f"Score: {score}, Feedback: {feedback}")
    return jsonify({
        'score': score,
        'feedback': feedback
    })

if __name__ == '__main__':
    app.run(debug=True)