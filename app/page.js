"use client";
import { useState } from "react";

// ═══════════════════════════════════════════════════════════════════════════════
// SGR SERCLIN — Demo Interactivo V2
// Post-reunión 6 Feb 2026
// ═══════════════════════════════════════════════════════════════════════════════

const C = {
  accent: "#D35230", accentL: "#D3523015",
  dark: "#1A1A2E", mid: "#4A4A6A", light: "#F5F5FA",
  green: "#2D8B4E", greenL: "#2D8B4E15",
  blue: "#2D6DD2", blueL: "#2D6DD215",
  yellow: "#B8860B", yellowL: "#B8860B15",
  red: "#DC3545", redL: "#DC354515",
  white: "#FFFFFF", border: "#E5E5EA",
};

// ═══════════ DATA ═══════════

const STORES = { oaxaca: { id: "oaxaca", name: "Liverpool Oaxaca", emp: 15 }, salina: { id: "salina", name: "Liverpool Salina Cruz", emp: 21 } };

const EMPLOYEES = [
  { id: 1, name: "María García López", role: "Operario", store: "oaxaca", shift: "Mañana", docsOk: true, docsMiss: 0 },
  { id: 2, name: "Juan Pérez Martínez", role: "Pulidor", store: "oaxaca", shift: "Mañana", docsOk: false, docsMiss: 2 },
  { id: 3, name: "Ana Rodríguez Sánchez", role: "Operario", store: "oaxaca", shift: "Tarde", docsOk: true, docsMiss: 0 },
  { id: 4, name: "Carlos Hernández Ruiz", role: "Operario", store: "oaxaca", shift: "Mañana", docsOk: false, docsMiss: 1 },
  { id: 5, name: "Rosa Jiménez Flores", role: "Jardinero", store: "oaxaca", shift: "Mañana", docsOk: true, docsMiss: 0 },
  { id: 6, name: "Pedro Gómez Castro", role: "Operario", store: "salina", shift: "Mañana", docsOk: true, docsMiss: 0 },
  { id: 7, name: "Laura Díaz Moreno", role: "Operario", store: "salina", shift: "Mañana", docsOk: false, docsMiss: 3 },
  { id: 8, name: "Miguel Torres Vega", role: "Pulidor", store: "salina", shift: "Tarde", docsOk: true, docsMiss: 0 },
  { id: 9, name: "Elena Ruiz Vargas", role: "Operario", store: "oaxaca", shift: "Mañana", docsOk: true, docsMiss: 0 },
  { id: 10, name: "Fernando Mendoza Ríos", role: "Operario", store: "salina", shift: "Mañana", docsOk: true, docsMiss: 0 },
];

const ZONES_OAX = [
  { id: "z1", name: "Isla Central Norte", cps: ["Pisos pulidos", "Vitrinas limpias", "Basura retirada", "Pasillos despejados"] },
  { id: "z2", name: "Isla Central Sur", cps: ["Pisos pulidos", "Vitrinas limpias", "Basura retirada", "Exhibidores ordenados"] },
  { id: "z3", name: "Corredor Principal", cps: ["Pisos limpios", "Paredes sin manchas", "Señalización visible", "Iluminación funcionando"] },
  { id: "z4", name: "Periferia Electrónicos", cps: ["Pisos pulidos", "Vitrinas sin huellas", "Cables ordenados", "Basura retirada"] },
  { id: "z5", name: "Sanitarios PB", cps: ["Pisos secos", "Espejos limpios", "Dispensadores llenos", "Sin malos olores", "Basura vacía"] },
  { id: "z6", name: "Escaleras y Elevadores", cps: ["Pasamanos limpios", "Escalones sin basura", "Puertas elevador limpias"] },
];

const ATT_TODAY = { oaxaca: { present: 13, absent: 1, late: 1, total: 15 }, salina: { present: 19, absent: 1, late: 1, total: 21 } };

const ATT_DETAIL = [
  { id: 1, name: "María García López", status: "present", time: "6:55 AM", zone: "Isla Central Norte", clock: "6:53 AM" },
  { id: 2, name: "Juan Pérez Martínez", status: "present", time: "7:00 AM", zone: "Isla Central Sur", clock: "6:58 AM" },
  { id: 3, name: "Ana Rodríguez Sánchez", status: "late", time: "7:22 AM", zone: "Corredor Principal", clock: "7:20 AM" },
  { id: 4, name: "Carlos Hernández Ruiz", status: "absent", time: "—", zone: "—", clock: "—" },
  { id: 5, name: "Rosa Jiménez Flores", status: "present", time: "6:50 AM", zone: "Periferia Electrónicos", clock: "6:48 AM" },
  { id: 9, name: "Elena Ruiz Vargas", status: "present", time: "6:58 AM", zone: "Sanitarios PB", clock: "6:55 AM" },
];

const ZONE_ASSIGN = [
  { zone: "Isla Central Norte", planned: ["María García L."], actual: ["María García L."], cov: "100%" },
  { zone: "Isla Central Sur", planned: ["Juan Pérez M."], actual: ["Juan Pérez M."], cov: "100%" },
  { zone: "Corredor Principal", planned: ["Ana Rodríguez S.", "Carlos Hernández R."], actual: ["Ana Rodríguez S."], cov: "50%", note: "Carlos faltó — Ana cubre parcialmente" },
  { zone: "Periferia Electrónicos", planned: ["Rosa Jiménez F."], actual: ["Rosa Jiménez F."], cov: "100%" },
  { zone: "Sanitarios PB", planned: ["Elena Ruiz V."], actual: ["Elena Ruiz V."], cov: "100%" },
  { zone: "Escaleras y Elevadores", planned: ["Carlos Hernández R."], actual: ["—"], cov: "0%", note: "Sin cobertura por falta de Carlos" },
];

const EVALS = [
  { id: 1, store: "Oaxaca", date: "Hoy, 10:32", sup: "Luis Mendoza", zones: 6, issues: 1, status: "complete" },
  { id: 2, store: "Salina Cruz", date: "Hoy, 09:45", sup: "Fabiola Reyes", zones: 5, issues: 0, status: "complete" },
  { id: 3, store: "Oaxaca", date: "Ayer, 15:20", sup: "Luis Mendoza", zones: 6, issues: 2, status: "complete" },
  { id: 4, store: "Salina Cruz", date: "Ayer, 10:15", sup: "Fabiola Reyes", zones: 5, issues: 1, status: "complete" },
  { id: 5, store: "Oaxaca", date: "Lun, 11:00", sup: "Luis Mendoza", zones: 6, issues: 0, status: "complete" },
];

const EVAL_DETAIL = [
  { zone: "Isla Central Norte", ok: true, issues: 0, photo: true },
  { zone: "Isla Central Sur", ok: true, issues: 0, photo: false },
  { zone: "Corredor Principal", ok: true, issues: 0, photo: false },
  { zone: "Periferia Electrónicos", ok: true, issues: 0, photo: true },
  { zone: "Sanitarios PB", ok: false, issues: 1, photo: true, note: "Dispensador de jabón vacío, se reportó a mantenimiento" },
  { zone: "Escaleras y Elevadores", ok: true, issues: 0, photo: false },
];

const SUP_CAL = [{ day: 3, oax: true, sal: true }, { day: 4, oax: true, sal: true }, { day: 5, oax: true, sal: false }, { day: 6, oax: true, sal: true }];

const ALERTS = [
  { id: 1, msg: "Juan Pérez: faltan 2 documentos (contrato, IMSS)", sev: "high" },
  { id: 2, msg: "Laura Díaz: faltan 3 documentos", sev: "high" },
  { id: 3, msg: "Carlos Hernández: 3 faltas en el último mes", sev: "medium" },
  { id: 4, msg: "Sanitarios PB: problema recurrente (3 días)", sev: "medium" },
];

