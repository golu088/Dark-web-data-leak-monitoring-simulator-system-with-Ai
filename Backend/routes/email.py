from flask import Blueprint, request, jsonify
import pandas as pd
from model import predict_risk
import os
import google.generativeai as genai

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

#  Blueprint
email_routes = Blueprint("email_routes", __name__)

# 🔹 Load datasets
data1 = pd.read_csv("data/breach_dataset.csv")
data2 = pd.read_csv("data/osint_public_profiles_dataset.csv")

# Clean column names
data1.columns = data1.columns.str.strip()
data2.columns = data2.columns.str.strip()

#  MAIN API
@email_routes.route("/check_email", methods=["POST"])
def check_email():
    email = request.json.get("email")

    # ======================
    # 🔹 1. BREACH DATA
    # ======================
    breach_results = data1[data1["email"] == email]
    breach_count = len(breach_results)

    breach_details = []
    for _, row in breach_results.iterrows():
        breach_details.append({
            "source": row["source"],
            "year": int(row["year"])
        })

    # ======================
    # 🔹 2. OSINT DATA (FIXED)
    # ======================
    osint_details = []

    if "email" in data2.columns:
        osint_results = data2[data2["email"] == email]

        for _, row in osint_results.iterrows():
            osint_details.append({
                "name": row.get("name", "N/A"),
                "username": row.get("username", "N/A"),
                "platform": row.get("platform", "N/A")
            })

    # ======================
    # 🔹 3. RISK
    # ======================
    risk = predict_risk(breach_count)
    status = "found" if breach_count > 0 else "not found"

    # ======================
    # 🔹 4. AI RECOMMENDATION
    # ======================
    ai_recommendation = None
    if api_key:
        try:
            model = genai.GenerativeModel(model_name="gemini-flash-latest")
            prompt = (f"A user just scanned their email '{email}'. They have {breach_count} breaches. "
                      f"The risk level is {risk}. Provide a concise 1-2 sentence actionable security "
                      "recommendation. Do not use generic greetings, just give the recommendation.")
            response = model.generate_content(prompt)
            ai_recommendation = response.text.strip().replace("*", "")
        except Exception as e:
            print("Gemini API Error:", e)

    # ======================
    # 🔹 FINAL RESPONSE
    # ======================
    return jsonify({
        "email": email,
        "status": status,
        "risk": risk,
        "breaches_found": breach_count,
        "breach_details": breach_details,
        "osint_profiles": osint_details,
        "ai_recommendation": ai_recommendation
    })