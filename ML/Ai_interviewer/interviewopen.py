import os
import time
from dotenv import load_dotenv
import google.generativeai as genai
from rich.console import Console
from rich.markdown import Markdown
from rich.panel import Panel

# Initialize Rich console for better output formatting
console = Console()

# Load environment variables
load_dotenv()

# Configure Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in environment variables")

genai.configure(api_key=GEMINI_API_KEY)

# Initialize the model
model = genai.GenerativeModel('gemini-1.5-pro')

# Interview history storage
interview_history = []

def format_history_for_prompt():
    """Format the conversation history for the prompt"""
    formatted_history = ""
    for entry in interview_history:
        role = "Interviewer" if entry["role"] == "interviewer" else "Candidate"
        formatted_history += f"{role}: {entry['content']}\n\n"
    return formatted_history

def get_interviewer_response(resume, job_description, user_input):
    """Get response from the AI interviewer"""
    history = format_history_for_prompt()
    
    prompt = f"""
You are an advanced AI Interviewer conducting a professional job interview. Your goal is to assess the candidate's suitability for the position in a conversational, human-like manner.

# CONTEXT
- Job Description: {job_description}
- Candidate Resume: {resume}
- Interview History: 
{history}

# INTERVIEW GUIDELINES
1. Ask only ONE question at a time, focused and specific
2. Start with introductory questions, then proceed with technical questions, and in the end ask some HR questions relevant to the job requirements
3. Make thoughtful follow-up questions based on previous answers
4. Assess both technical skills and soft skills
5. Maintain a professional but Speak like a real human, use casual phrasing occasionally, and always stay on-topic.
6. End the interview naturally when sufficient assessment is complete. Thank the interviewer for their time.

# CURRENT INTERACTION
The candidate just said: {user_input}

Respond as a professional interviewer with your next question or comment. Keep your response concise and focused.
"""

    response = model.generate_content(prompt)
    return response.text

def generate_feedback(resume, job_description):
    """Generate feedback based on the interview"""
    history = format_history_for_prompt()
    
    prompt = f"""
You are an expert hiring manager reviewing a job interview. Based on the interview conversation below, 
provide constructive feedback for the candidate. Include:

1. Overall assessment (score out of 10)
2. Technical skills evaluation
3. Communication skills evaluation
4. Strengths demonstrated
5. Areas for improvement
6. Fit for the position

Resume: {resume}
Job Description: {job_description}
Interview Conversation:
{history}

Provide your detailed feedback:
"""

    response = model.generate_content(prompt)
    return response.text

def is_exit_command(text):
    """Check if input is an exit command"""
    exit_commands = ["exit", "quit", "end", "stop", "bye", "goodbye"]
    return text.lower() in exit_commands

def main():
    console.print(Panel.fit(
        "[bold]AI Job Interviewer[/bold]\n\nSimulates a job interview based on resume and job description",
        border_style="green"
    ))
    
    # Get resume and job description as direct input
    console.print("\n[bold]Enter resume text:[/bold]")
    resume = console.input()
    
    console.print("\n[bold]Enter job description:[/bold]")
    job_description = console.input()
    
    # Check if data was entered
    if not resume or not job_description:
        console.print("[bold red]Resume or job description is empty. Exiting.[/bold red]")
        return
    
    # Show instructions
    console.print(Panel(
        "The interview will now begin. Type your responses naturally.\n"
        "Type 'exit' to end the interview.",
        title="Instructions",
        border_style="yellow"
    ))
    
    # Start interview with initial greeting
    console.print("\n[bold green]Starting interview...[/bold green]")
    
    initial_prompt = "Hello, I'm here for the interview."
    interviewer_response = get_interviewer_response(resume, job_description, initial_prompt)
    
    # Add to history
    interview_history.append({"role": "candidate", "content": initial_prompt})
    interview_history.append({"role": "interviewer", "content": interviewer_response})
    
    # Display interviewer's first message
    console.print("\n[bold green]Interviewer:[/bold green]")
    console.print(Panel(Markdown(interviewer_response), border_style="green"))
    
    # Main interview loop
    while True:
        # Get user input
        user_input = console.input("\n[bold cyan]You: [/bold cyan]")
        
        # Check for exit command
        if is_exit_command(user_input):
            console.print("\n[bold green]Interview concluded.[/bold green]")
            break
        
        # Add user input to history
        interview_history.append({"role": "candidate", "content": user_input})
        
        try:
            # Get AI response
            interviewer_response = get_interviewer_response(resume, job_description, user_input)
            
            # Add interviewer response to history
            interview_history.append({"role": "interviewer", "content": interviewer_response})
            
            # Display interviewer's message
            console.print("\n[bold green]Interviewer:[/bold green]")
            console.print(Panel(Markdown(interviewer_response), border_style="green"))
            
        except Exception as e:
            console.print(f"[bold red]Error: {e}[/bold red]")
    
    # Generate and display feedback
    console.print("\n[bold blue]Generating interview feedback...[/bold blue]")
    try:
        feedback = generate_feedback(resume, job_description)
        console.print("\n[bold blue]Interview Feedback:[/bold blue]")
        console.print(Panel(Markdown(feedback), border_style="blue"))
    except Exception as e:
        console.print(f"[bold red]Error generating feedback: {e}[/bold red]")

if __name__ == "__main__":
    main()