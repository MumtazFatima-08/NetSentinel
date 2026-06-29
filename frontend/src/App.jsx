import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Routes, Route, NavLink } from 'react-router-dom';
import {
  Activity,
  AlertTriangle,
  Cpu,
  HardDrive,
  Moon,
  Sun,
  LayoutDashboard,
  Network,
  Radar,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  Wifi,
  Search,
  Bell,
  Settings,
  Monitor,
  Download,
  Upload,
  Zap,
  ChevronRight,
  FileText,
  ServerCrash,
  ScanLine,
  ArrowUpRight
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { jsPDF } from 'jspdf';
import { useTheme } from './theme';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/devices', label: 'Devices', icon: Smartphone },
  { to: '/traffic', label: 'Traffic', icon: Network },
  { to: '/threats', label: 'Threats', icon: AlertTriangle },
  { to: '/analytics', label: 'Analytics', icon: TrendingUp },
  { to: '/reports', label: 'Reports', icon: FileText },
  { to: '/settings', label: 'Settings', icon: Settings }
];

const severityStyles = {
  Critical: 'text-danger border-danger/30 bg-danger/10',
  High: 'text-warning border-warning/30 bg-warning/10',
  Medium: 'text-accent border-accent/30 bg-accent/10',
  Low: 'text-success border-success/30 bg-success/10'
};

function useChartTheme() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return useMemo(() => ({
    grid: isDark ? '#2A3442' : '#E2E8F0',
    axis: isDark ? '#94A3B8' : '#64748B',
    text: isDark ? '#F8FAFC' : '#0F172A',
    accent: isDark ? '#00D4A6' : '#0F766E',
    secondary: isDark ? '#7C5CFF' : '#7C3AED',
    traffic: isDark ? '#3B82F6' : '#2563EB',
    tooltipBg: isDark ? '#121821' : '#FFFFFF',
    tooltipBorder: isDark ? '#2A3442' : '#E2E8F0'
  }), [isDark]);
}

function StatCard({ icon: Icon, label, value, detail, accent = 'text-accent' }) {
  return (
    <motion.div whileHover={{ y: -2, scale: 1.01 }} className="rounded-2xl border border-slate-700/80 bg-slate-800 p-5 shadow-soft transition-colors duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-50">{value}</p>
        </div>
        <div className={`rounded-xl border border-slate-700/80 bg-slate-900 p-3 ${accent}`}>
          <Icon size={20} />
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-400">{detail}</p>
    </motion.div>
  );
}