const WEEKLY = {
  period: "27 Ene — 2 Feb 2025",
  att: { oax: 92, sal: 88, abs: 7, late: 4 },
  sup: { total: 10, done: 9, miss: 1, zIssues: 3 },
  incidents: ["Carlos Hernández: 2 faltas injustificadas", "Sanitarios PB Oaxaca: problema recurrente 3 días", "Laura Díaz: documentos pendientes sin avance"],
  cov: { full: "78%", partial: "15%", none: "7%" },
};

const FIN = {
  period: "Enero 2025",
  oax: { days: 285, rate: 350, expected: 99750, paid: 96500, diff: -3250 },
  sal: { days: 390, rate: 320, expected: 124800, paid: 124800, diff: 0 },
};

// ═══════════ ICONS ═══════════

const I = {
  Logo: () => <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill={C.accent}/><path d="M8 16C8 11.58 11.58 8 16 8V8C20.42 8 24 11.58 24 16V24H16C11.58 24 8 20.42 8 16V16Z" fill="white" fillOpacity="0.9"/><circle cx="16" cy="16" r="4" fill={C.accent}/></svg>,
  Home: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Users: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  Clip: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>,
  Check: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  Alert: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  ChevR: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  ChevL: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  Cam: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  Clock: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Cal: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  File: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  Send: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Phone: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
  Monitor: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  Dollar: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  Down: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  MapPin: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Lock: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
};

// ═══════════ SHARED UI ═══════════

const Badge = ({ children, color = "gray" }) => {
  const m = { green: { bg: C.greenL, t: C.green }, red: { bg: C.redL, t: C.red }, yellow: { bg: C.yellowL, t: C.yellow }, blue: { bg: C.blueL, t: C.blue }, gray: { bg: "#E5E5EA", t: C.mid } };
  const s = m[color] || m.gray;
  return <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600, backgroundColor: s.bg, color: s.t }}>{children}</span>;
};

const Btn = ({ children, variant = "primary", size = "md", full, onClick, disabled }) => {
  const v = { primary: { bg: C.accent, c: C.white, b: "none" }, secondary: { bg: C.white, c: C.dark, b: `1px solid ${C.border}` }, ghost: { bg: "transparent", c: C.mid, b: "none" }, success: { bg: C.green, c: C.white, b: "none" } }[variant];
  const sz = { sm: { p: "6px 12px", f: 13 }, md: { p: "10px 20px", f: 14 }, lg: { p: "14px 28px", f: 16 } }[size];
  return <button onClick={onClick} disabled={disabled} style={{ padding: sz.p, fontSize: sz.f, backgroundColor: disabled ? "#ccc" : v.bg, color: v.c, border: v.b, borderRadius: 8, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer", width: full ? "100%" : "auto", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.2s" }}>{children}</button>;
};

const Card = ({ children, p = 16, onClick, style: s }) => <div onClick={onClick} style={{ backgroundColor: C.white, borderRadius: 12, padding: p, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: `1px solid ${C.border}`, cursor: onClick ? "pointer" : "default", transition: "all 0.2s", ...s }}>{children}</div>;

const Progress = ({ value, max, color = C.accent }) => <div style={{ width: "100%", height: 8, backgroundColor: "#E5E5EA", borderRadius: 4, overflow: "hidden" }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", backgroundColor: color, borderRadius: 4, transition: "width 0.3s ease" }} /></div>;

const SecTitle = ({ children, action, onAction }) => <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}><h3 style={{ fontSize: 16, fontWeight: 600, color: C.dark, margin: 0 }}>{children}</h3>{action && <span onClick={onAction} style={{ fontSize: 13, color: C.accent, cursor: "pointer" }}>{action}</span>}</div>;

const Tabs = ({ tabs, active, onChange }) => <div style={{ display: "flex", gap: 0, marginBottom: 20, borderBottom: `2px solid ${C.border}` }}>{tabs.map(t => <div key={t.id} onClick={() => onChange(t.id)} style={{ padding: "10px 20px", fontSize: 14, fontWeight: active === t.id ? 600 : 400, color: active === t.id ? C.accent : C.mid, borderBottom: active === t.id ? `2px solid ${C.accent}` : "2px solid transparent", cursor: "pointer", marginBottom: -2 }}>{t.label}</div>)}</div>;

const Dot = ({ s }) => { const c = s === "present" ? C.green : s === "late" ? C.yellow : C.red; return <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", backgroundColor: c, marginRight: 8 }} />; };

const initials = n => n.split(" ").map(w => w[0]).slice(0, 2).join("");

// ═══════════ MODE SELECTOR ═══════════

const ModeSelector = ({ onSelect }) => (
  <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.dark} 0%, #2D2D4A 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}><I.Logo /><span style={{ fontSize: 28, fontWeight: 700, color: C.white }}>SGR</span></div>
    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 48 }}>Sistema de Gestión de Resultados — SERCLIN</p>
    <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, marginBottom: 24 }}>Selecciona el modo de demostración:</p>
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
      {[{ id: "mobile", icon: I.Phone, title: "Vista Móvil", desc: "Supervisor en tienda", sub: "Luis / Fabiola" }, { id: "desktop", icon: I.Monitor, title: "Vista Desktop", desc: "Administrador", sub: "José / Papá" }].map(m => (
        <div key={m.id} onClick={() => onSelect(m.id)} style={{ width: 200, padding: 24, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 16, cursor: "pointer", textAlign: "center", border: "2px solid transparent", transition: "all 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.borderColor = C.accent} onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}>
          <div style={{ color: C.accent, marginBottom: 12 }}><m.icon /></div>
          <div style={{ color: C.white, fontWeight: 600, fontSize: 16, marginBottom: 8 }}>{m.title}</div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>{m.desc}</div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 8 }}>{m.sub}</div>
        </div>
      ))}
    </div>
    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 48, textAlign: "center" }}>Demo interactivo — SGR Serclin V2<br/>Datos de ejemplo para demostración</p>
  </div>
);

// ═══════════ MOBILE ═══════════

const MobHeader = ({ title, sub, onBack }) => (
  <div style={{ backgroundColor: C.white, padding: "12px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 10 }}>
    {onBack && <div onClick={onBack} style={{ cursor: "pointer", color: C.mid }}><I.ChevL /></div>}
    <div style={{ flex: 1 }}><div style={{ fontSize: 16, fontWeight: 600, color: C.dark }}>{title}</div>{sub && <div style={{ fontSize: 12, color: C.mid }}>{sub}</div>}</div>
  </div>
);

const MobLogin = ({ onLogin }) => (
  <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.dark} 0%, #2D2D4A 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}><I.Logo /><span style={{ fontSize: 28, fontWeight: 700, color: C.white }}>SGR</span></div>
    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 48 }}>SERCLIN</p>
    <div style={{ width: "100%", maxWidth: 300 }}>
      <input placeholder="Correo electrónico" defaultValue="luis@serclin.com" style={{ width: "100%", padding: "14px 16px", borderRadius: 8, border: "none", fontSize: 15, marginBottom: 12, boxSizing: "border-box" }} />
      <input type="password" placeholder="Contraseña" defaultValue="••••••••" style={{ width: "100%", padding: "14px 16px", borderRadius: 8, border: "none", fontSize: 15, marginBottom: 24, boxSizing: "border-box" }} />
      <Btn full size="lg" onClick={onLogin}>Iniciar sesión</Btn>
    </div>
  </div>
);

