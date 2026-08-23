import { useState, useEffect, useRef } from 'react';
import { useI18n } from './i18n';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import {
  Bot,
  Mail,
  Receipt,
  Boxes,
  Globe,
  Megaphone,
  MapPin,
  Sun,
  Moon,
  Sparkles,
  ChevronRight,
  Calendar,
  CheckCircle2,
  XCircle,
  Star,
  Zap,
  Menu,
  X,
  PhoneCall,
  ShieldCheck,
  Calculator,
  Clock,
  ArrowRight,
  Lock,
  Award,
  AlertCircle,
  TrendingUp,
  Heart,
  Navigation,
  Activity,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const NOTIFICATIONS = [
  { text: 'Una empresa automatizó sus notificaciones por WhatsApp', time: 'Hace 6 min' },
  { text: 'Una empresa redujo horas de trabajo manual con automatización', time: 'Hace 18 min' },
  { text: 'Una plataforma integró IA para automatizar la atención al cliente', time: 'Hace 34 min' },
  { text: 'Una empresa conectó sus sistemas con una integración personalizada', time: 'Hace 2 h' },
  { text: 'Un equipo automatizó la gestión de cientos de candidatos', time: 'Hace 5 h' },
  { text: 'Una empresa comenzó a automatizar procesos repetitivos', time: 'Hace 1 día' },
  { text: 'Una empresa implementó un asistente inteligente para sus clientes', time: 'Hace 3 días' },
  { text: 'Una empresa optimizó sus procesos con soluciones de IA', time: 'Hace 1 semana' },
  { text: 'Una empresa digitalizó uno de sus procesos operativos', time: 'Hace 2 semanas' },
  { text: 'Una empresa integró sus plataformas para trabajar en un solo flujo', time: 'Hace 1 mes' },
  { text: 'Una empresa automatizó tareas que antes requerían trabajo manual', time: 'Hace 2 meses' },
];

function App() {
  const { t, lang, setLang, theme, toggleTheme } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [employees, setEmployees] = useState(5);
  const [hoursPerDay, setHoursPerDay] = useState(2);

  const [formData, setFormData] = useState({
    user_name: '',
    user_phone: '',
    user_email: '',
    company_name: '',
    selected_service: 'Atención a Clientes / WhatsApp',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const [toastIndex, setToastIndex] = useState(0);
  const [toastVisible, setToastVisible] = useState(true);

  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const heroMockupRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const calcResultRef = useRef<HTMLDivElement>(null);

  const totalHoursMonth = employees * hoursPerDay * 20;
  const hoursSaved = Math.round(totalHoursMonth * 0.85);
  const moneySavedCOP = hoursSaved * 28000;

  useEffect(() => {
    const interval = setInterval(() => {
      setToastIndex((prev) => (prev + 1) % NOTIFICATIONS.length);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        heroBadgeRef.current,
        { opacity: 0, y: -15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5 }
      )
        .fromTo(
          heroTitleRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.2'
        )
        .fromTo(
          heroSubtitleRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.3'
        )
        .fromTo(
          heroCtaRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.2'
        )
        .fromTo(
          heroMockupRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.3'
        );

      sectionsRef.current.forEach((section) => {
        if (!section) return;
        gsap.fromTo(
          section,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [lang]);

  useEffect(() => {
    if (calcResultRef.current) {
      gsap.fromTo(
        calcResultRef.current,
        { scale: 0.96, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
      );
    }
  }, [employees, hoursPerDay]);

  const addToSections = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const isDark = theme === 'dark';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (
      !serviceId ||
      serviceId === 'your_service_id' ||
      !templateId ||
      templateId === 'your_template_id' ||
      !publicKey ||
      publicKey === 'your_public_key'
    ) {
      setTimeout(() => {
        setFormLoading(false);
        setFormSubmitted(true);
      }, 800);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          user_name: formData.user_name,
          user_phone: formData.user_phone,
          user_email: formData.user_email,
          company_name: formData.company_name,
          selected_service: formData.selected_service,
        },
        publicKey
      );
      setFormLoading(false);
      setFormSubmitted(true);
    } catch (err) {
      console.error('EmailJS error:', err);
      setFormLoading(false);
      setFormError('Hubo un error al enviar el correo. Por favor verifica tus datos o intenta nuevamente.');
    }
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'smart_toy':
        return <Bot className="w-6 h-6 text-[#cd326c]" />;
      case 'mail':
        return <Mail className="w-6 h-6 text-[#cd326c]" />;
      case 'description':
        return <Receipt className="w-6 h-6 text-[#cd326c]" />;
      case 'inventory_2':
        return <Boxes className="w-6 h-6 text-[#cd326c]" />;
      case 'language':
        return <Globe className="w-6 h-6 text-[#cd326c]" />;
      case 'campaign':
        return <Megaphone className="w-6 h-6 text-[#cd326c]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#cd326c]" />;
    }
  };




  return (
    <div className="min-h-screen flex flex-col font-sans bg-white dark:bg-[#111010] text-[#000000] dark:text-[#fbfbfb] transition-colors duration-200">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-[#cd326c]/10 via-[#d01926]/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <header className="header-glass sticky top-0 z-50 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="#" className="group flex items-center gap-2.5" aria-label="DreamboatSoft home">
              <img
                src="/src/assets/logo-dreamboatsoft.webp"
                alt="DreamboatSoft"
                className="h-9 sm:h-10 w-auto object-contain group-hover:scale-105 transition-transform"
              />
              <span className="hidden md:flex items-baseline gap-0.5 font-black font-dela text-lg tracking-wide uppercase">
                <span className="text-[#000000] dark:text-[#fbfbfb]">Dreamboat</span>
                <span className="text-[#cd326c]">Soft</span>
              </span>
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-5 text-xs font-bold text-[#000000] dark:text-[#fbfbfb] whitespace-nowrap">
            <a href="#calculadora" className="hover:text-[#cd326c] transition-colors flex items-center gap-1">
              <Calculator className="w-3.5 h-3.5 text-[#cd326c] shrink-0" />
              <span>{lang === 'es' ? 'ROI' : 'ROI Calc'}</span>
            </a>
            <a href="#servicios" className="hover:text-[#cd326c] transition-colors">
              {lang === 'es' ? 'Servicios' : 'Services'}
            </a>
            <a href="#comparativa" className="hover:text-[#cd326c] transition-colors">
              {lang === 'es' ? 'Comparativa' : 'Comparison'}
            </a>
            <a href="#casos" className="hover:text-[#cd326c] transition-colors">
              {lang === 'es' ? 'Casos' : 'Cases'}
            </a>
            <a href="#medellin" className="hover:text-[#cd326c] transition-colors">
              {lang === 'es' ? 'Nosotros' : 'About'}
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="px-3 py-1.5 rounded-lg border border-[#cd326c]/30 hover:border-[#cd326c] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 text-[#000000] dark:text-[#fbfbfb] bg-white dark:bg-black/40"
              aria-label="Switch Language"
            >
              <Globe className="w-4 h-4 text-[#cd326c]" />
              <span>{lang === 'es' ? 'EN' : 'ES'}</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-[#cd326c]/30 hover:border-[#cd326c] text-[#000000] dark:text-[#fbfbfb] bg-white dark:bg-black/40 transition-all"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            <a
              href="#contacto"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#d01926] hover:bg-[#cd326c] text-[#fbfbfb] font-bold text-xs uppercase tracking-wider shadow-sm hover:scale-[1.02] transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.nav.bookCall}</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-[#cd326c]/30 text-[#000000] dark:text-[#fbfbfb]"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#cd326c]/20 bg-white dark:bg-[#111010] px-6 py-6 space-y-3 flex flex-col text-left">
            <a
              href="#calculadora"
              onClick={() => setMobileMenuOpen(false)}
              className="font-bold text-base py-2 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between text-[#000000] dark:text-[#fbfbfb]"
            >
              <span>{t.nav.calculator}</span>
              <Calculator className="w-4 h-4 text-[#cd326c]" />
            </a>
            <a
              href="#servicios"
              onClick={() => setMobileMenuOpen(false)}
              className="font-bold text-base py-2 border-b border-gray-200 dark:border-gray-800 text-[#000000] dark:text-[#fbfbfb]"
            >
              {lang === 'es' ? 'Servicios' : 'Services'}
            </a>
            <a
              href="#comparativa"
              onClick={() => setMobileMenuOpen(false)}
              className="font-bold text-base py-2 border-b border-gray-200 dark:border-gray-800 text-[#000000] dark:text-[#fbfbfb]"
            >
              {t.nav.comparison}
            </a>
            <a
              href="#casos"
              onClick={() => setMobileMenuOpen(false)}
              className="font-bold text-base py-2 border-b border-gray-200 dark:border-gray-800 text-[#000000] dark:text-[#fbfbfb]"
            >
              {lang === 'es' ? 'Casos Reales' : 'Real Cases'}
            </a>
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="btn bg-[#d01926] text-white font-bold uppercase py-3 w-full mt-2 rounded-lg"
            >
              {t.nav.bookCall}
            </a>
          </div>
        )}
      </header>

      <main className="flex-grow bg-white dark:bg-[#111010]">


        <section className="relative px-4 pt-12 pb-20 md:pt-20 md:pb-24 flex flex-col items-center text-center max-w-5xl mx-auto bg-white dark:bg-[#111010]">
          <div ref={heroBadgeRef} className="mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[#cd326c]/30 bg-[#cd326c]/10 text-xs font-bold uppercase tracking-widest text-[#cd326c]">
              <Award className="w-4 h-4 text-[#cd326c]" />
              <span>{t.hero.startup}</span>
            </div>
          </div>

          <h1
            ref={heroTitleRef}
            className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.15] mb-6 max-w-4xl font-dela text-[#000000] dark:text-[#fbfbfb]"
          >
            {t.hero.titleStart}{' '}
            <span className="text-[#cd326c] underline decoration-[#cd326c]/40 decoration-wavy decoration-2 font-dela">
              {t.hero.titleHighlight}
            </span>
          </h1>

          <p
            ref={heroSubtitleRef}
            className="text-base sm:text-lg md:text-xl text-[#000000] dark:text-slate-300 max-w-3xl mb-10 leading-relaxed font-semibold"
          >
            {t.hero.subtitle}
          </p>

          <div ref={heroCtaRef} className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 mb-14">
            <a
              href="#contacto"
              className="px-7 py-3.5 rounded-lg bg-[#d01926] hover:bg-[#cd326c] text-[#fbfbfb] font-bold uppercase tracking-wider text-sm shadow-md hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.hero.callCta}</span>
            </a>
            <a
              href="#calculadora"
              className="px-7 py-3.5 rounded-lg border border-[#cd326c] text-[#000000] dark:text-[#fbfbfb] hover:bg-[#cd326c] hover:text-[#fbfbfb] font-bold uppercase tracking-wider text-sm transition-all flex items-center justify-center gap-2 bg-white dark:bg-transparent"
            >
              <Calculator className="w-4 h-4 text-[#cd326c]" />
              <span>{t.hero.calculatorCta}</span>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-6 border-t border-gray-200 dark:border-gray-800 text-left">
            <div className="p-3">
              <div className="text-xl sm:text-2xl font-black font-dela text-[#cd326c]">+40h</div>
              <div className="text-xs text-[#000000] dark:text-slate-400 font-bold">Ahorradas por cliente/mes</div>
            </div>
            <div className="p-3">
              <div className="text-xl sm:text-2xl font-black font-dela text-[#000000] dark:text-[#fbfbfb]">24/7</div>
              <div className="text-xs text-[#000000] dark:text-slate-400 font-bold">Operación sin interrupciones</div>
            </div>
            <div className="p-3">
              <div className="text-xl sm:text-2xl font-black font-dela text-[#cd326c]">0.3s</div>
              <div className="text-xs text-[#000000] dark:text-slate-400 font-bold">Respuesta inmediata por bot</div>
            </div>
            <div className="p-3">
              <div className="text-xl sm:text-2xl font-black font-dela text-[#d01926]">100%</div>
              <div className="text-xs text-[#000000] dark:text-slate-400 font-bold">Garantía de implementación</div>
            </div>
          </div>
        </section>

        <section
          id="calculadora"
          ref={addToSections}
          className="px-4 py-20 bg-white dark:bg-[#181717] border-t border-b border-gray-200 dark:border-gray-800"
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-[#cd326c]/30 bg-[#cd326c]/10 text-xs font-bold uppercase tracking-widest text-[#cd326c] mb-3">
                <Calculator className="w-3.5 h-3.5" />
                <span>{t.calculator.badge}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-4 font-dela text-[#000000] dark:text-[#fbfbfb]">
                {t.calculator.titleStart}
                <span className="text-[#cd326c]">{t.calculator.titleHighlight}</span>
              </h2>
              <p className="text-sm sm:text-base text-[#000000] dark:text-slate-300 font-medium">{t.calculator.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 theme-card p-6 sm:p-8 space-y-6 bg-white dark:bg-[#191818]">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#000000] dark:text-[#fbfbfb]">
                      {t.calculator.employeesLabel}
                    </label>
                    <span className="text-lg font-black font-dela text-[#cd326c]">{employees} personas</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={employees}
                    onChange={(e) => setEmployees(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer accent-[#cd326c]"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#000000] dark:text-[#fbfbfb]">
                      {t.calculator.hoursLabel}
                    </label>
                    <span className="text-lg font-black font-dela text-[#cd326c]">{hoursPerDay} horas/día</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={hoursPerDay}
                    onChange={(e) => setHoursPerDay(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer accent-[#cd326c]"
                  />
                </div>

                <div className="p-4 rounded-lg bg-[#cd326c]/10 border border-[#cd326c]/30 text-[#000000] dark:text-rose-200 text-xs font-semibold leading-relaxed flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#cd326c] mt-0.5" />
                  <span>
                    El 80% de las tareas manuales (confirmación de pedidos por WhatsApp, emisión de facturas y control de inventarios) pueden automatizarse totalmente.
                  </span>
                </div>
              </div>

              <div ref={calcResultRef} className="lg:col-span-5 theme-card p-6 sm:p-8 border-2 border-[#cd326c] flex flex-col justify-between space-y-6 bg-white dark:bg-[#191818]">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#cd326c]">
                    Resultado Estimado
                  </span>
                  <div className="mt-4 space-y-4">
                    <div>
                      <div className="text-xs text-[#000000] dark:text-slate-400 font-bold">{t.calculator.hoursSaved}</div>
                      <div className="text-4xl sm:text-5xl font-black font-dela text-[#000000] dark:text-[#fbfbfb]">
                        {hoursSaved} <span className="text-lg font-bold text-[#cd326c]">hrs/mes</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
                      <div className="text-xs text-[#000000] dark:text-slate-400 font-bold">{t.calculator.moneySaved}</div>
                      <div className="text-2xl sm:text-3xl font-black font-dela text-[#d01926]">
                        ${moneySavedCOP.toLocaleString('es-CO')} <span className="text-xs font-bold text-gray-500">COP</span>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="#contacto"
                  className="w-full py-3.5 rounded-lg bg-[#d01926] hover:bg-[#cd326c] text-[#fbfbfb] font-bold text-xs uppercase tracking-wider text-center shadow-md hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <span>{t.calculator.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="servicios"
          ref={addToSections}
          className="px-4 py-20 bg-white dark:bg-[#111010] border-b border-gray-200 dark:border-gray-800"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-[#cd326c]/30 bg-[#cd326c]/10 text-xs font-bold uppercase tracking-widest text-[#cd326c] mb-3">
                <Zap className="w-3.5 h-3.5 text-[#cd326c]" />
                <span>{lang === 'es' ? 'Soluciones Claves' : 'Core Solutions'}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 font-dela text-[#000000] dark:text-[#fbfbfb]">
                {t.services.titleStart}
                <span className="text-[#cd326c]">{t.services.titleHighlight}</span>
              </h2>
              <p className="text-base text-[#000000] dark:text-slate-300 font-medium">{t.services.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.services.items.map((item, idx) => (
                <div
                  key={idx}
                  className="theme-card p-6 sm:p-8 flex flex-col justify-between group bg-white dark:bg-[#191818]"
                >
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-[#cd326c]/15 border border-[#cd326c]/30 flex items-center justify-center mb-5 group-hover:bg-[#d01926] group-hover:text-white transition-colors">
                      {getServiceIcon(item.icon)}
                    </div>
                    <h3 className="text-xl font-bold mb-2.5 font-dela text-[#000000] dark:text-[#fbfbfb]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#000000] dark:text-slate-300 leading-relaxed font-normal">{item.description}</p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs font-bold text-[#cd326c]">
                    <span className="uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#cd326c]" />
                      {lang === 'es' ? 'Implementación Lista' : 'Turnkey Setup'}
                    </span>
                    <ChevronRight className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="comparativa"
          ref={addToSections}
          className="px-4 py-20 bg-white dark:bg-[#181717] border-b border-gray-200 dark:border-gray-800"
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-[#cd326c]/30 bg-[#cd326c]/10 text-xs font-bold uppercase tracking-widest text-[#cd326c] mb-3">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{t.comparison.badge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 font-dela text-[#000000] dark:text-[#fbfbfb]">
                {t.comparison.titleStart}
                <span className="text-[#cd326c]">{t.comparison.titleHighlight}</span>
              </h2>
              <p className="text-sm sm:text-base text-[#000000] dark:text-slate-300 font-medium">{t.comparison.subtitle}</p>
            </div>

            <div className="theme-card overflow-hidden bg-white dark:bg-[#191818]">
              <div className="grid grid-cols-12 table-header-bg p-4 border-b border-gray-200 dark:border-gray-800 text-xs font-extrabold uppercase tracking-wider text-[#000000] dark:text-[#fbfbfb]">
                <div className="col-span-4">Punto de Comparación</div>
                <div className="col-span-4 text-[#cd326c] flex items-center gap-1">
                  <Zap className="w-4 h-4 text-[#cd326c]" />
                  <span>{t.comparison.dreamboat}</span>
                </div>
                <div className="col-span-4 opacity-70">{t.comparison.traditional}</div>
              </div>

              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {t.comparison.points.map((pt, idx) => (
                  <div key={idx} className="grid grid-cols-12 p-4 sm:p-5 items-center text-xs sm:text-sm">
                    <div className="col-span-4 font-bold text-[#000000] dark:text-[#fbfbfb]">{pt.feature}</div>
                    <div className="col-span-4 font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span>{pt.good}</span>
                    </div>
                    <div className="col-span-4 font-medium text-rose-700 dark:text-slate-400 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 shrink-0 text-rose-600" />
                      <span>{pt.bad}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Executive Case Studies / Real Impact Showcase Section */}
        <section
          id="casos"
          ref={addToSections}
          className="px-4 py-20 bg-white dark:bg-[#111010] border-b border-gray-200 dark:border-gray-800"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-[#cd326c]/30 bg-[#cd326c]/10 text-xs font-bold uppercase tracking-widest text-[#cd326c] mb-3">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{lang === 'es' ? 'Casos de Éxito' : 'Case Studies'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 font-dela text-[#000000] dark:text-[#fbfbfb]">
                {t.examples.titleStart}
                <span className="text-[#d01926]">{t.examples.titleHighlight}</span>
              </h2>
              <p className="text-base text-[#000000] dark:text-slate-300 font-medium">{t.examples.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Case 1: WhatsApp Bot for Restaurant */}
              <div className="theme-card overflow-hidden flex flex-col bg-white dark:bg-[#191818]">
                <div className="p-5 sm:p-7 pb-3">
                  <span className="px-3 py-1 rounded-lg border border-[#cd326c]/30 bg-[#cd326c]/10 text-[#cd326c] font-bold uppercase tracking-wider text-xs">
                    {lang === 'es' ? 'Digitalización de Ventas' : 'Sales Digitization'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold mt-4 mb-2 font-dela text-[#000000] dark:text-[#fbfbfb]">
                    CheesePapas Autoservicio
                  </h3>
                  <p className="text-sm text-[#000000] dark:text-slate-300 leading-relaxed mb-4 font-normal">
                    {lang === 'es'
                      ? 'Atiende pedidos por WhatsApp sin cajeros extra. El cliente elige, paga y recibe su turno — solo.'
                      : 'Handles orders via WhatsApp without extra cashiers. The customer orders, pays and gets their turn — alone.'}
                  </p>
                </div>
                <div className="mx-4 sm:mx-6 mb-5 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md">
                  <div className="bg-[#075E54] px-4 py-2.5 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-white text-xs font-bold">CheesePapas</div>
                      <div className="text-[#B2DFDB] text-[10px]">{lang === 'es' ? 'en línea' : 'online'}</div>
                    </div>
                  </div>
                  <div className="bg-[#ECE5DD] dark:bg-[#1a1a1a] px-3 py-3 space-y-2.5 min-h-[180px]">
                    <div className="flex justify-start">
                      <div className="bg-white dark:bg-[#2a2a2a] rounded-lg rounded-tl-none px-3 py-2 max-w-[78%] shadow-sm">
                        <p className="text-[#111] dark:text-[#eee] text-[11px] sm:text-xs font-medium">{lang === 'es' ? 'Hola! Quiero una CheesePapa cargada para recoger.' : 'Hi! I want a loaded CheesePapa for pickup.'}</p>
                        <span className="text-[9px] text-gray-400 float-right mt-0.5">10:22</span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-[#DCF8C6] dark:bg-[#005c4b] rounded-lg rounded-tr-none px-3 py-2 max-w-[82%] shadow-sm">
                        <p className="text-[#111] dark:text-[#eee] text-[11px] sm:text-xs font-medium">{lang === 'es' ? 'CheesePapa Cargada $18.500. Tiempo: 18 min. Responde SI para confirmar.' : 'Loaded CheesePapa $18,500. Time: 18 min. Reply YES to confirm.'}</p>
                        <span className="text-[9px] text-gray-400 float-right mt-0.5 ml-2">10:22 <CheckCircle2 className="w-2.5 h-2.5 inline text-[#34B7F1]" /></span>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white dark:bg-[#2a2a2a] rounded-lg rounded-tl-none px-3 py-2 max-w-[28%] shadow-sm">
                        <p className="text-[#111] dark:text-[#eee] text-[11px] sm:text-xs font-medium">SI</p>
                        <span className="text-[9px] text-gray-400 float-right mt-0.5">10:22</span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-[#DCF8C6] dark:bg-[#005c4b] rounded-lg rounded-tr-none px-3 py-2 max-w-[82%] shadow-sm">
                        <p className="text-[#111] dark:text-[#eee] text-[11px] sm:text-xs font-medium">{lang === 'es' ? 'Pedido confirmado. Paga en caja o Nequi. Tu turno: #A-07.' : 'Order confirmed. Pay at counter or Nequi. Your turn: #A-07.'}</p>
                        <span className="text-[9px] text-gray-400 float-right mt-0.5 ml-2">10:23 <CheckCircle2 className="w-2.5 h-2.5 inline text-[#34B7F1]" /></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 px-5 sm:px-7 pb-5">
                  {[lang === 'es' ? 'Cero Filas' : 'Zero Lines', '+300% Capacidad', lang === 'es' ? 'Caja Segura' : 'Secure Till'].map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-md bg-[#cd326c]/15 text-[#cd326c] text-xs font-extrabold">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Case 2: Payroll Email Automation */}
              <div className="theme-card overflow-hidden flex flex-col bg-white dark:bg-[#191818]">
                <div className="p-5 sm:p-7 pb-3">
                  <span className="px-3 py-1 rounded-lg border border-[#cd326c]/30 bg-[#cd326c]/10 text-[#cd326c] font-bold uppercase tracking-wider text-xs">
                    {lang === 'es' ? 'Eficiencia Contable' : 'Accounting Efficiency'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold mt-4 mb-2 font-dela text-[#000000] dark:text-[#fbfbfb]">
                    {lang === 'es' ? 'Automatización de Nómina' : 'Payroll Automation'}
                  </h3>
                  <p className="text-sm text-[#000000] dark:text-slate-300 leading-relaxed mb-4 font-normal">
                    {lang === 'es'
                      ? 'El sistema genera el PDF y lo envía al correo de cada colaborador automáticamente. Sin intervención humana.'
                      : 'The system generates the PDF and emails it to each employee automatically. Zero human intervention.'}
                  </p>
                </div>
                <div className="mx-4 sm:mx-6 mb-5 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md text-[11px] sm:text-xs">
                  <div className="bg-[#1e1e2e] px-3 py-2 flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="text-[#888] text-[10px] ml-1">{lang === 'es' ? 'Correo Corporativo' : 'Corporate Mail'}</span>
                  </div>
                  <div className="bg-[#f8f8f8] dark:bg-[#1a1a2e] px-3 py-2.5 border-b border-gray-200 dark:border-gray-700">
                    <div className="text-[10px] text-gray-500 dark:text-gray-400 mb-0.5"><span className="font-bold uppercase tracking-wider">{lang === 'es' ? 'De:' : 'From:'}</span> <span className="text-[#000] dark:text-gray-200">nomina@empresa.com</span></div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400 mb-0.5"><span className="font-bold uppercase tracking-wider">{lang === 'es' ? 'Para:' : 'To:'}</span> <span className="text-[#000] dark:text-gray-200">carlos.gomez@empresa.com</span></div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400"><span className="font-bold uppercase tracking-wider">{lang === 'es' ? 'Asunto:' : 'Subject:'}</span> <span className="font-semibold text-[#cd326c]">{lang === 'es' ? 'Desprendible de Nomina — Agosto 2025' : 'Payslip — August 2025'}</span></div>
                  </div>
                  <div className="bg-white dark:bg-[#12121e] px-3 py-3 space-y-2">
                    <p className="text-[#333] dark:text-gray-300 text-[11px]">{lang === 'es' ? 'Hola Carlos,' : 'Hi Carlos,'}</p>
                    <p className="text-[#333] dark:text-gray-300 text-[11px]">{lang === 'es' ? 'Adjuntamos tu desprendible correspondiente al 1-31 de Agosto de 2025.' : 'Attached is your payslip for August 1–31, 2025.'}</p>
                    <div className="flex items-center gap-2 mt-1 px-2.5 py-2 rounded-lg border border-[#cd326c]/30 bg-[#cd326c]/5 w-fit">
                      <Receipt className="w-4 h-4 text-[#d01926] shrink-0" />
                      <span className="font-bold text-[#d01926] text-[11px]">nomina_carlos_agosto.pdf</span>
                      <span className="text-gray-400 text-[9px]">124 KB</span>
                    </div>
                    <p className="text-[9px] text-gray-400">{lang === 'es' ? 'Este correo fue generado automaticamente.' : 'This email was automatically generated.'}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 px-5 sm:px-7 pb-5">
                  {[lang === 'es' ? '2 Días Ahorrados/mes' : '2 Days Saved/mo', lang === 'es' ? 'Cero Errores' : 'Zero Errors', lang === 'es' ? 'Envío Programado' : 'Scheduled'].map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-md bg-[#cd326c]/15 text-[#cd326c] text-xs font-extrabold">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Case 3: Events & Ticketing Platform */}
              <div className="theme-card overflow-hidden flex flex-col bg-white dark:bg-[#191818]">
                <div className="p-5 sm:p-7 pb-3">
                  <span className="px-3 py-1 rounded-lg border border-[#cd326c]/30 bg-[#cd326c]/10 text-[#cd326c] font-bold uppercase tracking-wider text-xs">
                    {lang === 'es' ? 'Ventas Directas 24/7' : '24/7 Direct Sales'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold mt-4 mb-2 font-dela text-[#000000] dark:text-[#fbfbfb]">
                    {lang === 'es' ? 'Plataforma de Eventos' : 'Events Platform'}
                  </h3>
                  <p className="text-sm text-[#000000] dark:text-slate-300 leading-relaxed mb-4 font-normal">
                    {lang === 'es'
                      ? 'Vende entradas en línea sin intermediarios. El aforo se controla solo y el dinero llega directo a tu cuenta.'
                      : 'Sell tickets online with no intermediaries. Capacity is managed automatically and revenue goes straight to you.'}
                  </p>
                </div>
                <div className="mx-4 sm:mx-6 mb-5 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md text-[11px] sm:text-xs">
                  <div className="bg-[#d01926] px-4 py-2.5 flex items-center justify-between">
                    <span className="text-white font-black text-xs tracking-widest font-dela">EventosPro</span>
                    <span className="text-white/80 text-[10px] font-bold">{lang === 'es' ? 'Venta en Vivo' : 'Live Sales'}</span>
                  </div>
                  <div className="bg-white dark:bg-[#1a1a2e] px-3 py-3 space-y-2.5">
                    <div className="font-black text-[#000] dark:text-white text-sm font-dela">Festival Medellín Tech 2025</div>
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400">
                      <Calendar className="w-3 h-3 text-[#cd326c]" />
                      <span>Sáb 14 Sep · 7:00 PM · Centro de Convenciones</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      {[
                        { tipo: 'General', precio: '$45.000', estado: lang === 'es' ? 'Disponible' : 'Available', color: 'text-emerald-600 dark:text-emerald-400' },
                        { tipo: 'VIP', precio: '$120.000', estado: lang === 'es' ? 'Disponible' : 'Available', color: 'text-emerald-600 dark:text-emerald-400' },
                        { tipo: lang === 'es' ? 'Palco' : 'Premium', precio: '$250.000', estado: lang === 'es' ? 'Agotado' : 'Sold Out', color: 'text-rose-600' },
                      ].map(ticket => (
                        <div key={ticket.tipo} className="border border-gray-200 dark:border-gray-700 rounded-lg p-2 text-center">
                          <div className="font-black text-[#000] dark:text-white text-[10px] mb-0.5">{ticket.tipo}</div>
                          <div className="text-[#d01926] font-extrabold text-[10px]">{ticket.precio}</div>
                          <div className={`text-[9px] font-bold ${ticket.color}`}>{ticket.estado}</div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full py-2 rounded-lg bg-[#d01926] text-white font-bold text-[10px] uppercase tracking-wider">
                      {lang === 'es' ? 'Comprar Ahora' : 'Buy Now'}
                    </button>
                    <div className="flex items-center justify-between text-[9px] text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-1.5">
                      <span>{lang === 'es' ? 'Aforo: 340/500 vendidos' : 'Capacity: 340/500 sold'}</span>
                      <span className="text-emerald-600 font-bold">{lang === 'es' ? 'Sin comisiones' : 'No fees'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 px-5 sm:px-7 pb-5">
                  {[lang === 'es' ? 'Ventas 24/7' : '24/7 Sales', lang === 'es' ? 'Mayor Margen' : 'Higher Margin', lang === 'es' ? 'Control de Aforo' : 'Capacity Control'].map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-md bg-[#cd326c]/15 text-[#cd326c] text-xs font-extrabold">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Case 4: Inventory / Operational Control Dashboard */}
              <div className="theme-card overflow-hidden flex flex-col bg-white dark:bg-[#191818]">
                <div className="p-5 sm:p-7 pb-3">
                  <span className="px-3 py-1 rounded-lg border border-[#cd326c]/30 bg-[#cd326c]/10 text-[#cd326c] font-bold uppercase tracking-wider text-xs">
                    {lang === 'es' ? 'Control Operativo' : 'Operational Control'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold mt-4 mb-2 font-dela text-[#000000] dark:text-[#fbfbfb]">
                    {lang === 'es' ? 'Panel de Inventario en Tiempo Real' : 'Real-Time Inventory Dashboard'}
                  </h3>
                  <p className="text-sm text-[#000000] dark:text-slate-300 leading-relaxed mb-4 font-normal">
                    {lang === 'es'
                      ? 'Ve el stock de todas las sedes en una sola pantalla. Alertas automáticas antes de que se acabe lo que vende.'
                      : 'See stock across all locations in one screen. Automatic alerts before you run out of what sells.'}
                  </p>
                </div>
                <div className="mx-4 sm:mx-6 mb-5 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md text-[11px] sm:text-xs">
                  <div className="bg-[#111010] px-3 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Boxes className="w-3.5 h-3.5 text-[#cd326c]" />
                      <span className="text-white font-bold text-[10px]">{lang === 'es' ? 'Inventario — Tiempo Real' : 'Inventory — Real Time'}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] text-emerald-400 font-bold">
                      <Activity className="w-3 h-3 animate-pulse" />
                      <span>LIVE</span>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#12121e] px-3 py-2.5 space-y-1.5">
                    {[
                      { producto: lang === 'es' ? 'Cemento Portland x50kg' : 'Portland Cement x50kg', sede: lang === 'es' ? 'Bodega Norte' : 'North Warehouse', stock: 480, max: 500, estado: 'ok' },
                      { producto: lang === 'es' ? 'Varilla Corrugada 3/8"' : '3/8" Rebar', sede: lang === 'es' ? 'Bodega Sur' : 'South Warehouse', stock: 42, max: 200, estado: 'bajo' },
                      { producto: lang === 'es' ? 'Bloque 20x20x40' : '20x20x40 Block', sede: lang === 'es' ? 'Obras Envigado' : 'Envigado Site', stock: 1200, max: 1500, estado: 'ok' },
                      { producto: lang === 'es' ? 'Tuberia 4" PVC' : '4" PVC Pipe', sede: lang === 'es' ? 'Bodega Norte' : 'North Warehouse', stock: 8, max: 100, estado: 'critico' },
                    ].map(item => (
                      <div key={item.producto} className="flex items-center gap-2 py-1 border-b border-gray-100 dark:border-gray-800 last:border-0">
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-[#000] dark:text-white truncate text-[10px]">{item.producto}</div>
                          <div className="text-[9px] text-gray-400 truncate">{item.sede}</div>
                        </div>
                        <div className="flex-1">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full ${item.estado === 'ok' ? 'bg-emerald-500' : item.estado === 'bajo' ? 'bg-amber-400' : 'bg-[#d01926]'}`}
                              style={{ width: `${(item.stock / item.max) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className={`text-[9px] font-black w-12 text-right shrink-0 ${item.estado === 'ok' ? 'text-emerald-600 dark:text-emerald-400' : item.estado === 'bajo' ? 'text-amber-500' : 'text-[#d01926]'}`}>
                          {item.estado === 'ok' ? (lang === 'es' ? 'Normal' : 'Normal') : item.estado === 'bajo' ? (lang === 'es' ? 'Bajo' : 'Low') : (lang === 'es' ? 'Critico' : 'Critical')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 px-5 sm:px-7 pb-5">
                  {[lang === 'es' ? 'Control de Stock' : 'Stock Control', lang === 'es' ? 'Sin Faltantes' : 'No Stockouts', lang === 'es' ? 'Visibilidad Total' : 'Full Visibility'].map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-md bg-[#cd326c]/15 text-[#cd326c] text-xs font-extrabold">{tag}</span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        <section
          id="medellin"
          ref={addToSections}
          className="px-4 py-20 bg-white dark:bg-[#181717] border-b border-gray-200 dark:border-gray-800 overflow-hidden relative"
        >
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[#d01926]/30 bg-[#d01926]/10 text-xs font-bold uppercase tracking-widest text-[#d01926] mb-4">
                <MapPin className="w-4 h-4 text-[#d01926]" />
                <span>Medellín, Colombia</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black mb-4 font-dela text-[#000000] dark:text-[#fbfbfb]">
                {t.globe.titleStart}
                <span className="text-[#d01926]">{t.globe.titleHighlight}</span>
                <br />
                {t.globe.titleEnd}
              </h2>
              <p className="text-sm sm:text-base text-[#000000] dark:text-slate-300 leading-relaxed mb-6 font-medium">
                {t.globe.subtitle}
              </p>

              <div className="space-y-3 text-xs sm:text-sm font-bold text-[#000000] dark:text-slate-300 max-w-md mx-auto lg:mx-0 text-left">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#cd326c] shrink-0" />
                  <span>Soporte directo personalizado en español e inglés.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#cd326c] shrink-0" />
                  <span>Soluciones creadas para el mercado empresarial latino e internacional.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#cd326c] shrink-0" />
                  <span>Infraestructura global con latencia ultra baja.</span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex justify-center w-full max-w-md relative">
              <div className="relative w-72 h-72 sm:w-88 sm:h-88 rounded-full border-4 border-[#cd326c] bg-[#111010] flex items-center justify-center shadow-2xl overflow-hidden group">
                <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full text-[#cd326c]/30 globe-spinner">
                  <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
                  <ellipse cx="100" cy="100" rx="90" ry="35" fill="none" stroke="currentColor" strokeWidth="1.2" />
                  <ellipse cx="100" cy="100" rx="35" ry="90" fill="none" stroke="currentColor" strokeWidth="1.2" />
                  <line x1="10" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="1" />
                  <line x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="1" />
                </svg>

                <div className="absolute w-36 h-36 rounded-full border border-[#d01926]/40 radar-wave pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center gap-2 text-center p-4">
                  <div className="w-14 h-14 rounded-full bg-[#d01926] text-white flex items-center justify-center shadow-xl animate-bounce">
                    <Navigation className="w-7 h-7 fill-current" />
                  </div>
                  <span className="px-3.5 py-1 rounded bg-[#d01926] text-white font-black text-xs uppercase tracking-wider font-dela shadow-md">
                    Medellín HQ
                  </span>
                  <span className="text-[10px] font-mono font-bold text-rose-300 tracking-tight bg-black/60 px-2 py-0.5 rounded border border-[#cd326c]/30">
                    6.2442° N, 75.5812° W
                  </span>
                </div>

                <div className="absolute top-4 left-4 bg-black/70 border border-[#cd326c]/30 px-2.5 py-1 rounded text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <Activity className="w-3 h-3 animate-pulse" />
                  <span>LatAm Tech Hub</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={addToSections} className="px-4 py-20 bg-white dark:bg-[#111010] border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 font-dela text-[#000000] dark:text-[#fbfbfb]">
                {t.testimonials.titleStart}
                <span className="text-[#cd326c]">{t.testimonials.titleHighlight}</span>
              </h2>
              <p className="text-base text-[#000000] dark:text-slate-300 font-medium">{t.testimonials.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.testimonials.items.map((item, idx) => (
                <div key={idx} className="theme-card p-6 sm:p-8 flex flex-col justify-between bg-white dark:bg-[#191818]">
                  <div>
                    <div className="flex gap-1 text-[#d01926] mb-3">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="italic text-xs sm:text-sm text-[#000000] dark:text-slate-300 leading-relaxed mb-5 font-normal">"{item.text}"</p>
                  </div>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm font-dela text-[#000000] dark:text-[#fbfbfb]">{item.name}</div>
                      <div className="text-[11px] uppercase tracking-wider text-[#cd326c] font-semibold">{item.role}</div>
                    </div>
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contacto" ref={addToSections} className="px-4 py-24 relative overflow-hidden bg-white dark:bg-[#111010]">
          <div className="max-w-3xl mx-auto theme-card p-8 sm:p-12 border-2 border-[#cd326c] shadow-lg bg-white dark:bg-[#191818]">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-[#cd326c]/30 bg-[#cd326c]/10 text-xs font-bold uppercase tracking-widest text-[#cd326c] mb-3">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{t.leadForm.badge}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-3 font-dela text-[#000000] dark:text-[#fbfbfb]">
                {t.leadForm.titleStart}
                <span className="text-[#d01926]">{t.leadForm.titleHighlight}</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#000000] dark:text-slate-300 font-medium">{t.leadForm.subtitle}</p>
            </div>

            {formSubmitted ? (
              <div className="p-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-center font-bold text-base space-y-2">
                <div>{t.leadForm.successMsg}</div>
                <div className="text-xs font-normal opacity-90">Nos pondremos en contacto contigo de inmediato.</div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                {formError && (
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-bold text-center">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider mb-1 text-[#000000] dark:text-[#fbfbfb]">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      name="user_name"
                      value={formData.user_name}
                      onChange={handleInputChange}
                      required
                      placeholder={t.leadForm.namePlaceholder}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111010] text-[#000000] dark:text-[#fbfbfb] text-sm focus:outline-none focus:border-[#cd326c]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider mb-1 text-[#000000] dark:text-[#fbfbfb]">
                      WhatsApp / Celular *
                    </label>
                    <input
                      type="tel"
                      name="user_phone"
                      value={formData.user_phone}
                      onChange={handleInputChange}
                      required
                      placeholder={t.leadForm.phonePlaceholder}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111010] text-[#000000] dark:text-[#fbfbfb] text-sm focus:outline-none focus:border-[#cd326c]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider mb-1 text-[#000000] dark:text-[#fbfbfb]">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      name="user_email"
                      value={formData.user_email}
                      onChange={handleInputChange}
                      placeholder={t.leadForm.emailPlaceholder}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111010] text-[#000000] dark:text-[#fbfbfb] text-sm focus:outline-none focus:border-[#cd326c]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider mb-1 text-[#000000] dark:text-[#fbfbfb]">
                      Nombre de tu Empresa
                    </label>
                    <input
                      type="text"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleInputChange}
                      placeholder={t.leadForm.companyPlaceholder}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111010] text-[#000000] dark:text-[#fbfbfb] text-sm focus:outline-none focus:border-[#cd326c]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider mb-1 text-[#000000] dark:text-[#fbfbfb]">
                    {t.leadForm.serviceSelect}
                  </label>
                  <select
                    name="selected_service"
                    value={formData.selected_service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111010] text-[#000000] dark:text-[#fbfbfb] text-sm focus:outline-none focus:border-[#cd326c]"
                  >
                    {t.leadForm.serviceOptions.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full py-4 rounded-lg bg-[#d01926] hover:bg-[#cd326c] text-[#fbfbfb] font-bold uppercase tracking-wider text-sm shadow-md hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {formLoading ? (
                    <span>Enviando...</span>
                  ) : (
                    <span>{t.leadForm.submitBtn}</span>
                  )}
                </button>

                <div className="flex items-center justify-center gap-6 pt-3 text-[11px] font-bold text-[#000000] dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    100% Confidencial
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#cd326c]" />
                    Respuesta en &lt; 15 min
                  </span>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>

      {toastVisible && (
        <div className="fixed bottom-5 left-5 z-40 max-w-xs sm:max-w-sm p-3.5 rounded-lg theme-card border border-[#cd326c]/40 shadow-lg flex items-center justify-between gap-3 text-xs bg-white dark:bg-[#191818]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#cd326c]/20 text-[#cd326c] flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-[#000000] dark:text-[#fbfbfb] leading-tight">
                {NOTIFICATIONS[toastIndex].text}
              </div>
              <div className="text-[10px] text-gray-500 dark:text-slate-400 mt-0.5">{NOTIFICATIONS[toastIndex].time}</div>
            </div>
          </div>
          <button
            onClick={() => setToastVisible(false)}
            className="text-gray-500 hover:text-[#000000] dark:hover:text-white p-1"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <footer className="border-t border-gray-200 text-center dark:border-gray-800 px-6 py-6 bg-white dark:bg-[#111010] text-[#000000] dark:text-[#fbfbfb] flex flex-col sm:flex-row items-center justify-center gap-4 ">
        <aside className="flex items-center justify-center gap-1.5">
          <p className="font-semibold text-xs sm:text-sm opacity-90">
            DreamboatSoft. Hecho con <Heart className="w-3.5 h-3.5 text-[#cd326c] inline fill-current" /> por{' '}
            <a
              href="https://juan.dreamboatsoft.com"
              target="_blank"
              rel="noreferrer"
              className="underline font-bold text-[#cd326c] hover:text-[#d01926] transition-colors"
            >
              Juano Muñoz
            </a>{' '}
            en Medellín, Colombia.
          </p>
        </aside>
      </footer>
    </div>
  );
}

export default App;
