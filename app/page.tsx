'use client'

import {
  Activity,
  Bell,
  ChevronLeft,
  ChevronRight,
  CircleGauge,
  Cpu,
  Flame,
  Gauge,
  Globe2,
  Home,
  Laptop,
  LockKeyhole,
  Menu,
  Network,
  Settings,
  Shield,
  ShieldAlert,
  Wifi,
} from 'lucide-react'
import { useState } from 'react'

const traffic = [42, 34, 28, 36, 30, 24, 18, 22, 27, 42, 31, 39, 35, 46, 54, 45, 41, 50, 62, 70, 66, 74, 69, 82, 76, 80, 78, 92, 84, 89, 96, 101, 94, 109, 113, 106, 118, 121, 111, 105, 116, 124, 132, 128, 140, 152, 145, 160]
const suspicious = [8, 6, 5, 8, 4, 7, 5, 6, 7, 12, 9, 11, 8, 15, 16, 13, 12, 18, 15, 24, 20, 29, 25, 34, 28, 31, 26, 42, 37, 39, 45, 36, 42, 48, 51, 44, 49, 56, 42, 38, 51, 45, 58, 62, 54, 67, 59, 72]
const activity = [
  [34, 10, 7, 3], [27, 8, 4, 2], [22, 7, 5, 2], [28, 7, 4, 2], [20, 8, 3, 2], [24, 6, 4, 2], [18, 5, 4, 2], [22, 7, 5, 3], [26, 6, 4, 3], [35, 9, 5, 3], [29, 8, 5, 2], [38, 10, 6, 4], [42, 12, 7, 3], [39, 11, 8, 4], [45, 13, 9, 4], [51, 14, 9, 5], [46, 12, 7, 4], [56, 16, 10, 5], [48, 14, 8, 5], [62, 17, 11, 6], [58, 15, 10, 5], [67, 19, 12, 6], [60, 16, 11, 6], [74, 20, 13, 7], [69, 18, 12, 6], [72, 22, 14, 8], [78, 21, 15, 7], [82, 24, 16, 8], [76, 20, 15, 7], [91, 26, 17, 9], [85, 23, 16, 8], [98, 29, 18, 9], [94, 27, 17, 8], [103, 31, 19, 10], [98, 28, 18, 9], [112, 33, 20, 11], [108, 31, 19, 10], [121, 35, 22, 11], [116, 34, 21, 10], [129, 37, 24, 12], [122, 35, 22, 11], [140, 40, 25, 13], [132, 38, 24, 12], [148, 43, 27, 14], [143, 39, 25, 13], [156, 45, 29, 15], [148, 42, 27, 14], [162, 48, 31, 16],
]

const navItems = [
  { label: 'Dashboard', icon: Home },
  { label: 'Network Traffic', icon: Network },
  { label: 'Intrusion Alerts', icon: ShieldAlert },
  { label: 'Blocked IPs', icon: LockKeyhole },
  { label: 'Detection & Prevention', icon: Shield },
  { label: 'Settings', icon: Settings },
]

function Status({ color, children }: { color: string; children: React.ReactNode }) {
  return <div className="status-line"><span className="status-dot" style={{ backgroundColor: color }} />{children}</div>
}

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="brand"><Shield className="brand-icon" /><span>NIDPS</span></div>
      <div className="system-card">
        <div className="system-title">Network Security</div>
        <Status color="#39ad35">Detection: Active</Status>
        <Status color="#39ad35">Prevention: Active</Status>
        <Status color="#39ad35">Network: Connected</Status>
        <Status color="#e6a52f"><Cpu /> CPU: 12%</Status>
        <Status color="#ef4a40"><Flame /> Temperature: 48°C</Status>
      </div>
      <nav className="nav-list" aria-label="Main navigation">
        {navItems.map(({ label, icon: Icon }, index) => <a className={`nav-item ${index === 0 ? 'active' : ''}`} href="#" key={label}><Icon /><span>{label}</span></a>)}
      </nav>
      <button className="collapse-button" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar"><ChevronLeft /></button>
    </aside>
  )
}

function Header() {
  return <header className="topbar"><div className="topbar-left"><button className="mobile-menu" aria-label="Open menu"><Menu /></button><span className="header-mark"><Shield /></span><span className="header-name">NIDPS Administration</span></div><div className="hostname">hostname: <strong>nidps-sensor</strong><button aria-label="System menu"><Menu /></button></div></header>
}

