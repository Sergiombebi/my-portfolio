'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin, Briefcase, Target, Mail, Phone,
  Code, GitBranch, Link, Download, ArrowRight,
  Code2, Layers, Cpu, Wrench, GraduationCap, BookOpen,
  Rocket, BarChart3, Smartphone, ChevronDown, Menu, X,
  ExternalLink, Star, Zap, Coffee, Send, MessageCircle, Building, TreePine, DollarSign, TrendingUp, Shield,
  Sun, Moon, Globe
} from 'lucide-react';

// ─── Language Context ─────────────────────────────────────────────────────
interface LanguageContextType {
  language: 'fr' | 'en';
  setLanguage: (lang: 'fr' | 'en') => void;
  t: (key: string) => string;
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// ─── Traductions ───────────────────────────────────────────────────────────
const translations = {
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À propos',
      skills: 'Compétences',
      education: 'Éducation',
      projects: 'Projets',
      contact: 'Contact'
    },
    hero: {
      available: 'Disponible pour de nouveaux projets',
      greeting: 'Salut ! Moi c\'est',
      role: 'Développeur Frontend & Testeur',
      description: 'passionné par la création d\'expériences web qui marient',
      aesthetics: 'esthétique',
      performance: 'performance',
      quote: 'Transformer des idées en code, et du code en expériences mémorables',
      viewProjects: 'Voir mes projets',
      downloadCV: 'Télécharger CV',
      contactMe: 'Me contacter'
    },
    about: {
      tag: 'qui suis-je',
      main: 'À propos ',
      accent: 'de moi',
      journey: 'Mon parcours',
      passion: 'Passionné par le développement web depuis mes débuts, je me suis spécialisé dans la création d\'applications modernes qui allient',
      performance2: 'performance',
      experience: 'expérience utilisateur',
      approach: 'Mon approche combine créativité technique et rigueur méthodologique pour transformer des idées complexes en solutions web élégantes et efficaces.',
      experienceYears: 'Année d\'expérience',
      projectsCount: 'Projets réalisés'
    },
    contact: {
      tag: 'parlons ensemble',
      main: 'Entrons en ',
      accent: 'Contact',
      sendMessage: 'Envoyer un message',
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Email',
      subject: 'Sujet',
      message: 'Décrivez votre projet...',
      sendButton: 'Envoyer le message',
      responseTime: 'Réponse garantie sous 24h',
      phone: 'Téléphone',
      location: 'Localisation',
      city: 'Yaoundé, Cameroun'
    },
    skills: {
      tag: 'ce que je maîtrise',
      main: 'Mes ',
      accent: 'Compétences',
      keyInfo: 'Informations clés',
      location: 'Localisation',
      availability: 'Disponibilité',
      specialization: 'Spécialisation',
      languages: 'Langues',
      frontend: 'Frontend',
      backend: 'Backend',
      tools: 'Outils & DevOps',
      locationValue: 'Yaoundé, Cameroun',
      availabilityValue: 'Freelance & CDI',
      specializationValue: 'Frontend Development',
      languagesValue: 'Français, Anglais'
    },
    education: {
      tag: 'ma formation',
      main: 'Parcours ',
      accent: 'Éducatif',
      bachelor: 'Baccalauréat Scientifique',
      bachelorOrg: 'Lycée du Manengouba, Nkongsamba',
      bachelorDesc: 'Série C — Mathématiques et Sciences Physiques',
      license: 'Licence Professionnelle ICT4D',
      licenseOrg: 'Université de Yaoundé 1',
      licenseDesc: "Option Génie Logiciel — Développement d'applications et solutions numériques",
      master: 'Master Professionnel SIGL',
      masterOrg: 'Université de Yaoundé 1',
      masterDesc: "Systèmes d'Information et Génie Logiciel — Architecture et développement avancé",
      developer: 'Développeur Web Frontend',
      developerOrg: 'Flysot Engineering',
      developerDesc: "Développement d'applications avec Angular et intégration d'APIs REST",
      stage6mois: 'Stage 6 mois',
      projetsPratiques: 'Projets pratiques',
      developpementWeb: 'Développement web',
      angular: 'Angular',
      apisRest: 'APIs REST',
      frontend: 'Frontend'
    },
    projects: {
      tag: 'ce que j\'ai créé',
      main: 'Mes ',
      accent: 'Projets',
      viewMore: 'Voir plus',
      viewLess: 'Voir moins',
      projectsCount: 'projets',
      trascolis: 'Trascolis',
      trascolisDesc: 'Application web de suivi de colis permettant de tracer les expéditions de la Chine vers le Cameroun en temps réel.',
      kitaboo: 'Kitaboo',
      kitabooDesc: 'Application web de gestion immobilière permettant aux propriétaires d\'enregistrer leurs biens (hôtels, appartements, villas, duplex, voitures) et aux utilisateurs de les réserver.',
      sigif: 'SIGIF',
      sigifDesc: 'Application de gestion des informations forestières sur laquelle j\'ai travaillé en tant que testeur QA pour garantir la qualité et la fiabilité du système de suivi des ressources forestières.',
      maisonier: 'Maisonier',
      maisonierDesc: 'Application de gestion immobilière simple et efficace sur laquelle j\'ai travaillé sur le frontend Angular pour la gestion des biens et des locations.',
      axeCapital: 'Axe Capital',
      axeCapitalDesc: 'Application de gestion financière permettant de créer des comptes en ligne, soumettre des demandes de crédit et de financement. Développement intégral du projet.',
      trackDepense: 'Track de Dépense',
      trackDepenseDesc: 'Application de suivi des dépenses permettant d\'évaluer les dépenses en cours d\'un mois avec des tableaux de bord et analyses.',
      penitentiaire: 'Application Pénitentiaire',
      penitentiaireDesc: 'Application desktop de gestion des données des prisons. Projet non mis en production mais m\'a permis d\'acquérir d\'énormes connaissances en C# et gestion de projet.',
      infosylve: 'Infosylve',
      infosylveDesc: 'Application de gestion forestière française comprenant plusieurs modules (Wincbi, Wincube, Winparc, Wincoupe, Infonego) développés en Angular avec microservices backend et base de données PostgreSQL.'
    },
    theme: {
      switchToLight: 'Passer en mode clair',
      switchToDark: 'Passer en mode sombre'
    },
    footer: {
      copyright: '© 2024 MBEBI MBEBI SERGIO QUENTIN — Conçu & développé avec ❤️ à Yaoundé'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      education: 'Education',
      projects: 'Projects',
      contact: 'Contact'
    },
    hero: {
      available: 'Available for new projects',
      greeting: 'Hi! I\'m',
      role: 'Frontend Developer & Tester',
      description: 'passionate about creating web experiences that combine',
      aesthetics: 'aesthetics',
      performance: 'performance',
      quote: 'Turning ideas into code, and code into memorable experiences',
      viewProjects: 'View my projects',
      downloadCV: 'Download CV',
      contactMe: 'Contact me'
    },
    about: {
      tag: 'who am i',
      main: 'About ',
      accent: 'me',
      journey: 'My journey',
      passion: 'Passionate about web development since my beginnings, I specialize in creating modern applications that combine',
      performance2: 'performance',
      experience: 'user experience',
      approach: 'My approach combines technical creativity and methodological rigor to transform complex ideas into elegant and efficient web solutions.',
      experienceYears: 'Year of experience',
      projectsCount: 'Projects completed'
    },
    contact: {
      tag: 'let\'s talk together',
      main: 'Let\'s get in ',
      accent: 'Contact',
      sendMessage: 'Send a message',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Describe your project...',
      sendButton: 'Send message',
      responseTime: 'Response guaranteed within 24h',
      phone: 'Phone',
      location: 'Location',
      city: 'Yaoundé, Cameroon'
    },
    skills: {
      tag: 'what i master',
      main: 'My ',
      accent: 'Skills',
      keyInfo: 'Key Information',
      location: 'Location',
      availability: 'Availability',
      specialization: 'Specialization',
      languages: 'Languages',
      frontend: 'Frontend',
      backend: 'Backend',
      tools: 'Tools & DevOps',
      locationValue: 'Yaoundé, Cameroon',
      availabilityValue: 'Freelance & Full-time',
      specializationValue: 'Frontend Development',
      languagesValue: 'French, English'
    },
    education: {
      tag: 'my education',
      main: 'Educational ',
      accent: 'Journey',
      bachelor: 'Scientific Baccalaureate',
      bachelorOrg: 'Manengouba High School, Nkongsamba',
      bachelorDesc: 'Series C — Mathematics and Physical Sciences',
      license: 'Professional Bachelor ICT4D',
      licenseOrg: 'University of Yaoundé 1',
      licenseDesc: 'Software Engineering Option — Application and digital solution development',
      master: 'Professional Master SIGL',
      masterOrg: 'University of Yaoundé 1',
      masterDesc: 'Information Systems and Software Engineering — Advanced architecture and development',
      developer: 'Web Frontend Developer',
      developerOrg: 'Flysot Engineering',
      developerDesc: 'Application development with Angular and REST APIs integration',
      stage6mois: '6-month internship',
      projetsPratiques: 'Practical projects',
      developpementWeb: 'Web development',
      angular: 'Angular',
      apisRest: 'REST APIs',
      frontend: 'Frontend'
    },
    projects: {
      tag: 'what i created',
      main: 'My ',
      accent: 'Projects',
      viewMore: 'View more',
      viewLess: 'View less',
      projectsCount: 'projects',
      trascolis: 'Trascolis',
      trascolisDesc: 'Web application for package tracking allowing real-time tracing of shipments from China to Cameroon.',
      kitaboo: 'Kitaboo',
      kitabooDesc: 'Real estate management web application allowing property owners to register their properties (hotels, apartments, villas, duplexes, cars) and users to book them.',
      sigif: 'SIGIF',
      sigifDesc: 'Forest information management application on which I worked as a QA tester to ensure the quality and reliability of the forest resource tracking system.',
      maisonier: 'Maisonier',
      maisonierDesc: 'Simple and effective real estate management application on which I worked on the Angular frontend for property and rental management.',
      axeCapital: 'Axe Capital',
      axeCapitalDesc: 'Financial management application allowing online account creation, credit and financing requests submission. Full project development.',
      trackDepense: 'Expense Tracker',
      trackDepenseDesc: 'Expense tracking application allowing evaluation of current month expenses with dashboards and analytics.',
      penitentiaire: 'Penitentiary Application',
      penitentiaireDesc: 'Desktop application for prison data management. Project not put into production but allowed me to acquire enormous knowledge in C# and project management.',
      infosylve: 'Infosylve',
      infosylveDesc: 'French forest management application comprising several modules (Wincbi, Wincube, Winparc, Wincoupe, Infonego) developed in Angular with microservices backend and PostgreSQL database.'
    },
    theme: {
      switchToLight: 'Switch to light mode',
      switchToDark: 'Switch to dark mode'
    },
    footer: {
      copyright: '© 2024 MBEBI MBEBI SERGIO QUENTIN — Designed & developed with ❤️ in Yaoundé'
    }
  }
};

