"use client";
import type { NextPage } from "next";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Mail, MapPin, ArrowRight, ChevronRight } from "lucide-react";

// ── TRANSLATIONS ────────────────────────────────────────────────────────────

type Lang = "es" | "en" | "da";

const LANG_LABELS: Record<Lang, string> = { es: "ES", en: "EN", da: "DA" };

const T: Record<Lang, {
  nav: { services: string; about: string; team: string; contact: string; cta: string };
  hero: { eyebrow: string; heading: string; sub: string; btnServices: string; btnTalk: string };
  services: { eyebrow: string; heading: string; mgmt: { title: string; desc: string; items: string[] }; tech: { title: string; desc: string; items: string[] } };
  about: { eyebrow: string; heading: string; p1: string; p2: string; p3: string };
  team: { eyebrow: string; heading: string; role: string; bio1: string; bio2: string };
  contact: { eyebrow: string; heading: string; sub: string; namePlaceholder: string; emailPlaceholder: string; msgPlaceholder: string; submit: string; rights: string };
}> = {
  es: {
    nav: { services: "Servicios", about: "Nosotros", team: "Equipo", contact: "Contacto", cta: "Agendar Reunión" },
    hero: {
      eyebrow: "Consultoría Estratégica & Tecnología",
      heading: "Estrategia e Innovación al Servicio de su Empresa",
      sub: "Unimos gestión de negocios de alto nivel con soluciones tecnológicas precisas, generando resultados concretos y duraderos.",
      btnServices: "Explorar Servicios",
      btnTalk: "Conversemos",
    },
    services: {
      eyebrow: "Nuestros Servicios",
      heading: "Dos especialidades, un propósito unificado.",
      mgmt: {
        title: "Consultoría de Gestión",
        desc: "Diseñamos e implementamos estrategias de negocio que alinean procesos, personas y objetivos corporativos hacia un crecimiento sostenible.",
        items: ["Estrategia Corporativa y Crecimiento", "Optimización de Procesos de Negocio", "Gestión del Cambio y Cultura Organizacional"],
      },
      tech: {
        title: "Soluciones Tecnológicas",
        desc: "Desarrollamos e integramos soluciones de software e infraestructura TI que responden a los requerimientos reales de su negocio.",
        items: ["Desarrollo de Software a la Medida", "Implementación de Infraestructura TI", "Asesoría en Transformación Digital"],
      },
    },
    about: {
      eyebrow: "Por Qué Elegirnos",
      heading: "La ventaja de una visión integrada.",
      p1: "La mayoría de las empresas enfrenta el mismo dilema: los especialistas en gestión no hablan tecnología, y los expertos en TI desconocen el lenguaje del negocio. Esta brecha genera soluciones incompletas y oportunidades perdidas.",
      p2: "En Cabargas Solutions & Consulting, nuestra fortaleza es exactamente esa intersección. Nuestro equipo domina ambos mundos, lo que nos permite diseñar estrategias que son tecnológicamente viables y soluciones tecnológicas que responden a objetivos de negocio reales.",
      p3: "El resultado: decisiones más rápidas, implementaciones más efectivas y un valor tangible para su organización.",
    },
    team: {
      eyebrow: "Nuestro Equipo",
      heading: "Las personas detrás del trabajo.",
      role: "Socio Fundador",
      bio1: "Con una trayectoria que une la consultoría estratégica de alto nivel y la arquitectura de soluciones tecnológicas, Felipe fundó Cabargas S&C con una convicción clara: los mejores resultados emergen cuando la estrategia y la tecnología se diseñan juntas, no por separado.",
      bio2: "Su enfoque integrado ha permitido a organizaciones de distintos sectores tomar decisiones más informadas, ejecutar con mayor agilidad y construir ventajas competitivas duraderas.",
    },
    contact: {
      eyebrow: "Contacto",
      heading: "Hablemos de su proyecto.",
      sub: "Estamos disponibles para escuchar sus desafíos y explorar cómo podemos construir valor juntos.",
      namePlaceholder: "Su nombre",
      emailPlaceholder: "Su email",
      msgPlaceholder: "Cuéntenos sobre su proyecto o desafío",
      submit: "Enviar Mensaje",
      rights: "Todos los derechos reservados.",
    },
  },

  en: {
    nav: { services: "Services", about: "About", team: "Team", contact: "Contact", cta: "Schedule a Meeting" },
    hero: {
      eyebrow: "Strategic Consulting & Technology",
      heading: "Strategy and Innovation at the Service of Your Business",
      sub: "We bridge high-level business management with precise technology solutions, delivering concrete and lasting results.",
      btnServices: "Explore Services",
      btnTalk: "Let's Talk",
    },
    services: {
      eyebrow: "Our Services",
      heading: "Two specialties, one unified purpose.",
      mgmt: {
        title: "Management Consulting",
        desc: "We design and implement business strategies that align processes, people and corporate goals toward sustainable growth.",
        items: ["Corporate Strategy & Growth", "Business Process Optimization", "Change Management & Organizational Culture"],
      },
      tech: {
        title: "Technology Solutions",
        desc: "We develop and integrate software and IT infrastructure solutions that address the real requirements of your business.",
        items: ["Custom Software Development", "IT Infrastructure Implementation", "Digital Transformation Advisory"],
      },
    },
    about: {
      eyebrow: "Why Choose Us",
      heading: "The advantage of an integrated vision.",
      p1: "Most organizations face the same dilemma: management specialists don't speak technology, and IT experts don't understand the language of business. This gap produces incomplete solutions and missed opportunities.",
      p2: "At Cabargas Solutions & Consulting, our strength lies precisely at that intersection. Our team commands both worlds, allowing us to craft strategies that are technologically sound and technology solutions that serve real business objectives.",
      p3: "The result: faster decisions, more effective implementations and tangible value for your organization.",
    },
    team: {
      eyebrow: "Our Team",
      heading: "The people behind the work.",
      role: "Founding Partner",
      bio1: "With a career that bridges high-level strategic consulting and technology solution architecture, Felipe founded Cabargas S&C with a clear conviction: the best results emerge when strategy and technology are designed together, not apart.",
      bio2: "His integrated approach has enabled organizations across multiple sectors to make better-informed decisions, execute with greater agility and build lasting competitive advantages.",
    },
    contact: {
      eyebrow: "Contact",
      heading: "Let's talk about your project.",
      sub: "We are available to listen to your challenges and explore how we can build value together.",
      namePlaceholder: "Your name",
      emailPlaceholder: "Your email",
      msgPlaceholder: "Tell us about your project or challenge",
      submit: "Send Message",
      rights: "All rights reserved.",
    },
  },

  da: {
    nav: { services: "Ydelser", about: "Om os", team: "Team", contact: "Kontakt", cta: "Book møde" },
    hero: {
      eyebrow: "Strategisk Rådgivning & Teknologi",
      heading: "Strategi og Innovation i Jeres Virksomheds Tjeneste",
      sub: "Vi forbinder forretningsmæssig ledelse på højt niveau med præcise teknologiløsninger og skaber konkrete og varige resultater.",
      btnServices: "Udforsk Ydelser",
      btnTalk: "Lad os tale",
    },
    services: {
      eyebrow: "Vores Ydelser",
      heading: "To specialer, ét samlet formål.",
      mgmt: {
        title: "Ledelsesrådgivning",
        desc: "Vi designer og implementerer forretningsstrategier, der tilpasser processer, mennesker og virksomhedsmål mod bæredygtig vækst.",
        items: ["Virksomhedsstrategi og Vækst", "Optimering af Forretningsprocesser", "Forandringsledelse og Organisationskultur"],
      },
      tech: {
        title: "Teknologiløsninger",
        desc: "Vi udvikler og integrerer software- og IT-infrastrukturløsninger, der imødekommer jeres reelle forretningsbehov.",
        items: ["Skræddersyet Softwareudvikling", "Implementering af IT-infrastruktur", "Rådgivning om Digital Transformation"],
      },
    },
    about: {
      eyebrow: "Hvorfor Vælge Os",
      heading: "Fordelen ved en integreret vision.",
      p1: "De fleste virksomheder står over for det samme dilemma: ledelsesspecialister taler ikke teknologi, og IT-eksperter forstår ikke forretningssproget. Dette gab skaber ufuldstændige løsninger og tabte muligheder.",
      p2: "Hos Cabargas Solutions & Consulting ligger vores styrke netop i dette skæringspunkt. Vores team behersker begge verdener, hvilket giver os mulighed for at designe strategier, der er teknologisk bæredygtige, og teknologiløsninger, der tjener reelle forretningsmål.",
      p3: "Resultatet: hurtigere beslutninger, mere effektive implementeringer og håndgribelig værdi for jeres organisation.",
    },
    team: {
      eyebrow: "Vores Team",
      heading: "Menneskene bag arbejdet.",
      role: "Grundlæggende Partner",
      bio1: "Med en karriere, der forener strategisk rådgivning på højt niveau og arkitektur af teknologiløsninger, grundlagde Felipe Cabargas S&C med en klar overbevisning: de bedste resultater opstår, når strategi og teknologi designes sammen, ikke hver for sig.",
      bio2: "Hans integrerede tilgang har gjort det muligt for organisationer på tværs af sektorer at træffe bedre beslutninger, udføre med større smidighed og opbygge varige konkurrencefordele.",
    },
    contact: {
      eyebrow: "Kontakt",
      heading: "Lad os tale om jeres projekt.",
      sub: "Vi er klar til at lytte til jeres udfordringer og udforske, hvordan vi kan skabe værdi sammen.",
      namePlaceholder: "Jeres navn",
      emailPlaceholder: "Jeres e-mail",
      msgPlaceholder: "Fortæl os om jeres projekt eller udfordring",
      submit: "Send besked",
      rights: "Alle rettigheder forbeholdes.",
    },
  },
};

