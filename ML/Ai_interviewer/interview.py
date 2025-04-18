import os
from dotenv import load_dotenv
from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

# Load API key
load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")

# 1. SETUP LLM + MEMORY
llm = ChatOpenAI(temperature=0.7, openai_api_key=openai_api_key)
memory = ConversationBufferMemory()

# 2. CUSTOM INTERVIEWER PROMPT
interview_prompt = PromptTemplate(
    input_variables=["resume", "job", "chat_history", "user_input"],
    template="""
You are an AI Interviewer. Your job is to conduct a human-like technical + HR interview.

The candidate has applied for a job with this description:
{job}

Their resume says:
{resume}

Keep the context of previous discussion:
{chat_history}

Ask questions one by one like a human interviewer.
Make follow-up questions based on answers.
Your current user input is:
{user_input}

Now, respond as the AI interviewer.
""",
)

# 3. CHAIN
interview_chain = LLMChain(
    llm=llm,
    prompt=interview_prompt,
    memory=memory,
    verbose=True
)

# 4. USER DATA
resume = """
Full Stack Developer | React | Node.js | Firebase | Python
Built Medilocker (healthcare doc storage), TripTango (travel assistant), Environmental Action Platform.
Good at DSA, ML projects, exam automation systems.
"""
job_description = """
Looking for a Software Engineer with strong React, Node.js, Firebase experience.
Should have project experience and good communication skills. Bonus: ML experience.
"""

# 5. INTERVIEW LOOP
print("🤖 AI INTERVIEWER: Let's start your interview! (Type 'exit' to quit)\n")

while True:
    user_input = input("🧑 You: ")
    if user_input.lower() in ["exit", "quit"]:
        print("🤖 Interview ended. Good luck!")
        break

    ai_reply = interview_chain.run({
        "resume": resume,
        "job": job_description,
        "user_input": user_input
    })

    print(f"\n🤖 {ai_reply}\n")