const MobRollCall = ({ onComplete, onBack }) => {
  const [st, setSt] = useState({});
  const emps = EMPLOYEES.filter(e => e.store === "oaxaca" && e.shift === "Mañana");
  const allDone = emps.every(e => st[e.id]);
  const pCount = Object.values(st).filter(s => s === "present" || s === "late").length;
  return (
    <div style={{ minHeight: "100vh", backgroundColor: C.light }}>
      <MobHeader title="Pase de Lista" sub="Liverpool Oaxaca — Turno Mañana" onBack={onBack} />
      <div style={{ padding: "12px 16px 8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ fontSize: 13, color: C.mid }}>Registrados</span><span style={{ fontSize: 13, fontWeight: 600, color: C.dark }}>{Object.keys(st).length} de {emps.length}</span></div>
        <Progress value={Object.keys(st).length} max={emps.length} color={C.blue} />
      </div>
      <div style={{ padding: "8px 16px 100px" }}>
        {emps.map(emp => (
          <Card key={emp.id} p={14} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: C.light, display: "flex", alignItems: "center", justifyContent: "center", color: C.mid, fontWeight: 500, fontSize: 12 }}>{initials(emp.name)}</div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 500, color: C.dark }}>{emp.name}</div><div style={{ fontSize: 11, color: C.mid }}>{emp.role}</div></div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {[{ v: "present", l: "Presente", c: C.green, bg: C.greenL }, { v: "late", l: "Retardo", c: C.yellow, bg: C.yellowL }, { v: "absent", l: "Falta", c: C.red, bg: C.redL }].map(o => (
                <div key={o.v} onClick={() => setSt(p => ({ ...p, [emp.id]: o.v }))} style={{ flex: 1, padding: "10px 8px", borderRadius: 8, backgroundColor: st[emp.id] === o.v ? o.bg : C.light, border: `2px solid ${st[emp.id] === o.v ? o.c : "transparent"}`, textAlign: "center", cursor: "pointer" }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: st[emp.id] === o.v ? o.c : C.mid }}>{o.l}</div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
      <div style={{ padding: 16, position: "fixed", bottom: 0, left: 0, right: 0, maxWidth: 390, margin: "0 auto", backgroundColor: C.light }}>
        <Btn full size="lg" variant={allDone ? "success" : "secondary"} disabled={!allDone} onClick={onComplete}>
          {allDone ? `✓ Confirmar asistencia (${pCount} presentes)` : `${Object.keys(st).length}/${emps.length} registrados`}
        </Btn>
      </div>
    </div>
  );
};

const MobZoneAssign = ({ onComplete, onBack }) => {
  const avail = EMPLOYEES.filter(e => e.store === "oaxaca" && e.shift === "Mañana").slice(0, 5);
  const assigns = { z1: [avail[0]?.name], z2: [avail[1]?.name], z3: [avail[2]?.name], z4: [avail[3]?.name], z5: [avail[4]?.name], z6: [] };
  return (
    <div style={{ minHeight: "100vh", backgroundColor: C.light }}>
      <MobHeader title="Asignación de Zonas" sub="1 falta hoy — Ajustar cobertura" onBack={onBack} />
      <div style={{ padding: "12px 16px", backgroundColor: C.yellowL, borderBottom: `1px solid ${C.yellow}30`, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: C.yellow }}><I.Alert /></span>
        <span style={{ fontSize: 13, color: C.yellow }}>Carlos Hernández faltó — Escaleras sin cobertura</span>
      </div>
      <div style={{ padding: "8px 16px 100px" }}>
        {ZONES_OAX.map(z => {
          const a = assigns[z.id] || [];
          const has = a.length > 0 && a[0];
          return (
            <Card key={z.id} p={14} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: C.dark }}>{z.name}</div>
                {has ? <Badge color="green">Asignada</Badge> : <Badge color="red">Sin cubrir</Badge>}
              </div>
              <div style={{ fontSize: 12, color: C.mid }}>{has ? `→ ${a.join(", ")}` : "Necesita reasignación"}</div>
            </Card>
          );
        })}
      </div>
      <div style={{ padding: 16, position: "fixed", bottom: 0, left: 0, right: 0, maxWidth: 390, margin: "0 auto", backgroundColor: C.light }}>
        <Btn full size="lg" variant="success" onClick={onComplete}>✓ Confirmar asignación</Btn>
      </div>
    </div>
  );
};

const MobDash = ({ onEval, onRoll, onZones }) => {
  const today = new Date().toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" });
  return (
    <div style={{ minHeight: "100vh", backgroundColor: C.light }}>
      <div style={{ background: `linear-gradient(135deg, ${C.dark} 0%, #2D2D4A 100%)`, padding: "20px 16px 24px", borderRadius: "0 0 24px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}><I.Logo /><span style={{ fontSize: 18, fontWeight: 700, color: C.white }}>SGR</span></div>
          <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: C.accent, display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontWeight: 600, fontSize: 14 }}>LM</div>
        </div>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, marginBottom: 4, textTransform: "capitalize" }}>{today}</p>
        <h1 style={{ color: C.white, fontSize: 22, fontWeight: 600, margin: 0 }}>Hola, Luis 👋</h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 4 }}>Liverpool Oaxaca — Turno Mañana</p>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          <Card p={14}><div style={{ fontSize: 11, color: C.mid, marginBottom: 4 }}>Asistencia hoy</div><div style={{ fontSize: 24, fontWeight: 700, color: C.dark }}>13<span style={{ fontSize: 14, color: C.mid, fontWeight: 400 }}>/15</span></div><div style={{ fontSize: 11, color: C.green, marginTop: 4 }}>● 1 retardo, 1 falta</div></Card>
          <Card p={14}><div style={{ fontSize: 11, color: C.mid, marginBottom: 4 }}>Evaluación</div><div style={{ fontSize: 24, fontWeight: 700, color: C.yellow }}>Pendiente</div><div style={{ fontSize: 11, color: C.mid, marginTop: 4 }}>0 de 6 zonas</div></Card>
        </div>
        {[
          { icon: I.Clock, bg: C.blueL, ic: C.blue, title: "Pase de lista", desc: "Registrar asistencia del turno", fn: onRoll },
          { icon: I.MapPin, bg: C.accentL, ic: C.accent, title: "Asignar zonas", desc: "Distribuir personal por área", fn: onZones },
        ].map((item, i) => (
          <Card key={i} p={14} onClick={item.fn} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: item.bg, display: "flex", alignItems: "center", justifyContent: "center", color: item.ic }}><item.icon /></div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600, color: C.dark }}>{item.title}</div><div style={{ fontSize: 12, color: C.mid }}>{item.desc}</div></div>
              <div style={{ color: C.mid }}><I.ChevR /></div>
            </div>
          </Card>
        ))}
        <Card p={0} onClick={onEval} style={{ marginBottom: 12 }}>
          <div style={{ background: `linear-gradient(135deg, ${C.accent} 0%, #E86A4A 100%)`, padding: 20, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", marginBottom: 4 }}>ACCIÓN PRINCIPAL</div><div style={{ fontSize: 18, fontWeight: 600, color: C.white }}>Evaluación del día</div><div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 4 }}>6 zonas por evaluar</div></div>
            <div style={{ color: C.white }}><I.ChevR /></div>
          </div>
        </Card>
        <Card p={14}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: C.yellowL, display: "flex", alignItems: "center", justifyContent: "center", color: C.yellow }}><I.Alert /></div>
            <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600, color: C.dark }}>Reportar incidencia</div><div style={{ fontSize: 12, color: C.mid }}>Registrar observación o problema</div></div>
            <div style={{ color: C.mid }}><I.ChevR /></div>
          </div>
        </Card>
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.dark, marginBottom: 12 }}>Esta semana</div>
          <Card p={14}>
            {["Ayer — Evaluación completa|6 zonas • 2 observaciones", "Lunes — Evaluación completa|6 zonas • Sin observaciones"].map((item, i) => {
              const [t, s] = item.split("|");
              return <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: i === 0 ? 12 : 0 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: C.greenL, display: "flex", alignItems: "center", justifyContent: "center", color: C.green, fontSize: 12 }}>✓</div>
                <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 500, color: C.dark }}>{t}</div><div style={{ fontSize: 11, color: C.mid }}>{s}</div></div>
              </div>;
            })}
          </Card>
        </div>
      </div>
    </div>
  );
};