// ─── Theme Context ───────────────────────────────────────────────────────────
interface ThemeContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  currentTheme: typeof themes.dark;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');

  useEffect(() => {
    // Load language from localStorage
    const savedLanguage = localStorage.getItem('language') as 'fr' | 'en' | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Save language to localStorage
    localStorage.setItem('language', language);
  }, [language]);

  const changeLanguage = (lang: 'fr' | 'en') => {
    setLanguage(lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document and save to localStorage
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const currentTheme = themes[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ─── Language Toggle Component ───────────────────────────────────────────
function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <button 
      onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
      style={{
        width: '44px',
        height: '44px',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(255,255,255,0.05)',
        color: 'rgba(255,255,255,0.8)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
        e.currentTarget.style.transform = 'scale(1)';
      }}
      title={language === 'fr' ? 'Switch to English' : 'Passer en français'}
    >
      <Globe size={20} />
      <span style={{ fontSize: '10px', fontWeight: 600, marginLeft: '4px' }}>
        {language === 'fr' ? 'FR' : 'EN'}
      </span>
    </button>
  );
}

// ─── Theme Colors ───────────────────────────────────────────────────────────
const themes = {
  dark: {
    background: '#07070d',
    cardBg: 'rgba(255,255,255,0.025)',
    cardBorder: 'rgba(255,255,255,0.06)',
    text: '#ffffff',
    textSecondary: 'rgba(255,255,255,0.6)',
    textMuted: 'rgba(255,255,255,0.4)',
    accent: '#a78bfa',
    accentSecondary: '#38bdf8',
    accentTertiary: '#34d399',
    navBg: 'rgba(7,7,13,0.88)',
    glow1: 'rgba(109,40,217,0.18)',
    glow2: 'rgba(14,165,233,0.12)',
    glow3: 'rgba(52,211,153,0.07)',
  },
  light: {
    background: '#ffffff',
    cardBg: 'rgba(0,0,0,0.02)',
    cardBorder: 'rgba(0,0,0,0.08)',
    text: '#1a1a1a',
    textSecondary: 'rgba(0,0,0,0.7)',
    textMuted: 'rgba(0,0,0,0.5)',
    accent: '#7c3aed',
    accentSecondary: '#0ea5e9',
    accentTertiary: '#10b981',
    navBg: 'rgba(255,255,255,0.88)',
    glow1: 'rgba(124,58,237,0.08)',
    glow2: 'rgba(14,165,233,0.06)',
    glow3: 'rgba(52,211,153,0.04)',
  }
};

// ─── Theme Toggle Component ───────────────────────────────────────────────────
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  
  return (
    <button 
      onClick={toggleTheme}
      style={{
        width: '44px',
        height: '44px',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(255,255,255,0.05)',
        color: 'rgba(255,255,255,0.8)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
        e.currentTarget.style.transform = 'scale(1)';
      }}
      title={theme === 'dark' ? t('theme.switchToLight') : t('theme.switchToDark')}
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

// ─── Typewriter Hook ──────────────────────────────────────────────────────────
function useTypewriter(words: string[], typingSpeed = 80, deletingSpeed = 50, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting && displayed === current) {
      timeout = setTimeout(() => setIsDeleting(true), pauseMs);
    } else if (isDeleting && displayed === '') {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    } else {
      const next = isDeleting
        ? current.slice(0, displayed.length - 1)
        : current.slice(0, displayed.length + 1);
      timeout = setTimeout(() => setDisplayed(next), isDeleting ? deletingSpeed : typingSpeed);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  return displayed;
}

// ─── Skill Bar ────────────────────────────────────────────────────────────────
function SkillBar({ label, percent, color }: { label: string; percent: number; color: string }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setWidth(percent); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [percent]);

  return (
    <div ref={ref} style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', alignItems: 'center' }}>
        <span style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.8)', fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
        <span style={{ fontSize: '12px', color, fontWeight: 600, fontFamily: "'Syne', sans-serif" }}>{percent}%</span>
      </div>
      <div style={{ height: '4px', borderRadius: '99px', background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: '99px',
          width: `${width}%`,
          background: `linear-gradient(90deg, ${color}99, ${color})`,
          transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: `0 0 12px ${color}66`
        }} />
      </div>
    </div>
  );
}

