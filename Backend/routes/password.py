from flask import Blueprint, request, jsonify
import pandas as pd
import re

password_routes = Blueprint("password_routes", __name__)

data = pd.read_csv("data/breach_dataset.csv")

#  Password Strength Function
def check_strength(password):
    score = 0

    if len(password) >= 8:
        score += 1
    if re.search("[A-Z]", password):
        score += 1
    if re.search("[a-z]", password):
        score += 1
    if re.search("[0-9]", password):
        score += 1
    if re.search("[@#$%^&*]", password):
        score += 1

    if score <= 2:
        return "Weak"
    elif score == 3 or score == 4:
        return "Medium"
    else:
        return "Strong"


@password_routes.route("/check_password", methods=["POST"])
def check_password():
    data_req = request.json
    password = data_req.get("password")

    # 🔹 Breach check
    matched = data[data["password"] == password]

    if not matched.empty:
        status = "Leaked"
        risk = "High"
        breaches = len(matched)
    else:
        status = "Safe"
        risk = "Low"
        breaches = 0

    #  Strength calculate
    strength = check_strength(password)

    return jsonify({
        "password": password,
        "status": status,
        "risk": risk,
        "strength": strength,   #  NEW FIELD
        "breaches": breaches
    })