"use client";
import { useState } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// SGR SERCLIN — Demo con Datos Reales del Plan de Trabajo 2024
// Datos extraídos del archivo PLAN_DE_TRABAJO_2024.xlsx de José Arnaud
// ═══════════════════════════════════════════════════════════════════════════

const COLORS = {
  primary: "#1A1A2E",
  accent: "#D35230",
  accentLight: "#E8694A",
  green: "#2D8B4E",
  greenLight: "#E8F5E9",
  yellow: "#E6A817",
  yellowLight: "#FFF8E1",
  red: "#C62828",
  redLight: "#FFEBEE",
  blue: "#1565C0",
  blueLight: "#E3F2FD",
  bg: "#F8F6F3",
  card: "#FFFFFF",
  text: "#4A4A6A",
  textLight: "#8A8AA0",
  border: "#E8E4DF",
};

// ══════ DATOS REALES DEL EXCEL ══════
const PERSONAL_REAL = [
  { id: 1, nombre: "Soledad", apellido: "García", rol: "Operador Baños Clientes", turno: "Matutino", zona: "Baños 1er Nivel y P.B.", descanso: "Jueves", status: "activo", foto: "👩", docs: { ine: true, curp: true, nss: true, contrato: true, constancia: false } },
  { id: 2, nombre: "Ana", apellido: "López", rol: "Operador Crédito y Oficinas", turno: "Matutino", zona: "Depto. Crédito y Oficinas Gerentes", descanso: "Jueves", status: "activo", foto: "👩", docs: { ine: true, curp: true, nss: true, contrato: true, constancia: true } },
  { id: 3, nombre: "Norma Laura", apellido: "Martínez", rol: "Mopeador", turno: "Matutino", zona: "P.B. - That's It!, Hollister, American Eagle, Levi's", descanso: "Viernes", status: "activo", foto: "👩", docs: { ine: true, curp: true, nss: true, contrato: true, constancia: true } },
  { id: 4, nombre: "Victoria", apellido: "Hernández", rol: "Mopeador", turno: "Matutino", zona: "P.B. - Deportes, Zapato, Dockers, Bolsas", descanso: "Martes", status: "activo", foto: "👩", docs: { ine: true, curp: true, nss: false, contrato: true, constancia: true } },
  { id: 5, nombre: "Janeth", apellido: "Ramírez", rol: "Mopeador", turno: "Matutino", zona: "P.B. - Petite, Studio F, Banana Republic", descanso: "Viernes", status: "activo", foto: "👩", docs: { ine: true, curp: true, nss: true, contrato: true, constancia: false } },
  { id: 6, nombre: "Gaudencia", apellido: "Ruiz", rol: "Mopeador", turno: "Matutino", zona: "P.B. - Calvin Klein, Julio, Tommy Hilfiger", descanso: "Miércoles", status: "activo", foto: "👩", docs: { ine: true, curp: true, nss: true, contrato: true, constancia: true } },
  { id: 7, nombre: "Marcos", apellido: "Vásquez", rol: "Mopeador / Andenes", turno: "Matutino", zona: "P.B. - Cosméticos, Perfumería", descanso: "Miércoles", status: "activo", foto: "👨", docs: { ine: true, curp: true, nss: true, contrato: true, constancia: true } },
  { id: 8, nombre: "José Luis", apellido: "Santos", rol: "Mopeador / Exterior", turno: "Matutino", zona: "P.B. - Joyería, Relojería, Escaleras", descanso: "Martes", status: "activo", foto: "👨", docs: { ine: true, curp: false, nss: true, contrato: true, constancia: true } },
  { id: 9, nombre: "Sonia", apellido: "Mendoza", rol: "Baños / Vespertino", turno: "Vespertino", zona: "Baños Clientes 1er Nivel y P.B.", descanso: "Martes", status: "activo", foto: "👩", docs: { ine: true, curp: true, nss: true, contrato: true, constancia: true } },
  { id: 10, nombre: "Isabel", apellido: "Cruz", rol: "Limpieza 1er Nivel", turno: "Vespertino", zona: "Áreas 1er Nivel completo", descanso: "Miércoles", status: "activo", foto: "👩", docs: { ine: true, curp: true, nss: true, contrato: false, constancia: true } },
  { id: 11, nombre: "María de la Luz", apellido: "Pérez", rol: "Recolección Basura", turno: "Vespertino", zona: "P.B. y 1er Nivel - Bodegas, Entradas", descanso: "Lunes", status: "activo", foto: "👩", docs: { ine: true, curp: true, nss: true, contrato: true, constancia: false } },
  { id: 12, nombre: "Uriel", apellido: "Díaz", rol: "Pulidor", turno: "Matutino", zona: "1er Nivel - Pulido completo", descanso: "Viernes", status: "activo", foto: "👨", docs: { ine: true, curp: true, nss: true, contrato: true, constancia: true } },
  { id: 13, nombre: "Carlos", apellido: "Rivera", rol: "Pulidor (Liverpool)", turno: "Matutino", zona: "P.B. - Pulido completo", descanso: "Martes", status: "activo", foto: "👨", docs: { ine: true, curp: true, nss: true, contrato: true, constancia: true } },
  { id: 14, nombre: "Luis", apellido: "Ortega", rol: "Pulidor (Liverpool)", turno: "Matutino", zona: "P.B. - Pulido + Mantenimiento", descanso: "Jueves", status: "activo", foto: "👨", docs: { ine: true, curp: true, nss: true, contrato: true, constancia: true } },
];