function SectionCard({ title, subtitle, children, action }) {
  return (
    <div className="rounded-2xl border border-slate-700/80 bg-slate-800 p-5 shadow-soft transition-colors duration-300">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
          <p className="text-sm text-slate-400">{subtitle}</p>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function DashboardPage({ data }) {
  const chartTheme = useChartTheme();
  const healthTrend = data?.history?.slice(-8) || [];
  const trafficTrend = data?.trafficTimeline || [];
  const protocolData = data?.protocols || [];
  const alertDistribution = data?.alerts?.reduce((acc, alert) => {
    acc[alert.severity] = (acc[alert.severity] || 0) + 1;
    return acc;
  }, {}) || {};
  const alertChart = Object.entries(alertDistribution).map(([name, value]) => ({ name, value }));
  const topTalkers = data?.topTalkers || [];

  const exportReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('NetSentinel AI Report', 14, 20);
    doc.setFontSize(11);
    doc.text(`Health Score: ${data?.healthScore || 0}`, 14, 35);
    doc.text(`Devices: ${data?.devices?.length || 0}`, 14, 45);
    doc.text(`Threats: ${data?.alerts?.length || 0}`, 14, 55);
    doc.text(`Upload: ${data?.liveMetrics?.uploadSpeed || 0} Mbps`, 14, 65);
    doc.text(`Download: ${data?.liveMetrics?.downloadSpeed || 0} Mbps`, 14, 75);
    doc.save('netsentinel-report.pdf');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Live SOC Command Center</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-50">See your network. Understand every threat.</h1>
        </div>
        <button onClick={exportReport} className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
          <FileText size={16} />
          Export PDF
        </button>
      </div>

      <div className="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
        <StatCard icon={ShieldCheck} label="Network Health Score" value={`${data?.healthScore || 0}/100`} detail="Baseline across endpoint, traffic, and threat posture." accent="text-success" />
        <StatCard icon={Cpu} label="CPU Usage" value={`${data?.liveMetrics?.cpu || 0}%`} detail="Average host utilization across monitored systems." accent="text-warning" />
        <StatCard icon={HardDrive} label="Disk Usage" value={`${data?.liveMetrics?.disk || 0}%`} detail="Storage pressure and retention health." />
        <StatCard icon={Radar} label="Active Connections" value={data?.liveMetrics?.connections || 0} detail="Live sockets observed in the current session." accent="text-danger" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <SectionCard title="Network Health Timeline" subtitle="A rolling view of live performance and reliability" action={<span className="rounded-full border border-success/20 bg-success/10 px-3 py-1 text-xs text-success">Stable</span>}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={healthTrend}>
                <defs>
                  <linearGradient id="health" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartTheme.accent} stopOpacity={0.28} />
                    <stop offset="95%" stopColor={chartTheme.secondary} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={chartTheme.grid} strokeDasharray="3 3" />
                <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fill: chartTheme.axis, fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: chartTheme.axis, fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: chartTheme.tooltipBg, borderColor: chartTheme.tooltipBorder, color: chartTheme.text }} />
                <Area type="monotone" dataKey="score" stroke={chartTheme.accent} fill="url(#health)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Threat Queue" subtitle="Priority alerts requiring action" action={<span className="text-sm text-slate-400">{data?.alerts?.length || 0} active</span>}>
          <div className="space-y-3">
            {(data?.alerts || []).slice(0, 4).map((alert, index) => (
              <div key={index} className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-slate-100">{alert.title}</p>
                  <span className={`rounded-full border px-2 py-1 text-[11px] uppercase tracking-[0.2em] ${severityStyles[alert.severity] || severityStyles.Medium}`}>
                    {alert.severity}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-400">{alert.description}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span>{alert.device}</span>
                  <span>{alert.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard title="Traffic Pulse" subtitle="Live bandwidth and packet movement" action={<span className="text-sm text-slate-400">Updated continuously</span>}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trafficTrend}>
                <CartesianGrid stroke={chartTheme.grid} strokeDasharray="3 3" />
                <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fill: chartTheme.axis, fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: chartTheme.axis, fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: chartTheme.tooltipBg, borderColor: chartTheme.tooltipBorder, color: chartTheme.text }} />
                <Line type="monotone" dataKey="upload" stroke={chartTheme.traffic} strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="download" stroke={chartTheme.accent} strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="AI Security Insights" subtitle="Readable explanations for each finding">
          <div className="space-y-3">
            {(data?.alerts || []).slice(0, 3).map((alert, index) => (
              <div key={index} className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-100">
                  <Sparkles size={15} className="text-accent" />
                  {alert.title}
                </div>
                <p className="mt-2 text-sm text-slate-400">{alert.insight}</p>
                <p className="mt-2 text-xs text-slate-500">Recommendation: {alert.recommendation}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr_1fr]">
        <SectionCard title="Protocol Distribution" subtitle="Observed traffic mix">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={protocolData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={80} paddingAngle={3}>
                  {protocolData.map((entry, index) => <Cell key={index} fill={[chartTheme.accent, chartTheme.secondary, chartTheme.text, chartTheme.axis][index % 4]} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: chartTheme.tooltipBg, borderColor: chartTheme.tooltipBorder, color: chartTheme.text }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Alert Distribution" subtitle="Current severity balance">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={alertChart}>
                <CartesianGrid stroke={chartTheme.grid} strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: chartTheme.axis, fontSize: 12 }} />
                <YAxis tick={{ fill: chartTheme.axis, fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: chartTheme.tooltipBg, borderColor: chartTheme.tooltipBorder, color: chartTheme.text }} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} fill={chartTheme.accent} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Top Talkers" subtitle="Most active endpoints">
          <div className="space-y-3">
            {(topTalkers || []).map((talker, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/80 px-3 py-2">
                <div>
                  <p className="font-medium text-slate-200">{talker.device}</p>
                  <p className="text-xs text-slate-500">{talker.ip}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-slate-100">{talker.bytes} MB</p>
                  <p className="text-xs text-slate-500">{talker.risk}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function DevicesPage({ data }) {
  const chartTheme = useChartTheme();
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Device Discovery</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-50">Connected endpoints and asset posture</h1>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-400">
          <Search size={16} />
          Search devices
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Smartphone} label="Connected Devices" value={data?.devices?.length || 0} detail="Discovered hosts on the current network" accent="text-success" />
        <StatCard icon={Wifi} label="Network Interface" value={data?.liveMetrics?.interface || 'Unknown'} detail="Primary interface in use" />
        <StatCard icon={Monitor} label="Packets Sent" value={data?.liveMetrics?.packetsSent || 0} detail="Outbound packets in monitoring window" />
        <StatCard icon={Monitor} label="Packets Received" value={data?.liveMetrics?.packetsReceived || 0} detail="Inbound packets in monitoring window" />
      </div>

      <SectionCard title="Device Inventory" subtitle="Live discovery with risk and activity status">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-800 text-sm">
            <thead>
              <tr className="text-left text-slate-400">
                <th className="px-3 py-3">Hostname</th>
                <th className="px-3 py-3">IP</th>
                <th className="px-3 py-3">MAC</th>
                <th className="px-3 py-3">Vendor</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Risk</th>
                <th className="px-3 py-3">Last Seen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {(data?.devices || []).map((device, index) => (
                <tr key={index} className="text-slate-300">
                  <td className="px-3 py-3">{device.hostname}</td>
                  <td className="px-3 py-3">{device.ip}</td>
                  <td className="px-3 py-3">{device.mac}</td>
                  <td className="px-3 py-3">{device.vendor}</td>
                  <td className="px-3 py-3">{device.status}</td>
                  <td className="px-3 py-3">
                    <span className={`rounded-full border px-2 py-1 text-[11px] uppercase ${severityStyles[device.risk] || severityStyles.Medium}`}>
                      {device.risk}
                    </span>
                  </td>
                  <td className="px-3 py-3">{device.lastSeen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

function TrafficPage({ data }) {
  const chartTheme = useChartTheme();
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-accent">Traffic Monitor</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-50">Live bandwidth and application movement</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Upload} label="Live Upload" value={`${data?.liveMetrics?.uploadSpeed || 0} Mbps`} detail="Current outbound throughput" accent="text-accent" />
        <StatCard icon={Download} label="Live Download" value={`${data?.liveMetrics?.downloadSpeed || 0} Mbps`} detail="Current inbound throughput" accent="text-success" />
        <StatCard icon={Zap} label="Network Speed" value={`${data?.liveMetrics?.bandwidth || 0} Mbps`} detail="Peak observed bandwidth" />
        <StatCard icon={ArrowUpRight} label="Packets" value={data?.liveMetrics?.packetsReceived || 0} detail="Current packet volume" accent="text-warning" />
      </div>

      <SectionCard title="Historical Usage" subtitle="Bandwidth over time">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data?.trafficTimeline || []}>
              <CartesianGrid stroke={chartTheme.grid} strokeDasharray="3 3" />
              <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fill: chartTheme.axis, fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: chartTheme.axis, fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: chartTheme.tooltipBg, borderColor: chartTheme.tooltipBorder, color: chartTheme.text }} />
              <Line type="monotone" dataKey="upload" stroke={chartTheme.traffic} strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="download" stroke={chartTheme.accent} strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </div>
  );
}

function ThreatsPage({ data }) {
  const chartTheme = useChartTheme();
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-accent">Threat Detection</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-50">Behavioral analysis and response guidance</h1>
      </div>

      <SectionCard title="Alert Library" subtitle="Every finding includes context and an action plan">
        <div className="space-y-4">
          {(data?.alerts || []).map((alert, index) => (
            <div key={index} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
              <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={16} className="text-danger" />
                    <h3 className="font-semibold text-slate-100">{alert.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{alert.description}</p>
                </div>
                <span className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.2em] ${severityStyles[alert.severity] || severityStyles.Medium}`}>
                  {alert.severity}
                </span>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4 text-sm">
                <div>
                  <p className="text-slate-500">Affected Device</p>
                  <p className="text-slate-300">{alert.device}</p>
                </div>
                <div>
                  <p className="text-slate-500">Timestamp</p>
                  <p className="text-slate-300">{alert.timestamp}</p>
                </div>
                <div>
                  <p className="text-slate-500">Recommendation</p>
                  <p className="text-slate-300">{alert.recommendation}</p>
                </div>
                <div>
                  <p className="text-slate-500">AI Explanation</p>
                  <p className="text-slate-300">{alert.insight}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function AnalyticsPage({ data }) {
  const chartTheme = useChartTheme();
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-accent">Analytics</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-50">Operational insight across devices, traffic, and threats</h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Bandwidth Over Time" subtitle="Long-range trend view">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data?.trafficTimeline || []}>
                <CartesianGrid stroke={chartTheme.grid} strokeDasharray="3 3" />
                <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fill: chartTheme.axis, fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: chartTheme.axis, fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: chartTheme.tooltipBg, borderColor: chartTheme.tooltipBorder, color: chartTheme.text }} />
                <Line type="monotone" dataKey="download" stroke={chartTheme.secondary} strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Device Activity" subtitle="Usage concentration by host">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.topTalkers || []}>
                <CartesianGrid stroke={chartTheme.grid} strokeDasharray="3 3" />
                <XAxis dataKey="device" tick={{ fill: chartTheme.axis, fontSize: 12 }} />
                <YAxis tick={{ fill: chartTheme.axis, fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: chartTheme.tooltipBg, borderColor: chartTheme.tooltipBorder, color: chartTheme.text }} />
                <Bar dataKey="bytes" fill={chartTheme.accent} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function ReportsPage({ data }) {
  const downloadCsv = () => {
    const rows = [
      ['Metric', 'Value'],
      ['Health Score', data?.healthScore || 0],
      ['Devices', data?.devices?.length || 0],
      ['Alerts', data?.alerts?.length || 0],
      ['Upload', data?.liveMetrics?.uploadSpeed || 0],
      ['Download', data?.liveMetrics?.downloadSpeed || 0]
    ];
    const csv = rows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'netsentinel-summary.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-accent">Reports</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-50">Executive summaries and export-ready data</h1>
      </div>

      <SectionCard title="Downloadable Reports" subtitle="PDF and CSV outputs for stakeholders">
        <div className="flex flex-wrap gap-3">
          <button onClick={() => {}} className="rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-200">Generate PDF</button>
          <button onClick={downloadCsv} className="rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm text-accent">Export CSV</button>
        </div>
      </SectionCard>
    </div>
  );
}

function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const options = [
    { value: 'dark', label: 'Dark Mode', icon: Moon },
    { value: 'light', label: 'Light Mode', icon: Sun }
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-accent">Settings</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-50">Tune the monitoring experience</h1>
      </div>

      <SectionCard title="Preferences" subtitle="Customize refresh intervals and alert thresholds">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-700/80 bg-slate-900/70 p-4 transition-colors duration-300">
            <p className="text-sm text-slate-400">Appearance</p>
            <div className="mt-3 inline-flex rounded-full border border-slate-700/80 bg-slate-950/70 p-1">
              {options.map((option) => {
                const Icon = option.icon;
                const active = theme === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setTheme(option.value)}
                    className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm transition ${active ? 'bg-accent/15 text-accent' : 'text-slate-400 hover:text-slate-100'}`}
                  >
                    <Icon size={16} />
                    {option.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-sm text-slate-400">The selected look applies instantly across every page and component.</p>
          </div>
          <div className="rounded-xl border border-slate-700/80 bg-slate-900/70 p-4 transition-colors duration-300">
            <p className="text-sm text-slate-400">Refresh Interval</p>
            <p className="mt-2 text-lg text-slate-100">5 seconds</p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

function App() {
  const { theme } = useTheme();
  const [data, setData] = useState({
    healthScore: 94,
    liveMetrics: {
      cpu: 38,
      ram: 62,
      disk: 71,
      uploadSpeed: 12.3,
      downloadSpeed: 42.8,
      packetsSent: 184239,
      packetsReceived: 221145,
      connections: 27,
      interface: 'Ethernet'
    },
    devices: [
      { hostname: 'router.local', ip: '192.168.1.1', mac: '00:1A:2B:3C:4D:5E', vendor: 'Cisco', status: 'Online', lastSeen: 'Now', risk: 'Low' },
      { hostname: 'laptop-01', ip: '192.168.1.12', mac: 'A4:B2:3C:4D:5E:6F', vendor: 'Dell', status: 'Online', lastSeen: 'Just now', risk: 'Medium' },
      { hostname: 'printer-02', ip: '192.168.1.24', mac: '10:20:30:40:50:60', vendor: 'HP', status: 'Online', lastSeen: '3m ago', risk: 'Low' }
    ],
    alerts: [
      { severity: 'High', title: 'Possible Port Scan', description: 'A host initiated a rapid sequence of connections across multiple ports.', timestamp: 'Now', device: '192.168.1.12', recommendation: 'Review firewall logs and confirm the source device.', insight: 'One device attempted reconnaissance across several ports in a short window.' },
      { severity: 'Medium', title: 'Unusual Bandwidth Spike', description: 'Outbound throughput exceeded the baseline threshold.', timestamp: '2m ago', device: '192.168.1.24', recommendation: 'Inspect the application generating the traffic.', insight: 'A backup or large transfer appears to be running unexpectedly.' },
      { severity: 'Low', title: 'Unknown Device', description: 'A host joined the LAN without a known profile.', timestamp: '5m ago', device: '192.168.1.40', recommendation: 'Validate the host identity and inspect DHCP leases.', insight: 'A new endpoint appeared with no prior fingerprint in the inventory.' }
    ],
    history: [
      { time: '09:00', score: 88 },
      { time: '10:00', score: 91 },
      { time: '11:00', score: 90 },
      { time: '12:00', score: 95 },
      { time: '13:00', score: 94 },
      { time: '14:00', score: 96 },
      { time: '15:00', score: 93 },
      { time: '16:00', score: 94 }
    ],
    trafficTimeline: [
      { time: '09:00', upload: 10, download: 22 },
      { time: '10:00', upload: 13, download: 26 },
      { time: '11:00', upload: 15, download: 30 },
      { time: '12:00', upload: 12, download: 35 },
      { time: '13:00', upload: 20, download: 42 },
      { time: '14:00', upload: 18, download: 39 },
      { time: '15:00', upload: 24, download: 44 }
    ],
    protocols: [
      { name: 'TCP', value: 48 },
      { name: 'UDP', value: 27 },
      { name: 'DNS', value: 15 },
      { name: 'TLS', value: 10 }
    ],
    topTalkers: [
      { device: 'laptop-01', ip: '192.168.1.12', bytes: 180, risk: 'Medium' },
      { device: 'router.local', ip: '192.168.1.1', bytes: 140, risk: 'Low' },
      { device: 'printer-02', ip: '192.168.1.24', bytes: 90, risk: 'Low' }
    ]
  });

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const response = await fetch('https://nsnl-backend.onrender.com/api/telemetry');
        const payload = await response.json();
        if (payload) {
          setData((prev) => ({ ...prev, ...payload }));
        }
      } catch (error) {
        console.error('Telemetry fetch failed', error);
      }
    };

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 5000);
    return () => clearInterval(interval);
  }, []);

  const summary = useMemo(() => ({
    label: 'NetSentinel AI',
    description: 'Real-time network visibility and threat detection.'
  }), []);

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 transition-colors duration-300 ${theme === 'light' ? 'bg-slate-50 text-slate-900' : ''}`}>
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="w-full border-b border-slate-700/80 bg-slate-900 p-6 lg:w-72 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
              <ShieldCheck size={22} />
            </div>
            <div>
              <p className="text-lg font-semibold">NetSentinel AI</p>
              <p className="text-sm text-slate-400">SOC dashboard</p>
            </div>
          </div>

          <nav className="mt-8 space-y-2">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${isActive ? 'bg-accent/15 text-accent' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'}`}>
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-10 rounded-2xl border border-slate-700/80 bg-slate-800 p-4">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Activity size={16} className="text-success" />
              Monitoring active
            </div>
            <p className="mt-3 text-sm text-slate-400">{summary.description}</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <ServerCrash size={14} />
              Endpoint telemetry streaming
            </div>
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <header className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-700/80 bg-slate-800 p-4 shadow-soft lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full border border-slate-800 bg-slate-950 p-2 text-slate-400">
                <Search size={18} />
              </div>
              <div>
                <p className="text-sm text-slate-400">Search across events</p>
                <p className="text-sm font-medium text-slate-200">Threat, device, or traffic queries</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-full border border-slate-800 bg-slate-950 p-2 text-slate-300">
                <Bell size={18} />
              </button>
              <div className="flex items-center gap-3 rounded-full border border-slate-800 bg-slate-950 px-3 py-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent">NS</div>
                <div>
                  <p className="text-sm font-medium text-slate-100">Admin</p>
                  <p className="text-xs text-slate-500">Security Analyst</p>
                </div>
              </div>
            </div>
          </header>

          <Routes>
            <Route path="/" element={<DashboardPage data={data} />} />
            <Route path="/devices" element={<DevicesPage data={data} />} />
            <Route path="/traffic" element={<TrafficPage data={data} />} />
            <Route path="/threats" element={<ThreatsPage data={data} />} />
            <Route path="/analytics" element={<AnalyticsPage data={data} />} />
            <Route path="/reports" element={<ReportsPage data={data} />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
