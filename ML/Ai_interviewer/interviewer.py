import google.generativeai as genai
from dotenv import load_dotenv
import os
import json
from datetime import datetime

# Load the API key from .env
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

# Configure Gemini
genai.configure(api_key=api_key)

# Start conversation (chat session)
model = genai.GenerativeModel('gemini-pro')
chat = model.start_chat(history=[])

# Interview configuration
job_description = """
We are hiring for the role of Full Stack Software Engineer. The ideal candidate should be strong in Data Structures and Algorithms,
have knowledge of Computer Fundamentals (OS, DBMS, CN), and experience building full-stack projects.
Good communication skills are a bonus.
"""

resume = """
B.Tech Computer Science, Built a medical platform (Medilocker), TripTango - AI travel app, experienced with React, Node.js, Firebase, Django.
Proficient in DSA, participated in hackathons, good at system design basics, worked on ML for fruit classification.
"""

# Initial prompt
intro_prompt = f"""
You are an AI interviewer for a software engineering role. Ask me questions one by one related to:
- Data Structures and Algorithms
- Computer Fundamentals (OS, DBMS, CN)
- My Resume
- HR questions
Keep the tone human and conversational.
Job Description: {job_description}
Resume: {resume}

Start the interview by greeting me and then ask your first question.
"""

# Log all Q&A for future DB storage
interview_log = []

# Start interaction
response = chat.send_message(intro_prompt)
print(f"AI: {response.text}")
interview_log.append({"ai": response.text})

while True:
    user_input = input("You: ")
    if user_input.lower() in ["exit", "quit"]:
        print("Interview ended.")
        break

    # Log user answer
    interview_log.append({"you": user_input})

    # Get AI response
    response = chat.send_message(user_input)
    print(f"AI: {response.text}")

    # Log AI follow-up
    interview_log.append({"ai": response.text})

# Save interview log
timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
with open(f"interview_log_{timestamp}.json", "w", encoding="utf-8") as f:
    json.dump(interview_log, f, indent=2)

print("📝 Interview log saved!")