const ZONAS_TIENDA = {
  "Planta Baja": [
    "Cosméticos y Perfumería", "Joyería y Relojería", "Deportes y Ropa Deportiva",
    "Dama (Petite, Studio F, Banana Republic, Julio)", "Caballero (Calvin Klein, Tommy Hilfiger, Polo)",
    "Dulcería", "Esclusas entrada principal", "Esclusas Deportes",
    "Cajas 1, 2 y 3", "Módulo Crédito", "Escaleras eléctricas"
  ],
  "1er Nivel": [
    "Electrodomésticos", "Blancos", "Niños y Bebés", "Muebles y Camas",
    "Juguetes y Electrónicos", "Óptica", "Línea Blanca", "Computación",
    "Cajas 2 y Principal", "Comedor Empleados"
  ],
  "3er Nivel / Andenes": ["Andén 1er Nivel", "Andén 3er Nivel", "Bodegas", "Tapanco"],
  "Exteriores": ["Azotea", "Banqueta", "Estacionamiento", "Áreas Verdes", "Pluviales"]
};

const ACTIVIDADES_REALES = {
  "Mopeado y Trapeado": { frecuencia: "2x diario", areas: ["P.B.", "1er Nivel"] },
  "Lavado de Baños Clientes": { frecuencia: "3x diario", areas: ["P.B. Damas", "P.B. Caballeros", "1er Nivel Damas", "1er Nivel Caballeros"] },
  "Revisión de Baños": { frecuencia: "Cada 2-3 hrs", areas: ["Todos los baños"] },
  "Recolección de Basura": { frecuencia: "Continuo", areas: ["Botes de piso", "Bodegas", "Entradas"] },
  "Pulido de Pisos": { frecuencia: "1x diario", areas: ["P.B.", "1er Nivel"] },
  "Limpieza Esclusas": { frecuencia: "1x diario", areas: ["Entrada Principal", "Deportes"] },
  "Limpieza Oficinas": { frecuencia: "1x diario", areas: ["Crédito", "Gerentes", "RH", "Enfermería"] },
  "Limpieza Comedor": { frecuencia: "2x diario", areas: ["Comedor Empleados 3er Nivel"] },
  "Mantenimiento General": { frecuencia: "Según necesidad", areas: ["Toda la tienda"] },
};

// Supervisión data - evaluaciones recientes simuladas con datos reales
const EVALUACIONES = [
  { id: 1, zona: "Baños P.B. Damas", evaluador: "Luis Ángel (Supervisor)", fecha: "06/02/2026 08:45", calif: 9, notas: "Excelente estado. Jaboneras llenas, pisos secos.", operario: "Soledad García" },
  { id: 2, zona: "Esclusas Entrada Principal", evaluador: "Luis Ángel (Supervisor)", fecha: "06/02/2026 09:30", calif: 7, notas: "Vidrios bien, falta aspirar tapetes de entrada.", operario: "Ana López" },
  { id: 3, zona: "P.B. - Deportes", evaluador: "Luis Ángel (Supervisor)", fecha: "06/02/2026 10:15", calif: 8, notas: "Mopeado correcto. Probadores revisados.", operario: "Victoria Hernández" },
  { id: 4, zona: "1er Nivel - Blancos", evaluador: "Luis Ángel (Supervisor)", fecha: "06/02/2026 10:50", calif: 6, notas: "Fronteras sin aspirar. Falta mover muebles en isla.", operario: "Victoria Hernández" },
  { id: 5, zona: "Baños 1er Nivel Caballeros", evaluador: "Luis Ángel (Supervisor)", fecha: "06/02/2026 12:30", calif: 9, notas: "Todo en orden. Revisión post-lavado correcta.", operario: "Soledad García" },
  { id: 6, zona: "Comedor Empleados", evaluador: "Luis Ángel (Supervisor)", fecha: "06/02/2026 14:00", calif: 8, notas: "Mesas limpias, microondas revisado. Falta limpiar refrigerador.", operario: "Janeth Ramírez" },
];

