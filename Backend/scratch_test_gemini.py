import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

system_instruction = "You are a helpful assistant."
try:
    model = genai.GenerativeModel(model_name="gemini-flash-latest", system_instruction=system_instruction)
    response = model.generate_content("Hello")
    print("gemini-flash-latest worked:", response.text)
except Exception as e:
    print("gemini-flash-latest failed:", e)

try:
    model = genai.GenerativeModel(model_name="gemini-1.5-flash", system_instruction=system_instruction)
    response = model.generate_content("Hello")
    print("gemini-1.5-flash worked:", response.text)
except Exception as e:
    print("gemini-1.5-flash failed:", e)