const MobZoneList = ({ onSelect, onBack, done }) => (
  <div style={{ minHeight: "100vh", backgroundColor: C.light }}>
    <MobHeader title="Evaluación del día" sub="Liverpool Oaxaca" onBack={onBack} />
    <div style={{ padding: "16px 16px 8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ fontSize: 13, color: C.mid }}>Progreso</span><span style={{ fontSize: 13, fontWeight: 600, color: C.dark }}>{done.length} de 6 zonas</span></div>
      <Progress value={done.length} max={6} color={C.green} />
    </div>
    <div style={{ padding: "8px 16px 100px" }}>
      {ZONES_OAX.map((z, i) => {
        const d = done.includes(z.id);
        return <Card key={z.id} p={0} onClick={() => !d && onSelect(z)} style={{ marginBottom: 8 }}>
          <div style={{ padding: 16, display: "flex", alignItems: "center", gap: 12, opacity: d ? 0.6 : 1 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: d ? C.greenL : C.light, display: "flex", alignItems: "center", justifyContent: "center", color: d ? C.green : C.mid, fontWeight: 600 }}>{d ? "✓" : i + 1}</div>
            <div style={{ flex: 1 }}><div style={{ fontSize: 15, fontWeight: 500, color: C.dark }}>{z.name}</div><div style={{ fontSize: 12, color: C.mid }}>{z.cps.length} puntos a revisar</div></div>
            {!d && <div style={{ color: C.mid }}><I.ChevR /></div>}
            {d && <Badge color="green">Listo</Badge>}
          </div>
        </Card>;
      })}
    </div>
    {done.length === 6 && <div style={{ padding: 16, position: "fixed", bottom: 0, left: 0, right: 0, maxWidth: 390, margin: "0 auto", backgroundColor: C.light }}><Btn full size="lg" variant="success"><I.Send /> Enviar evaluación</Btn></div>}
  </div>
);

const MobZoneEval = ({ zone, onComplete, onBack }) => {
  const [ratings, setR] = useState({});
  const [note, setN] = useState("");
  const [photo, setP] = useState(false);
  const allRated = zone.cps.every(cp => ratings[cp]);
  const hasIssues = Object.values(ratings).some(r => r !== "good");
  return (
    <div style={{ minHeight: "100vh", backgroundColor: C.light }}>
      <MobHeader title={zone.name} sub={`${zone.cps.length} puntos a revisar`} onBack={onBack} />
      <div style={{ padding: "16px 16px 100px" }}>
        {zone.cps.map(cp => (
          <Card key={cp} p={16} style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: C.dark, marginBottom: 12 }}>{cp}</div>
            <div style={{ display: "flex", gap: 8 }}>
              {[{ v: "good", l: "Bien", c: C.green, bg: C.greenL, i: "✓" }, { v: "pending", l: "Pendiente", c: C.yellow, bg: C.yellowL, i: "!" }, { v: "problem", l: "Problema", c: C.red, bg: C.redL, i: "✕" }].map(o => (
                <div key={o.v} onClick={() => setR(p => ({ ...p, [cp]: o.v }))} style={{ flex: 1, padding: "12px 8px", borderRadius: 8, backgroundColor: ratings[cp] === o.v ? o.bg : C.light, border: `2px solid ${ratings[cp] === o.v ? o.c : "transparent"}`, textAlign: "center", cursor: "pointer" }}>
                  <div style={{ fontSize: 18, marginBottom: 4 }}>{o.i}</div>
                  <div style={{ fontSize: 11, fontWeight: 500, color: ratings[cp] === o.v ? o.c : C.mid }}>{o.l}</div>
                </div>
              ))}
            </div>
          </Card>
        ))}
        {hasIssues && (
          <Card p={16} style={{ marginTop: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.dark, marginBottom: 12 }}>Detalles adicionales</div>
            <textarea placeholder="Agrega una nota..." value={note} onChange={e => setN(e.target.value)} style={{ width: "100%", padding: 12, borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 14, resize: "none", minHeight: 80, boxSizing: "border-box" }} />
            <div style={{ marginTop: 12 }}><Btn variant={photo ? "success" : "secondary"} full onClick={() => setP(true)}><I.Cam />{photo ? "Foto capturada ✓" : "Tomar foto de evidencia"}</Btn></div>
          </Card>
        )}
      </div>
      <div style={{ padding: 16, position: "fixed", bottom: 0, left: 0, right: 0, maxWidth: 390, margin: "0 auto", backgroundColor: C.light }}>
        <Btn full size="lg" variant={allRated ? "success" : "secondary"} disabled={!allRated} onClick={onComplete}>
          {allRated ? "✓ Zona completada" : `${Object.keys(ratings).length}/${zone.cps.length} evaluados`}
        </Btn>
      </div>
    </div>
  );
};

const MobSuccess = ({ onBack }) => (
  <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.green} 0%, #3DA65E 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
    <div style={{ width: 80, height: 80, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}><I.Check /></div>
    <h1 style={{ color: C.white, fontSize: 24, fontWeight: 600, margin: "0 0 8px" }}>¡Evaluación enviada!</h1>
    <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 15, marginBottom: 32 }}>6 zonas evaluadas correctamente.<br/>José ya puede ver los resultados.</p>
    <Btn variant="secondary" onClick={onBack}>Volver al inicio</Btn>
  </div>
);

