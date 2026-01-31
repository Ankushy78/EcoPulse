from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from pymongo.errors import PyMongoError
from datetime import datetime

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://localhost:27017/")
db = client["ecopulse"]
metrics = db["metrics"]

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200

@app.route("/metrics/", methods=["POST", "OPTIONS"])

def ingest_metrics():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid JSON"}), 400

    if len(data) > 20:
        return jsonify({"error": "Too many fields"}), 400

    data["timestamp"] = datetime.utcnow()
    metrics.insert_one(data)

    return jsonify({"status": "metrics stored"}), 201

@app.route("/metrics/latest", methods=["GET"])
def latest_metrics():
    try:
        doc = metrics.find_one(
            {},
            projection={"_id": 0},
            sort=[("timestamp", -1)]
        )

        if not doc:
            return jsonify({"message": "No metrics found"}), 404

        return jsonify(doc)

    except PyMongoError:
        return jsonify({"error": "Database error"}), 500
    
@app.before_request
def log_request():
    print(request.method, request.path)


if __name__ == "__main__":
    app.run(debug=True)
