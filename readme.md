# EcoPulse – Backend Service

EcoPulse is a backend service built with Flask and MongoDB to collect, store, and retrieve system/environment metrics.  
This backend acts as the data ingestion and monitoring layer for the EcoPulse project.

---

## 🚀 Features

- REST API built using Flask
- MongoDB for persistent metrics storage
- Ingest metrics via POST API
- Fetch the latest metrics via GET API
- Health check endpoint for service monitoring
- CORS enabled for frontend integration

---

## 🧱 Tech Stack

- **Backend Framework:** Flask (Python)
- **Database:** MongoDB
- **Driver:** PyMongo
- **Language:** Python 3.12

---

## 📌 API Endpoints

### 🔹 Health Check
```http
GET /health
Response

{
  "status": "ok"
}
🔹 Ingest Metrics
POST /metrics/
Request Body (JSON)

{
  "cpu": 55,
  "memory": 70
}
Response

{
  "status": "metrics stored"
}
🔹 Get Latest Metrics
GET /metrics/latest
Response

{
  "cpu": 55,
  "memory": 70,
  "timestamp": "2026-01-31T10:45:22.123Z"
}
🛠️ How to Run Locally
1️⃣ Prerequisites
Make sure you have:

Python 3.10+

MongoDB running locally on port 27017

Git installed

2️⃣ Clone the Repository
git clone https://github.com/<your-username>/EcoPulse.git
cd EcoPulse/backend
3️⃣ Create Virtual Environment
python -m venv .venv
4️⃣ Install Dependencies
.venv/Scripts/python.exe -m pip install -r requirements.txt
5️⃣ Start the Server
.venv/Scripts/python.exe app.py
You should see:

Running on http://127.0.0.1:5000
🧪 Testing the APIs (VS Code Terminal / PowerShell)
▶️ POST Metrics
Invoke-RestMethod `
  -Uri http://127.0.0.1:5000/metrics/ `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"cpu":55,"memory":70}'
▶️ GET Latest Metrics
Invoke-RestMethod http://127.0.0.1:5000/metrics/latest
▶️ Health Check
Invoke-RestMethod http://127.0.0.1:5000/health

📂 Project Structure
EcoPulse/
 ├── backend/
 │    ├── app.py
 │    ├── requirements.txt
 │    └── README.md
 ├── .gitignore
 └── README.md
📈 Project Status
✅ Backend MVP completed
🔜 Frontend integration pending

This backend is stable and ready to be connected to a frontend dashboard or deployed.