# NetSentinel AI

NetSentinel AI is a production-style cybersecurity monitoring platform that combines live system telemetry, network visibility, and AI-oriented threat insights into a polished security operations dashboard.

## Features
- Live host and network telemetry
- Device discovery and asset inventory
- Threat detection and AI-readable recommendations
- Traffic visualization with animated charts
- PDF and CSV export workflows
- SQLite-backed event storage

## Architecture
```text
frontend/                React + Vite + Tailwind + Recharts
backend/                 Flask + SQLite + psutil + scapy
```

## Installation
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
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## Deployment
- Frontend: Vercel
- Backend: Render
- Configure CORS and environment variables for production hosts

## API
- GET /api/telemetry
- GET /api/events
- POST /api/events
- DELETE /api/events/<event_id>

## Screenshots
- Placeholder: Add dashboard screenshots in the docs folder.

## Future Improvements
- Packet capture and PCAP retention
- SIEM event correlation
- User authentication and role-based access
- Advanced anomaly detection models