const MobileApp = ({ onSwitch }) => {
  const [scr, setScr] = useState("login");
  const [curZone, setCZ] = useState(null);
  const [doneZones, setDZ] = useState([]);
  const handleZDone = () => { setDZ(p => [...p, curZone.id]); if (doneZones.length === 5) setScr("success"); else setScr("zones"); setCZ(null); };
  return (
    <div style={{ maxWidth: 390, margin: "0 auto", minHeight: "100vh", position: "relative", boxShadow: "0 0 40px rgba(0,0,0,0.15)" }}>
      <div onClick={onSwitch} style={{ position: "fixed", bottom: 16, right: 16, width: 48, height: 48, borderRadius: "50%", backgroundColor: C.dark, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 100, boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}><I.Monitor /></div>
      {scr === "login" && <MobLogin onLogin={() => setScr("dashboard")} />}
      {scr === "dashboard" && <MobDash onEval={() => setScr("zones")} onRoll={() => setScr("rollcall")} onZones={() => setScr("assignzones")} />}
      {scr === "rollcall" && <MobRollCall onComplete={() => setScr("assignzones")} onBack={() => setScr("dashboard")} />}
      {scr === "assignzones" && <MobZoneAssign onComplete={() => setScr("dashboard")} onBack={() => setScr("dashboard")} />}
      {scr === "zones" && <MobZoneList onSelect={z => { setCZ(z); setScr("eval"); }} onBack={() => setScr("dashboard")} done={doneZones} />}
      {scr === "eval" && curZone && <MobZoneEval zone={curZone} onComplete={handleZDone} onBack={() => setScr("zones")} />}
      {scr === "success" && <MobSuccess onBack={() => { setScr("dashboard"); setDZ([]); }} />}
    </div>
  );
};

// ═══════════ DESKTOP ═══════════

const Sidebar = ({ active, onNav }) => {
  const items = [
    { id: "dashboard", icon: I.Home, label: "Dashboard" },
    { id: "employees", icon: I.Users, label: "Directorio" },
    { id: "attendance", icon: I.Clock, label: "Asistencia" },
    { id: "supervision", icon: I.Clip, label: "Supervisión" },
    { id: "reports", icon: I.File, label: "Reportes" },
  ];
  return (
    <div style={{ width: 240, backgroundColor: C.dark, minHeight: "100vh", padding: "20px 0", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 20px", marginBottom: 32 }}><I.Logo /><div><div style={{ fontSize: 18, fontWeight: 700, color: C.white }}>SGR</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>SERCLIN</div></div></div>
      <nav style={{ flex: 1 }}>
        {items.map(item => {
          const act = active === item.id;
          return <div key={item.id} onClick={() => onNav(item.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", cursor: "pointer", backgroundColor: act ? "rgba(255,255,255,0.1)" : "transparent", borderLeft: act ? `3px solid ${C.accent}` : "3px solid transparent" }}>
            <span style={{ color: act ? C.accent : "rgba(255,255,255,0.6)" }}><item.icon /></span>
            <span style={{ fontSize: 14, color: act ? C.white : "rgba(255,255,255,0.7)" }}>{item.label}</span>
          </div>;
        })}
      </nav>
      <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: C.accent, display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontWeight: 600, fontSize: 13 }}>JA</div>
          <div><div style={{ fontSize: 13, color: C.white }}>José Arnaud</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Administrador</div></div>
        </div>
      </div>
    </div>
  );
};

// --- DASHBOARD ---
const DeskDash = () => {
  const today = new Date().toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  return (
    <div>
      <div style={{ marginBottom: 24 }}><p style={{ fontSize: 13, color: C.mid, marginBottom: 4, textTransform: "capitalize" }}>{today}</p><h1 style={{ fontSize: 26, fontWeight: 600, color: C.dark, margin: 0 }}>Dashboard</h1></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Asistencia Oaxaca", val: `${ATT_TODAY.oaxaca.present}/${ATT_TODAY.oaxaca.total}`, sub: "87% presente", sc: C.green },
          { label: "Asistencia Salina Cruz", val: `${ATT_TODAY.salina.present}/${ATT_TODAY.salina.total}`, sub: "90% presente", sc: C.green },
          { label: "Evaluaciones hoy", val: "2", sub: "✓ Ambas tiendas", sc: C.green },
          { label: "Alertas activas", val: `${ALERTS.length}`, sub: "Requieren atención", sc: C.red },
        ].map((c, i) => (
          <Card key={i} p={20}><div style={{ fontSize: 12, color: C.mid, marginBottom: 8 }}>{c.label}</div><div style={{ fontSize: 28, fontWeight: 700, color: C.dark }}>{c.val}</div><div style={{ fontSize: 12, color: c.sc, marginTop: 4 }}>{c.sub}</div></Card>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        <div>
          <Card p={20}>
            <SecTitle action="Ver todas →">Evaluaciones recientes</SecTitle>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr style={{ borderBottom: `1px solid ${C.border}` }}>{["Tienda", "Supervisor", "Fecha", "Zonas", "Obs."].map(h => <th key={h} style={{ textAlign: h === "Zonas" || h === "Obs." ? "center" : "left", padding: "8px 0", fontSize: 11, color: C.mid, fontWeight: 500 }}>{h}</th>)}</tr></thead>
              <tbody>{EVALS.slice(0, 3).map(ev => (
                <tr key={ev.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: "12px 0", fontSize: 13 }}>{ev.store}</td>
                  <td style={{ padding: "12px 0", fontSize: 13 }}>{ev.sup}</td>
                  <td style={{ padding: "12px 0", fontSize: 13, color: C.mid }}>{ev.date}</td>
                  <td style={{ padding: "12px 0", fontSize: 13, textAlign: "center" }}>{ev.zones}</td>
                  <td style={{ padding: "12px 0", textAlign: "center" }}><Badge color={ev.issues === 0 ? "green" : "yellow"}>{ev.issues}</Badge></td>
                </tr>
              ))}</tbody>
            </table>
          </Card>
          <Card p={20} style={{ marginTop: 16 }}>
            <SecTitle action="Ver directorio →">Expedientes con alertas</SecTitle>
            {EMPLOYEES.filter(e => !e.docsOk).map(emp => (
              <div key={emp.id} style={{ display: "flex", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: C.light, display: "flex", alignItems: "center", justifyContent: "center", color: C.mid, fontWeight: 500, fontSize: 12, marginRight: 12 }}>{initials(emp.name)}</div>
                <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 500, color: C.dark }}>{emp.name}</div><div style={{ fontSize: 11, color: C.mid }}>{emp.role} — {emp.store === "oaxaca" ? "Oaxaca" : "Salina Cruz"}</div></div>
                <Badge color="red">{emp.docsMiss} docs faltantes</Badge>
              </div>
            ))}
          </Card>
        </div>
        <div>
          <Card p={20}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: C.dark, margin: "0 0 16px" }}>Alertas <Badge color="red">{ALERTS.length}</Badge></h3>
            {ALERTS.map(a => (
              <div key={a.id} style={{ padding: 12, backgroundColor: a.sev === "high" ? C.redL : C.yellowL, borderRadius: 8, marginBottom: 8, borderLeft: `3px solid ${a.sev === "high" ? C.red : C.yellow}` }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}><span style={{ color: a.sev === "high" ? C.red : C.yellow, marginTop: 2 }}><I.Alert /></span><div style={{ fontSize: 12, color: C.dark, lineHeight: 1.5 }}>{a.msg}</div></div>
              </div>
            ))}
          </Card>
          <Card p={20} style={{ marginTop: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: C.dark, margin: "0 0 16px" }}>Resumen por tienda</h3>
            {Object.values(STORES).map(store => (
              <div key={store.id} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.dark, marginBottom: 8 }}>{store.name}</div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.mid, marginBottom: 4 }}><span>Empleados activos</span><span style={{ color: C.dark, fontWeight: 500 }}>{store.emp}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.mid, marginBottom: 4 }}><span>Asistencia hoy</span><span style={{ color: C.green, fontWeight: 500 }}>{Math.round((ATT_TODAY[store.id].present / ATT_TODAY[store.id].total) * 100)}%</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.mid }}><span>Evaluación hoy</span><Badge color="green">Completa</Badge></div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