const INCIDENCIAS = [
  { id: "INC-001", tipo: "Mantenimiento", desc: "Chapa de puerta bodega P.B. no cierra correctamente", zona: "P.B. - Bodega Dulcería", reporta: "Marcos Vásquez", fecha: "05/02/2026", status: "En proceso", asignado: "Uriel Díaz (Pulidor/Mtto)", prioridad: "Media" },
  { id: "INC-002", tipo: "Limpieza", desc: "Derrame de líquido en pasillo de Electrodomésticos", zona: "1er Nivel - Electrodomésticos", reporta: "Ana López", fecha: "06/02/2026", status: "Resuelto", asignado: "Norma Laura Martínez", prioridad: "Alta" },
  { id: "INC-003", tipo: "Mantenimiento", desc: "Secador de manos baño clientes P.B. damas no funciona", zona: "Baños P.B. Damas", reporta: "Soledad García", fecha: "06/02/2026", status: "Abierto", asignado: "Pendiente", prioridad: "Alta" },
  { id: "INC-004", tipo: "Insumos", desc: "Jabón de manos agotado en entrada de personal", zona: "Entrada Personal", reporta: "Gaudencia Ruiz", fecha: "06/02/2026", status: "Resuelto", asignado: "Gaudencia Ruiz", prioridad: "Media" },
];

// ══════ COMPONENTS ══════
const Badge = ({ children, color = COLORS.accent, bg = "#FFF3F0" }) => (
  <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 12, fontSize: 11, fontWeight: 600, color, background: bg, whiteSpace: "nowrap" }}>{children}</span>
);

