# NetSentinel AI 🛡️

> **See your network. Understand every threat.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-NetSentinel-0f766e?style=for-the-badge)](https://nsnl.netlify.app/)
[![Backend API](https://img.shields.io/badge/Backend-Flask-111827?style=for-the-badge)](https://nsnl-backend.onrender.com)
[![Frontend](https://img.shields.io/badge/Frontend-React-111827?style=for-the-badge)](https://nsnl.netlify.app/)

NetSentinel AI is a full-stack cybersecurity monitoring dashboard that brings **system telemetry, endpoint discovery, network activity, security events, analytics, and reporting** into a single SOC-style interface.

It is built as a practical security-monitoring project rather than a static dashboard: a Python/Flask backend collects and processes monitoring data, while a React frontend turns those signals into operational views.

---

## ✦ Why NetSentinel?

Network monitoring becomes difficult when telemetry, connected devices, traffic information, and security events are spread across different tools.

NetSentinel brings these signals together so an analyst can move from:

**What is happening? → Which device is involved? → Is it suspicious? → What should I investigate?**

### Core capabilities

| Capability | What NetSentinel provides |
|---|---|
| 🖥️ Endpoint visibility | Connected devices, IP, MAC, vendor, status, risk and last-seen data |
| 📡 Telemetry | CPU, disk, interfaces, packets and active connections |
| 🌐 Traffic monitoring | Upload/download activity, bandwidth trends and packet volume |
| 🚨 Threat monitoring | Severity-based security events with context and response guidance |
| 📊 Analytics | Network-health, bandwidth and device-activity visualizations |
| 📄 Reporting | PDF/CSV-oriented reporting workflow |
| ⚙️ Monitoring controls | Refresh interval and appearance preferences |

---

## 🖥️ Product Showcase

The deployed interface is organized as a lightweight SOC workflow rather than a single statistics page.

**Dashboard** → network health and active threat overview  
**Devices** → endpoint discovery and asset posture  
**Traffic** → live bandwidth and application movement  
**Threats** → findings, severity and response guidance  
**Analytics** → operational trends across devices and traffic  
**Reports** → export-ready monitoring data  
**Settings** → monitoring preferences

> The following captures are from the deployed NetSentinel interface.

| Dashboard | Device Discovery |
|---|---|
| <img src="./docs/screenshots/dashboard.webp" alt="NetSentinel Dashboard" width="100%"> | <img src="./docs/screenshots/devices.webp" alt="NetSentinel Device Discovery" width="100%"> |
| **Network health, telemetry, active connections and threat queue.** | **Connected endpoints and asset posture.** |

| Traffic Monitor | Threat Detection |
|---|---|
| <img src="./docs/screenshots/traffic.webp" alt="NetSentinel Traffic Monitor" width="100%"> | <img src="./docs/screenshots/threats.webp" alt="NetSentinel Threat Detection" width="100%"> |
| **Live upload/download activity, packets and bandwidth history.** | **Findings with severity, affected device, recommendations and explanations.** |

| Analytics | Reports |
|---|---|
| <img src="./docs/screenshots/analytics.webp" alt="NetSentinel Analytics" width="100%"> | <img src="./docs/screenshots/reports.webp" alt="NetSentinel Reports" width="100%"> |
| **Operational trends across bandwidth and device activity.** | **PDF/CSV-oriented reporting workflow.** |

### Monitoring Preferences

<img src="./docs/screenshots/settings.webp" alt="NetSentinel Settings" width="100%">

**Refresh interval and appearance controls for the monitoring experience.**

---

## 🔍 Threat Detection Workflow

NetSentinel currently presents findings such as:

- **Possible Port Scan** — rapid connection attempts across multiple ports
- **Unusual Bandwidth Spike** — outbound throughput exceeding a monitored baseline

Each finding can expose:

- severity
- affected device
- timestamp
- recommendation
- explanation/context

This makes the threat view an **investigation starting point**, rather than only displaying an alert counter.

---

## ⚙️ How It Works

```text
┌─────────────────────────────┐
│       Monitored Host        │
│ CPU • Disk • Network • OS   │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ Telemetry & Discovery       │
│ psutil • Scapy • nmap       │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│       Flask Backend         │
│ Collection • Processing     │
│ Events • Device Discovery   │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│          REST API           │
│ Telemetry • Security Events │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│       React SOC UI          │
│ Devices • Traffic • Threats │
│ Analytics • Reports         │
└─────────────────────────────┘
```

The frontend consumes backend data and turns it into dedicated monitoring views.

---

## 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │    Monitored Host    │
                    │ CPU / Disk / Network │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Telemetry Collection │
                    │ psutil / Scapy / nmap│
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Flask Backend     │
                    │ Events + Processing  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │       REST API       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    React Frontend    │
                    │    SOC Dashboard     │
                    └──────────────────────┘
```

---

## 🧠 Technical Deep Dive

### Frontend
- React
- Vite
- Tailwind CSS
- Recharts
- Framer Motion

### Backend
- Python
- Flask
- Flask-CORS
- REST API architecture

### Monitoring & Network Layer
- **psutil** — system and network telemetry
- **Scapy** — packet/network analysis capabilities
- **python-nmap** — network discovery
- **SQLite** — event persistence

### Deployment
- Netlify frontend
- Render backend

---

## 📡 API Surface

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/telemetry` | Retrieve current telemetry |
| GET | `/api/events` | Retrieve stored security events |
| POST | `/api/events` | Create a security event |
| DELETE | `/api/events/<event_id>` | Remove a stored event |

---

## 📁 Project Structure

```text
NetSentinel/
├── frontend/
│   └── React + Vite dashboard
├── backend/
│   └── Flask API, telemetry and event handling
└── README.md
```

---

## 🚀 Run Locally

### 1. Clone

```bash
git clone https://github.com/MumtazFatima-08/NetSentinel.git
cd NetSentinel
```

### 2. Backend

```bash
cd backend
python -m venv .venv
```

**Windows PowerShell**

```powershell
.venv\Scripts\Activate.ps1
```

```bash
pip install -r requirements.txt
python app.py
```

### 3. Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Live Deployment

**Frontend:** [nsnl.netlify.app](https://nsnl.netlify.app/)  
**Backend:** [nsnl-backend.onrender.com](https://nsnl-backend.onrender.com)

---

## ⚠️ Scope & Limitations

NetSentinel is a **portfolio-grade monitoring project** and is not intended to replace a production SIEM, EDR, or enterprise SOC platform.

Monitoring visibility depends on the operating system, available interfaces, permissions, network environment, and the detection/telemetry logic implemented in the current version.

---

## 🔮 Future Engineering

- Real-time packet capture and deeper packet inspection
- SIEM-style event correlation
- Authentication and role-based access control
- More advanced anomaly detection
- Threat-intelligence integration
- Persistent historical analytics
- Configurable detection and alert rules

---

## 👤 Author

**Mumtaz Fatima**  
CSE (AI & ML) · AI & Cybersecurity

[GitHub](https://github.com/MumtazFatima-08) · [LinkedIn](https://www.linkedin.com/in/mumtaz-fatima-112366325/)

---

> **NetSentinel AI — See your network. Understand every threat.**
