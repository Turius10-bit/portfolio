import "./App.css";
import { useState, useEffect, useRef } from "react";
import { SiHtml5, SiJavascript, SiReact, SiPython, SiFlask, SiDjango, SiSqlite, SiGit, SiGithub, SiLinux, SiMysql, SiSqlalchemy, SiGunicorn, SiJinja, SiVite, SiChartdotjs } from "react-icons/si";
import { FaWindows, FaCss3Alt } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import { Home, User, Code2, Briefcase, FolderGit2, Mail, Sun, Moon, Download, Github, Phone, MapPin, Globe, ExternalLink } from "lucide-react";

/* ---------- Contenu bilingue ---------- */
const T = {
  fr: {
    nav: ["Accueil", "À propos", "Technologies", "Expérience", "Projets", "Contact"],
    hello: "Bonjour, je suis",
    role: "Développeur Full Stack & étudiant en informatique",
    cta: "Télécharger mon CV",
    contactBtn: "Me contacter",
    aboutT: "À propos de moi",
    about:
      "Étudiant en informatique diplômé et passionné par le développement web, je suis actuellement à la recherche d'une opportunité (poste junior ou de préférence à distance) qui me permettra de mettre en pratique mes compétences en HTML, CSS, JavaScript, React et Python, de relever de nouveaux défis techniques, de travailler sur des projets à impact réel et de m'intégrer pleinement dans une équipe de développement motivée, tout en continuant à apprendre, à progresser et à partager ma curiosité chaque jour.",
    techT: "Technologies",
    expT: "Expérience",
    exp: [{ role: "Stagiaire développeur web", org: "Honey — Antananarivo", desc: "Stage de fin d'études : conception et développement d'applications web, travail en équipe et découverte des méthodes de travail en entreprise." }],
    projT: "Projets",
    projects: [
      { name: "Website", desc: "Application web Flask : base de données MySQL via SQLAlchemy, migrations, formulaires sécurisés et envoi d'e-mails.", url: "https://github.com/Turius10-bit/Website", img: "/screens/website.png" },
      { name: "DevisPro", desc: "Application de gestion de devis développée avec Flask : création, suivi et gestion des devis clients.", url: "https://github.com/Turius10-bit/devispro", img: "/screens/devispro.png" },
      { name: "FinanceCompta Pro", desc: "Application de gestion financière et comptable en React : tableau de bord, plan comptable, budgets, dépenses, rapports, import/export Excel et CSV, avec une base SQLite embarquée (sql.js).", url: "https://github.com/Turius10-bit/financeCompta-pro", img: "/screens/financeCompta-pro.png" },
      { name: "Task Manager", desc: "Gestionnaire de tâches full-stack : React côté interface, API Flask et base SQLite. Statuts, priorités, catégories, échéances, tableau de bord de statistiques et mode sombre.", url: "https://github.com/Turius10-bit/task_manager", img: "/screens/Taskmanager.png" },
    ],
    code: "Voir le code",
    stackT: "Technologies utilisées",
    contactT: "Contact",
    contactP: "Une opportunité ou une idée de projet ? Écrivons-nous.",
    langs: "Langues : Malagasy (maternelle) · Français (courant) · Anglais (bonne compréhension)",
  },
  en: {
    nav: ["Home", "About", "Technologies", "Experience", "Projects", "Contact"],
    hello: "Hi, I'm",
    role: "Web developer & computer science student",
    cta: "Download my CV",
    contactBtn: "Contact me",
    aboutT: "About me",
    about:
      "A computer science graduate passionate about web development, I am currently looking for an opportunity (a junior position or preferably remote) that will let me apply my skills in HTML, CSS, JavaScript, React and Python, take on new technical challenges, work on projects with real impact and fully integrate into a motivated development team, while continuing to learn, grow and share my curiosity every single day.",
    techT: "Technologies",
    expT: "Experience",
    exp: [{ role: "Web Developer Intern", org: "Honey — Antananarivo", desc: "End-of-studies internship: designing and building web applications, teamwork and hands-on experience of professional workflows." }],
    projT: "Projects",
    projects: [
      { name: "Website", desc: "Flask web application: MySQL database through SQLAlchemy, migrations, secure forms and email sending.", url: "https://github.com/Turius10-bit/Website", img: "/screens/website.png" },
      { name: "DevisPro", desc: "Quote management app built with Flask: create, track and manage customer quotes.", url: "https://github.com/Turius10-bit/devispro", img: "/screens/devispro.png" },
      { name: "FinanceCompta Pro", desc: "Finance and accounting app built with React: dashboard, chart of accounts, budgets, expenses, reports, Excel/CSV import and export, backed by an embedded SQLite database (sql.js).", url: "https://github.com/Turius10-bit/financeCompta-pro", img: "/screens/financeCompta-pro.png" },
      { name: "Task Manager", desc: "Full-stack task manager: React front end, Flask API and SQLite database. Statuses, priorities, categories, due dates, a statistics dashboard and dark mode.", url: "https://github.com/Turius10-bit/task_manager", img: "/screens/Taskmanager.png" },
    ],
    code: "View code",
    stackT: "Technologies used",
    contactT: "Contact",
    contactP: "Have an opportunity or a project idea? Let's talk.",
    langs: "Languages: Malagasy (native) · French (fluent) · English (good understanding)",
  },
};

