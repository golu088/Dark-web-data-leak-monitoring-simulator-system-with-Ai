from flask import Blueprint, jsonify
import pandas as pd

stats_routes = Blueprint("stats_routes", __name__)

data1 = pd.read_csv("data/breach_dataset.csv")

@stats_routes.route("/stats", methods=["GET"])
def stats():

    return jsonify({
        "total_records": len(data1),
        "unique_emails": data1["email"].nunique()
    })