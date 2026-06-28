import json
import os
import platform
import socket
import sqlite3
import time
import uuid
from datetime import datetime
from pathlib import Path

import psutil
import scapy.all as scapy
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / 'database' / 'netsentinel.db'
DB_PATH.parent.mkdir(parents=True, exist_ok=True)


def init_db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute('''
        CREATE TABLE IF NOT EXISTS events (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            severity TEXT NOT NULL,
            description TEXT NOT NULL,
            device TEXT NOT NULL,
            recommendation TEXT NOT NULL,
            insight TEXT NOT NULL,
            timestamp TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()


init_db()


def get_local_ip():
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
            sock.connect(('8.8.8.8', 80))
            return sock.getsockname()[0]
    except Exception:
        return '127.0.0.1'


def discover_devices():
    devices = []
    try:
        for iface, snics in psutil.net_if_addrs().items():
            for snic in snics:
                if snic.family == socket.AF_INET:
                    network = '.'.join(snic.address.split('.')[:3]) + '.0'
                    local_ip = snic.address
                    break
            else:
                continue
            break
    except Exception:
        network = '192.168.1.0'
        local_ip = '192.168.1.1'

    for ip in [f'{network[:-1]}{i}' for i in range(1, 6)]:
        try:
            socket.create_connection((ip, 80), timeout=0.2)
            hostname = socket.gethostbyaddr(ip)[0]
        except Exception:
            hostname = 'unknown-host'
        devices.append({
            'hostname': hostname,
            'ip': ip,
            'mac': '00:00:00:00:00:00',
            'vendor': 'Unknown',
            'status': 'Online' if ip != local_ip else 'Gateway',
            'lastSeen': 'Just now',
            'risk': 'Medium' if ip != local_ip else 'Low'
        })
    return devices


def detect_threats(devices):
    alerts = []
    if devices:
        alerts.append({
            'severity': 'High',
            'title': 'Possible Port Scan',
            'description': 'A host initiated a rapid sequence of connections across multiple ports.',
            'device': devices[0]['ip'],
            'recommendation': 'Review firewall logs and confirm the source device.',
            'insight': 'One device attempted reconnaissance across several ports in a short window.',
            'timestamp': datetime.utcnow().strftime('%H:%M:%S')
        })
        alerts.append({
            'severity': 'Medium',
            'title': 'Unusual Bandwidth Spike',
            'description': 'Outbound throughput exceeded the baseline threshold.',
            'device': devices[0]['ip'],
            'recommendation': 'Inspect the application generating the traffic.',
            'insight': 'A backup or large transfer appears to be running unexpectedly.',
            'timestamp': datetime.utcnow().strftime('%H:%M:%S')
        })
    return alerts


def collect_telemetry():
    cpu_percent = psutil.cpu_percent(interval=None)
    mem = psutil.virtual_memory()
    disk = psutil.disk_usage('/')
    net_io = psutil.net_io_counters()
    connections = len(psutil.net_connections())
    interfaces = psutil.net_if_stats()
    iface = next(iter(interfaces), 'eth0')
    devices = discover_devices()
    alerts = detect_threats(devices)
    history = []
    for i in range(7):
        history.append({
            'time': f'{i + 1}m',
            'score': max(80, min(98, 90 + (i % 3) - 1))
        })
    return {
        'healthScore': max(80, min(99, int(100 - cpu_percent * 0.3 - mem.percent * 0.2 - disk.percent * 0.1))),
        'liveMetrics': {
            'cpu': round(cpu_percent, 1),
            'ram': round(mem.percent, 1),
            'disk': round((disk.used / disk.total) * 100, 1),
            'uploadSpeed': round(net_io.bytes_sent / 1024 / 1024, 2),
            'downloadSpeed': round(net_io.bytes_recv / 1024 / 1024, 2),
            'packetsSent': int(net_io.packets_sent),
            'packetsReceived': int(net_io.packets_recv),
            'connections': connections,
            'interface': iface,
            'bandwidth': round(max(net_io.bytes_sent, net_io.bytes_recv) / 1024 / 1024, 2)
        },
        'devices': devices,
        'alerts': alerts,
        'history': history,
        'trafficTimeline': [
            {'time': '09:00', 'upload': 10, 'download': 22},
            {'time': '10:00', 'upload': 13, 'download': 26},
            {'time': '11:00', 'upload': 15, 'download': 30},
            {'time': '12:00', 'upload': 12, 'download': 35},
            {'time': '13:00', 'upload': 20, 'download': 42},
            {'time': '14:00', 'upload': 18, 'download': 39},
            {'time': '15:00', 'upload': 24, 'download': 44}
        ],
        'protocols': [
            {'name': 'TCP', 'value': 48},
            {'name': 'UDP', 'value': 27},
            {'name': 'DNS', 'value': 15},
            {'name': 'TLS', 'value': 10}
        ],
        'topTalkers': [
            {'device': 'laptop-01', 'ip': '192.168.1.12', 'bytes': 180, 'risk': 'Medium'},
            {'device': 'router.local', 'ip': '192.168.1.1', 'bytes': 140, 'risk': 'Low'},
            {'device': 'printer-02', 'ip': '192.168.1.24', 'bytes': 90, 'risk': 'Low'}
        ]
    }


@app.route('/api/telemetry', methods=['GET'])
def telemetry():
    return jsonify(collect_telemetry())


@app.route('/api/events', methods=['GET'])
def list_events():
    conn = sqlite3.connect(DB_PATH)
    rows = conn.execute('SELECT * FROM events ORDER BY timestamp DESC').fetchall()
    conn.close()
    return jsonify([{
        'id': row[0],
        'title': row[1],
        'severity': row[2],
        'description': row[3],
        'device': row[4],
        'recommendation': row[5],
        'insight': row[6],
        'timestamp': row[7]
    } for row in rows])


@app.route('/api/events', methods=['POST'])
def create_event():
    payload = request.get_json(silent=True) or {}
    event = {
        'id': str(uuid.uuid4()),
        'title': payload.get('title', 'System Event'),
        'severity': payload.get('severity', 'Low'),
        'description': payload.get('description', 'No description provided.'),
        'device': payload.get('device', 'Unknown'),
        'recommendation': payload.get('recommendation', 'Review monitoring data.'),
        'insight': payload.get('insight', 'No insight available.'),
        'timestamp': datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
    }
    conn = sqlite3.connect(DB_PATH)
    conn.execute('INSERT INTO events VALUES (?, ?, ?, ?, ?, ?, ?, ?)', (
        event['id'], event['title'], event['severity'], event['description'], event['device'], event['recommendation'], event['insight'], event['timestamp']
    ))
    conn.commit()
    conn.close()
    return jsonify(event), 201


@app.route('/api/events/<event_id>', methods=['DELETE'])
def delete_event(event_id):
    conn = sqlite3.connect(DB_PATH)
    conn.execute('DELETE FROM events WHERE id = ?', (event_id,))
    conn.commit()
    conn.close()
    return jsonify({'deleted': True})


iimport os

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
