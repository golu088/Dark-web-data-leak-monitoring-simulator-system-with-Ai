# Dark Web Data Leak Monitoring Simulator System with AI (CyberGuard AI)

A comprehensive cybersecurity web application designed to help users identify if their personal data (emails, passwords, and usernames) has been compromised in historical data breaches or exposed across public OSINT profiles. The system is augmented with **CyberGuard AI**, an intelligent chatbot powered by the Google Gemini API, which provides real-time security recommendations and guidance.

## 🌟 Features

- **Email Breach Check**: Cross-references provided email addresses against a database of known data breaches and OSINT public profiles. Returns breach counts, specific breach sources/years, and dynamic risk levels.
- **Password Strength & Leak Check**: Analyzes password strength and checks if the password has been compromised in previous leaks.
- **Username Exposure Check**: Discovers if a specific username has been exposed on other platforms or public datasets.
- **CyberGuard AI Chatbot**: An integrated, context-aware cybersecurity assistant powered by Gemini. It can answer questions about breach results, provide actionable security advice, and guide users on how to protect their digital identity.
- **AI Security Recommendations**: Automatically generates concise, tailored security recommendations after each scan (email, password, etc.) based on the user's specific risk profile.
- **Export Reports**: Generates downloadable PDF reports of the scan results using jsPDF and html2canvas.
- **Authentication & History**: Secure user authentication to keep track of past scans and personal security history.

## 🛠️ Technology Stack

### Frontend
- **React.js**: Core frontend library for building the UI.
- **Tailwind CSS**: Utility-first CSS framework for styling and responsive design.
- **React Router DOM**: For seamless client-side routing.
- **jsPDF & html2canvas**: Used for capturing scan results and generating downloadable PDF reports.

### Backend
- **Python / Flask**: Lightweight web framework serving the API endpoints.
- **Pandas**: Used for efficient data manipulation and querying against the CSV datasets (`breach_dataset.csv`, `osint_public_profiles_dataset.csv`).
- **Google Generative AI (Gemini API)**: Powers the CyberGuard AI chatbot and dynamic security recommendations.
- **Flask-CORS**: Handles Cross-Origin Resource Sharing between the React frontend and Flask backend.

## 🚀 Getting Started

### Prerequisites
- Node.js & npm (for the frontend)
- Python 3.8+ (for the backend)
- Google Gemini API Key

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file in the `Backend` directory and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
5. Start the Flask server:
   ```bash
   python app.py
   ```
   *The backend will run on `http://127.0.0.1:5000`.*

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the necessary NPM packages:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   *The frontend will run on `http://localhost:3000`.*

## 📂 Project Structure

```
├── Backend/                 # Flask Backend Code
│   ├── data/                # CSV Datasets for Breaches and OSINT
│   ├── routes/              # API Route definitions (email, password, chat, auth, stats)
│   ├── services/            # Backend business logic and helper services
│   ├── app.py               # Main Flask application entry point
│   ├── model.py             # Risk prediction model
│   └── requirements.txt     # Python dependencies
├── frontend/                # React Frontend Code
│   ├── public/              # Static public assets
│   ├── src/                 # React components, pages, utils, and CSS
│   ├── package.json         # Node.js dependencies and scripts
│   └── tailwind.config.js   # Tailwind CSS configuration
└── README.md                # Project documentation
```

## 🔒 Security Notice
**Disclaimer:** This tool is intended for educational, simulation, and personal security awareness purposes only. Do not use this tool to maliciously gather data on other individuals.

---
*Created by Golu Kumar*