// ── COMPONENT ────────────────────────────────────────────────────────────────

const LandingPage: NextPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    const base = navigator.language.split("-")[0].toLowerCase();
    if (base === "da") setLang("da");
    else if (base === "es") setLang("es");
    else setLang("en");
  }, []);

  const t = T[lang];

  const navLinks = [
    { href: "#servicios", label: t.nav.services },
    { href: "#nosotros", label: t.nav.about },
    { href: "#equipo", label: t.nav.team },
    { href: "#contacto", label: t.nav.contact },
  ];

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col font-serif">

      {/* ── HEADER ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Cabargas Solutions & Consulting"
              width={180}
              height={48}
              className="h-11 w-auto"
              priority
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-sm tracking-wide text-gray-500 hover:text-[#0f2b4c] transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {/* Language toggle */}
            <div className="flex items-center border border-gray-200 rounded overflow-hidden text-xs">
              {(["es", "en", "da"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1.5 transition-colors duration-150 ${
                    lang === l
                      ? "bg-[#0f2b4c] text-white"
                      : "text-gray-500 hover:text-[#0f2b4c]"
                  }`}
                >
                  {LANG_LABELS[l]}
                </button>
              ))}
            </div>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 bg-[#0f2b4c] text-white text-sm px-6 py-2.5 rounded hover:bg-[#1a3d6b] transition-colors duration-200"
            >
              {t.nav.cta}
              <ChevronRight size={14} />
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-600 hover:text-[#0f2b4c]"
            aria-label="Menú"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 pb-6">
            <nav className="flex flex-col gap-4 pt-4">
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-600 hover:text-[#0f2b4c] transition-colors py-1"
                >
                  {label}
                </a>
              ))}
              {/* Mobile language toggle */}
              <div className="flex items-center border border-gray-200 rounded overflow-hidden text-xs self-start mt-1">
                {(["es", "en", "da"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-2 transition-colors duration-150 ${
                      lang === l
                        ? "bg-[#0f2b4c] text-white"
                        : "text-gray-500 hover:text-[#0f2b4c]"
                    }`}
                  >
                    {LANG_LABELS[l]}
                  </button>
                ))}
              </div>
              <a
                href="#contacto"
                onClick={() => setMenuOpen(false)}
                className="mt-1 bg-[#0f2b4c] text-white text-sm text-center px-6 py-3 rounded hover:bg-[#1a3d6b] transition-colors"
              >
                {t.nav.cta}
              </a>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-grow">

        {/* ── HERO ──────────────────────────────────────────── */}
        <section className="relative bg-white overflow-hidden">
          {/* Decorative right panel with SVG illustration */}
          <div className="absolute inset-y-0 right-0 w-1/3 bg-[#e8eef5] hidden lg:flex items-center justify-center overflow-hidden">
            <svg
              viewBox="0 0 400 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              aria-hidden="true"
            >
              {/* Dot grid */}
              <defs>
                <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                  <circle cx="1.5" cy="1.5" r="1.5" fill="#0f2b4c" fillOpacity="0.12" />
                </pattern>
              </defs>
              <rect width="400" height="500" fill="url(#dots)" />

              {/* Outer ring — large */}
              <circle cx="200" cy="250" r="140" stroke="#0f2b4c" strokeOpacity="0.1" strokeWidth="1" />
              {/* Middle ring */}
              <circle cx="200" cy="250" r="95" stroke="#0f2b4c" strokeOpacity="0.15" strokeWidth="1" />
              {/* Inner ring */}
              <circle cx="200" cy="250" r="50" stroke="#0f2b4c" strokeOpacity="0.2" strokeWidth="1" />

              {/* Central node */}
              <circle cx="200" cy="250" r="10" fill="#0f2b4c" fillOpacity="0.7" />
              <circle cx="200" cy="250" r="16" stroke="#0f2b4c" strokeOpacity="0.25" strokeWidth="1.5" fill="none" />

              {/* Spoke lines from center to outer nodes */}
              <line x1="200" y1="250" x2="200" y2="110" stroke="#0f2b4c" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="200" y1="250" x2="321" y2="320" stroke="#0f2b4c" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="200" y1="250" x2="79" y2="320" stroke="#0f2b4c" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="200" y1="250" x2="340" y2="175" stroke="#0f2b4c" strokeOpacity="0.13" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="200" y1="250" x2="60" y2="175" stroke="#0f2b4c" strokeOpacity="0.13" strokeWidth="1" strokeDasharray="4 4" />

              {/* Outer nodes — primary */}
              <circle cx="200" cy="110" r="8" fill="#0f2b4c" fillOpacity="0.55" />
              <circle cx="321" cy="320" r="8" fill="#0f2b4c" fillOpacity="0.55" />
              <circle cx="79" cy="320" r="8" fill="#0f2b4c" fillOpacity="0.55" />

              {/* Outer nodes — secondary */}
              <circle cx="340" cy="175" r="5.5" fill="#0f2b4c" fillOpacity="0.35" />
              <circle cx="60" cy="175" r="5.5" fill="#0f2b4c" fillOpacity="0.35" />

              {/* Cross-links between outer nodes */}
              <line x1="200" y1="110" x2="321" y2="320" stroke="#0f2b4c" strokeOpacity="0.1" strokeWidth="1" />
              <line x1="200" y1="110" x2="79" y2="320" stroke="#0f2b4c" strokeOpacity="0.1" strokeWidth="1" />
              <line x1="321" y1="320" x2="79" y2="320" stroke="#0f2b4c" strokeOpacity="0.1" strokeWidth="1" />
              <line x1="340" y1="175" x2="321" y2="320" stroke="#0f2b4c" strokeOpacity="0.08" strokeWidth="1" />
              <line x1="60" y1="175" x2="79" y2="320" stroke="#0f2b4c" strokeOpacity="0.08" strokeWidth="1" />
              <line x1="340" y1="175" x2="200" y2="110" stroke="#0f2b4c" strokeOpacity="0.08" strokeWidth="1" />
              <line x1="60" y1="175" x2="200" y2="110" stroke="#0f2b4c" strokeOpacity="0.08" strokeWidth="1" />

              {/* Floating accent circles */}
              <circle cx="310" cy="110" r="22" stroke="#0f2b4c" strokeOpacity="0.12" strokeWidth="1" fill="none" />
              <circle cx="310" cy="110" r="6" fill="#0f2b4c" fillOpacity="0.2" />
              <circle cx="85" cy="410" r="16" stroke="#0f2b4c" strokeOpacity="0.1" strokeWidth="1" fill="none" />
              <circle cx="85" cy="410" r="4" fill="#0f2b4c" fillOpacity="0.18" />
              <circle cx="355" cy="390" r="10" stroke="#0f2b4c" strokeOpacity="0.1" strokeWidth="1" fill="none" />
              <circle cx="355" cy="390" r="3" fill="#0f2b4c" fillOpacity="0.15" />
              <circle cx="45" cy="90" r="8" stroke="#0f2b4c" strokeOpacity="0.1" strokeWidth="1" fill="none" />
              <circle cx="45" cy="90" r="2.5" fill="#0f2b4c" fillOpacity="0.15" />
            </svg>
          </div>
          <div className="max-w-6xl mx-auto px-6 py-28 md:py-36 lg:py-44 relative">
            <p className="text-xs tracking-[0.2em] uppercase text-[#2e5484] mb-6">
              {t.hero.eyebrow}
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#0f2b4c] leading-tight max-w-2xl">
              {t.hero.heading}
            </h1>
            <p className="mt-6 text-lg text-gray-500 max-w-xl leading-relaxed">
              {t.hero.sub}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="#servicios"
                className="inline-flex items-center gap-2 bg-[#0f2b4c] text-white px-8 py-4 rounded hover:bg-[#1a3d6b] transition-colors duration-200 text-sm tracking-wide"
              >
                {t.hero.btnServices}
                <ArrowRight size={16} />
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 border border-[#0f2b4c] text-[#0f2b4c] px-8 py-4 rounded hover:bg-[#e8eef5] transition-colors duration-200 text-sm tracking-wide"
              >
                {t.hero.btnTalk}
              </a>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6">
          <hr className="border-gray-100" />
        </div>

        {/* ── SERVICES ──────────────────────────────────────── */}
        <section id="servicios" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-16">
              <p className="text-xs tracking-[0.2em] uppercase text-[#2e5484] mb-3">
                {t.services.eyebrow}
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0f2b4c]">
                {t.services.heading}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div className="border border-gray-100 rounded-lg p-10 hover:border-[#0f2b4c] hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-0.5 bg-[#0f2b4c] mb-8" />
                <h3 className="font-display text-2xl font-bold text-[#0f2b4c] mb-4">
                  {t.services.mgmt.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  {t.services.mgmt.desc}
                </p>
                <ul className="space-y-3">
                  {t.services.mgmt.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-600 text-sm">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0f2b4c] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-gray-100 rounded-lg p-10 hover:border-[#0f2b4c] hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-0.5 bg-[#0f2b4c] mb-8" />
                <h3 className="font-display text-2xl font-bold text-[#0f2b4c] mb-4">
                  {t.services.tech.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  {t.services.tech.desc}
                </p>
                <ul className="space-y-3">
                  {t.services.tech.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-600 text-sm">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0f2b4c] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT ─────────────────────────────────────────── */}
        <section id="nosotros" className="py-24 bg-[#e8eef5]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-3xl">
              <p className="text-xs tracking-[0.2em] uppercase text-[#2e5484] mb-3">
                {t.about.eyebrow}
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0f2b4c] mb-8">
                {t.about.heading}
              </h2>
              <div className="space-y-5 text-gray-600 leading-relaxed">
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
                <p>{t.about.p3}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── TEAM ──────────────────────────────────────────── */}
        <section id="equipo" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-xs tracking-[0.2em] uppercase text-[#2e5484] mb-3">
              {t.team.eyebrow}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0f2b4c] mb-16">
              {t.team.heading}
            </h2>

            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="flex-shrink-0">
                <div className="relative">
                  <Image
                    src="/fp.png"
                    alt="Felipe Cabargas"
                    width={220}
                    height={220}
                    className="w-52 h-52 rounded-lg object-cover grayscale"
                  />
                  <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-[#0f2b4c] rounded-lg -z-10" />
                </div>
              </div>

              <div className="pt-2">
                <h3 className="font-display text-2xl font-bold text-[#0f2b4c]">Felipe Cabargas</h3>
                <p className="text-sm text-[#2e5484] tracking-wide mt-1 mb-6">
                  {t.team.role}
                </p>
                <div className="w-8 h-0.5 bg-[#0f2b4c] mb-6" />
                <p className="text-gray-600 leading-relaxed max-w-xl">{t.team.bio1}</p>
                <p className="mt-4 text-gray-600 leading-relaxed max-w-xl">{t.team.bio2}</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER / CONTACT ─────────────────────────────── */}
      <footer id="contacto" className="bg-[#0f2b4c] text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-16 items-start">

            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-blue-300 mb-4">
                {t.contact.eyebrow}
              </p>
              <h3 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6">
                {t.contact.heading}
              </h3>
              <p className="text-blue-200 leading-relaxed mb-10 max-w-sm">
                {t.contact.sub}
              </p>
              <div className="space-y-4">
                <a
                  href="mailto:contacto@cabargas.cl"
                  className="flex items-center gap-3 text-blue-200 hover:text-white transition-colors"
                >
                  <Mail size={16} className="flex-shrink-0" />
                  <span className="text-sm">contacto@cabargas.cl</span>
                </a>
                <div className="flex items-center gap-3 text-blue-200">
                  <MapPin size={16} className="flex-shrink-0" />
                  <span className="text-sm">Santiago, Chile</span>
                </div>
              </div>
            </div>

            <div>
              <form
                action="https://formspree.io/f/xqeeaowv"
                method="POST"
                className="space-y-4"
              >
                <div>
                  <label htmlFor="name" className="sr-only">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder={t.contact.namePlaceholder}
                    required
                    className="w-full bg-[#1a3d6b] border border-[#2e5484] text-white placeholder-blue-400 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder={t.contact.emailPlaceholder}
                    required
                    className="w-full bg-[#1a3d6b] border border-[#2e5484] text-white placeholder-blue-400 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-white"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea
                    name="message"
                    id="message"
                    rows={5}
                    placeholder={t.contact.msgPlaceholder}
                    required
                    className="w-full bg-[#1a3d6b] border border-[#2e5484] text-white placeholder-blue-400 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-white resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-[#0f2b4c] font-semibold py-3 px-6 rounded hover:bg-blue-50 transition-colors duration-200 text-sm"
                >
                  {t.contact.submit}
                </button>
              </form>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-[#1a3d6b] flex flex-col sm:flex-row justify-between items-center gap-4">
            <Image
              src="/logo.png"
              alt="Cabargas Solutions & Consulting"
              width={140}
              height={36}
              className="h-8 w-auto brightness-0 invert opacity-60"
            />
            <p className="text-blue-400 text-xs">
              &copy; {new Date().getFullYear()} Cabargas Solutions &amp; Consulting. {t.contact.rights}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