// ─── Glass Card ───────────────────────────────────────────────────────────────
function GlassCard({ children, style = {}, className = '' }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={`glass-card ${className}`} style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '20px',
      padding: '28px',
      backdropFilter: 'blur(16px)',
      ...style
    }}>
      {children}
    </div>
  );
}

// ─── Section Title ────────────────────────────────────────────────────────────
function SectionTitle({ tag, main, accent }: { tag: string; main: string; accent: string }) {
  return (
    <div className="section-title" style={{ textAlign: 'center', marginBottom: '60px' }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        padding: '6px 16px', borderRadius: '99px',
        background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)',
        marginBottom: '20px'
      }}>
        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#a78bfa' }} />
        <span style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(167,139,250,0.8)', fontFamily: "'Syne', sans-serif", fontWeight: 600 }}>{tag}</span>
      </div>
      <h2 style={{ fontSize: '2.75rem', fontWeight: 800, fontFamily: "'Syne', sans-serif", lineHeight: 1.1 }}>
        <span style={{ color: 'rgba(255,255,255,0.92)' }}>{main}</span>
        <span style={{ color: '#a78bfa' }}>{accent}</span>
      </h2>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
function PortfolioContent() {
  const { theme, toggleTheme, currentTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const typedName = useTypewriter(
    language === 'fr' 
      ? ['SERGIO QUENTIN', 'DÉVELOPPEUR FRONTEND', 'TESTEUR', 'MBEBI MBEBI']
      : ['SERGIO QUENTIN', 'FRONTEND DEVELOPER', 'TESTER', 'MBEBI MBEBI'], 
    85, 50, 2200
  );

  // ─── Google Fonts ─────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const fontLink = document.createElement('link');
      fontLink.rel = 'stylesheet';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap';
      document.head.appendChild(fontLink);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['hero', 'about', 'skills', 'education', 'projects', 'contact'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleSendMessage = () => {
    // Récupérer les valeurs du formulaire
    const inputs = document.querySelectorAll('.input-field');
    const firstName = (inputs[0] as HTMLInputElement)?.value || '';
    const lastName = (inputs[1] as HTMLInputElement)?.value || '';
    const email = (inputs[2] as HTMLInputElement)?.value || '';
    const subject = (inputs[3] as HTMLInputElement)?.value || '';
    const message = (inputs[4] as HTMLTextAreaElement)?.value || '';

    // Validation simple
    if (!firstName || !lastName || !email || !subject || !message) {
      alert(t('contact.validationError'));
      return;
    }

    // Créer le message pour l'email
    const emailSubject = encodeURIComponent(`${t('contact.emailSubject')}: ${firstName} ${lastName}: ${subject}`);
    const emailBody = encodeURIComponent(
      `${t('contact.name')}: ${firstName} ${lastName}\n` +
      `${t('contact.email')}: ${email}\n` +
      `${t('contact.subject')}: ${subject}\n\n` +
      `${t('contact.messageLabel')}:\n${message}`
    );

    // Ouvrir le client email par défaut
    const mailtoLink = `mailto:sergiombebi32@gmail.com?subject=${emailSubject}&body=${emailBody}`;
    window.location.href = mailtoLink;

    // Vider le formulaire après envoi
    inputs.forEach(input => {
      if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
        input.value = '';
      }
    });
  };

  const navItems = [
    { id: 'hero', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'education', label: t('nav.education') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'contact', label: t('nav.contact') },
  ];

  const frontendSkills = [
    { label: 'React / Next.js', percent: 90, color: '#38bdf8' },
    { label: 'Angular', percent: 75, color: '#f87171' },
    { label: 'TypeScript', percent: 82, color: '#818cf8' },
    { label: 'Tailwind CSS', percent: 95, color: '#34d399' },
    { label: 'Vue.js', percent: 70, color: '#4ade80' },
    { label: 'HTML5 / CSS3', percent: 98, color: '#fb923c' },
  ];

  const backendSkills = [
    { label: 'Node.js / Express', percent: 80, color: '#4ade80' },
    { label: 'Laravel', percent: 75, color: '#f87171' },
    { label: 'MySQL', percent: 85, color: '#60a5fa' },
    { label: 'REST APIs', percent: 88, color: '#818cf8' },
  ];

  const tools = ['Git / GitHub', 'Docker', 'VS Code', 'Figma', 'CI/CD', 'Linux', 'Postman', 'Jest', 'Vercel', 'AWS'];

  const projects = [
    {
      icon: <Globe size={22} />,
      title: t('projects.trascolis'),
      desc: t('projects.trascolisDesc'),
      tags: ['Next.js', 'TypeScript', 'Supabase'],
      accent: '#f59e0b',
      bg: 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(217,119,6,0.1) 100%)',
    },
    {
      icon: <Building size={22} />,
      title: t('projects.kitaboo'),
      desc: t('projects.kitabooDesc'),
      tags: ['HTML', 'Tailwind CSS', 'Laravel', 'MySQL'],
      accent: '#ef4444',
      bg: 'linear-gradient(135deg, rgba(239,68,68,0.2) 0%, rgba(220,38,38,0.1) 100%)',
    },
    {
      icon: <TreePine size={22} />,
      title: t('projects.sigif'),
      desc: t('projects.sigifDesc'),
      tags: ['Angular', 'Spring Boot', 'PostgreSQL', 'Testing QA'],
      accent: '#16a34a',
      bg: 'linear-gradient(135deg, rgba(22,163,74,0.2) 0%, rgba(21,128,61,0.1) 100%)',
    },
    {
      icon: <Building size={22} />,
      title: t('projects.maisonier'),
      desc: t('projects.maisonierDesc'),
      tags: ['Angular', 'Spring Boot', 'PostgreSQL', 'Frontend Dev'],
      accent: '#8b5cf6',
      bg: 'linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(124,58,237,0.1) 100%)',
    },
    {
      icon: <DollarSign size={22} />,
      title: t('projects.axeCapital'),
      desc: t('projects.axeCapitalDesc'),
      tags: ['Vue.js', 'Laravel', 'MySQL', 'Full Stack'],
      accent: '#10b981',
      bg: 'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(5,150,105,0.1) 100%)',
    },
    {
      icon: <TrendingUp size={22} />,
      title: t('projects.trackDepense'),
      desc: t('projects.trackDepenseDesc'),
      tags: ['Next.js', 'TypeScript', 'Supabase', 'Analytics'],
      accent: '#f59e0b',
      bg: 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(217,119,6,0.1) 100%)',
    },
    {
      icon: <Shield size={22} />,
      title: t('projects.penitentiaire'),
      desc: t('projects.penitentiaireDesc'),
      tags: ['C#', '.NET', 'SQL Server', 'Desktop App'],
      accent: '#dc2626',
      bg: 'linear-gradient(135deg, rgba(220,38,38,0.2) 0%, rgba(185,28,28,0.1) 100%)',
    },
    {
      icon: <TreePine size={22} />,
      title: t('projects.infosylve'),
      desc: t('projects.infosylveDesc'),
      tags: ['Angular', 'Microservices', 'PostgreSQL', 'Frontend Dev'],
      accent: '#059669',
      bg: 'linear-gradient(135deg, rgba(5,150,105,0.2) 0%, rgba(4,120,87,0.1) 100%)',
    },
  ];

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #07070d; }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes pulse-ring { 0%{transform:scale(1);opacity:1} 50%{transform:scale(1.05);opacity:0.5} 100%{transform:scale(1);opacity:1} }
    @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
    @keyframes slideIn { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
    @keyframes scrollDot { 0%{transform:translateY(0);opacity:1} 100%{transform:translateY(12px);opacity:0} }

    /* Responsive Hero */
    .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
    .hero-photo-container { display: flex; justify-content: center; align-items: center; position: relative; }
    .hero-photo-wrapper { position: relative; width: 340px; height: 340px; }
    .tech-tag { position: absolute; font-size: 12px; padding: 6px 14px; border-radius: 99px; border: 1px solid rgba(255,255,255,0.12); background: rgba(7,7,13,0.92); font-family: 'Syne', sans-serif; font-weight: 600; backdrop-filter: blur(12px); white-space: nowrap; z-index: 5; }

    /* Responsive About */
    .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; }
    .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

    @media (max-width: 768px) {
      .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; padding: 0 20px !important; }
      .hero-grid .hero-text { order: 2 !important; }
      .hero-grid .hero-photo-container { order: 1 !important; margin-bottom: 20px !important; }
      .hero-photo-wrapper { width: 280px !important; height: 280px !important; }
      .tech-tag { font-size: 10px !important; padding: 4px 10px !important; }
      .about-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
      .stats-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
      section#about { padding: 60px 20px !important; }
    }

    @media (max-width: 640px) {
      .hero-grid { padding: 0 16px !important; gap: 32px !important; }
      .hero-photo-wrapper { width: 240px !important; height: 240px !important; }
    }

    .nav-item { position: relative; background: none; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 500; transition: color 0.2s; }
    .nav-item::after { content:''; position:absolute; bottom:-4px; left:0; right:0; height:2px; border-radius:99px; background:#a78bfa; transform:scaleX(0); transition:transform 0.25s; }
    .nav-item.active::after { transform:scaleX(1); }
    
    .nav-item-mobile { position: relative; background: none; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.3s ease; }
    .nav-item-mobile:hover { transform: translateY(-2px); }

    .skill-chip { display:inline-flex; align-items:center; padding:7px 15px; border-radius:99px; font-size:12.5px; font-weight:500; font-family:'DM Sans',sans-serif; border:1px solid rgba(52,211,153,0.25); background:rgba(52,211,153,0.07); color:#34d399; transition:transform 0.2s,background 0.2s; cursor:default; }
    .skill-chip:hover { transform:scale(1.06); background:rgba(52,211,153,0.14); }

    .proj-card { border-radius:22px; border:1px solid rgba(255,255,255,0.07); overflow:hidden; transition:transform 0.35s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.35s; cursor:pointer; }
    .proj-card:hover { transform:translateY(-6px) scale(1.01); box-shadow:0 24px 60px rgba(0,0,0,0.45); }

    .contact-row { display:flex; align-items:center; gap:16px; padding:16px; border-radius:14px; border:1px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.025); transition:background 0.2s,transform 0.2s; cursor:pointer; }
    .contact-row:hover { background:rgba(255,255,255,0.05); transform:translateX(4px); }

    .social-btn { display:flex; align-items:center; gap:10px; padding:12px 16px; border-radius:12px; border:1px solid rgba(255,255,255,0.07); background:rgba(255,255,255,0.03); text-decoration:none; transition:background 0.2s,transform 0.2s; }
    .social-btn:hover { background:rgba(255,255,255,0.07); transform:translateY(-2px); }

    .input-field { width:100%; padding:13px 16px 13px 44px; border-radius:12px; font-size:13.5px; font-family:'DM Sans',sans-serif; outline:none; transition:border-color 0.2s,box-shadow 0.2s; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.09); color:rgba(255,255,255,0.85); caret-color:#a78bfa; }
    .input-field::placeholder { color:rgba(255,255,255,0.22); }
    .input-field:focus { border-color:rgba(167,139,250,0.5); box-shadow:0 0 0 3px rgba(167,139,250,0.1); }
    textarea.input-field { resize:none; padding-top:14px; }

    .hero-animate { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both; }
    .hero-animate:nth-child(1){animation-delay:0.1s}
    .hero-animate:nth-child(2){animation-delay:0.2s}
    .hero-animate:nth-child(3){animation-delay:0.3s}
    .hero-animate:nth-child(4){animation-delay:0.4s}
    .hero-animate:nth-child(5){animation-delay:0.5s}

    .edu-card { transition: transform 0.25s, box-shadow 0.25s; }
    .edu-card:hover { transform: translateX(6px); }

    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #07070d; }
    ::-webkit-scrollbar-thumb { background: rgba(167,139,250,0.35); border-radius:99px; }

    /* Responsive Design */
    @media (max-width: 1200px) {
      .hero-grid { max-width: 900px !important; }
      .skills-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
      .projects-grid { grid-template-columns: 1fr 1fr !important; gap: 20px !important; }
    }

    @media (max-width: 1024px) {
      .hero-grid { grid-template-columns: 1fr !important; gap: 60px !important; text-align: center; max-width: 700px !important; }
      .hero-text { align-items: center !important; }
      .hero-photo { justify-self: center !important; }
      .section-title h2 { font-size: 2.2rem !important; }
      .skills-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
      .projects-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
      .contact-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
      .education-grid { gap: 20px !important; }
      .edu-card { flex-direction: column !important; gap: 16px !important; text-align: center !important; }
      .edu-card > div:first-child { margin: 0 auto !important; }
    }

    @media (max-width: 768px) {
      .nav-desktop { display: none !important; }
      .nav-mobile { display: block !important; }
      .hero-grid { padding: 0 20px !important; gap: 40px !important; }
      .hero-text { gap: 20px !important; }
      h1 { font-size: 2.5rem !important; }
      .section-title h2 { font-size: 1.8rem !important; }
      .glass-card { padding: 20px !important; }
      .skills-grid { gap: 30px !important; }
      .projects-grid { gap: 20px !important; }
      .contact-grid { gap: 20px !important; }
      .education-grid { gap: 16px !important; }
      section { padding: 80px 20px !important; }
      .hero-photo div { width: 280px !important; height: 280px !important; }
      .hero-photo div > div:first-child { padding: '2px' !important; }
      .hero-photo div > div:last-child { inset: '8px' !important; }
    }

    @media (max-width: 640px) {
      .hero-grid { padding: 0 16px !important; gap: 32px !important; }
      h1 { font-size: 2.2rem !important; }
      .section-title h2 { font-size: 1.6rem !important; }
      .glass-card { padding: 16px !important; }
      .hero-buttons { flex-direction: column !important; gap: 12px !important; }
      .hero-buttons button, .hero-buttons a { width: 100% !important; justify-content: center !important; }
      .social-links { justify-content: center !important; }
      .section-title { margin-bottom: 40px !important; }
      .skills-grid { gap: 24px !important; }
      .projects-grid { gap: 16px !important; }
      .contact-grid { gap: 16px !important; }
      .education-grid { gap: 12px !important; }
      .skill-chip { font-size: 11px !important; padding: 6px 12px !important; }
      .proj-card { padding: 16px !important; }
      .contact-row { padding: 12px !important; }
      .input-field { padding: 12px 14px 12px 40px !important; font-size: 13px !important; }
      .social-btn { padding: 10px 14px !important; }
      section { padding: 60px 16px !important; }
      .hero-photo div { width: 240px !important; height: 240px !important; }
    }

    @media (max-width: 480px) {
      h1 { font-size: 1.8rem !important; }
      .section-title h2 { font-size: 1.4rem !important; }
      .glass-card { padding: 14px !important; }
      .hero-photo div { width: 200px !important; height: 200px !important; }
      .hero-photo div > div:last-child { inset: '6px' !important; }
      .proj-card div:first-child { height: 140px !important; padding: 14px !important; }
      .proj-card div:last-child { padding: 16px !important; }
      .edu-card > div:first-child { width: 50px !important; height: 50px !important; }
      .edu-card > div:last-child { padding: 16px !important; }
    }

    @media (max-width: 380px) {
      h1 { font-size: 1.6rem !important; }
      .section-title h2 { font-size: 1.2rem !important; }
      .glass-card { padding: 12px !important; }
      .hero-photo div { width: 180px !important; height: 180px !important; }
      .contact-grid { grid-template-columns: 1fr !important; }
      .social-btn { grid-template-columns: 1fr !important; }
    }

    /* Animation menu mobile */
    @keyframes slideInMobile { 
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .nav-item-mobile { animation: slideInMobile 0.4s ease-out; }
    .nav-item-mobile:nth-child(1) { animation-delay: 0.1s; }
    .nav-item-mobile:nth-child(2) { animation-delay: 0.15s; }
    .nav-item-mobile:nth-child(3) { animation-delay: 0.2s; }
    .nav-item-mobile:nth-child(4) { animation-delay: 0.25s; }
    .nav-item-mobile:nth-child(5) { animation-delay: 0.3s; }
    .nav-item-mobile:nth-child(6) { animation-delay: 0.35s; }

    /* Optimisations pour les appareils tactiles */
    @media (hover: none) and (pointer: coarse) {
      .nav-item:hover::after { transform: scaleX(0) !important; }
      .nav-item:active::after { transform: scaleX(1) !important; }
      .nav-item-mobile:hover { transform: none !important; }
      .nav-item-mobile:active { transform: scale(0.95) !important; }
      .proj-card:hover { transform: none !important; }
      .proj-card:active { transform: scale(0.98) !important; }
      .edu-card:hover { transform: none !important; }
      .edu-card:active { transform: scale(0.98) !important; }
      .contact-row:hover { transform: none !important; }
      .contact-row:active { transform: scale(0.98) !important; }
      .social-btn:hover { transform: none !important; }
      .social-btn:active { transform: scale(0.95) !important; }
    }
  `;

  return (
    <div style={{ minHeight: '100vh', background: currentTheme.background, color: currentTheme.text, fontFamily: "'DM Sans', system-ui, sans-serif", overflowX: 'hidden' }}>
      <style>{css}</style>

      {/* ── Ambient glows ── */}
      <div style={{ position: 'fixed', top: '-25vh', left: '-15vw', width: '65vw', height: '65vw', borderRadius: '50%', background: `radial-gradient(circle, ${currentTheme.glow1} 0%, transparent 65%)`, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '-20vh', right: '-10vw', width: '50vw', height: '50vw', borderRadius: '50%', background: `radial-gradient(circle, ${currentTheme.glow2} 0%, transparent 65%)`, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', top: '40vh', right: '5vw', width: '30vw', height: '30vw', borderRadius: '50%', background: `radial-gradient(circle, ${currentTheme.glow3} 0%, transparent 65%)`, pointerEvents: 'none', zIndex: 0 }} />

      {/* ══ NAV ══ */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 50,
        padding: isScrolled ? '12px 0' : '22px 0',
        background: isScrolled ? currentTheme.navBg : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? `1px solid ${currentTheme.cardBorder}` : 'none',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '20px', background: theme === 'dark' 
      ? 'linear-gradient(135deg, #ffffff, #f0f0f0)' 
      : 'linear-gradient(135deg, #1a1a1a, #2a2a2a)', 
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>SQ.</span>

          {/* Desktop */}
          <ul className="nav-desktop" style={{ display: 'flex', gap: '8px', listStyle: 'none', alignItems: 'center' }}>
            {navItems.map(({ id, label }) => (
              <li key={id}>
                <button onClick={() => scrollTo(id)} className={`nav-item ${activeSection === id ? 'active' : ''}`}
                  style={{ color: activeSection === id ? currentTheme.accent : 'rgba(255,255,255,0.45)', padding: '6px 10px' }}>
                  {label}
                </button>
              </li>
            ))}
            <li>
              <ThemeToggle />
            </li>
            <li>
              <LanguageToggle />
            </li>
          </ul>

          {/* Mobile toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="nav-mobile" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', display: 'none', padding: '8px' }}>
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: theme === 'dark' ? 'rgba(7,7,13,0.98)' : 'rgba(255,255,255,0.98)', 
          backdropFilter: 'blur(20px)', 
          zIndex: 45, display: 'flex', flexDirection: 'column', 
          alignItems: 'center', justifyContent: 'center', gap: '16px'
        }}>
          <button onClick={() => setMobileMenuOpen(false)} style={{ 
            position: 'absolute', top: '20px', right: '20px', 
            background: 'none', border: 'none', cursor: 'pointer', 
            color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', padding: '8px' 
          }}>
            <X size={24} />
          </button>
          
          {/* Navigation items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            {navItems.map(({ id, label }) => (
              <button 
                key={id} 
                onClick={() => scrollTo(id)} 
                className={`nav-item-mobile ${activeSection === id ? 'active' : ''}`}
                style={{ 
                  fontSize: '20px', fontWeight: 600, 
                  color: activeSection === id 
                    ? (theme === 'dark' ? '#a78bfa' : '#7c3aed')
                    : (theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'), 
                  background: activeSection === id 
                    ? (theme === 'dark' ? 'rgba(167,139,250,0.15)' : 'rgba(124,58,237,0.15)')
                    : 'none', 
                  border: activeSection === id 
                    ? `1px solid ${theme === 'dark' ? 'rgba(167,139,250,0.3)' : 'rgba(124,58,237,0.3)'}`
                    : 'none',
                  cursor: 'pointer', 
                  fontFamily: "'DM Sans', sans-serif", 
                  padding: '16px 32px',
                  borderRadius: '16px', 
                  transition: 'all 0.3s ease',
                  minWidth: '200px',
                  textAlign: 'center'
                }}
              >
                {label}
              </button>
            ))}
          </div>
          
          {/* Theme and Language toggles */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
            <div style={{ 
              padding: '12px', 
              borderRadius: '12px', 
              background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
            }}>
              <ThemeToggle />
            </div>
            <div style={{ 
              padding: '12px', 
              borderRadius: '12px', 
              background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
            }}>
              <LanguageToggle />
            </div>
          </div>
        </div>
      )}

      {/* ══ HERO ══ */}
      <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 28px', zIndex: 10 }}>
        <div className="hero-grid" style={{ maxWidth: '1100px', width: '100%' }}>

          {/* Text */}
          <div className="hero-text" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="hero-animate" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 18px', borderRadius: '99px', border: '1px solid rgba(167,139,250,0.3)', background: 'rgba(167,139,250,0.08)', width: 'fit-content' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4ade80', animation: 'pulse 2s infinite', boxShadow: '0 0 8px #4ade80' }} />
              <span style={{ fontSize: '12px', color: currentTheme.accent, fontFamily: "'Syne', sans-serif", fontWeight: 600, letterSpacing: '0.5px' }}>{t('hero.available')}</span>
            </div>

            <div className="hero-animate">
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', marginBottom: '10px', fontWeight: 300 }}>{t('hero.greeting')}</p>
              <div style={{ minHeight: '90px' }}>
                <h1 style={{ fontSize: '3.6rem', fontWeight: 800, fontFamily: "'Syne', sans-serif", lineHeight: 1.05, letterSpacing: '-1px' }}>
                  <span style={{ background: 'linear-gradient(135deg, #c4b5fd 0%, #38bdf8 60%, #34d399 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {typedName}
                  </span>
                  <span style={{ display: 'inline-block', width: '3px', height: '56px', marginLeft: '4px', borderRadius: '2px', background: currentTheme.accent, verticalAlign: 'middle', animation: 'blink 1s step-end infinite' }} />
                </h1>
              </div>
            </div>

            <div className="hero-animate">
              <p style={{ fontSize: '16px', lineHeight: 1.75, color: 'rgba(255,255,255,0.6)' }}>
                <span style={{ color: currentTheme.accent, fontWeight: 600 }}>{t('hero.role')}</span> {t('hero.description')}{' '}
                <span style={{ color: currentTheme.accentSecondary }}>{t('hero.aesthetics')}</span> et <span style={{ color: currentTheme.accentTertiary }}>{t('hero.performance')}</span>.
              </p>
              <p style={{ fontSize: '14px', fontStyle: 'italic', color: 'rgba(255,255,255,0.25)', marginTop: '12px' }}>
                "{t('hero.quote')}"
              </p>
            </div>

            <div className="hero-animate hero-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <button onClick={() => scrollTo('projects')} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '13px 26px', borderRadius: '99px', fontWeight: 700, fontSize: '13.5px', fontFamily: "'Syne', sans-serif", background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)', border: 'none', color: '#fff', cursor: 'pointer', boxShadow: '0 8px 32px rgba(124,58,237,0.35)', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(124,58,237,0.55)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(124,58,237,0.35)'; }}>
                <Rocket size={15} /> {t('hero.viewProjects')}
              </button>
              <a href="/cv-sergio-quentin.pdf" download style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '13px 24px', borderRadius: '99px', fontWeight: 600, fontSize: '13.5px', fontFamily: "'Syne', sans-serif", border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.04)', textDecoration: 'none', transition: 'background 0.2s, transform 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.transform = 'scale(1.04)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.transform = 'scale(1)'; }}>
                <Download size={14} /> {t('hero.downloadCV')}
              </a>
              <button onClick={() => scrollTo('contact')} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '13px 24px', borderRadius: '99px', fontWeight: 600, fontSize: '13.5px', fontFamily: "'Syne', sans-serif", border: `1px solid ${currentTheme.accent}66`, color: currentTheme.accent, background: 'transparent', cursor: 'pointer', transition: 'background 0.2s, transform 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = `${currentTheme.accent}15`; e.currentTarget.style.transform = 'scale(1.04)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'scale(1)'; }}>
                <Mail size={14} /> {t('hero.contactMe')}
              </button>
            </div>

            <div className="hero-animate social-links" style={{ display: 'flex', gap: '10px' }}>
              {[
                { icon: <Code size={16} />, label: 'GitHub', href: '#' },
                { icon: <Link size={16} />, label: 'LinkedIn', href: '#' },
                { icon: <MessageCircle size={16} />, label: 'Twitter', href: '#' },
              ].map(({ icon, label, href }) => (
                <a key={label} href={href} title={label} style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(167,139,250,0.15)'; e.currentTarget.style.color = '#a78bfa'; e.currentTarget.style.borderColor = 'rgba(167,139,250,0.4)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'none'; }}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Photo */}
          <div className="hero-photo-container">
            <div className="hero-photo-wrapper">
              {/* Spinning ring */}
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', padding: '3px', background: 'conic-gradient(from 0deg, #7c3aed, #0ea5e9, #34d399, #a78bfa, #7c3aed)', animation: 'spin-slow 9s linear infinite' }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#07070d' }} />
              </div>
              {/* Pulse rings */}
              <div style={{ position: 'absolute', inset: '-12px', borderRadius: '50%', border: '1px solid rgba(167,139,250,0.2)', animation: 'pulse-ring 3s ease-out infinite' }} />
              <div style={{ position: 'absolute', inset: '-12px', borderRadius: '50%', border: '1px solid rgba(167,139,250,0.15)', animation: 'pulse-ring 3s ease-out 1.5s infinite' }} />
              {/* Photo */}
              <div style={{ position: 'absolute', inset: '12px', borderRadius: '50%', overflow: 'hidden', background: 'rgba(255,255,255,0.04)' }}>
                <img src="/photoPortfolio.jpg" alt="Sergio Quentin" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              {/* Floating dots */}
              <div style={{ position: 'absolute', top: '-8px', right: '-8px', width: '22px', height: '22px', borderRadius: '50%', background: 'linear-gradient(135deg,#a78bfa,#7c3aed)', animation: 'float 3s ease-in-out infinite', boxShadow: '0 0 16px rgba(167,139,250,0.6)' }} />
              <div style={{ position: 'absolute', bottom: '-8px', left: '-8px', width: '15px', height: '15px', borderRadius: '50%', background: 'linear-gradient(135deg,#38bdf8,#0ea5e9)', animation: 'float 3s ease-in-out 1s infinite', boxShadow: '0 0 12px rgba(56,189,248,0.6)' }} />
            </div>

            {/* Floating tech tags */}
            {[
              { tag: 'React', pos: { top: '10px', left: '-60px' }, delay: '0s', color: '#38bdf8' },
              { tag: 'Next.js', pos: { top: '80px', right: '-70px' }, delay: '0.8s', color: '#fff' },
              { tag: 'TypeScript', pos: { bottom: '80px', left: '-75px' }, delay: '1.6s', color: '#818cf8' },
              { tag: 'Tailwind', pos: { bottom: '10px', right: '-55px' }, delay: '2.4s', color: '#34d399' },
            ].map(({ tag, pos, delay, color }) => (
              <div key={tag} className="tech-tag" style={{ ...pos, color, animation: `float 3.5s ease-in-out ${delay} infinite` }}>
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer' }} onClick={() => scrollTo('about')}>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: "'Syne', sans-serif" }}>scroll</span>
          <div style={{ width: '22px', height: '36px', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '99px', display: 'flex', justifyContent: 'center', paddingTop: '6px' }}>
            <div style={{ width: '4px', height: '8px', borderRadius: '99px', background: '#a78bfa', animation: 'scrollDot 1.5s ease-in-out infinite' }} />
          </div>
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section id="about" style={{ position: 'relative', zIndex: 10, padding: '120px 28px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SectionTitle tag={t('about.tag')} main={t('about.main')} accent={t('about.accent')} />
          <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <GlassCard>
                <h3 style={{ fontSize: '18px', fontWeight: 700, fontFamily: "'Syne', sans-serif", color: currentTheme.accent, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Coffee size={18} color={currentTheme.accent} /> {t('about.journey')}
                </h3>
                <p style={{ lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', fontSize: '14.5px', marginBottom: '14px' }}>
                  {t('about.passion')} <span style={{ color: currentTheme.accent, fontWeight: 600 }}>{t('about.performance2')}</span> {t('about.experience')}.
                </p>
                <p style={{ lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', fontSize: '14.5px' }}>
                  {t('about.approach')}
                </p>
              </GlassCard>
              <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[{ value: '1+', label: t('about.experienceYears'), color: currentTheme.accent }, { value: '10+', label: t('about.projectsCount'), color: currentTheme.accentSecondary }].map(({ value, label, color }) => (
                  <div key={label} style={{ padding: '24px', borderRadius: '18px', textAlign: 'center', border: `1px solid ${color}22`, background: `${color}0a` }}>
                    <div style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: "'Syne', sans-serif", color, marginBottom: '6px' }}>{value}</div>
                    <div style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.4)' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <GlassCard>
              <h3 style={{ fontSize: '18px', fontWeight: 700, fontFamily: "'Syne', sans-serif", color: '#c4b5fd', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Star size={18} color="#a78bfa" /> {t('skills.keyInfo')}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {[
                  { Icon: MapPin, label: t('skills.location'), value: t('skills.locationValue'), color: '#f87171' },
                  { Icon: Briefcase, label: t('skills.availability'), value: t('skills.availabilityValue'), color: '#4ade80' },
                  { Icon: Target, label: t('skills.specialization'), value: t('skills.specializationValue'), color: '#38bdf8' },
                  { Icon: Globe, label: t('skills.languages'), value: t('skills.languagesValue'), color: '#fb923c' },
                ].map(({ Icon, label, value, color }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${color}15`, flexShrink: 0 }}>
                      <Icon size={18} color={color} />
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.35)', marginBottom: '3px', fontFamily: "'Syne', sans-serif" }}>{label}</div>
                      <div style={{ fontWeight: 500, color: 'rgba(255,255,255,0.85)', fontSize: '14.5px' }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      <section id="skills" style={{ position: 'relative', zIndex: 10, padding: '120px 28px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SectionTitle tag={t('skills.tag')} main={t('skills.main')} accent={t('skills.accent')} />
          <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <GlassCard>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(167,139,250,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Layers size={20} color="#a78bfa" />
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, fontFamily: "'Syne', sans-serif", color: '#a78bfa' }}>{t('skills.frontend')}</h3>
              </div>
              {frontendSkills.map(s => <SkillBar key={s.label} {...s} />)}
            </GlassCard>

            <GlassCard>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(56,189,248,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Cpu size={20} color="#38bdf8" />
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, fontFamily: "'Syne', sans-serif", color: '#38bdf8' }}>{t('skills.backend')}</h3>
              </div>
              {backendSkills.map(s => <SkillBar key={s.label} {...s} />)}
            </GlassCard>

            <GlassCard>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(52,211,153,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Wrench size={20} color="#34d399" />
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, fontFamily: "'Syne', sans-serif", color: '#34d399' }}>{t('skills.tools')}</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {tools.map(t => <span key={t} className="skill-chip">{t}</span>)}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ══ EDUCATION ══ */}
      <section id="education" style={{ position: 'relative', zIndex: 10, padding: '120px 28px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SectionTitle tag={t('education.tag')} main={t('education.main')} accent={t('education.accent')} />
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '30px', top: '24px', bottom: '24px', width: '1px', background: 'linear-gradient(to bottom, #7c3aed, rgba(124,58,237,0.1))', pointerEvents: 'none' }} />
            <div className="education-grid" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {[
                { Icon: BookOpen, color: '#f87171', title: t('education.bachelor'), org: t('education.bachelorOrg'), period: '2021 – 2022', desc: t('education.bachelorDesc') },
                { Icon: GraduationCap, color: '#818cf8', title: t('education.license'), org: t('education.licenseOrg'), period: '2022 – 2025', desc: t('education.licenseDesc'), tags: [t('education.stage6mois'), t('education.projetsPratiques'), t('education.developpementWeb')] },
                { Icon: Star, color: '#34d399', title: t('education.master'), org: t('education.masterOrg'), period: '2025 – Présent', desc: t('education.masterDesc') },
                { Icon: Zap, color: '#f59e0b', title: t('education.developer'), org: t('education.developerOrg'), period: '2025 – Présent', desc: t('education.developerDesc'), tags: [t('education.angular'), t('education.apisRest'), t('education.frontend')] },
              ].map(({ Icon, color, title, org, period, desc, tags }) => (
                <div key={title} className="edu-card" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${color}18`, border: `1px solid ${color}33`, flexShrink: 0, position: 'relative', zIndex: 2 }}>
                    <Icon size={22} color={color} />
                  </div>
                  <GlassCard style={{ flex: 1, padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '6px' }}>
                      <h3 style={{ fontSize: '17px', fontWeight: 700, fontFamily: "'Syne', sans-serif", color }}>{title}</h3>
                      <span style={{ fontSize: '11.5px', padding: '4px 12px', borderRadius: '99px', background: `${color}15`, color, whiteSpace: 'nowrap', fontFamily: "'Syne', sans-serif", fontWeight: 600 }}>{period}</span>
                    </div>
                    <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.35)', marginBottom: '10px' }}>{org}</p>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{desc}</p>
                    {tags && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '14px' }}>
                        {tags.map(t => <span key={t} style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '99px', background: `${color}12`, color, fontWeight: 500 }}>{t}</span>)}
                      </div>
                    )}
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROJECTS ══ */}
      <section id="projects" style={{ position: 'relative', zIndex: 10, padding: '120px 28px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SectionTitle tag={t('projects.tag')} main={t('projects.main')} accent={t('projects.accent')} />
          <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {(showAllProjects ? projects : projects.slice(0, 3)).map(({ icon, title, desc, tags, accent, bg }) => (
              <div key={title} className="proj-card" style={{ background: 'rgba(255,255,255,0.025)' }}>
                {/* Preview */}
                <div style={{ height: '180px', background: bg, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', padding: '18px', position: 'relative', overflow: 'hidden' }}>
                  {/* Fake browser chrome */}
                  <div style={{ width: '100%', height: '26px', borderRadius: '8px', background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', gap: '6px', padding: '0 10px', backdropFilter: 'blur(8px)' }}>
                    {['#ff5f57','#ffbd2e','#28c840'].map(c => <div key={c} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />)}
                    <div style={{ flex: 1, height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', marginLeft: '6px' }} />
                  </div>
                  {/* Fake UI lines */}
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '7px', padding: '0 4px' }}>
                    {[0.6, 0.4, 0.5].map((w, i) => (
                      <div key={i} style={{ height: '6px', borderRadius: '3px', background: `${accent}44`, width: `${w * 100}%`, boxShadow: `0 0 8px ${accent}33` }} />
                    ))}
                  </div>
                  {/* Icon bottom right */}
                  <div style={{ position: 'absolute', bottom: '14px', right: '18px', color: accent, opacity: 0.85 }}>{icon}</div>
                  {/* Glow */}
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '120px', height: '120px', borderRadius: '50%', background: `radial-gradient(circle, ${accent}22, transparent)`, pointerEvents: 'none' }} />
                </div>
                {/* Content */}
                <div style={{ padding: '22px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, fontFamily: "'Syne', sans-serif", color: accent, marginBottom: '10px' }}>{title}</h3>
                  <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: '16px' }}>{desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginBottom: '18px' }}>
                    {tags.map(t => <span key={t} style={{ fontSize: '11.5px', padding: '4px 11px', borderRadius: '99px', background: `${accent}12`, color: accent, fontWeight: 500 }}>{t}</span>)}
                  </div>
                  <div style={{ display: 'flex', gap: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: accent, background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Syne', sans-serif" }}>
                      <ExternalLink size={13} /> Voir le projet
                    </button>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'rgba(255,255,255,0.35)', background: 'none', border: 'none', cursor: 'pointer' }}>
                      <Code size={13} /> GitHub
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bouton Voir Plus */}
          {projects.length > 3 && (
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <button 
                onClick={() => setShowAllProjects(!showAllProjects)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 28px',
                  borderRadius: '99px',
                  fontSize: '14px',
                  fontWeight: 600,
                  fontFamily: "'Syne', sans-serif",
                  background: 'linear-gradient(135deg, #a78bfa, #38bdf8)',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  boxShadow: '0 8px 32px rgba(167,139,250,0.4)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(167,139,250,0.55)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(167,139,250,0.4)';
                }}
              >
                {showAllProjects ? (
                  <>
                    <ChevronDown size={18} style={{ transform: 'rotate(180deg)' }} />
                    {t('projects.viewLess')}
                  </>
                ) : (
                  <>
                    <ChevronDown size={18} />
                    {t('projects.viewMore')} ({projects.length - 3} {t('projects.projectsCount')})
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" style={{ position: 'relative', zIndex: 10, padding: '120px 28px 160px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SectionTitle tag={t('contact.tag')} main={t('contact.main')} accent={t('contact.accent')} />
          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <GlassCard>
                <h3 style={{ fontSize: '18px', fontWeight: 700, fontFamily: "'Syne', sans-serif", color: currentTheme.accent, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Send size={17} color={currentTheme.accent} /> {t('contact.sendMessage')}
                </h3>
                <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'rgba(255,255,255,0.55)', marginBottom: '24px' }}>
                  {t('contact.description')}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { Icon: Mail, label: t('contact.email'), value: 'sergiombebi32@gmail.com', color: currentTheme.accent },
                    { Icon: Phone, label: t('contact.phone'), value: '+237 671 706 920', color: currentTheme.accentSecondary },
                    { Icon: MapPin, label: t('contact.location'), value: t('contact.city'), color: currentTheme.accentTertiary },
                  ].map(({ Icon, label, value, color }) => (
                    <div key={label} className="contact-row">
                      <div style={{ width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${color}15`, flexShrink: 0 }}>
                        <Icon size={18} color={color} />
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.3)', fontFamily: "'Syne', sans-serif", marginBottom: '2px' }}>{label}</div>
                        <div style={{ fontSize: '14px', fontWeight: 500, color }}>{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard>
                <h3 style={{ fontSize: '17px', fontWeight: 700, fontFamily: "'Syne', sans-serif", color: currentTheme.accent, marginBottom: '18px' }}>Retrouvez-moi sur</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {[
                    { Icon: Code, name: 'GitHub', color: '#e2e8f0' },
                    { Icon: Link, name: 'LinkedIn', color: '#38bdf8' },
                    { Icon: MessageCircle, name: 'Twitter', color: '#60a5fa' },
                    { Icon: Code2, name: 'Behance', color: '#a78bfa' },
                  ].map(({ Icon, name, color }) => (
                    <a key={name} href="#" className="social-btn">
                      <div style={{ width: '34px', height: '34px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${color}15` }}>
                        <Icon size={16} color={color} />
                      </div>
                      <span style={{ fontSize: '13.5px', fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>{name}</span>
                    </a>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <GlassCard>
                <h3 style={{ fontSize: '18px', fontWeight: 700, fontFamily: "'Syne', sans-serif", color: currentTheme.accent, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Send size={17} color={currentTheme.accent} /> {t('contact.sendMessage')}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {[{ ph: t('contact.firstName'), Icon: () => null }, { ph: t('contact.lastName'), Icon: () => null }].map(({ ph }) => (
                      <div key={ph} style={{ position: 'relative' }}>
                        <input type="text" placeholder={ph} className="input-field" />
                      </div>
                    ))}
                  </div>
                  <input type="email" placeholder={t('contact.email')} className="input-field" style={{ paddingLeft: '16px' }} />
                  <input type="text" placeholder={t('contact.subject')} className="input-field" style={{ paddingLeft: '16px' }} />
                  <textarea placeholder={t('contact.message')} rows={5} className="input-field" style={{ paddingLeft: '16px' }} />
                  <button onClick={handleSendMessage} style={{ width: '100%', padding: '15px', borderRadius: '14px', fontWeight: 700, fontSize: '14px', fontFamily: "'Syne', sans-serif", background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 8px 32px rgba(124,58,237,0.35)', transition: 'transform 0.2s, box-shadow 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(124,58,237,0.5)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(124,58,237,0.35)'; }}
                  >
                    <Send size={15} /> {t('contact.sendButton')}
                  </button>
                  <p style={{ textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>{t('contact.responseTime')}</p>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

{/* Footer */} 
      <footer style={{ position: 'relative', zIndex: 10, padding: '28px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.2)', fontFamily: "'DM Sans', sans-serif" }}>
          &copy; 2023 Sergio Mbebi. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
}

// Export par défaut avec les providers
export default function Portfolio() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <PortfolioContent />
      </ThemeProvider>
    </LanguageProvider>
  );
}