// --- DIRECTORIO ---
const DeskEmps = () => (
  <div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
      <div><h1 style={{ fontSize: 26, fontWeight: 600, color: C.dark, margin: 0 }}>Directorio de empleados</h1><p style={{ fontSize: 13, color: C.mid, marginTop: 4 }}>{EMPLOYEES.length} empleados registrados</p></div>
      <Btn>+ Agregar empleado</Btn>
    </div>
    <Card p={16}>
      <div style={{ display: "flex", gap: 12 }}>
        <input placeholder="Buscar por nombre..." style={{ flex: 1, padding: "10px 14px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 13 }} />
        <select style={{ padding: "10px 14px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 13 }}><option>Todas las tiendas</option><option>Liverpool Oaxaca</option><option>Liverpool Salina Cruz</option></select>
        <select style={{ padding: "10px 14px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 13 }}><option>Todos los estatus</option><option>Expediente completo</option><option>Documentos faltantes</option></select>
      </div>
    </Card>
    <Card p={0} style={{ marginTop: 16 }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr style={{ borderBottom: `1px solid ${C.border}` }}>{["Empleado", "Rol", "Tienda", "Turno", "Expediente", ""].map(h => <th key={h} style={{ textAlign: h === "Expediente" ? "center" : h === "" ? "right" : "left", padding: "14px 16px", fontSize: 11, color: C.mid, fontWeight: 600 }}>{h}</th>)}</tr></thead>
        <tbody>{EMPLOYEES.map(emp => (
          <tr key={emp.id} style={{ borderBottom: `1px solid ${C.border}` }}>
            <td style={{ padding: "14px 16px" }}><div style={{ display: "flex", alignItems: "center", gap: 12 }}><div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: C.light, display: "flex", alignItems: "center", justifyContent: "center", color: C.mid, fontWeight: 500, fontSize: 12 }}>{initials(emp.name)}</div><span style={{ fontSize: 13, fontWeight: 500, color: C.dark }}>{emp.name}</span></div></td>
            <td style={{ padding: "14px 16px", fontSize: 13, color: C.mid }}>{emp.role}</td>
            <td style={{ padding: "14px 16px", fontSize: 13, color: C.mid }}>{emp.store === "oaxaca" ? "Oaxaca" : "Salina Cruz"}</td>
            <td style={{ padding: "14px 16px", fontSize: 13, color: C.mid }}>{emp.shift}</td>
            <td style={{ padding: "14px 16px", textAlign: "center" }}>{emp.docsOk ? <Badge color="green">✓ Completo</Badge> : <Badge color="red">{emp.docsMiss} faltantes</Badge>}</td>
            <td style={{ padding: "14px 16px", textAlign: "right" }}><span style={{ fontSize: 13, color: C.accent, cursor: "pointer" }}>Ver perfil</span></td>
          </tr>
        ))}</tbody>
      </table>
    </Card>
  </div>
);

// --- ASISTENCIA ---
const DeskAtt = () => {
  const [tab, setTab] = useState("detail");
  return (
    <div>
      <div style={{ marginBottom: 24 }}><h1 style={{ fontSize: 26, fontWeight: 600, color: C.dark, margin: 0 }}>Asistencia</h1><p style={{ fontSize: 13, color: C.mid, marginTop: 4 }}>Control de asistencia y asignación de zonas</p></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[{ l: "Presentes hoy", v: "32/36", c: C.green }, { l: "Faltas", v: "2", c: C.red }, { l: "Retardos", v: "2", c: C.yellow }, { l: "Cobertura zonas", v: "83%", c: C.blue }].map((x, i) => (
          <Card key={i} p={16}><div style={{ fontSize: 12, color: C.mid, marginBottom: 4 }}>{x.l}</div><div style={{ fontSize: 28, fontWeight: 700, color: x.c }}>{x.v}</div></Card>
        ))}
      </div>
      <Tabs tabs={[{ id: "detail", label: "Pase de lista" }, { id: "zones", label: "Asignación de zonas" }]} active={tab} onChange={setTab} />
      {tab === "detail" && (
        <Card p={0}>
          <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 14, fontWeight: 600, color: C.dark }}>Liverpool Oaxaca — Hoy</span><span style={{ fontSize: 12, color: C.mid }}>Registrado por: Luis Mendoza a las 7:05 AM</span></div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: `1px solid ${C.border}` }}>{["Empleado", "Estatus", "Hora registro", "Reloj checador", "Zona asignada"].map(h => <th key={h} style={{ textAlign: "left", padding: "12px 20px", fontSize: 11, color: C.mid, fontWeight: 600 }}>{h}</th>)}</tr></thead>
            <tbody>{ATT_DETAIL.map(a => (
              <tr key={a.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                <td style={{ padding: "12px 20px" }}><div style={{ display: "flex", alignItems: "center", gap: 10 }}><Dot s={a.status} /><span style={{ fontSize: 13, fontWeight: 500, color: C.dark }}>{a.name}</span></div></td>
                <td style={{ padding: "12px 20px" }}><Badge color={a.status === "present" ? "green" : a.status === "late" ? "yellow" : "red"}>{a.status === "present" ? "Presente" : a.status === "late" ? "Retardo" : "Falta"}</Badge></td>
                <td style={{ padding: "12px 20px", fontSize: 13, color: C.mid }}>{a.time}</td>
                <td style={{ padding: "12px 20px", fontSize: 13, color: a.clock === "—" ? C.red : C.green }}>{a.clock}</td>
                <td style={{ padding: "12px 20px", fontSize: 13, color: a.zone === "—" ? C.red : C.mid }}>{a.zone}</td>
              </tr>
            ))}</tbody>
          </table>
        </Card>
      )}
      {tab === "zones" && (
        <Card p={0}>
          <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 14, fontWeight: 600, color: C.dark }}>Asignación planeada vs. real — Oaxaca Hoy</span><Badge color="yellow">1 zona sin cobertura</Badge></div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: `1px solid ${C.border}` }}>{["Zona", "Plan", "Real", "Cobertura", "Nota"].map(h => <th key={h} style={{ textAlign: "left", padding: "12px 20px", fontSize: 11, color: C.mid, fontWeight: 600 }}>{h}</th>)}</tr></thead>
            <tbody>{ZONE_ASSIGN.map(z => (
              <tr key={z.zone} style={{ borderBottom: `1px solid ${C.border}`, backgroundColor: z.cov === "0%" ? C.redL : "transparent" }}>
                <td style={{ padding: "12px 20px", fontSize: 13, fontWeight: 500, color: C.dark }}>{z.zone}</td>
                <td style={{ padding: "12px 20px", fontSize: 13, color: C.mid }}>{z.planned.join(", ")}</td>
                <td style={{ padding: "12px 20px", fontSize: 13, color: C.mid }}>{z.actual.join(", ")}</td>
                <td style={{ padding: "12px 20px" }}><Badge color={z.cov === "100%" ? "green" : z.cov === "0%" ? "red" : "yellow"}>{z.cov}</Badge></td>
                <td style={{ padding: "12px 20px", fontSize: 12, color: C.mid, fontStyle: z.note ? "italic" : "normal" }}>{z.note || "—"}</td>
              </tr>
            ))}</tbody>
          </table>
        </Card>
      )}
    </div>
  );
};

