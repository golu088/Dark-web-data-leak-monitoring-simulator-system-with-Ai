import os
from dotenv import load_dotenv
load_dotenv()
import traceback

import google.generativeai as genai
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
model = genai.GenerativeModel('gemini-flash-latest', system_instruction='Test')

try:
    print(model.generate_content('hi').text)
except Exception as e:
    traceback.print_exc()