const StatCard = ({ icon, value, label, color = COLORS.accent, trend }) => (
  <div style={{ background: COLORS.card, borderRadius: 12, padding: "16px 20px", border: `1px solid ${COLORS.border}`, flex: "1 1 140px", minWidth: 140 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
      <span style={{ fontSize: 20 }}>{icon}</span>
      <span style={{ fontSize: 24, fontWeight: 700, color }}>{value}</span>
    </div>
    <div style={{ fontSize: 12, color: COLORS.textLight }}>{label}</div>
    {trend && <div style={{ fontSize: 11, color: trend > 0 ? COLORS.green : COLORS.red, marginTop: 4 }}>{trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% vs semana anterior</div>}
  </div>
);

const ProgressBar = ({ value, max = 100, color = COLORS.green }) => (
  <div style={{ width: "100%", height: 6, background: "#E8E4DF", borderRadius: 3 }}>
    <div style={{ width: `${(value/max)*100}%`, height: "100%", background: color, borderRadius: 3, transition: "width 0.5s" }} />
  </div>
);

// ══════ MAIN APP ══════
export default function SGRSerclinDemo() {
  const [mode, setMode] = useState(null); // null = selector, "admin", "supervisor"
  const [section, setSection] = useState("dashboard");
  const [isMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedEval, setSelectedEval] = useState(null);

  if (!mode) {
    return (
      <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${COLORS.primary} 0%, #2A2A4E 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 14, letterSpacing: 4, color: COLORS.accentLight, textTransform: "uppercase", marginBottom: 12 }}>Sistema de Gestión de Resultados</div>
          <div style={{ fontSize: 42, fontWeight: 800, color: "#FFF", marginBottom: 8 }}>SGR <span style={{ color: COLORS.accent }}>SERCLIN</span></div>
          <div style={{ fontSize: 15, color: "#8A8AB0" }}>Liverpool Oaxaca — Demo con datos reales</div>
        </div>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { id: "admin", icon: "💼", title: "Vista Administrador", desc: "José Arnaud — Directorio, Dashboard, Reportes ejecutivos", color: COLORS.accent },
            { id: "supervisor", icon: "📋", title: "Vista Supervisor", desc: "Luis Ángel — Rondas de evaluación, Incidencias, Operación diaria", color: COLORS.blue },
          ].map(m => (
            <button key={m.id} onClick={() => { setMode(m.id); setSection("dashboard"); }} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: "32px 28px", width: 280, cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.borderColor = m.color; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{m.icon}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#FFF", marginBottom: 8 }}>{m.title}</div>
              <div style={{ fontSize: 13, color: "#8A8AB0", lineHeight: 1.5 }}>{m.desc}</div>
            </button>
          ))}
        </div>
        <div style={{ marginTop: 48, padding: "12px 20px", background: "rgba(211,82,48,0.15)", borderRadius: 8, border: "1px solid rgba(211,82,48,0.3)" }}>
          <span style={{ fontSize: 12, color: COLORS.accentLight }}>📊 Datos alimentados del Plan de Trabajo 2024 — 15 operarios, 2 turnos, 4 zonas principales</span>
        </div>
      </div>
    );
  }

  const navItems = mode === "admin" 
    ? [
        { id: "dashboard", icon: "📊", label: "Dashboard" },
        { id: "directorio", icon: "👥", label: "Directorio" },
        { id: "operacion", icon: "🔄", label: "Operación" },
        { id: "supervision", icon: "✅", label: "Supervisión" },
        { id: "incidencias", icon: "⚠️", label: "Incidencias" },
        { id: "reportes", icon: "📈", label: "Reportes" },
      ]
    : [
        { id: "dashboard", icon: "📊", label: "Mi Turno" },
        { id: "supervision", icon: "✅", label: "Evaluar" },
        { id: "incidencias", icon: "⚠️", label: "Incidencias" },
        { id: "operacion", icon: "🔄", label: "Programa" },
      ];

  const renderContent = () => {
    switch(section) {
      case "dashboard": return mode === "admin" ? <DashboardAdmin /> : <DashboardSupervisor />;
      case "directorio": return <Directorio selectedPerson={selectedPerson} setSelectedPerson={setSelectedPerson} />;
      case "operacion": return <Operacion />;
      case "supervision": return <Supervision selectedEval={selectedEval} setSelectedEval={setSelectedEval} />;
      case "incidencias": return <Incidencias />;
      case "reportes": return <Reportes />;
      default: return <DashboardAdmin />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      {/* TOP BAR */}
      <div style={{ background: COLORS.primary, padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setMode(null)} style={{ background: "none", border: "none", color: "#8A8AB0", cursor: "pointer", fontSize: 18, padding: 4 }}>←</button>
          <span style={{ fontSize: 16, fontWeight: 700, color: "#FFF" }}>SGR <span style={{ color: COLORS.accent }}>SERCLIN</span></span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, color: "#8A8AB0" }}>{mode === "admin" ? "José Arnaud" : "Luis Ángel"}</span>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>
            {mode === "admin" ? "JA" : "LA"}
          </div>
        </div>
      </div>

      {/* NAV */}
      <div style={{ background: COLORS.card, borderBottom: `1px solid ${COLORS.border}`, display: "flex", overflowX: "auto", padding: "0 8px" }}>
        {navItems.map(item => (
          <button key={item.id} onClick={() => { setSection(item.id); setSelectedPerson(null); setSelectedEval(null); }}
            style={{ flex: "none", padding: "12px 16px", background: "none", border: "none", borderBottom: section === item.id ? `3px solid ${COLORS.accent}` : "3px solid transparent",
              cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: section === item.id ? 600 : 400,
              color: section === item.id ? COLORS.accent : COLORS.textLight, whiteSpace: "nowrap", transition: "all 0.2s" }}>
            <span>{item.icon}</span> {item.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ padding: "20px 16px", maxWidth: 1100, margin: "0 auto" }}>
        {renderContent()}
      </div>
    </div>
  );
}

// ══════ DASHBOARD ADMIN ══════
function DashboardAdmin() {
  const hoy = "Jueves 06 de Febrero, 2026";
  const descansoHoy = PERSONAL_REAL.filter(p => p.descanso === "Jueves");
  const activosHoy = PERSONAL_REAL.length - descansoHoy.length;
  
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: COLORS.primary, margin: 0 }}>Dashboard Ejecutivo</h2>
        <p style={{ fontSize: 13, color: COLORS.textLight, margin: "4px 0 0" }}>{hoy} — Liverpool Oaxaca</p>
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
        <StatCard icon="👥" value={activosHoy} label={`Operarios activos hoy (${descansoHoy.length} en descanso)`} color={COLORS.green} />
        <StatCard icon="✅" value="78%" label="Actividades completadas del turno matutino" color={COLORS.green} trend={5} />
        <StatCard icon="⭐" value="8.1" label="Calificación promedio supervisión" color={COLORS.blue} trend={3} />
        <StatCard icon="⚠️" value="2" label="Incidencias abiertas" color={COLORS.red} />
      </div>

      {/* Who's off today */}
      <div style={{ background: COLORS.yellowLight, borderRadius: 12, padding: 16, marginBottom: 20, border: `1px solid #F0D68A` }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.primary, marginBottom: 8 }}>📅 Descansan hoy (Jueves):</div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {descansoHoy.map(p => (
            <span key={p.id} style={{ fontSize: 12, color: COLORS.text, background: "#FFF", padding: "4px 12px", borderRadius: 8 }}>
              {p.foto} {p.nombre} {p.apellido} — <span style={{ color: COLORS.textLight }}>{p.rol}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Activity progress by zone */}
      <div style={{ background: COLORS.card, borderRadius: 12, padding: 20, border: `1px solid ${COLORS.border}`, marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: COLORS.primary, margin: "0 0 16px" }}>Avance por zona — Turno Matutino</h3>
        {[
          { zona: "Planta Baja", progreso: 82, operarios: "Norma Laura, Victoria, Janeth, Gaudencia, Marcos, José Luis" },
          { zona: "1er Nivel", progreso: 71, operarios: "Norma Laura, Victoria, Janeth, Gaudencia, Marcos, José Luis (2da ronda)" },
          { zona: "Baños Clientes", progreso: 90, operarios: "Soledad García" },
          { zona: "Oficinas y Crédito", progreso: 85, operarios: "Ana López" },
          { zona: "Exteriores y Azotea", progreso: 60, operarios: "José Luis Santos" },
        ].map((z, i) => (
          <div key={i} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: COLORS.text }}>{z.zona}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: z.progreso >= 80 ? COLORS.green : z.progreso >= 60 ? COLORS.yellow : COLORS.red }}>{z.progreso}%</span>
            </div>
            <ProgressBar value={z.progreso} color={z.progreso >= 80 ? COLORS.green : z.progreso >= 60 ? COLORS.yellow : COLORS.red} />
            <div style={{ fontSize: 11, color: COLORS.textLight, marginTop: 2 }}>{z.operarios}</div>
          </div>
        ))}
      </div>

      {/* Recent evaluations */}
      <div style={{ background: COLORS.card, borderRadius: 12, padding: 20, border: `1px solid ${COLORS.border}` }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: COLORS.primary, margin: "0 0 16px" }}>Últimas evaluaciones de supervisión</h3>
        {EVALUACIONES.slice(0, 4).map(e => (
          <div key={e.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: e.calif >= 8 ? COLORS.greenLight : e.calif >= 6 ? COLORS.yellowLight : COLORS.redLight,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, 
              color: e.calif >= 8 ? COLORS.green : e.calif >= 6 ? COLORS.yellow : COLORS.red, flexShrink: 0 }}>
              {e.calif}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.primary }}>{e.zona}</div>
              <div style={{ fontSize: 11, color: COLORS.textLight }}>{e.operario} — {e.fecha}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════ DASHBOARD SUPERVISOR ══════