const TECH = [
  { name: "HTML", Icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", Icon: FaCss3Alt, color: "#1572B6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "React JS", Icon: SiReact, color: "#61DAFB" },
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "Flask", Icon: SiFlask, color: "currentColor" },
  { name: "Django", Icon: SiDjango, color: "#44B78B" },
  { name: "MySQL", Icon: SiMysql, color: "#0F80CC" },
  { name: "SQLite", Icon: SiSqlite, color: "#0F80CC" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "GitHub", Icon: SiGithub, color: "currentColor" },
  { name: "Linux", Icon: SiLinux, color: "#FCC624" },
  { name: "Windows", Icon: FaWindows, color: "#0078D4" },
  { name: "VS Code", Icon: VscVscode, color: "#007ACC" },
];
/* Technologies spécifiques aux projets (tirées de leurs requirements.txt et de leur structure) */
const EXTRA = {
  "Flask-SQLAlchemy": { Icon: SiSqlalchemy, color: "#D71F00" },
  "Flask-Migrate": { Icon: SiFlask, color: "currentColor" },
  "Flask-Mail": { Icon: Mail, color: "#13C74A" },
  "Flask-WTF": { Icon: SiFlask, color: "currentColor" },
  MySQL: { Icon: SiMysql, color: "#4479A1" },
  Gunicorn: { Icon: SiGunicorn, color: "#499848" },
  "Jinja2": { Icon: SiJinja, color: "currentColor" },
  Vite: { Icon: SiVite, color: "#646CFF" },
  "Chart.js": { Icon: SiChartdotjs, color: "#FF6384" },
  "sql.js": { Icon: SiSqlite, color: "#0F80CC" },
};
const ALL = { ...Object.fromEntries(TECH.map((x) => [x.name, x])), ...EXTRA };
const STACK = {
  Website: ["Python", "Flask", "MySQL", "HTML", "CSS", "JavaScript"],
  DevisPro: ["Python", "Flask", "HTML", "CSS", "JavaScript"],
  "FinanceCompta Pro": ["React JS", "JavaScript", "CSS"],
  "Task Manager": ["React JS", "JavaScript", "CSS", "Python", "Flask", "SQLite"],
};
const IDS = ["home", "about", "tech", "exp", "projects", "contact"];
const ICONS = [Home, User, Code2, Briefcase, FolderGit2, Mail];

/* ---------- Stockage sûr (localStorage peut être indisponible : navigation privée, etc.) ---------- */
const store = {
  get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* ignoré */ } },
};