function StatCard({ title, value, detail, color, icon: Icon }: { title: string; value: string; detail: string; color: string; icon: typeof Activity }) {
  return <section className="stat-card" style={{ backgroundColor: color }}><div className="stat-copy"><h2>{title}</h2><strong>{value}</strong></div><Icon className="stat-icon" /><div className="stat-footer">{detail}<ChevronRight /></div></section>
}

function GridChart({ title, type }: { title: string; type: 'traffic' | 'activity' }) {
  const values = type === 'traffic' ? traffic : activity
  const labels = ['14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00']
  const max = type === 'traffic' ? 190 : 250
  const barWidth = 100 / values.length
  return <section className="panel chart-panel"><div className="panel-heading"><h2>{title}</h2><div className="legend">{type === 'traffic' ? <><span><i className="legend-gray" /> Normal</span><span><i className="legend-green" /> Suspicious</span></> : <><span><i className="legend-red" /> DoS/DDoS</span><span><i className="legend-blue" /> Port Scan</span><span><i className="legend-orange" /> Brute Force</span><span><i className="legend-purple" /> Other</span></>}</div></div><div className="chart-wrap"><div className="y-axis">{[max, Math.round(max * .75), Math.round(max * .5), Math.round(max * .25), 0].map((n) => <span key={n}>{n.toLocaleString()}</span>)}</div><div className="plot"><div className="grid-lines">{[0, 25, 50, 75, 100].map((n) => <i key={n} style={{ bottom: `${n}%` }} />)}</div><div className="bars">{values.map((value, i) => { const stacks = type === 'traffic' ? [value, suspicious[i]] : activity[i]; return <div className="bar-group" key={i}>{stacks.map((stack, j) => <span key={j} className={`bar-segment ${type === 'traffic' ? (j === 0 ? 'normal' : 'suspicious') : ['attack-red', 'attack-blue', 'attack-orange', 'attack-purple'][j]}`} style={{ height: `${(stack / max) * 100}%` }} />)}</div> })}</div><div className="x-axis">{labels.map((label, i) => <span key={label} style={{ left: `${(i / (labels.length - 1)) * 100}%` }}>{label}</span>)}</div></div></div></section>
}

function Donut({ title, segments, colors, labels }: { title: string; segments: number[]; colors: string[]; labels: string[] }) {
  const total = segments.reduce((a, b) => a + b, 0)
  let current = 0
  const conic = segments.map((value, i) => { const start = current; current += (value / total) * 360; return `${colors[i]} ${start}deg ${current}deg` }).join(', ')
  return <section className="panel donut-panel"><div className="panel-heading"><h2>{title}</h2></div><div className="donut-content"><div className="donut" style={{ background: `conic-gradient(${conic})` }}><div /></div><div className="donut-legend">{labels.map((label, i) => <span key={label}><i style={{ background: colors[i] }} />{label}<b>{segments[i]}%</b></span>)}</div></div></section>
}

export default function Page() {
  return <div className="nidps-shell"><Sidebar /><div className="main-area"><Header /><main className="dashboard"><div className="stats-grid"><StatCard title="Packets Analyzed" value="155,322" detail="26 active sensors" color="#087b9d" icon={Globe2} /><StatCard title="Intrusions Detected" value="1,245" detail="Review alerts" color="#a83229" icon={ShieldAlert} /><StatCard title="Threats Blocked" value="66.6%" detail="View detections" color="#b66b17" icon={CircleGauge} /><StatCard title="Blocked IPs" value="42" detail="Manage blocked IPs" color="#006034" icon={LockKeyhole} /></div><GridChart title="Network Traffic Over Last 24 Hours" type="traffic" /><GridChart title="Intrusion Activity Over Last 24 Hours" type="activity" /><div className="donut-grid"><Donut title="Traffic Protocol Distribution" segments={[64, 22, 8, 6]} colors={['#ff6058', '#0ba9d5', '#1681bb', '#b6c0d0']} labels={['TCP', 'UDP', 'ICMP', 'Other']} /><Donut title="Detected Threat Types" segments={[48, 27, 15, 10]} colors={['#ff6058', '#0ba9d5', '#ff9f2f', '#8b43a6']} labels={['DoS/DDoS', 'Port Scan', 'Brute Force', 'Other']} /></div></main></div></div>
}