function DashboardSupervisor() {
  const pendientes = [
    { hora: "15:00", actividad: "Revisión Baños Clientes 1er Nivel y P.B.", tipo: "Evaluación" },
    { hora: "16:30", actividad: "Revisión Baños Empleados 3er Nivel", tipo: "Evaluación" },
    { hora: "17:00", actividad: "Comida", tipo: "Break" },
    { hora: "18:00", actividad: "Lavado Baños Clientes 1er Nivel y P.B.", tipo: "Supervisar" },
    { hora: "19:00", actividad: "Revisión Baños Clientes 1er Nivel y P.B.", tipo: "Evaluación" },
  ];

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: COLORS.primary, margin: 0 }}>Mi Turno — Vespertino</h2>
        <p style={{ fontSize: 13, color: COLORS.textLight, margin: "4px 0 0" }}>Jueves 06 Feb 2026 — Sonia (Baños + Supervisión)</p>
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
        <StatCard icon="📋" value="3" label="Evaluaciones completadas" color={COLORS.green} />
        <StatCard icon="⏳" value="5" label="Actividades pendientes hoy" color={COLORS.yellow} />
        <StatCard icon="⚠️" value="1" label="Incidencia reportada" color={COLORS.red} />
      </div>

      <div style={{ background: COLORS.card, borderRadius: 12, padding: 20, border: `1px solid ${COLORS.border}`, marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: COLORS.primary, margin: "0 0 16px" }}>Programa restante del día</h3>
        {pendientes.map((p, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < pendientes.length - 1 ? `1px solid ${COLORS.border}` : "none" }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.primary, width: 50 }}>{p.hora}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: COLORS.text }}>{p.actividad}</div>
            </div>
            <Badge color={p.tipo === "Evaluación" ? COLORS.blue : p.tipo === "Break" ? COLORS.textLight : COLORS.green}
              bg={p.tipo === "Evaluación" ? COLORS.blueLight : p.tipo === "Break" ? "#F0F0F0" : COLORS.greenLight}>
              {p.tipo}
            </Badge>
          </div>
        ))}
      </div>

      <button style={{ width: "100%", padding: 16, background: COLORS.accent, color: "#FFF", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: "pointer" }}>
        📋 Iniciar Nueva Evaluación
      </button>
    </div>
  );
}