/* ---------- Hooks ---------- */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { el.classList.add("in"); return; }
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (el.classList.add("in"), io.disconnect()), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
function Reveal({ children, className = "", delay = 0 }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function useTyping(text) {
  const [s, setS] = useState("");
  useEffect(() => {
    setS(""); let i = 0;
    const id = setInterval(() => { i++; setS(text.slice(0, i)); if (i >= text.length) clearInterval(id); }, 45);
    return () => clearInterval(id);
  }, [text]);
  return s;
}

/* ---------- App ---------- */
export default function App() {
  const [lang, setLang] = useState(() => store.get("lang") || "fr");
  const [dark, setDark] = useState(() => store.get("theme") ? store.get("theme") === "dark" : matchMedia("(prefers-color-scheme: dark)").matches);
  const [active, setActive] = useState("home");
  const t = T[lang];
  const typed = useTyping(t.role);

  useEffect(() => { document.documentElement.dataset.theme = dark ? "dark" : "light"; store.set("theme", dark ? "dark" : "light"); }, [dark]);
  useEffect(() => { document.documentElement.lang = lang; store.set("lang", lang); }, [lang]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    IDS.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    const onScroll = () => { if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) setActive(IDS[IDS.length - 1]); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* SVG filter pour l'effet liquid glass */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="liquid"><feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="3" result="n" /><feDisplacementMap in="SourceGraphic" in2="n" scale="14" /></filter>
      </svg>
      <div className="blob b1" /><div className="blob b2" /><div className="blob b3" />

      <nav className="glass dock">
        {IDS.map((id, i) => { const I = ICONS[i]; return (
          <button key={id} className={active === id ? "on" : ""} onClick={() => go(id)} aria-label={t.nav[i]} data-tip={t.nav[i]}><I size={20} /></button>
        ); })}
        <span className="sep" />
        <button onClick={() => setDark(!dark)} aria-label="Theme" data-tip={dark ? "Light" : "Dark"}>{dark ? <Sun size={20} /> : <Moon size={20} />}</button>
        <button className="lg" onClick={() => setLang(lang === "fr" ? "en" : "fr")} aria-label="Language">{lang === "fr" ? "EN" : "FR"}</button>
      </nav>

      <main>
        <section id="home" className="hero">
          <Reveal className="hero-in">
            <img className="avatar" src="/photo.jpg" alt="Tombo Florius Pouely" />
            <p className="muted">{t.hello}</p>
            <h1>Tombo Florius <span className="grad">POUELY</span></h1>
            <h2 className="typed">{typed}<i /></h2>
            <div className="row">
              <a className="btn primary" href="/CV%20Florius.pdf" download="CV Florius.pdf"><Download size={18} /> {t.cta}</a>
              <button className="btn glass" onClick={() => go("contact")}><Mail size={18} /> {t.contactBtn}</button>
            </div>
          </Reveal>
        </section>

        <section id="about">
          <Reveal><h3>{t.aboutT}</h3><div className="glass card"><p className="about">{t.about}</p><p className="muted small">{t.langs}</p></div></Reveal>
        </section>

        <section id="tech">
          <Reveal><h3>{t.techT}</h3></Reveal>
          <div className="chips">{TECH.map(({ name, Icon, color }, i) => (
            <Reveal key={name} delay={i * 50}>
              <span className="glass chip"><Icon size={28} color={color} className="ti" /><b>{name}</b></span>
            </Reveal>
          ))}</div>
        </section>

        <section id="exp">
          <Reveal><h3>{t.expT}</h3></Reveal>
          <div className="timeline">{t.exp.map((e) => (
            <Reveal key={e.org}><div className="glass card"><span className="dot" /><h4>{e.role}</h4><p className="grad small">{e.org}</p><p>{e.desc}</p></div></Reveal>
          ))}</div>
        </section>

        <section id="projects">
          <Reveal><h3>{t.projT}</h3></Reveal>
          <div className="grid">{t.projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 120}>
              <article className="glass card proj">
                <div className="shot"><img src={p.img} alt={p.name} onError={(e) => (e.currentTarget.style.display = "none")} /><span>{p.name}</span></div>
                <h4>{p.name}</h4><p>{p.desc}</p>
                <div className="stack">
                  <span className="stack-label">{t.stackT}</span>
                  <div className="tags">{(STACK[p.name] || []).filter((k) => ALL[k]).map((k) => { const { Icon, color } = ALL[k]; return (
                    <span key={k} className="tag"><Icon size={16} color={color} />{k}</span>
                  ); })}</div>
                </div>
                <a className="btn glass" href={p.url} target="_blank" rel="noreferrer"><Github size={18} /> {t.code} <ExternalLink size={14} /></a>
              </article>
            </Reveal>
          ))}</div>
        </section>

        <section id="contact">
          <Reveal><h3>{t.contactT}</h3>
            <div className="glass card contact">
              <p>{t.contactP}</p>
              <a href="mailto:pouelytomboflorius10@gmail.com"><Mail size={18} />pouelytomboflorius10@gmail.com</a>
              <a href="tel:+261342163993"><Phone size={18} /> 034 21 639 93</a>
              <a href="https://github.com/Turius10-bit" target="_blank" rel="noreferrer"><Github size={18} /> Turius10-bit</a>
              <span><MapPin size={18} /> Mangarivotra, Mahajanga</span>
            </div>
          </Reveal>
        </section>
      </main>
      <footer>© {new Date().getFullYear()} Tombo Florius Pouely</footer>
    </>
  );
}