# NetSentinel AI 🛡️

> **See your network. Understand every threat.**

NetSentinel AI is a full-stack cybersecurity monitoring dashboard that brings **system telemetry, network visibility, device discovery, security events, and analytics** into a single SOC-style interface.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-NetSentinel-111827?style=for-the-badge)](https://nsnl.netlify.app/)
[![Backend API](https://img.shields.io/badge/API-Render-111827?style=for-the-badge)](https://nsnl-backend.onrender.com)

---

## Overview

Monitoring a network often means looking at system metrics, connected devices, traffic information, and security events across different tools.

**NetSentinel** combines these signals into one interface so users can:

- discover connected devices
- monitor system and network telemetry
- review security events
- inspect traffic and device activity
- explore network analytics
- generate monitoring reports

The project is designed as a **portfolio-grade cybersecurity monitoring system** demonstrating full-stack development and practical security-monitoring concepts.

---

## Product Preview

> Screenshots will be added here as repository assets. The final README will use clean, full-width captures of the Dashboard, Devices, Analytics, and Threat views.

**Planned screenshots**

| View | What it demonstrates |
|---|---|
| Dashboard | Overall network health, telemetry, and threat overview |
| Devices | Discovered hosts and endpoint information |
| Analytics | Traffic and device activity trends |
| Threats / Events | Security events and severity-based monitoring |

---

## Key Features

### 🔎 Device Discovery

- Discover hosts visible on the monitored network
- Display hostname, IP, MAC address, vendor, status, risk, and last-seen information
- Maintain a central device inventory for network visibility

### 📡 System & Network Monitoring

- CPU and disk utilization
- Network interface information
- Packets sent and received
- Active connection visibility
- Backend-powered telemetry displayed in the dashboard

### 🚨 Security Event Monitoring

- Security events for suspicious activity
- Severity-based threat prioritization
- Affected-host information
- Centralized event queue for investigation

### 📊 Network Analytics

- Bandwidth trends
- Device activity visualization
- Network health timeline
- Operational views across devices, traffic, and events

### 📄 Reporting

- Generate monitoring reports
- Persist security events using SQLite

---

## How It Works

```text
┌──────────────────────────┐
│   Monitored System       │
│ CPU • Disk • Network     │
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│ Telemetry & Discovery    │
│ psutil • Scapy • nmap    │
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│      Flask Backend       │
│ Processing • Events      │
│ Device Discovery         │
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│        REST API          │
│ Telemetry • Events       │
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│     React Dashboard      │
│ Devices • Analytics      │
│ Threats • Reports        │
└──────────────────────────┘
```

The backend collects system and network information, processes monitoring events, stores relevant data, and exposes the results through REST endpoints. The React frontend consumes these endpoints and presents the information through dedicated monitoring views.

---

## Architecture

```text
                 ┌──────────────────────┐
                 │   Monitored Host     │
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
                 │      REST API        │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │    React Frontend    │
                 │    SOC Dashboard     │
                 └──────────────────────┘
```

---

## Technical Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, Tailwind CSS |
| Visualization | Recharts |
| UI | Framer Motion |
| Backend | Python, Flask |
| System Telemetry | psutil |
| Network Analysis | Scapy, python-nmap |
| Storage | SQLite |
| API | REST, Flask-CORS |
| Deployment | Netlify, Render |

---

## API

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/telemetry` | Retrieve current system/network telemetry |
| GET | `/api/events` | Retrieve stored security events |
| POST | `/api/events` | Create a security event |
| DELETE | `/api/events/<event_id>` | Delete a stored event |

---

## Project Structure

```text
NetSentinel/
├── frontend/
│   └── React + Vite dashboard
│
├── backend/
│   └── Flask API, telemetry and event handling
│
└── README.md
```

---

## Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/MumtazFatima-08/NetSentinel.git
cd NetSentinel
```

### 2. Start the backend

```bash
cd backend
python -m venv .venv
```

**Windows PowerShell**

```powershell
.venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
python app.py
```

### 3. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Use the local URL provided by Vite.

---

## Live Deployment

**Frontend:** https://nsnl.netlify.app/  
**Backend API:** https://nsnl-backend.onrender.com

---

## Scope & Limitations

NetSentinel is a **portfolio-grade monitoring project** and is not intended to replace a production SIEM, EDR, or enterprise SOC platform.

Network visibility and telemetry depend on the operating system, available network interfaces, permissions, and the monitoring capabilities implemented in the current version.

---

## Future Improvements

- Real-time packet capture and deeper packet inspection
- SIEM-style event correlation
- Authentication and role-based access control
- Advanced anomaly detection
- Threat-intelligence integration
- Persistent historical analytics
- Configurable detection and alert rules

---

## Author

**Mumtaz Fatima**  
CSE (AI & ML) | AI & Cybersecurity

[GitHub](https://github.com/MumtazFatima-08) · [LinkedIn](https://www.linkedin.com/in/mumtaz-fatima-112366325/)

---

> **NetSentinel AI — See your network. Understand every threat.**
