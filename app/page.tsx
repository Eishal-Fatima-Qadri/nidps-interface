'use client'

import { useMemo, useState } from 'react'
import {
  Activity, AlertTriangle, ArrowUpRight, Ban, Check, ChevronDown, Cpu,
  Gauge, HardDrive, LayoutDashboard, LockKeyhole, Menu, Network, Search,
  Settings, Shield, ShieldAlert, Terminal, Wifi, X,
} from 'lucide-react'

const traffic = [42,34,28,36,30,24,18,22,27,42,31,39,35,46,54,45,41,50,62,70,66,74,69,82,76,80,78,92,84,89,96,101,94,109,113,106,118,121,111,105,116,124,132,128,140,152,145,160]
const suspicious = [8,6,5,8,4,7,5,6,7,12,9,11,8,15,16,13,12,18,15,24,20,29,25,34,28,31,26,42,37,39,45,36,42,48,51,44,49,56,42,38,51,45,58,62,54,67,59,72]
const alerts = [
  { time: '12:42:18', source: '192.168.1.87', destination: '10.0.0.14', type: 'PORT SCAN', severity: 'HIGH', action: 'BLOCKED' },
  { time: '12:39:04', source: '45.142.212.19', destination: '10.0.0.21', type: 'BRUTE FORCE', severity: 'CRITICAL', action: 'BLOCKED' },
  { time: '12:31:55', source: '192.168.1.44', destination: '10.0.0.14', type: 'ANOMALOUS FLOW', severity: 'MEDIUM', action: 'MONITORED' },
  { time: '12:26:11', source: '103.27.186.4', destination: '10.0.0.8', type: 'DOS / FLOOD', severity: 'HIGH', action: 'BLOCKED' },
  { time: '12:18:49', source: '192.168.1.112', destination: '10.0.0.14', type: 'DNS TUNNEL', severity: 'LOW', action: 'MONITORED' },
]
const nav = [
  ['Dashboard', LayoutDashboard], ['Network Traffic', Network], ['Intrusion Alerts', ShieldAlert],
  ['Blocked IPs', Ban], ['Detection & Prevention', Shield], ['Settings', Settings],
] as const

function Panel({ title, eyebrow, children, className = '' }: { title: string; eyebrow?: string; children: React.ReactNode; className?: string }) {
  return <section className={`terminal-panel ${className}`}><div className="panel-title"><span>{eyebrow ?? '//'} </span>{title}<b>+</b></div>{children}</section>
}

function MiniBarChart({ range }: { range: string }) {
  const scale = range === '1H' ? 0.42 : range === '7D' ? 1.35 : 1
  return <div className="chart-box"><div className="chart-y"><span>2.5K</span><span>1.8K</span><span>1.2K</span><span>600</span><span>0</span></div><div className="plot"><div className="chart-grid" /> <div className="bar-row">{traffic.map((value, i) => <div className="bar" key={i}><i style={{ height: `${Math.min(98, value * scale / 1.65)}%` }} /><em style={{ height: `${Math.min(38, suspicious[i] * scale / 1.9)}%` }} /></div>)}</div><div className="chart-x"><span>14:00</span><span>18:00</span><span>22:00</span><span>02:00</span><span>06:00</span><span>10:00</span><span>12:00</span></div></div></div>
}

function ActivityChart() {
  const bars = Array.from({ length: 48 }, (_, i) => 14 + ((i * 17) % 46) + (i > 34 ? 16 : 0))
  return <div className="chart-box"><div className="chart-y"><span>250</span><span>188</span><span>125</span><span>62</span><span>0</span></div><div className="plot"><div className="chart-grid" /><div className="bar-row activity-bars">{bars.map((value, i) => <div className="bar" key={i}><i style={{ height: `${value}%` }} /><em style={{ height: `${Math.max(4, value * .32)}%` }} /><strong style={{ height: `${Math.max(3, value * .15)}%` }} /></div>)}</div><div className="chart-x"><span>14:00</span><span>18:00</span><span>22:00</span><span>02:00</span><span>06:00</span><span>10:00</span><span>12:00</span></div></div></div>
}

function Donut({ title, values, labels, colors }: { title: string; values: number[]; labels: string[]; colors: string[] }) {
  let start = 0
  const gradient = values.map((value, i) => { const end = start + value * 3.6; const part = `${colors[i]} ${start}deg ${end}deg`; start = end; return part }).join(', ')
  return <Panel title={title} className="donut-panel"><div className="donut-layout"><div className="donut" style={{ background: `conic-gradient(${gradient})` }}><div><b>{values[0]}%</b><small>PRIMARY</small></div></div><div className="legend-list">{labels.map((label, i) => <div key={label}><i style={{ background: colors[i] }} /> <span>{label}</span><b>{values[i]}%</b></div>)}</div></div></Panel>
}

