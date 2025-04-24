import google.generativeai as genai
from dotenv import load_dotenv
import os
import fitz  # PyMuPDF for extracting text from PDF

# Load environment variables from .env
load_dotenv()

# Configure the Gemini API key
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key='AIzaSyA4lm9Yp97AX7qXV0k8zekFMpaiQbSkSlY')

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

    Evaluate how well this resume matches the job description and provide structured feedback.
    
    Your response MUST follow this format exactly with clear section separation:

    SCORE: [number between 0-100]
    
    STRENGTHS (minimum 3 points):
    - [Very short, concise strength point]
    
    WEAKNESSES (minimum 3 points):
    - [Very short, concise weakness point]
    
    IMPROVEMENTS (minimum 4 points):
    - [Short, concise, actionable improvement suggestion focused ONLY on resume formatting, content structure, clarity, or presentation]
    - [Do NOT include keywords or technical skills as improvement points - those belong in the MISSING KEYWORDS section]
    - [Focus on resume quality improvements rather than skill gaps]
    - [Example: "Quantify achievements with metrics"]


    KEYWORD MATCHING SCORE: [number between 0-100]
    
    KEYWORDS MATCHING (minimum 2 keywords):
    - [Keyword present in resume and relevant to job description]
    - [Another keyword present in resume]

    MISSING KEYWORDS (minimum 2 keywords):
    - [Important keyword missing from resume but relevant to job]
    - [Another important keyword missing from resume]
    """

    response = model.generate_content(prompt)
    full_response = response.text.strip()
    
    # Parse score and feedback from response
    try:
        # Extract score
        if "SCORE:" in full_response:
            parts = full_response.split("SCORE:")
            score_part = parts[1].split("\n")[0].strip()
            try:
                score = float(score_part)
            except ValueError:
                score = 0.0
        else:
            score = 0.0
            
        # Extract sections
        feedback_dict = {
            "strengths": [],
            "weaknesses": [],
            "improvements": [],
            "keyword_matching_score": 0,
            "keywords_matching": [],
            "missing_keywords": []
        }
        
        # Parse strengths
        if "STRENGTHS:" in full_response:
            strengths_section = full_response.split("STRENGTHS:")[1].split("WEAKNESSES:")[0].strip()
            strengths_points = [point.strip().strip('- ') for point in strengths_section.split('\n') if point.strip().startswith('-')]
            feedback_dict["strengths"] = strengths_points
            
        # Parse weaknesses
        if "WEAKNESSES:" in full_response:
            weaknesses_section = full_response.split("WEAKNESSES:")[1].split("IMPROVEMENTS:")[0].strip()
            weaknesses_points = [point.strip().strip('- ') for point in weaknesses_section.split('\n') if point.strip().startswith('-')]
            feedback_dict["weaknesses"] = weaknesses_points
            
        # Parse improvements
        if "IMPROVEMENTS:" in full_response:
            improvements_section = full_response.split("IMPROVEMENTS:")[1].split("KEYWORD MATCHING SCORE:")[0].strip()
            improvements_points = [point.strip().strip('- ') for point in improvements_section.split('\n') if point.strip().startswith('-')]
            feedback_dict["improvements"] = improvements_points

        if "KEYWORD MATCHING SCORE:" in full_response:
            keyword_score_line = full_response.split("KEYWORD MATCHING SCORE:")[1].split("KEYWORDS MATCHING:")[0].strip()
            try:
                feedback_dict["keyword_matching_score"] = float(keyword_score_line)
            except ValueError:
                feedback_dict["keyword_matching_score"] = 0.0

        if "KEYWORDS MATCHING:" in full_response:
            keywords_section = full_response.split("KEYWORDS MATCHING:")[1].split("MISSING KEYWORDS:")[0].strip()
            keywords_points = [point.strip().strip('- ') for point in keywords_section.split('\n') if point.strip().startswith('-')]
            feedback_dict["keywords_matching"] = keywords_points

        if "MISSING KEYWORDS:" in full_response:
            missing_keywords_section = full_response.split("MISSING KEYWORDS:")[1].strip()
            missing_keywords_points = [point.strip().strip('- ') for point in missing_keywords_section.split('\n') if point.strip().startswith('-')]
            feedback_dict["missing_keywords"] = missing_keywords_points
            
    except Exception as e:
        print(f"Error parsing response: {e}")
        score = 0.0
        feedback_dict = {
            "strengths": [],
            "weaknesses": [],
            "improvements": [],
            "keyword_matching_score": 0,
            "keywords_matching": [],
            "missing_keywords": []
        }

    return min(max(score, 0), 100), feedback_dict  # Clamp score between 0 and 100
    
def get_generalized_score_and_feedback(resume_text):
    """
    If no job description is provided, give a generalized score and feedback using Gemini.
    """
    prompt = f"""
    You are a professional resume evaluator with expertise in recruitment.

    Candidate Resume:
    {resume_text}

    Evaluate this resume based on general resume quality, skills, format, and professionalism.
    
    Your response MUST follow this format exactly with clear section separation:

    SCORE: [number between 0-100]
    
    STRENGTHS (minimum 3 points):
    - [Very short, concise strength point]
    
    WEAKNESSES (minimum 3 points):
    - [Very short, concise weakness point]
    
    IMPROVEMENTS (minimum 4 points):
    - [Short, concise, actionable improvement suggestion focused ONLY on resume formatting, content structure, clarity, or presentation]
    - [Do NOT include keywords or technical skills as improvement points - those belong in the MISSING KEYWORDS section]
    - [Focus on resume quality improvements rather than skill gaps]
    - [Example: "Quantify achievements with metrics"]

    KEYWORD MATCHING SCORE: [number between 0-100]
    
    KEYWORDS MATCHING (minimum 2 keywords):
    - [Keyword present in resume relevant to general job market]
    - [Another keyword present in resume]

    MISSING KEYWORDS (minimum 2 keywords):
    - [Important keyword missing from resume for general employability]
    - [Another important keyword missing from resume]
    """

    response = model.generate_content(prompt)
    full_response = response.text.strip()
    
    # Parse score and feedback from response
    try:
        # Extract score
        if "SCORE:" in full_response:
            parts = full_response.split("SCORE:")
            score_part = parts[1].split("\n")[0].strip()
            try:
                score = float(score_part)
            except ValueError:
                score = 0.0
        else:
            score = 0.0
            
        # Extract sections
        feedback_dict = {
            "strengths": [],
            "weaknesses": [],
            "improvements": [],
            "keyword_matching_score": 0,
            "keywords_matching": [],
            "missing_keywords": []
        }
        
        # Parse strengths
        if "STRENGTHS:" in full_response:
            strengths_section = full_response.split("STRENGTHS:")[1].split("WEAKNESSES:")[0].strip()
            strengths_points = [point.strip().strip('- ') for point in strengths_section.split('\n') if point.strip().startswith('-')]
            feedback_dict["strengths"] = strengths_points
            
        # Parse weaknesses
        if "WEAKNESSES:" in full_response:
            weaknesses_section = full_response.split("WEAKNESSES:")[1].split("IMPROVEMENTS:")[0].strip()
            weaknesses_points = [point.strip().strip('- ') for point in weaknesses_section.split('\n') if point.strip().startswith('-')]
            feedback_dict["weaknesses"] = weaknesses_points
            
        # Parse improvements
        if "IMPROVEMENTS:" in full_response:
            improvements_section = full_response.split("IMPROVEMENTS:")[1].split("KEYWORD MATCHING SCORE:")[0].strip()
            improvements_points = [point.strip().strip('- ') for point in improvements_section.split('\n') if point.strip().startswith('-')]
            feedback_dict["improvements"] = improvements_points
            
        if "KEYWORD MATCHING SCORE:" in full_response:
            keyword_score_line = full_response.split("KEYWORD MATCHING SCORE:")[1].split("KEYWORDS MATCHING:")[0].strip()
            try:
                feedback_dict["keyword_matching_score"] = float(keyword_score_line)
            except ValueError:
                feedback_dict["keyword_matching_score"] = 0.0

        if "KEYWORDS MATCHING:" in full_response:
            keywords_section = full_response.split("KEYWORDS MATCHING:")[1].split("MISSING KEYWORDS:")[0].strip()
            keywords_points = [point.strip().strip('- ') for point in keywords_section.split('\n') if point.strip().startswith('-')]
            feedback_dict["keywords_matching"] = keywords_points

        if "MISSING KEYWORDS:" in full_response:
            missing_keywords_section = full_response.split("MISSING KEYWORDS:")[1].strip()
            missing_keywords_points = [point.strip().strip('- ') for point in missing_keywords_section.split('\n') if point.strip().startswith('-')]
            feedback_dict["missing_keywords"] = missing_keywords_points
            
    except Exception as e:
        print(f"Error parsing response: {e}")
        score = 0.0
        feedback_dict = {
            "strengths": [],
            "weaknesses": [],
            "improvements": [],
            "keyword_matching_score": 0,
            "keywords_matching": [],
            "missing_keywords": []
        }

    return min(max(score, 0), 100), feedback_dict  # Clamp score between 0 and 100


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