// --- SUPERVISIÓN ---
const DeskSup = () => {
  const [tab, setTab] = useState("today");
  return (
    <div>
      <div style={{ marginBottom: 24 }}><h1 style={{ fontSize: 26, fontWeight: 600, color: C.dark, margin: 0 }}>Supervisión</h1><p style={{ fontSize: 13, color: C.mid, marginTop: 4 }}>Evaluaciones, calendario y detalle por zona</p></div>
      <Tabs tabs={[{ id: "today", label: "Evaluaciones del día" }, { id: "calendar", label: "Calendario" }, { id: "history", label: "Historial" }]} active={tab} onChange={setTab} />
      {tab === "today" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Card p={20}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}><div><div style={{ fontSize: 15, fontWeight: 600, color: C.dark }}>Liverpool Oaxaca</div><div style={{ fontSize: 12, color: C.mid }}>Luis Mendoza — Hoy, 10:32</div></div><Badge color="green">Completa</Badge></div>
            {EVAL_DETAIL.map(e => (
              <div key={e.zone} style={{ display: "flex", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
                <Dot s={e.ok ? "present" : "absent"} /><span style={{ flex: 1, fontSize: 13, color: C.dark }}>{e.zone}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>{e.photo && <span style={{ fontSize: 11, color: C.blue }}>📷</span>}{e.issues > 0 ? <Badge color="red">{e.issues} obs.</Badge> : <Badge color="green">OK</Badge>}</div>
              </div>
            ))}
            {EVAL_DETAIL.filter(e => e.note).map(e => (
              <div key={e.zone + "n"} style={{ marginTop: 12, padding: 12, backgroundColor: C.redL, borderRadius: 8, borderLeft: `3px solid ${C.red}` }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: C.red, marginBottom: 4 }}>{e.zone}</div>
                <div style={{ fontSize: 12, color: C.dark }}>{e.note}</div>
              </div>
            ))}
          </Card>
          <Card p={20}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}><div><div style={{ fontSize: 15, fontWeight: 600, color: C.dark }}>Liverpool Salina Cruz</div><div style={{ fontSize: 12, color: C.mid }}>Fabiola Reyes — Hoy, 09:45</div></div><Badge color="green">Completa</Badge></div>
            {["Planta Baja Norte", "Planta Baja Sur", "Corredor Central", "Sanitarios", "Escaleras"].map(z => (
              <div key={z} style={{ display: "flex", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${C.border}` }}><Dot s="present" /><span style={{ flex: 1, fontSize: 13, color: C.dark }}>{z}</span><Badge color="green">OK</Badge></div>
            ))}
          </Card>
        </div>
      )}
      {tab === "calendar" && (
        <Card p={20}>
          <div style={{ fontSize: 15, fontWeight: 600, color: C.dark, marginBottom: 16 }}>Febrero 2025</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 16 }}>
            {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map(d => <div key={d} style={{ textAlign: "center", fontSize: 11, color: C.mid, padding: 8, fontWeight: 600 }}>{d}</div>)}
            {Array.from({ length: 28 }, (_, i) => {
              const day = i + 1, data = SUP_CAL.find(d => d.day === day), isWk = (i % 7 === 5 || i % 7 === 6), isToday = day === 6;
              return <div key={day} style={{ textAlign: "center", padding: 8, borderRadius: 8, backgroundColor: isToday ? C.accentL : data ? C.greenL : "transparent", border: isToday ? `2px solid ${C.accent}` : "2px solid transparent" }}>
                <div style={{ fontSize: 13, fontWeight: isToday ? 700 : 400, color: isWk ? C.mid : C.dark }}>{day}</div>
                {data && !isWk && <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 4 }}><div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: data.oax ? C.green : C.red }} /><div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: data.sal ? C.green : C.red }} /></div>}
              </div>;
            })}
          </div>
          <div style={{ display: "flex", gap: 16, fontSize: 12, color: C.mid }}><span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", backgroundColor: C.green, marginRight: 4 }} />Supervisión realizada</span><span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", backgroundColor: C.red, marginRight: 4 }} />Sin supervisión</span></div>
        </Card>
      )}
      {tab === "history" && (
        <Card p={0}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: `1px solid ${C.border}` }}>{["Fecha", "Tienda", "Supervisor", "Zonas", "Obs.", "Estatus"].map(h => <th key={h} style={{ textAlign: h === "Zonas" || h === "Obs." || h === "Estatus" ? "center" : "left", padding: "14px 20px", fontSize: 11, color: C.mid, fontWeight: 600 }}>{h}</th>)}</tr></thead>
            <tbody>{EVALS.map(ev => (
              <tr key={ev.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                <td style={{ padding: "12px 20px", fontSize: 13, color: C.dark }}>{ev.date}</td>
                <td style={{ padding: "12px 20px", fontSize: 13 }}>{ev.store}</td>
                <td style={{ padding: "12px 20px", fontSize: 13, color: C.mid }}>{ev.sup}</td>
                <td style={{ padding: "12px 20px", fontSize: 13, textAlign: "center" }}>{ev.zones}</td>
                <td style={{ padding: "12px 20px", textAlign: "center" }}><Badge color={ev.issues === 0 ? "green" : "yellow"}>{ev.issues}</Badge></td>
                <td style={{ padding: "12px 20px", textAlign: "center" }}><Badge color="green">Completa</Badge></td>
              </tr>
            ))}</tbody>
          </table>
        </Card>
      )}
    </div>
  );
};

// --- REPORTES ---
const DeskReports = () => {
  const [tab, setTab] = useState("weekly");
  return (
    <div>
      <div style={{ marginBottom: 24 }}><h1 style={{ fontSize: 26, fontWeight: 600, color: C.dark, margin: 0 }}>Reportes</h1><p style={{ fontSize: 13, color: C.mid, marginTop: 4 }}>Reportes semanales, nómina, expedientes y contraste financiero</p></div>
      <Tabs tabs={[{ id: "weekly", label: "Reporte semanal" }, { id: "payroll", label: "Nómina" }, { id: "records", label: "Expedientes" }, { id: "liverpool", label: "Contraste Liverpool" }]} active={tab} onChange={setTab} />

      {tab === "weekly" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}><div><span style={{ fontSize: 15, fontWeight: 600, color: C.dark }}>Semana: {WEEKLY.period}</span><span style={{ fontSize: 12, color: C.mid, marginLeft: 12 }}>Generado automáticamente</span></div><Btn variant="secondary" size="sm"><I.Down /> Descargar PDF</Btn></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
            <Card p={16}><div style={{ fontSize: 11, color: C.mid, marginBottom: 4 }}>Asistencia promedio</div><div style={{ fontSize: 22, fontWeight: 700, color: C.green }}>{WEEKLY.att.oax}% / {WEEKLY.att.sal}%</div><div style={{ fontSize: 11, color: C.mid, marginTop: 4 }}>Oaxaca / Salina Cruz</div></Card>
            <Card p={16}><div style={{ fontSize: 11, color: C.mid, marginBottom: 4 }}>Faltas totales</div><div style={{ fontSize: 22, fontWeight: 700, color: C.red }}>{WEEKLY.att.abs}</div><div style={{ fontSize: 11, color: C.mid, marginTop: 4 }}>{WEEKLY.att.late} retardos</div></Card>
            <Card p={16}><div style={{ fontSize: 11, color: C.mid, marginBottom: 4 }}>Supervisiones</div><div style={{ fontSize: 22, fontWeight: 700, color: C.green }}>{WEEKLY.sup.done}/{WEEKLY.sup.total}</div><div style={{ fontSize: 11, color: C.mid, marginTop: 4 }}>{WEEKLY.sup.miss} no realizadas</div></Card>
            <Card p={16}><div style={{ fontSize: 11, color: C.mid, marginBottom: 4 }}>Cobertura zonas</div><div style={{ fontSize: 22, fontWeight: 700, color: C.blue }}>{WEEKLY.cov.full}</div><div style={{ fontSize: 11, color: C.mid, marginTop: 4 }}>{WEEKLY.cov.none} sin cubrir</div></Card>
          </div>
          <Card p={20}>
            <SecTitle>Incidencias relevantes</SecTitle>
            {WEEKLY.incidents.map((inc, i) => <div key={i} style={{ padding: "10px 0", borderBottom: i < WEEKLY.incidents.length - 1 ? `1px solid ${C.border}` : "none", display: "flex", alignItems: "center", gap: 10 }}><span style={{ color: C.yellow }}><I.Alert /></span><span style={{ fontSize: 13, color: C.dark }}>{inc}</span></div>)}
          </Card>
          <Card p={20} style={{ marginTop: 16 }}>
            <SecTitle>Reportes anteriores</SecTitle>
            {["20-26 Ene 2025", "13-19 Ene 2025", "6-12 Ene 2025"].map((p, i) => <div key={i} style={{ padding: "10px 0", borderBottom: i < 2 ? `1px solid ${C.border}` : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 13, color: C.dark }}>Semana: {p}</span><span style={{ fontSize: 13, color: C.accent, cursor: "pointer" }}>Ver reporte →</span></div>)}
          </Card>
        </div>
      )}

      {tab === "payroll" && (
        <Card p={20}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}><div><div style={{ fontSize: 15, fontWeight: 600, color: C.dark }}>Periodo: 1-15 Febrero 2025</div><div style={{ fontSize: 12, color: C.mid }}>Basado en asistencia registrada</div></div><Btn variant="secondary" size="sm"><I.Down /> Exportar para nómina</Btn></div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: `1px solid ${C.border}` }}>{["Empleado", "Tienda", "Días", "Retardos", "Faltas", "Estatus"].map(h => <th key={h} style={{ textAlign: h === "Estatus" ? "center" : "left", padding: "12px 16px", fontSize: 11, color: C.mid, fontWeight: 600 }}>{h}</th>)}</tr></thead>
            <tbody>{EMPLOYEES.slice(0, 6).map((emp, i) => {
              const d = [10, 8, 9, 7, 10, 10][i], l = [0, 1, 2, 0, 0, 1][i], a = [0, 2, 1, 3, 0, 0][i];
              return <tr key={emp.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 500, color: C.dark }}>{emp.name}</td>
                <td style={{ padding: "12px 16px", fontSize: 13, color: C.mid }}>{emp.store === "oaxaca" ? "Oaxaca" : "Salina Cruz"}</td>
                <td style={{ padding: "12px 16px", fontSize: 13 }}>{d}</td>
                <td style={{ padding: "12px 16px" }}>{l > 0 ? <Badge color="yellow">{l}</Badge> : <span style={{ fontSize: 13, color: C.green }}>0</span>}</td>
                <td style={{ padding: "12px 16px" }}>{a > 0 ? <Badge color="red">{a}</Badge> : <span style={{ fontSize: 13, color: C.green }}>0</span>}</td>
                <td style={{ padding: "12px 16px", textAlign: "center" }}><Badge color={a >= 3 ? "red" : "green"}>{a >= 3 ? "Revisar" : "OK"}</Badge></td>
              </tr>;
            })}</tbody>
          </table>
        </Card>
      )}

      {tab === "records" && (
        <Card p={20}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}><div><div style={{ fontSize: 15, fontWeight: 600, color: C.dark }}>Estatus de expedientes</div><div style={{ fontSize: 12, color: C.mid }}>Actualizado al día de hoy</div></div><Btn variant="secondary" size="sm"><I.Down /> Descargar reporte</Btn></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 20 }}>
            <Card p={16} style={{ border: `2px solid ${C.green}30` }}><div style={{ fontSize: 28, fontWeight: 700, color: C.green }}>7</div><div style={{ fontSize: 12, color: C.mid }}>Expedientes completos</div></Card>
            <Card p={16} style={{ border: `2px solid ${C.red}30` }}><div style={{ fontSize: 28, fontWeight: 700, color: C.red }}>3</div><div style={{ fontSize: 12, color: C.mid }}>Con documentos faltantes</div></Card>
            <Card p={16} style={{ border: `2px solid ${C.yellow}30` }}><div style={{ fontSize: 28, fontWeight: 700, color: C.yellow }}>1</div><div style={{ fontSize: 12, color: C.mid }}>Contratos por vencer</div></Card>
          </div>
          {EMPLOYEES.filter(e => !e.docsOk).map(emp => (
            <div key={emp.id} style={{ display: "flex", alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${C.border}` }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: C.redL, display: "flex", alignItems: "center", justifyContent: "center", color: C.red, fontWeight: 600, fontSize: 12, marginRight: 12 }}>!</div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 500, color: C.dark }}>{emp.name}</div><div style={{ fontSize: 12, color: C.mid }}>{emp.store === "oaxaca" ? "Oaxaca" : "Salina Cruz"} — {emp.docsMiss} documentos faltantes</div></div>
              <span style={{ fontSize: 13, color: C.accent, cursor: "pointer" }}>Ver detalle →</span>
            </div>
          ))}
        </Card>
      )}

      {tab === "liverpool" && (
        <div>
          <div style={{ padding: "16px 20px", marginBottom: 20, backgroundColor: C.blueL, borderRadius: 12, border: `1px solid ${C.blue}30`, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ color: C.blue }}><I.Lock /></span>
            <div><div style={{ fontSize: 14, fontWeight: 600, color: C.blue }}>Módulo de Contraste Financiero — Fase Posterior</div><div style={{ fontSize: 12, color: C.mid, marginTop: 4 }}>Permitirá contrastar lo trabajado vs. lo pagado por Liverpool. Requiere configurar tarifas acordadas.</div></div>
          </div>
          <Card p={20}>
            <SecTitle>Vista previa — Contraste {FIN.period}</SecTitle>
            <div style={{ fontSize: 12, color: C.mid, marginBottom: 16, fontStyle: "italic" }}>Datos de ejemplo para demostración</div>
            {[{ store: "Liverpool Oaxaca", ...FIN.oax }, { store: "Liverpool Salina Cruz", ...FIN.sal }].map(s => (
              <div key={s.store} style={{ marginBottom: 20, padding: 16, backgroundColor: C.light, borderRadius: 8 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.dark, marginBottom: 12 }}>{s.store}</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                  <div><div style={{ fontSize: 11, color: C.mid }}>Días-persona</div><div style={{ fontSize: 18, fontWeight: 600, color: C.dark }}>{s.days}</div></div>
                  <div><div style={{ fontSize: 11, color: C.mid }}>Monto esperado</div><div style={{ fontSize: 18, fontWeight: 600, color: C.dark }}>${s.expected.toLocaleString()}</div></div>
                  <div><div style={{ fontSize: 11, color: C.mid }}>Liverpool pagó</div><div style={{ fontSize: 18, fontWeight: 600, color: C.dark }}>${s.paid.toLocaleString()}</div></div>
                  <div><div style={{ fontSize: 11, color: C.mid }}>Diferencia</div><div style={{ fontSize: 18, fontWeight: 600, color: s.diff < 0 ? C.red : C.green }}>{s.diff < 0 ? "-" : ""}${Math.abs(s.diff).toLocaleString()}</div></div>
                </div>
                {s.diff < 0 && <div style={{ marginTop: 12, padding: 10, backgroundColor: C.redL, borderRadius: 6, borderLeft: `3px solid ${C.red}` }}><span style={{ fontSize: 12, color: C.red, fontWeight: 500 }}>⚠ Discrepancia: Liverpool pagó ${Math.abs(s.diff).toLocaleString()} menos de lo esperado</span></div>}
              </div>
            ))}
            <div style={{ marginTop: 16, padding: 16, backgroundColor: C.light, borderRadius: 8, borderLeft: `3px solid ${C.accent}` }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.dark, marginBottom: 8 }}>Resumen del periodo</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                <div><div style={{ fontSize: 11, color: C.mid }}>Total esperado</div><div style={{ fontSize: 20, fontWeight: 700, color: C.dark }}>${(FIN.oax.expected + FIN.sal.expected).toLocaleString()}</div></div>
                <div><div style={{ fontSize: 11, color: C.mid }}>Total recibido</div><div style={{ fontSize: 20, fontWeight: 700, color: C.dark }}>${(FIN.oax.paid + FIN.sal.paid).toLocaleString()}</div></div>
                <div><div style={{ fontSize: 11, color: C.mid }}>Diferencia neta</div><div style={{ fontSize: 20, fontWeight: 700, color: C.red }}>-$3,250</div></div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

// --- DESKTOP SHELL ---
const DesktopApp = ({ onSwitch }) => {
  const [page, setPage] = useState("dashboard");
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: C.light }}>
      <Sidebar active={page} onNav={setPage} />
      <div style={{ flex: 1, padding: 32, overflowY: "auto" }}>
        {page === "dashboard" && <DeskDash />}
        {page === "employees" && <DeskEmps />}
        {page === "attendance" && <DeskAtt />}
        {page === "supervision" && <DeskSup />}
        {page === "reports" && <DeskReports />}
      </div>
      <div onClick={onSwitch} style={{ position: "fixed", bottom: 24, right: 24, padding: "12px 20px", borderRadius: 8, backgroundColor: C.dark, color: C.white, display: "flex", alignItems: "center", gap: 8, cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.2)", fontSize: 13, fontWeight: 500 }}><I.Phone /> Vista móvil</div>
    </div>
  );
};

// ═══════════ MAIN ═══════════

export default function App() {
  const [mode, setMode] = useState(null);
  if (!mode) return <ModeSelector onSelect={setMode} />;
  if (mode === "mobile") return <MobileApp onSwitch={() => setMode("desktop")} />;
  return <DesktopApp onSwitch={() => setMode("mobile")} />;
}
