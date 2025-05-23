import pyttsx3

# Initialize the TTS engine
engine = pyttsx3.init()

# Set speaking rate (optional)
engine.setProperty('rate', 165)

# Function to speak
def speak(text):
    engine.say(text)
    engine.runAndWait()

speak("Hello, welcome to the AI Interview Simulator. How can I assist you today?")
speak("Please enter your resume text.")
speak("Please enter the job description.")
speak("The interview will now begin. Type your responses naturally.")
speak("Type exit to end the interview.")
speak("Starting interview.")