// ══════ DIRECTORIO ══════
function Directorio({ selectedPerson, setSelectedPerson }) {
  const [filter, setFilter] = useState("todos");

  if (selectedPerson) {
    const p = PERSONAL_REAL.find(x => x.id === selectedPerson);
    const totalDocs = Object.keys(p.docs).length;
    const completeDocs = Object.values(p.docs).filter(Boolean).length;
    return (
      <div>
        <button onClick={() => setSelectedPerson(null)} style={{ background: "none", border: "none", color: COLORS.accent, cursor: "pointer", fontSize: 13, marginBottom: 16, padding: 0 }}>← Volver al directorio</button>
        <div style={{ background: COLORS.card, borderRadius: 12, padding: 24, border: `1px solid ${COLORS.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: COLORS.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>{p.foto}</div>
            <div>
              <h3 style={{ margin: 0, fontSize: 20, color: COLORS.primary }}>{p.nombre} {p.apellido}</h3>
              <div style={{ fontSize: 13, color: COLORS.textLight }}>{p.rol} — Turno {p.turno}</div>
              <Badge color={COLORS.green} bg={COLORS.greenLight}>Activo</Badge>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            <div style={{ padding: 12, background: COLORS.bg, borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: COLORS.textLight }}>Zona asignada</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.text }}>{p.zona}</div>
            </div>
            <div style={{ padding: 12, background: COLORS.bg, borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: COLORS.textLight }}>Día de descanso</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.text }}>{p.descanso}</div>
            </div>
          </div>
          <h4 style={{ fontSize: 14, fontWeight: 600, color: COLORS.primary, margin: "0 0 12px" }}>Expediente Digital ({completeDocs}/{totalDocs})</h4>
          <ProgressBar value={completeDocs} max={totalDocs} color={completeDocs === totalDocs ? COLORS.green : COLORS.yellow} />
          <div style={{ marginTop: 12 }}>
            {Object.entries(p.docs).map(([doc, ok]) => (
              <div key={doc} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                <span style={{ fontSize: 14 }}>{ok ? "✅" : "❌"}</span>
                <span style={{ fontSize: 13, color: COLORS.text, textTransform: "uppercase" }}>{doc}</span>
                {!ok && <Badge color={COLORS.red} bg={COLORS.redLight}>Pendiente</Badge>}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const filtered = filter === "todos" ? PERSONAL_REAL : PERSONAL_REAL.filter(p => p.turno.toLowerCase() === filter);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: COLORS.primary, margin: 0 }}>Directorio de Personal</h2>
        <span style={{ fontSize: 12, color: COLORS.textLight }}>{PERSONAL_REAL.length} empleados registrados</span>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["todos", "matutino", "vespertino"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: "6px 16px", borderRadius: 20, border: `1px solid ${filter === f ? COLORS.accent : COLORS.border}`,
              background: filter === f ? COLORS.accent : COLORS.card, color: filter === f ? "#FFF" : COLORS.text,
              fontSize: 12, fontWeight: 500, cursor: "pointer", textTransform: "capitalize" }}>
            {f}
          </button>
        ))}
      </div>
      {filtered.map(p => {
        const totalDocs = Object.keys(p.docs).length;
        const completeDocs = Object.values(p.docs).filter(Boolean).length;
        return (
          <div key={p.id} onClick={() => setSelectedPerson(p.id)}
            style={{ background: COLORS.card, borderRadius: 10, padding: "14px 16px", border: `1px solid ${COLORS.border}`, marginBottom: 8,
              cursor: "pointer", display: "flex", alignItems: "center", gap: 12, transition: "all 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.accent}
            onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: COLORS.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{p.foto}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: COLORS.primary }}>{p.nombre} {p.apellido}</div>
              <div style={{ fontSize: 11, color: COLORS.textLight }}>{p.rol} — {p.turno} — Desc: {p.descanso}</div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: completeDocs === totalDocs ? COLORS.green : COLORS.yellow }}>{completeDocs}/{totalDocs} docs</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ══════ OPERACIÓN ══════
function Operacion() {
  const [selectedZone, setSelectedZone] = useState(null);
  
  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: COLORS.primary, margin: "0 0 8px" }}>Programa de Operación</h2>
      <p style={{ fontSize: 13, color: COLORS.textLight, margin: "0 0 20px" }}>Zonas y actividades de Liverpool Oaxaca</p>

      {!selectedZone ? (
        <>
          {Object.entries(ZONAS_TIENDA).map(([zona, areas]) => (
            <div key={zona} onClick={() => setSelectedZone(zona)}
              style={{ background: COLORS.card, borderRadius: 12, padding: 16, border: `1px solid ${COLORS.border}`, marginBottom: 12, cursor: "pointer", transition: "all 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.accent}
              onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <h3 style={{ margin: 0, fontSize: 16, color: COLORS.primary }}>{zona}</h3>
                <Badge>{areas.length} áreas</Badge>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {areas.slice(0, 4).map(a => (
                  <span key={a} style={{ fontSize: 11, padding: "3px 8px", background: COLORS.bg, borderRadius: 6, color: COLORS.textLight }}>{a}</span>
                ))}
                {areas.length > 4 && <span style={{ fontSize: 11, padding: "3px 8px", color: COLORS.accent }}>+{areas.length - 4} más</span>}
              </div>
            </div>
          ))}

          <div style={{ background: COLORS.card, borderRadius: 12, padding: 20, border: `1px solid ${COLORS.border}`, marginTop: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: COLORS.primary, margin: "0 0 16px" }}>Catálogo de Actividades</h3>
            {Object.entries(ACTIVIDADES_REALES).map(([act, data]) => (
              <div key={act} style={{ padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: COLORS.text }}>{act}</span>
                  <Badge color={COLORS.blue} bg={COLORS.blueLight}>{data.frecuencia}</Badge>
                </div>
                <div style={{ fontSize: 11, color: COLORS.textLight, marginTop: 4 }}>Áreas: {data.areas.join(", ")}</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <button onClick={() => setSelectedZone(null)} style={{ background: "none", border: "none", color: COLORS.accent, cursor: "pointer", fontSize: 13, padding: 0, marginBottom: 16 }}>← Volver a zonas</button>
          <h3 style={{ fontSize: 18, color: COLORS.primary, margin: "0 0 16px" }}>{selectedZone}</h3>
          {ZONAS_TIENDA[selectedZone].map((area, i) => (
            <div key={i} style={{ background: COLORS.card, borderRadius: 10, padding: "14px 16px", border: `1px solid ${COLORS.border}`, marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: COLORS.text }}>{area}</span>
              <Badge color={COLORS.green} bg={COLORS.greenLight}>Cubierta</Badge>
            </div>
          ))}
          <div style={{ background: COLORS.blueLight, borderRadius: 12, padding: 16, marginTop: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.blue, marginBottom: 8 }}>Operarios asignados a {selectedZone}:</div>
            {PERSONAL_REAL.filter(p => p.zona.includes(selectedZone.split(" ")[0]) || (selectedZone === "Exteriores" && (p.rol.includes("Exterior") || p.rol.includes("Azotea")))).map(p => (
              <div key={p.id} style={{ fontSize: 12, color: COLORS.text, padding: "4px 0" }}>{p.foto} {p.nombre} {p.apellido} — {p.rol}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ══════ SUPERVISIÓN ══════
function Supervision({ selectedEval, setSelectedEval }) {
  if (selectedEval) {
    const e = EVALUACIONES.find(x => x.id === selectedEval);
    return (
      <div>
        <button onClick={() => setSelectedEval(null)} style={{ background: "none", border: "none", color: COLORS.accent, cursor: "pointer", fontSize: 13, padding: 0, marginBottom: 16 }}>← Volver</button>
        <div style={{ background: COLORS.card, borderRadius: 12, padding: 24, border: `1px solid ${COLORS.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div>
              <h3 style={{ margin: "0 0 4px", fontSize: 18, color: COLORS.primary }}>{e.zona}</h3>
              <div style={{ fontSize: 12, color: COLORS.textLight }}>{e.fecha} — {e.evaluador}</div>
            </div>
            <div style={{ width: 56, height: 56, borderRadius: "50%", 
              background: e.calif >= 8 ? COLORS.greenLight : e.calif >= 6 ? COLORS.yellowLight : COLORS.redLight,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700,
              color: e.calif >= 8 ? COLORS.green : e.calif >= 6 ? COLORS.yellow : COLORS.red }}>
              {e.calif}
            </div>
          </div>
          <div style={{ padding: 16, background: COLORS.bg, borderRadius: 8, marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: COLORS.textLight, marginBottom: 4 }}>Observaciones</div>
            <div style={{ fontSize: 14, color: COLORS.text }}>{e.notas}</div>
          </div>
          <div style={{ padding: 16, background: COLORS.bg, borderRadius: 8, marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: COLORS.textLight, marginBottom: 4 }}>Operario evaluado</div>
            <div style={{ fontSize: 14, color: COLORS.text }}>{e.operario}</div>
          </div>
          <div style={{ padding: 16, background: COLORS.bg, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", height: 120, color: COLORS.textLight }}>
            📷 Fotoevidencia (simulada)
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: COLORS.primary, margin: "0 0 8px" }}>Supervisión y Evaluaciones</h2>
      <p style={{ fontSize: 13, color: COLORS.textLight, margin: "0 0 20px" }}>Rondas de evaluación con calificación 1-10</p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
        <StatCard icon="⭐" value="8.1" label="Promedio general" color={COLORS.blue} />
        <StatCard icon="📋" value={EVALUACIONES.length} label="Evaluaciones hoy" color={COLORS.green} />
        <StatCard icon="📸" value={EVALUACIONES.length} label="Con fotoevidencia" color={COLORS.accent} />
      </div>

      {EVALUACIONES.map(e => (
        <div key={e.id} onClick={() => setSelectedEval(e.id)}
          style={{ background: COLORS.card, borderRadius: 10, padding: "14px 16px", border: `1px solid ${COLORS.border}`, marginBottom: 8,
            cursor: "pointer", display: "flex", alignItems: "center", gap: 12, transition: "all 0.15s" }}
          onMouseEnter={ev => ev.currentTarget.style.borderColor = COLORS.accent}
          onMouseLeave={ev => ev.currentTarget.style.borderColor = COLORS.border}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
            background: e.calif >= 8 ? COLORS.greenLight : e.calif >= 6 ? COLORS.yellowLight : COLORS.redLight,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700,
            color: e.calif >= 8 ? COLORS.green : e.calif >= 6 ? COLORS.yellow : COLORS.red }}>
            {e.calif}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.primary }}>{e.zona}</div>
            <div style={{ fontSize: 11, color: COLORS.textLight }}>{e.operario} — {e.fecha}</div>
          </div>
          <span style={{ fontSize: 14, color: COLORS.textLight }}>→</span>
        </div>
      ))}
    </div>
  );
}

