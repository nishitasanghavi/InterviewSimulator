# Interview Simulator

An AI-powered mock interview platform that generates domain-specific questions and evaluates resume-job fit using semantic similarity and personalized feedback.

## Overview

Interview Simulator is a full-stack AI-based system designed to help candidates prepare for domain-specific interviews. It uses Google's Gemini API to generate intelligent, context-aware questions and Sentence-BERT to evaluate how well a user's resume aligns with a given job description. The platform provides explainable fit scores and section-wise feedback.

## Tech Stack

- Frontend: React, Tailwind CSS
- Backend: Flask
- AI/NLP: Gemini API (question generation), Sentence-BERT (semantic similarity scoring)
- Resume Parsing: PyPDF2
- Authentication: Firebase (Email/Password and Google OAuth)
- Languages: Python, JavaScript

## Features

- AI-generated, domain-specific mock interview questions powered by Gemini
- Resume parsing using PyPDF2 to extract structured data (Education, Skills, Experience)
- Semantic resume-job fit scoring using Sentence-BERT
- Section-wise feedback with recommendations on experience gaps and skill alignment
- Firebase authentication and user profile setup
- Resume upload functionality to personalize interview flow


## Use Cases

- Students preparing for campus placements
- Professionals exploring domain switches
- Resume-job fit testing before applications
- EdTech/HR tech platforms looking to integrate AI-based mock interviews

## Future Roadmap

- Voice-based answers and scoring
- LinkedIn resume scraping and import
- Support for multiple LLMs (e.g., GPT-4, Claude)
- PDF feedback report generation
- Peer benchmarking and interview simulation leaderboards