function Sidebar({ active, setActive }: { active: string; setActive: (value: string) => void }) {
  const [collapsed, setCollapsed] = useState(false)
  return <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}><div className="brand"><span className="brand-mark">[+]</span><div><strong>NIDPS</strong><small>NETWORK SECURITY SYSTEM</small></div></div><div className="system-status"><div className="status-heading">SYSTEM STATUS</div><p><Check /> [OK] DETECTION ACTIVE</p><p><Check /> [OK] PREVENTION ACTIVE</p><p><Wifi /> [OK] NETWORK CONNECTED</p><div className="resource"><span><Cpu /> CPU: <b>12%</b></span><span><HardDrive /> MEM: <b>26%</b></span><span>◉ TEMP: <b>48°C</b></span></div></div><nav aria-label="Primary navigation">{nav.map(([label, Icon]) => <button key={label} className={active === label ? 'active' : ''} onClick={() => setActive(label)}><Icon /><span>{label}</span></button>)}</nav><div className="sidebar-bottom"><button><Terminal /><span>ADMINISTRATOR</span></button><button><X /><span>LOGOUT</span></button></div><button className="collapse" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle navigation"><ChevronDown /></button></aside>
}

export default function Page() {
  const [active, setActive] = useState('Dashboard')
  const [range, setRange] = useState('24H')
  const [query, setQuery] = useState('')
  const filteredAlerts = useMemo(() => alerts.filter((row) => Object.values(row).join(' ').toLowerCase().includes(query.toLowerCase())), [query])
  return <div className="nidps-shell"><Sidebar active={active} setActive={setActive} /><div className="main-area"><header className="topbar"><div><button className="mobile-menu" aria-label="Open menu"><Menu /></button><span className="prompt">root@nidps</span><span className="slash">:</span><span className="path">/var/log/security</span><span className="cursor">_</span></div><div className="top-meta"><span><span className="online-dot" /> SENSOR ONLINE</span><span>HOST: <b>nidps-sensor</b></span><button aria-label="Open settings"><Settings /></button></div></header><main className="dashboard"><div className="page-heading"><div><p className="eyebrow">// NIDPS CORE / OVERVIEW</p><h1>NETWORK SECURITY MONITOR</h1></div><div className="live-badge"><Activity /> LIVE FEED <span>●</span></div></div><div className="stats-grid"><article className="metric cyan"><span>PACKETS ANALYZED</span><strong>155,322</strong><small>↗ VIEW TRAFFIC</small></article><article className="metric red"><span>INTRUSIONS DETECTED</span><strong>1,245</strong><small>↗ VIEW ALERTS</small></article><article className="metric amber"><span>THREATS BLOCKED</span><strong>66.6%</strong><small>↗ PREVENTION STATS</small></article><article className="metric green"><span>BLOCKED IPs</span><strong>42</strong><small>↗ MANAGE BLOCKLIST</small></article></div><Panel title="NETWORK TRAFFIC — LAST 24 HOURS" eyebrow="01 /" className="chart-panel"><div className="panel-tools"><div className="chart-legend"><span><i className="key normal" /> NORMAL</span><span><i className="key suspicious" /> SUSPICIOUS</span></div><div className="range-tabs">{['1H', '24H', '7D'].map((item) => <button key={item} className={range === item ? 'selected' : ''} onClick={() => setRange(item)}>{item}</button>)}</div></div><MiniBarChart range={range} /></Panel><Panel title="INTRUSION ACTIVITY — LAST 24 HOURS" eyebrow="02 /" className="chart-panel"><div className="panel-tools"><div className="chart-legend"><span><i className="key danger" /> DOS / DDOS</span><span><i className="key cyan-key" /> PORT SCAN</span><span><i className="key amber-key" /> BRUTE FORCE</span><span><i className="key purple-key" /> OTHER</span></div><span className="chart-note">MODEL: NIDPS-ML v1.4</span></div><ActivityChart /></Panel><div className="donut-grid"><Donut title="TRAFFIC PROTOCOLS" values={[64,22,8,6]} labels={['TCP', 'UDP', 'ICMP', 'OTHER']} colors={['#00d4ff','#00ff88','#ffb000','#6b7280']} /><Donut title="DETECTED THREAT TYPES" values={[48,27,15,10]} labels={['DOS / DDOS','PORT SCAN','BRUTE FORCE','OTHER']} colors={['#ff3366','#00d4ff','#ffb000','#b45cff']} /></div><Panel title="RECENT INTRUSION ALERTS" eyebrow="05 /" className="alerts-panel"><div className="table-tools"><span className="table-caption">// LATEST EVENTS / 5 OF 1,245</span><label><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="FILTER SOURCE, TYPE..." /></label><button className="outline-button">VIEW ALL ALERTS <ArrowUpRight /></button></div><div className="table-wrap"><table><thead><tr><th>TIMESTAMP</th><th>SOURCE IP</th><th>DESTINATION</th><th>ATTACK TYPE</th><th>SEVERITY</th><th>ACTION</th></tr></thead><tbody>{filteredAlerts.map((row) => <tr key={row.time}><td>{row.time}</td><td>{row.source}</td><td>{row.destination}</td><td>{row.type}</td><td><span className={`severity ${row.severity.toLowerCase()}`}>{row.severity}</span></td><td className={row.action === 'BLOCKED' ? 'action-blocked' : 'action-monitor'}>{row.action}</td></tr>)}</tbody></table></div></Panel></main></div></div>
}