// ══════ INCIDENCIAS ══════
function Incidencias() {
  const statusColors = { "Abierto": { c: COLORS.red, bg: COLORS.redLight }, "En proceso": { c: COLORS.yellow, bg: COLORS.yellowLight }, "Resuelto": { c: COLORS.green, bg: COLORS.greenLight } };
  
  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: COLORS.primary, margin: "0 0 8px" }}>Incidencias</h2>
      <p style={{ fontSize: 13, color: COLORS.textLight, margin: "0 0 20px" }}>Seguimiento de reportes y mantenimiento</p>

      {INCIDENCIAS.map(inc => {
        const sc = statusColors[inc.status] || statusColors["Abierto"];
        return (
          <div key={inc.id} style={{ background: COLORS.card, borderRadius: 12, padding: 16, border: `1px solid ${COLORS.border}`, marginBottom: 12, borderLeft: `4px solid ${sc.c}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <span style={{ fontSize: 11, color: COLORS.textLight, fontFamily: "monospace" }}>{inc.id}</span>
                <Badge color={inc.prioridad === "Alta" ? COLORS.red : COLORS.yellow} bg={inc.prioridad === "Alta" ? COLORS.redLight : COLORS.yellowLight}>{inc.prioridad}</Badge>
              </div>
              <Badge color={sc.c} bg={sc.bg}>{inc.status}</Badge>
            </div>
            <div style={{ fontSize: 14, fontWeight: 500, color: COLORS.primary, marginBottom: 6 }}>{inc.desc}</div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 12, color: COLORS.textLight }}>
              <span>📍 {inc.zona}</span>
              <span>👤 {inc.reporta}</span>
              <span>🔧 {inc.asignado}</span>
              <span>📅 {inc.fecha}</span>
            </div>
          </div>
        );
      })}

      <button style={{ width: "100%", padding: 14, background: COLORS.accent, color: "#FFF", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 8 }}>
        + Reportar Nueva Incidencia
      </button>
    </div>
  );
}

// ══════ REPORTES ══════
function Reportes() {
  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: COLORS.primary, margin: "0 0 8px" }}>Reportes Ejecutivos</h2>
      <p style={{ fontSize: 13, color: COLORS.textLight, margin: "0 0 20px" }}>Informes semanales y métricas de desempeño</p>

      <div style={{ background: COLORS.card, borderRadius: 12, padding: 20, border: `1px solid ${COLORS.border}`, marginBottom: 16 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: COLORS.primary, margin: "0 0 16px" }}>Resumen Semanal — Semana 6, 2026</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { label: "Evaluaciones realizadas", value: "42", icon: "📋" },
            { label: "Calificación promedio", value: "8.1", icon: "⭐" },
            { label: "Incidencias resueltas", value: "12/15", icon: "✅" },
            { label: "Asistencia del equipo", value: "96%", icon: "👥" },
            { label: "Actividades completadas", value: "89%", icon: "📊" },
            { label: "Tiempo respuesta incidencias", value: "2.3 hrs", icon: "⏱️" },
          ].map((m, i) => (
            <div key={i} style={{ padding: 14, background: COLORS.bg, borderRadius: 8 }}>
              <div style={{ fontSize: 12, color: COLORS.textLight, marginBottom: 4 }}>{m.icon} {m.label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.primary }}>{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: COLORS.card, borderRadius: 12, padding: 20, border: `1px solid ${COLORS.border}`, marginBottom: 16 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: COLORS.primary, margin: "0 0 16px" }}>Top 5 Operarios — Por calificación</h3>
        {[
          { nombre: "Ana López", calif: 9.2, eval: 8, zona: "Oficinas y Crédito" },
          { nombre: "Soledad García", calif: 9.0, eval: 12, zona: "Baños Clientes" },
          { nombre: "Gaudencia Ruiz", calif: 8.7, eval: 6, zona: "P.B. Caballero" },
          { nombre: "Marcos Vásquez", calif: 8.5, eval: 7, zona: "Cosméticos / Andenes" },
          { nombre: "Uriel Díaz", calif: 8.4, eval: 5, zona: "Pulido 1er Nivel" },
        ].map((op, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: i < 3 ? COLORS.accent : COLORS.bg, color: i < 3 ? "#FFF" : COLORS.text,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.primary }}>{op.nombre}</div>
              <div style={{ fontSize: 11, color: COLORS.textLight }}>{op.zona} — {op.eval} evaluaciones</div>
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.green }}>{op.calif}</div>
          </div>
        ))}
      </div>

      <div style={{ background: COLORS.blueLight, borderRadius: 12, padding: 16, border: `1px solid #90CAF9` }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.blue, marginBottom: 8 }}>💡 Este reporte puede compartirse con Liverpool</div>
        <div style={{ fontSize: 12, color: COLORS.text }}>Los reportes semanales se generan automáticamente y pueden enviarse por correo o consultarse desde el portal web, dando visibilidad total al cliente sobre la calidad del servicio de limpieza.</div>
      </div>
    </div>
  );
}
