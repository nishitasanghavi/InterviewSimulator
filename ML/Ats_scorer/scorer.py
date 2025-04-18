# scorer.py
import google.generativeai as genai
from dotenv import load_dotenv
import os
import fitz  # PyMuPDF for extracting text from PDF

# Load environment variables from .env
load_dotenv()

# Configure the Gemini API key
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

model = genai.GenerativeModel('gemini-1.5-pro')

def get_gemini_score_and_feedback(job_description, resume_text):
    """
    Use Gemini to score the resume based on the job description and provide feedback.
    """
    prompt = f"""
    You are a professional resume evaluator with expertise in recruitment.

    Job Description:
    {job_description}

    Candidate Resume:
    {resume_text}

    First, give a score between 0 to 100 based on how well the resume matches the job description.
    Then, provide detailed feedback with the following sections:
    1. Strengths: Key strengths of the resume in relation to the job requirements
    2. Weaknesses: Areas where the resume falls short of job requirements
    3. Improvements: Specific suggestions to improve the resume for this position
    
    Format your response as:
    SCORE: [number]
    
    FEEDBACK:
    [your detailed feedback with clear sections for strengths, weaknesses, and improvements]
    """

    response = model.generate_content(prompt)
    full_response = response.text.strip()
    
    # Parse score and feedback from response
    try:
        # Extract score (assuming it's at the beginning of the response)
        if "SCORE:" in full_response:
            parts = full_response.split("SCORE:")
            score_part = parts[1].split("\n")[0].strip()
            try:
                score = float(score_part)
            except ValueError:
                score = 0.0
        else:
            score = 0.0
            
        # Extract feedback
        if "FEEDBACK:" in full_response:
            feedback = full_response.split("FEEDBACK:")[1].strip()
        else:
            feedback = full_response
            
    except Exception:
        score = 0.0
        feedback = "Error parsing feedback."

    return min(max(score, 0), 100), feedback  # Clamp between 0 and 100

def get_generalized_score_and_feedback(resume_text):
    """
    If no job description is provided, give a generalized score and feedback using Gemini.
    """
    prompt = f"""
    You are a professional resume evaluator with expertise in recruitment.

    Candidate Resume:
    {resume_text}

    First, give a score between 0 to 100 based on general resume quality, skills, format, and professionalism.
    Then, provide detailed feedback with the following sections:
    1. Strengths: Key strengths of the resume
    2. Weaknesses: Areas where the resume could be improved
    3. Improvements: Specific suggestions to enhance this resume for job applications
    
    Format your response as:
    SCORE: [number]
    
    FEEDBACK:
    [your detailed feedback with clear sections for strengths, weaknesses, and improvements]
    """

    response = model.generate_content(prompt)
    full_response = response.text.strip()
    
    # Parse score and feedback from response
    try:
        # Extract score (assuming it's at the beginning of the response)
        if "SCORE:" in full_response:
            parts = full_response.split("SCORE:")
            score_part = parts[1].split("\n")[0].strip()
            try:
                score = float(score_part)
            except ValueError:
                score = 0.0
        else:
            score = 0.0
            
        # Extract feedback
        if "FEEDBACK:" in full_response:
            feedback = full_response.split("FEEDBACK:")[1].strip()
        else:
            feedback = full_response
            
    except Exception:
        score = 0.0
        feedback = "Error parsing feedback."

    return min(max(score, 0), 100), feedback  # Clamp between 0 and 100

def extract_text_from_pdf(pdf_path):
    """Extract text from a PDF resume file."""
    try:
        doc = fitz.open(pdf_path)
        resume_text = ""
        for page in doc:
            resume_text += page.get_text()
        return resume_text
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        return ""