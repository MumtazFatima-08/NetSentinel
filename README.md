# NetSentinel AI

NetSentinel AI is a full-stack cybersecurity monitoring dashboard that combines live system telemetry, network monitoring, and AI-inspired threat insights into an interactive Security Operations Center (SOC) style interface.

## 🌐 Live Demo
- **Frontend:** https://nsnl.netlify.app/
- **Backend API:** https://nsnl-backend.onrender.com

## ✨ Features
- Live system telemetry (CPU, RAM, Disk, Network)
- Device discovery and asset monitoring
- AI-inspired security alerts and recommendations
- Interactive charts and traffic visualization
- PDF export support
- SQLite-backed event storage
- Responsive modern dashboard

## 🛠 Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Recharts
- Framer Motion

### Backend
- Flask
- SQLite
- psutil
- Scapy
- python-nmap
- Flask-CORS

## 📂 Project Structure

```text
frontend/    React + Vite + Tailwind
backend/     Flask + SQLite
```

## 🚀 Installation

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv .venv
# Windows
.venv\Scripts\activate

pip install -r requirements.txt
python app.py
```

## 🌍 Deployment

- Frontend: Netlify
- Backend: Render

## 📡 API Endpoints

- GET `/api/telemetry`
- GET `/api/events`
- POST `/api/events`
- DELETE `/api/events/<event_id>`

## 📸 Screenshots

Add screenshots of the dashboard here.

## 🔮 Future Improvements

- Real-time packet capture
- SIEM event correlation
- Authentication & role-based access
- AI-powered anomaly detection
- Threat intelligence API integration
