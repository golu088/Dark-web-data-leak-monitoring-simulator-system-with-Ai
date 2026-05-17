from flask import Blueprint, request, jsonify
import pandas as pd

#  Blueprint define (ye missing tha tumhare error me)
username_routes = Blueprint("username_routes", __name__)

#  Load dataset
data = pd.read_csv("data/osint_public_profiles_dataset.csv")

#  Column clean (VERY IMPORTANT)
data.columns = data.columns.str.strip().str.lower()

#  Route
@username_routes.route("/check_username", methods=["POST"])
def check_username():
    try:
        data_req = request.get_json()

        #  username get
        username = data_req.get("username")

        if not username:
            return jsonify({"error": "Username required"}), 400

        # check if column exists (debug safety)
        if "username" not in data.columns:
            return jsonify({
                "error": "Column 'username' not found",
                "available_columns": list(data.columns)
            }), 500

        #  matching (case insensitive)
        matched = data[data["username"].astype(str).str.lower() == username.lower()]

        if not matched.empty:
            status = "Found"
            risk = "Medium"
            breaches = len(matched)
        else:
            status = "Safe"
            risk = "Low"
            breaches = 0

        return jsonify({
            "username": username,
            "status": status,
            "risk": risk,
            "breaches": breaches
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500