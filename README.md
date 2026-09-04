# NetSentinel AI 🛡️

> **See your network. Understand every threat.**

NetSentinel AI is a full-stack cybersecurity monitoring dashboard for observing endpoint telemetry, network activity, device discovery, and security alerts through a SOC-style interface.

## 🌐 Live Demo

- **Frontend:** https://nsnl.netlify.app/
- **Backend API:** https://nsnl-backend.onrender.com

## 🎯 What It Solves

Network activity can be difficult to understand when device information, system telemetry, traffic data, and security events are scattered across different tools.

NetSentinel brings these signals into one monitoring interface so a user can inspect connected devices, observe network activity, review threats, explore analytics, and export reports.

## ✨ Key Features

### 🔎 Device Discovery

- Discover connected hosts on the monitored network
- Display hostname, IP, MAC address, vendor, status, risk, and last-seen information
- Provide a central device inventory for endpoint visibility

### 📡 Network & System Monitoring

- CPU and disk utilization
- Network interface information
- Packets sent and received
- Active connection visibility
- Live telemetry from the backend

### 🚨 Threat Monitoring

- Security alerts for suspicious network activity
- Threat prioritization using severity levels
- Alert descriptions and affected host information
- Threat queue for events requiring investigation

### 📊 Analytics

- Bandwidth trends over time
- Device activity visualization
- Network health timeline
- Operational views across devices, traffic, and threats

### 📄 Reporting

- Export monitoring information as PDF reports
- SQLite-backed event storage for recorded security events

## 🧩 How It Works

```text
Monitored Host / Network
          ↓
System & Network Telemetry
          ↓
Flask Backend
          ↓
Event Processing & Storage
          ↓
REST API
          ↓
React SOC Dashboard
          ↓
Devices • Traffic • Threats • Analytics • Reports
```

The backend collects system and network information using Python-based monitoring libraries and exposes the resulting data through REST endpoints. The React frontend periodically consumes this data and presents it through dedicated SOC dashboard views.

## 🏗️ Architecture

```text
┌──────────────────────┐
│   Monitored System   │
│  CPU • Disk • Network│
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│     Flask Backend    │
│ Telemetry • Events   │
│ Device Discovery     │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│     REST API         │
│ /api/telemetry       │
│ /api/events          │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│   React Frontend     │
│ SOC Monitoring UI    │
└──────────────────────┘
```

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, Tailwind CSS |
| Visualization | Recharts |
| UI Motion | Framer Motion |
| Backend | Flask, Python |
| System Telemetry | psutil |
| Network Analysis | Scapy, python-nmap |
| Storage | SQLite |
| Cross-Origin Requests | Flask-CORS |
| Deployment | Netlify, Render |

## 📁 Project Structure

```text
NetSentinel/
│
├── frontend/          # React + Vite + Tailwind dashboard
│
└── backend/           # Flask API, telemetry and event handling
```

## 📡 API

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/telemetry` | Retrieve current system/network telemetry |
| GET | `/api/events` | Retrieve stored security events |
| POST | `/api/events` | Create a security event |
| DELETE | `/api/events/<event_id>` | Delete a stored event |

## 🚀 Run Locally

### Backend

```bash
cd backend
python -m venv .venv
```

**Windows:**

```powershell
.venv\Scripts\activate
```

Install dependencies and start the API:

```bash
pip install -r requirements.txt
python app.py
```

### Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The Vite development server will provide the local frontend URL in the terminal.

## 📸 Screenshots

The dashboard includes dedicated views for:

- **Dashboard** — overall network health, telemetry, and threat queue
- **Devices** — connected endpoint discovery and asset posture
- **Analytics** — bandwidth and device activity trends

> Screenshots can be added to `docs/screenshots/` and referenced here once they are committed to the repository.

## ⚠️ Project Scope & Limitations

NetSentinel AI is a **portfolio-grade cybersecurity monitoring project**, not a replacement for a production SIEM, EDR, or enterprise SOC platform.

Current monitoring and threat insights depend on the capabilities of the implemented telemetry and detection logic. Network visibility can also vary with operating-system permissions, interfaces, and the environment in which the application runs.

## 🔮 Future Improvements

- Real-time packet capture and deeper packet inspection
- SIEM-style event correlation
- Authentication and role-based access control
- More advanced anomaly detection
- Threat-intelligence integration
- Persistent historical analytics
- Configurable alert and detection rules

## 👤 Author

**Mumtaz Fatima**  
CSE (AI & ML) Student
