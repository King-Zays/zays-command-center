import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Send,
  FileText,
  Video,
  Download,
  RefreshCw,
  FileDown,
  ChevronRight,
  Activity,
  Terminal,
  Lock,
  Loader2,
  FileCode,
  Settings,
  Sun,
  Moon,
  ArrowLeft,
  X,
  LayoutGrid,
  FileUp,
  Mic,
  VolumeX,
  Volume2,
  GraduationCap,
  Briefcase,
  Mail,
  Code,
  Scissors,
  RotateCw,
  Unlock,
  Hash,
  FileOutput,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  Info,
  Home
} from 'lucide-react';
import operatorCutout from './assets/operator_cutout.webp';
import heroImg from './assets/hero.webp';


const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

const authFetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  const adminPassword = localStorage.getItem('admin_password') || '';
  const headers = new Headers(init?.headers);
  if (adminPassword) {
    headers.set('Authorization', `Bearer ${adminPassword}`);
  }
  return fetch(input, {
    ...init,
    headers
  });
};

const logoList = [
  {
    name: 'Instagram',
    url: '/library/instagram-icon.svg',
    gradient: 'linear-gradient(135deg, #833AB4, #FD1D1D, #F56040)',
    link: 'https://www.instagram.com/zaysss._/'
  },
  {
    name: 'TikTok',
    url: '/library/tiktok-icon-dark.svg',
    gradient: 'linear-gradient(135deg, #010101, #EE1D52, #69C9D0)',
    link: 'https://www.tiktok.com/@firzangames'
  },
  {
    name: 'LinkedIn',
    url: '/library/linkedin.svg',
    gradient: 'linear-gradient(135deg, #0077B5, #0A66C2)',
    link: 'https://www.linkedin.com/in/firzan-syaroni-476202329/'
  },
  {
    name: 'GitHub',
    url: '/library/github.svg',
    gradient: 'linear-gradient(135deg, #24292e, #15181b)',
    link: 'https://github.com/King-Zays'
  },
  {
    name: 'YouTube',
    url: '/library/youtube.svg',
    gradient: 'linear-gradient(135deg, #FF0000, #B2071D)',
    link: 'https://www.youtube.com/@FirzanGames'
  },
  {
    name: 'Discord',
    url: '/library/discord.svg',
    gradient: 'linear-gradient(135deg, #5865F2, #4752C4)',
    link: 'https://discord.com/users/522267073393721345'
  },
  {
    name: 'Gmail',
    url: '/library/gmail.svg',
    gradient: 'linear-gradient(135deg, #EA4335, #C5221F)',
    link: 'https://mail.google.com/mail/?view=cm&fs=1&to=firzansyaroni999@gmail.com'
  },
  {
    name: 'Canva',
    url: '/library/canva.svg',
    gradient: 'linear-gradient(135deg, #00C4CC, #7D2AE8)',
    link: 'https://canva.link/z1nsuasa7apzhhb'
  }
];

const AVAILABLE_CONSOLE_COMMANDS = ['help', 'clear', 'ping', 'theme', 'stats', 'chat', 'crt', 'exit', 'testload', 'lock', 'export', 'export-logs', 'hack', 'breach'];

// ====================================================
// SUB-COMPONENT: 3D PERSPECTIVE TILT CARD (Enhancement 3)
// ====================================================
function TiltCard({ logo, theme }: { logo: any; theme: 'light' | 'dark' }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [transform, setTransform] = useState('perspective(300px) rotateX(0deg) rotateY(0deg)');
  const [sheenPosition, setSheenPosition] = useState('0% 0%');

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 15;
    const rotateY = ((x - centerX) / centerX) * 15;

    setTransform(`perspective(300px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`);

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    setSheenPosition(`${percentX}% ${percentY}%`);
  };


  const handleMouseLeave = () => {
    setTransform('perspective(300px) rotateX(0deg) rotateY(0deg) scale(1)');
  };

  return (
    <a
      href={logo.link}
      target="_blank"
      rel="noopener noreferrer"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: 'transform 0.1s ease-out' }}
      className={`group relative h-24 w-40 shrink-0 flex items-center justify-center rounded-full transition-all overflow-hidden cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.02)] border ${
        theme === 'dark'
          ? 'bg-neutral-950 border-white/10 hover:border-white/20'
          : 'bg-white border-slate-200/60 hover:border-slate-300'
      }`}
    >
      {/* Sheen sheen reflection shine */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-300 z-20"
        style={{
          background: `radial-gradient(circle 60px at ${sheenPosition}, rgba(255, 255, 255, 0.5), transparent)`
        }}
      />

      {/* Hover colorful gradient backdrop */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 scale-150 group-hover:scale-100 transition-all duration-500 ease-out pointer-events-none z-0"
        style={{ background: logo.gradient }}
      />

      {/* Image container */}
      <div className="relative z-10 flex items-center justify-center transition-all duration-300">
        {logo.name === 'TikTok' ? (
          <div className="bg-[#090909] w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border border-neutral-800/80">
            <img
              src={logo.url}
              alt={logo.name}
              width={24}
              height={24}
              className="h-6 w-6 object-contain transition-all duration-300 opacity-90 group-hover:opacity-100"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const textSpan = document.createElement('span');
                  textSpan.className = 'text-[11px] font-bold text-slate-400 group-hover:text-white uppercase tracking-wider';
                  textSpan.innerText = logo.name;
                  parent.appendChild(textSpan);
                }
              }}
            />
          </div>
        ) : (
          <img
            src={logo.url}
            alt={logo.name}
            width={32}
            height={32}
            className={`h-8 max-w-[90px] object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert opacity-75 group-hover:opacity-100 ${
              theme === 'dark' && logo.name === 'GitHub' ? 'invert' : ''
            }`}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                const textSpan = document.createElement('span');
                textSpan.className = 'text-[11px] font-bold text-slate-400 group-hover:text-white uppercase tracking-wider';
                textSpan.innerText = logo.name;
                parent.appendChild(textSpan);
              }
            }}
          />
        )}
      </div>
    </a>
  );
}

// ====================================================
// SUB-COMPONENT: INTERACTIVE CANVAS PARTICLES (Enhancement 5)
// ====================================================
function CanvasParticles({
  theme
}: {
  theme: 'light' | 'dark';
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = canvas.width || 300;
    let height = canvas.height || 150;

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 15 : 45;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    // Cache the last known mouse rect to avoid repeated getBoundingClientRect during mousemove
    let cachedRect: DOMRect | null = null;
    const handleResize = () => {
      if (!canvas) return;
      cachedRect = null; // Invalidate cached rect on resize
      requestAnimationFrame(() => {
        if (!canvas) return;
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      });
    };
    window.addEventListener('resize', handleResize);

    let mouse = { x: -9999, y: -9999 };
    const handleMouseMove = (e: MouseEvent) => {
      // Use cached rect to avoid layout thrashing on every mousemove
      if (!cachedRect) cachedRect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - cachedRect.left;
      mouse.y = e.clientY - cachedRect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    const draw = () => {
      if (!ctx || !canvas) return;

      {
        ctx.clearRect(0, 0, width, height);

        const particleColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(10, 27, 51, 0.06)';
        const lineColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(10, 27, 51, 0.02)';
        const activeLineColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(10, 27, 51, 0.07)';

        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const force = (100 - dist) / 100;
            p.x -= (dx / dist) * force * 1.5;
            p.y -= (dy / dist) * force * 1.5;
          }

          ctx.fillStyle = particleColor;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        });

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const pi = particles[i];
            const pj = particles[j];
            const dx = pi.x - pj.x;
            const dy = pi.y - pj.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 110) {
              ctx.beginPath();
              ctx.moveTo(pi.x, pi.y);
              ctx.lineTo(pj.x, pj.y);

              const midX = (pi.x + pj.x) / 2;
              const midY = (pi.y + pj.y) / 2;
              const mouseDist = Math.sqrt((mouse.x - midX) ** 2 + (mouse.y - midY) ** 2);

              if (mouseDist < 80) {
                ctx.strokeStyle = activeLineColor;
                ctx.lineWidth = 0.5;
              } else {
                ctx.strokeStyle = lineColor;
                ctx.lineWidth = 0.3;
              }
              ctx.stroke();
            }
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    // Defer both sizing AND the animation loop start to after first paint
    // This prevents the canvas from blocking LCP paint
    requestAnimationFrame(() => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      cachedRect = canvas.getBoundingClientRect();

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 2 + 1,
        });
      }
      draw();
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />;
}

interface ProjectCardProps {
  title: string;
  badgeText: string;
  description: string;
  techStack: string;
  theme: string;
  links: { label: string; href: string }[];
}

function ProjectCard({ title, badgeText, description, techStack, theme, links }: ProjectCardProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Rotate max 8 degrees for dynamic perspective feel
    const rX = -(mouseY / (height / 2)) * 8;
    const rY = (mouseX / (width / 2)) * 8;
    
    setRotateX(rX);
    setRotateY(rY);
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const glowColor = theme === 'light'
    ? 'rgba(0, 0, 0, 0.04)'
    : 'rgba(255, 255, 255, 0.03)';

  const badgeClass = theme === 'light'
    ? 'bg-slate-100 text-slate-600 border border-slate-200'
    : 'bg-white/5 text-slate-400 border border-white/10';

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
      }}
      className={`p-5 rounded-2xl border flex flex-col justify-between relative overflow-hidden group transition-all duration-300 ${
        theme === 'light' 
          ? 'bg-slate-50/70 border-slate-200/60 shadow-sm hover:shadow-md' 
          : 'bg-white/[0.02] border-white/5 shadow-inner hover:border-white/10'
      }`}
    >
      {/* Dynamic Spotlight Glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(220px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 80%)`
        }}
      />

      <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
        <div className="flex justify-between items-start">
          <h4 className="text-xs font-bold font-display tracking-wide">{title}</h4>
          <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${badgeClass}`}>
            {badgeText}
          </span>
        </div>
        <p className={`text-[10.5px] mt-2.5 leading-relaxed transition-colors duration-300 ${
          theme === 'light' ? 'text-slate-600' : 'text-slate-400'
        }`}>
          {description}
        </p>
      </div>

      <div 
        className="mt-5 flex items-center justify-between"
        style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
      >
        <span className="text-[9px] text-slate-400 font-mono tracking-wider">{techStack}</span>
        <div className="flex space-x-2.5">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-3.5 py-1.5 rounded-full border text-[9.5px] font-bold flex items-center space-x-1 transition-all duration-300 shrink-0 ${
                theme === 'light'
                  ? 'bg-white border-slate-200/80 text-slate-700 shadow-sm shadow-slate-100 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md hover:shadow-slate-200/40'
                  : 'bg-neutral-900/50 border-white/5 text-slate-300 shadow-inner hover:border-white/20 hover:bg-white/[0.03] hover:shadow-[0_4px_12px_rgba(0,0,0,0.4)]'
              }`}
            >
              <span>{link.label}</span>
              <svg className="w-2.5 h-2.5 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const dashboardRef = useRef<HTMLDivElement>(null);











  // 1. Multi-Theme State (Light / Dark / Cyberpunk / Matrix)
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [crtActive, setCrtActive] = useState(false);

  // Speech API voices lists
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('');

  // 2. View State (Hero main text vs Dashboard Grid View)
  const [view, setView] = useState<'hero' | 'dashboard' | 'about'>('hero');

  // 3. Collapsible Sidebar Chat State
  const [chatOpen, setChatOpen] = useState(false);

  // 4. Global Drag and Drop State
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  // 5. System Console Log States (Enhancement 2)
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    '[SYSTEM] Mainframe OS initialized.',
    `[SYSTEM] Connection established with Go backend at ${new URL(API_BASE).host}.`,
    '[SYSTEM] Drag-and-drop listener active.',
    '[SYSTEM] Keyboard shortcut listener active (Ctrl+K).'
  ]);
  const [consoleInput, setConsoleInput] = useState('');
  const [consoleHistory, setConsoleHistory] = useState<string[]>([]);
  const historyPointer = useRef<number>(-1);

  // 6. Voice Interaction States (Enhancement 1)
  const [isMuted, setIsMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Custom Premium Toast Notification State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; visible: boolean }>({
    message: '',
    type: 'success',
    visible: false
  });
  const toastTimeoutRef = useRef<any>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ message, type, visible: true });
    
    // Automatically hide after 3.5 seconds
    toastTimeoutRef.current = setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3500);
  };


  // Premium Polish States
  const [glitchActive, setGlitchActive] = useState(false);
  const [soundProfile, setSoundProfile] = useState<'scifi' | 'retro' | 'minimal'>('scifi');
  const [highLoadWarning, setHighLoadWarning] = useState(false);
  const [isWordDragHover, setIsWordDragHover] = useState(false);
  const [isPdfDragHover, setIsPdfDragHover] = useState(false);
  const [isWordGridDragHover, setIsWordGridDragHover] = useState(false);
  const [isPdfGridDragHover, setIsPdfGridDragHover] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [lockPassword, setLockPassword] = useState('');
  const [lockError, setLockError] = useState(false);
  
  // Breach Hacking states
  const [breachActive, setBreachActive] = useState(false);
  const [breachGrid, setBreachGrid] = useState<string[][]>([]);
  const [breachSequence, setBreachSequence] = useState<string[]>([]);
  const [breachInput, setBreachInput] = useState<string[]>([]);
  const [breachActiveRow, setBreachActiveRow] = useState<number | null>(null);
  const [breachActiveCol, setBreachActiveCol] = useState<number | null>(null);
  const [breachTimeLeft, setBreachTimeLeft] = useState(30);
  const [breachResult, setBreachResult] = useState<'success' | 'failed' | null>(null);

  // Custom Color states
  const [useCustomColor, setUseCustomColor] = useState(false);
  const [customColor, setCustomColor] = useState('#10b981');


  // System time states
  const [systemTime, setSystemTime] = useState(new Date());
  const [keyRotationCountdown, setKeyRotationCountdown] = useState(60);

  const recognitionRef = useRef<any>(null);  // Keyboard shortcut help overlay state
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);

  // Navigation & Palette states
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleBreachCellClick = (r: number, c: number, code: string) => {
    if (breachResult !== null || code === '--') return;
    
    // Check constraints
    if (breachActiveRow !== null && r !== breachActiveRow) return;
    if (breachActiveCol !== null && c !== breachActiveCol) return;
    
    playSound('click');
    
    const newInput = [...breachInput, code];
    setBreachInput(newInput);
    
    // Check sequence match
    let matched = false;
    if (newInput.length >= breachSequence.length) {
      const lastN = newInput.slice(-breachSequence.length);
      matched = lastN.every((val, idx) => val === breachSequence[idx]);
    }
    
    if (matched) {
      setBreachResult('success');
      playSound('success', true);
      addConsoleLog('[SUCCESS] System Breach successful! Access granted.');
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 400);
      return;
    }
    
    if (newInput.length >= 4) {
      setBreachResult('failed');
      playSound('alarm', true);
      addConsoleLog('[WARNING] Breach Protocol failed: Buffer full.');
      return;
    }
    
    // Toggle next direction constraints
    if (breachActiveRow !== null) {
      setBreachActiveRow(null);
      setBreachActiveCol(c);
    } else {
      setBreachActiveRow(r);
      setBreachActiveCol(null);
    }
    
    // Mark cell as used
    const newGrid = breachGrid.map((row, ri) => 
      row.map((cell, ci) => (ri === r && ci === c) ? '--' : cell)
    );
    setBreachGrid(newGrid);
  };

  // Global diagnostics data state
  const [diagnostics, setDiagnostics] = useState<{
    cpu: string;
    ram: string;
    uptime: string;
    status: string;
    db_status: string;
  } | null>(null);

  // Workspace 1: AI Chat State
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'agent'; text: string; toolType?: string; sources?: any[] }>>([
    {
      sender: 'agent',
      text: 'Halo! Saya adalah ZaysAgent. Ada yang bisa saya bantu hari ini?\n\nKetik perintah seperti "buka kompresor pdf" atau seret berkas Anda (.docx / .pdf) langsung ke halaman web ini untuk memprosesnya secara instan!'
    }
  ]);
  const [chatLogs, setChatLogs] = useState<Array<{ step: string; detail: string }>>([]);
  const [chatLoading, setChatLoading] = useState(false);

  // Workspace 2: Word Converter State
  const [wordFile, setWordFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [convertedPdfUrl, setConvertedPdfUrl] = useState<string | null>(null);

  // Workspace 3: PDF Compressor State
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [compressionResult, setCompressionResult] = useState<{
    originalSize: number;
    compressedSize: number;
    pdfUrl: string;
  } | null>(null);

  // Workspace 4: Media Downloader State
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaFormat, setMediaFormat] = useState('mp4');
  const [mediaQuality, setMediaQuality] = useState('720');
  const [downloadingMedia, setDownloadingMedia] = useState(false);
  const [downloaderResult, setDownloaderResult] = useState<{
    title: string;
    downloadUrl: string;
    status: string;
  } | null>(null);



  // Marquee speed velocity scrubbing states
  const [marqueeDuration, setMarqueeDuration] = useState('30s');
  const [marqueePlayState] = useState<'running' | 'paused'>('running');
  const lastMouseX = useRef<number | null>(null);
  const velocityTimeout = useRef<any>(null);

  // Workspace 6: Settings & Latency State
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [geminiKey, setGeminiKey] = useState('');
  const [adminPassword, setAdminPassword] = useState(() => localStorage.getItem('admin_password') || '');
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [pingLatency, setPingLatency] = useState<number | null>(null);

  // New PDF Merger & Images-to-PDF States
  const [pdfMergeFiles, setPdfMergeFiles] = useState<File[]>([]);
  const [mergingPdfs, setMergingPdfs] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [convertingImages, setConvertingImages] = useState(false);
  const [imagesPdfUrl, setImagesPdfUrl] = useState<string | null>(null);

  // 7 New PDF Feature States
  const [splitFile, setSplitFile] = useState<File | null>(null);
  const [splittingPdf, setSplittingPdf] = useState(false);

  const [rotateFile, setRotateFile] = useState<File | null>(null);
  const [rotation, setRotation] = useState<number>(90);
  const [rotatingPdf, setRotatingPdf] = useState(false);

  const [protectFile, setProtectFile] = useState<File | null>(null);
  const [protectPassword, setProtectPassword] = useState('');
  const [protectingPdf, setProtectingPdf] = useState(false);

  const [unlockFile, setUnlockFile] = useState<File | null>(null);
  const [unlockPassword, setUnlockPassword] = useState('');
  const [unlockingPdf, setUnlockingPdf] = useState(false);

  const [pageNumFile, setPageNumFile] = useState<File | null>(null);
  const [pageNumPosition, setPageNumPosition] = useState<'top' | 'bottom'>('bottom');
  const [addingPageNums, setAddingPageNums] = useState(false);

  const [extractFile, setExtractFile] = useState<File | null>(null);
  const [extractPagesVal, setExtractPagesVal] = useState('');
  const [extractingPages, setExtractingPages] = useState(false);

  const [pdfToJpgFile, setPdfToJpgFile] = useState<File | null>(null);
  const [convertingPdfToJpg, setConvertingPdfToJpg] = useState(false);
  const [pdfToJpgProgress, setPdfToJpgProgress] = useState(0);

  // ====================================================
  // EFFECT HOOKS
  // ====================================================

  // Suppress TS6133 for state vars prepared for Settings Drawer (will be removed once Drawer JSX is wired)
  void mergedPdfUrl; void imagesPdfUrl;
  void setSoundProfile; void setUseCustomColor; void setCustomColor;
  void voices; void selectedVoiceURI;

  // Helper console logger
  // Web Audio sound synthesizer helper
  const playSound = (type: 'click' | 'success' | 'startup' | 'tick' | 'theme' | 'alarm', force = false) => {
    if (isMuted && !force) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      if (type === 'alarm') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = soundProfile === 'retro' ? 'sawtooth' : 'sine';
        osc.frequency.setValueAtTime(580, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(780, ctx.currentTime + 0.15);
        osc.frequency.linearRampToValueAtTime(580, ctx.currentTime + 0.3);
        osc.frequency.linearRampToValueAtTime(780, ctx.currentTime + 0.45);
        osc.frequency.linearRampToValueAtTime(580, ctx.currentTime + 0.6);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
        return;
      }

      if (soundProfile === 'retro') {
        if (type === 'click') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(1000, ctx.currentTime);
          osc.frequency.setValueAtTime(500, ctx.currentTime + 0.04);
          gain.gain.setValueAtTime(0.20, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.08);
        } else if (type === 'tick') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(1600, ctx.currentTime);
          gain.gain.setValueAtTime(0.10, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.02);
        } else if (type === 'theme') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(180, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(540, ctx.currentTime + 0.18);
          gain.gain.setValueAtTime(0.20, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.22);
        } else if (type === 'success') {
          const notes = [523.25, 659.25, 783.99, 1046.50];
          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
          gain.connect(ctx.destination);
          notes.forEach((f, idx) => {
            const osc = ctx.createOscillator();
            osc.type = 'square';
            osc.frequency.setValueAtTime(f, ctx.currentTime + idx * 0.07);
            osc.connect(gain);
            osc.start(ctx.currentTime + idx * 0.07);
            osc.stop(ctx.currentTime + 0.35);
          });
        } else if (type === 'startup') {
          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.20, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
          gain.connect(ctx.destination);
          const osc = ctx.createOscillator();
          osc.type = 'square';
          osc.frequency.setValueAtTime(200, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.6);
          osc.connect(gain);
          osc.start();
          osc.stop(ctx.currentTime + 0.8);
        }
      } else if (soundProfile === 'minimal') {
        if (type === 'click') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(1400, ctx.currentTime);
          gain.gain.setValueAtTime(0.20, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.03);
        } else if (type === 'tick') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(2200, ctx.currentTime);
          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.015);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.015);
        } else if (type === 'theme') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(350, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.1);
          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.12);
        } else if (type === 'success') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(880, ctx.currentTime);
          osc.frequency.setValueAtTime(1320, ctx.currentTime + 0.08);
          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.25);
        } else if (type === 'startup') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(300, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.5);
          gain.gain.setValueAtTime(0.20, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.6);
        }
      } else {
        if (type === 'click') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(800, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.08);
          gain.gain.setValueAtTime(0.22, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.08);
        } else if (type === 'tick') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(1000, ctx.currentTime);
          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.03);
        } else if (type === 'theme') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(200, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.2);
          gain.gain.setValueAtTime(0.25, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.25);
        } else if (type === 'success') {
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();
          osc1.frequency.setValueAtTime(523.25, ctx.currentTime);
          osc1.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08);
          osc2.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16);
          gain.gain.setValueAtTime(0.20, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(ctx.destination);
          osc1.start();
          osc2.start();
          osc1.stop(ctx.currentTime + 0.3);
          osc2.stop(ctx.currentTime + 0.3);
        } else if (type === 'startup') {
          const freqs = [150, 300, 450, 600];
          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
          gain.connect(ctx.destination);
          freqs.forEach(f => {
            const osc = ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(f * 1.5, ctx.currentTime + 0.8);
            osc.connect(gain);
            osc.start();
            osc.stop(ctx.currentTime + 1.2);
          });
        }
      }
    } catch (e) {
      console.warn("AudioContext block", e);
    }
  };

  const addConsoleLog = (log: string) => {
    const time = new Date().toLocaleTimeString();
    setConsoleLogs(prev => [...prev, `[${time}] ${log}`]);
    playSound('tick');
  };





  const formatBytes = (bytes: number, decimals = 2) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };



  const handleMarqueeMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (lastMouseX.current !== null) {
      const deltaX = Math.abs(e.clientX - lastMouseX.current);
      if (deltaX > 8) {
        setMarqueeDuration('10s'); // hyper speed
      } else if (deltaX > 3) {
        setMarqueeDuration('20s'); // high speed
      } else {
        setMarqueeDuration('30s'); // standard
      }
    }
    lastMouseX.current = e.clientX;

    if (velocityTimeout.current) clearTimeout(velocityTimeout.current);
    velocityTimeout.current = setTimeout(() => {
      setMarqueeDuration('30s');
    }, 150);
  };

  const commandList = [
    { name: 'AI Chat Agent Workspace', desc: 'Buka terminal asisten AI dengan pencarian web', key: 'chat' },
    { name: 'Word to PDF Converter', desc: 'Konversi file DOCX ke PDF lokal dengan cepat', key: 'word' },
    { name: 'PDF Compressor Optimizer', desc: 'Kompresi dan optimasi ukuran file PDF Anda', key: 'compressor' },
    { name: 'HD Media Downloader', desc: 'Unduh video dari sosial media via Cobalt API', key: 'downloader' },

    { name: 'System Diagnostics & Settings', desc: 'Pantau RAM/CPU server dan kunci API Gemini', key: 'diagnostics' }
  ].filter(cmd => cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) || cmd.desc.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleCommandPaletteSelect = (workspaceKey: string) => {
    setShowCommandPalette(false);
    if (workspaceKey === 'chat') {
      setChatOpen(true);
      addConsoleLog('[PALETTE] Selected AI Chat Agent.');
    } else if (workspaceKey === 'word') {
      setView('dashboard');
      triggerToolInChat('word-to-pdf', 'Word to PDF');
      setChatOpen(true);
      addConsoleLog('[PALETTE] Opened Word to PDF Converter.');
    } else if (workspaceKey === 'compressor') {
      setView('dashboard');
      triggerToolInChat('pdf-compressor', 'PDF Compressor');
      setChatOpen(true);
      addConsoleLog('[PALETTE] Opened PDF Compressor.');
    } else if (workspaceKey === 'downloader') {
      setView('dashboard');
      triggerToolInChat('media-downloader', 'Media Downloader');
      setChatOpen(true);
      addConsoleLog('[PALETTE] Opened Media Downloader.');

    } else if (workspaceKey === 'diagnostics') {
      setView('dashboard');
      triggerToolInChat('diagnostics', 'Diagnostics');
      setChatOpen(true);
      addConsoleLog('[PALETTE] Opened System Diagnostics.');
    }
  };

  const handleConsoleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (consoleHistory.length === 0) return;
      let nextPtr = historyPointer.current + 1;
      if (nextPtr >= consoleHistory.length) {
        nextPtr = consoleHistory.length - 1;
      }
      historyPointer.current = nextPtr;
      setConsoleInput(consoleHistory[nextPtr]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      let nextPtr = historyPointer.current - 1;
      if (nextPtr < 0) {
        historyPointer.current = -1;
        setConsoleInput('');
      } else {
        historyPointer.current = nextPtr;
        setConsoleInput(consoleHistory[nextPtr]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const inputVal = consoleInput.trim().toLowerCase();
      if (!inputVal) return;
      const matches = AVAILABLE_CONSOLE_COMMANDS.filter(c => c.startsWith(inputVal));
      if (matches.length > 0) {
        setConsoleInput(matches[0]);
        playSound('click');
      }
    }
  };

  const handleConsoleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consoleInput.trim()) return;

    const cmdStr = consoleInput.trim();
    addConsoleLog(`$ ${cmdStr}`);
    setConsoleHistory(prev => [cmdStr, ...prev]);
    historyPointer.current = -1;
    setConsoleInput('');

    const parts = cmdStr.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (command === 'help') {
      addConsoleLog('[SYSTEM] Perintah tersedia: help, ping, clear, theme, stats, chat, crt, lock, export, hack, exit');
      playSound('click');
    } else if (command === 'clear') {
      setConsoleLogs([]);
      playSound('click');
    } else if (command === 'ping') {
      handlePing();
    } else if (command === 'theme') {
      setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
      playSound('theme');
    } else if (command === 'chat') {
      setChatOpen(prev => !prev);
      playSound('click');
    } else if (command === 'stats') {
      addConsoleLog(`[STATS] CPU Load: ${diagnostics?.cpu || 'N/A'}`);
      addConsoleLog(`[STATS] RAM Load: ${diagnostics?.ram || 'N/A'}`);
      addConsoleLog(`[STATS] Uptime: ${diagnostics?.uptime || 'N/A'}`);
      addConsoleLog(`[STATS] DB Status: ${diagnostics?.db_status || 'N/A'}`);
      playSound('success');
    } else if (command === 'testload') {
      addConsoleLog('[SYSTEM] Simulating CRITICAL diagnostics load...');
      setDiagnostics(prev => ({
        cpu: '92.4%',
        ram: '88.1%',
        uptime: prev?.uptime || '2h 14m',
        status: 'warning',
        db_status: prev?.db_status || 'connected'
      }));
      setHighLoadWarning(true);
      playSound('alarm');
    } else if (command === 'crt') {
      const mode = args[0] ? args[0].toLowerCase() : '';
      if (mode === 'on') {
        setCrtActive(true);
        addConsoleLog('[SYSTEM] CRT scanlines activated.');
      } else if (mode === 'off') {
        setCrtActive(false);
        addConsoleLog('[SYSTEM] CRT scanlines deactivated.');
      } else {
        setCrtActive(prev => !prev);
        addConsoleLog(`[SYSTEM] CRT scanlines toggled.`);
      }
      playSound('theme');
    } else if (command === 'lock') {
      addConsoleLog('[SYSTEM] Activating secure enclave blockade. Core locked.');
      setIsLocked(true);
      playSound('alarm');
    } else if (command === 'export' || command === 'export-logs') {
      addConsoleLog('[SYSTEM] Packing terminal session logs...');
      exportConsoleLogs();
    } else if (command === 'hack' || command === 'breach') {
      startBreachGame();
    } else if (command === 'exit') {
      setConsoleOpen(false);
      playSound('click');
    } else {
      addConsoleLog(`[ERROR] Perintah tidak dikenal: "${command}". Ketik "help".`);
      playSound('click');
    }
  };

  // Voice Speech Recognition setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'id-ID';

      rec.onstart = () => {
        setIsListening(true);
        addConsoleLog('[VOICE] Speech recognition started. Listening...');
      };
      rec.onend = () => {
        setIsListening(false);
        addConsoleLog('[VOICE] Speech recognition ended.');
      };
      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setChatInput(prev => (prev ? prev + ' ' + transcript : transcript));
        addConsoleLog(`[VOICE] Speech recognized: "${transcript}"`);
      };
      recognitionRef.current = rec;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      showToast('Speech recognition is not supported in this browser.', 'error');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  // Text to Speech Synthesizer (Enhancement 1)
  const speakText = (text: string) => {
    if (isMuted || !window.speechSynthesis) return;

    // Remove code tags and special markdown
    const clean = text.replace(/\[TOOL:[^\]]+\]/g, '').replace(/[#*`>]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(clean);
    
    if (selectedVoiceURI) {
      const voice = voices.find(v => v.voiceURI === selectedVoiceURI);
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      }
    } else {
      utterance.lang = 'id-ID';
    }
    
    utterance.rate = 1.0;

    window.speechSynthesis.cancel(); // Stop current speech
    window.speechSynthesis.speak(utterance);
    addConsoleLog('[SPEECH] Reading agent response out loud.');
  };
  void speakText;

  // Sync background body styles on theme toggle
  useEffect(() => {
    if (theme === 'dark') {
      document.body.style.backgroundColor = '#000000';
      document.body.style.color = '#ffffff';
      addConsoleLog('[THEME] Changed workspace theme to Obsidian Dark mode.');
    } else if (theme === 'light') {
      document.body.style.backgroundColor = '#f9fafb';
      document.body.style.color = '#0a1b33';
      addConsoleLog('[THEME] Changed workspace theme to Light OS mode.');
    } else if (theme === 'cyberpunk') {
      document.body.style.backgroundColor = '#0d001a';
      document.body.style.color = '#ff007f';
      addConsoleLog('[THEME] Changed workspace theme to Cyberpunk Neon mode.');
    } else if (theme === 'matrix') {
      document.body.style.backgroundColor = '#000d00';
      document.body.style.color = '#00ff00';
      addConsoleLog('[THEME] Changed workspace theme to Matrix Retro mode.');
    }
  }, [theme]);

  // Load voices list for Speech Synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const loadVoices = () => {
        const list = window.speechSynthesis.getVoices();
        setVoices(list);
        if (list.length > 0) {
          const idVoice = list.find(v => v.lang === 'id-ID' || v.lang.includes('id'));
          setSelectedVoiceURI(idVoice ? idVoice.voiceURI : list[0].voiceURI);
        }
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const getThemeAccentColor = () => {
    if (useCustomColor) return customColor;
    if (theme === 'light') return '#0052ff';
    return '#10b981';
  };

  // Theme variable class definitions mapping
  const getThemeClasses = () => {
    switch (theme) {
      case 'light':
        return {
          bg: 'bg-white border-slate-200/50 text-[#0a1b33]',
          card: 'bg-slate-50 border-slate-200/60 text-[#0a1b33]',
          text: 'text-[#0a1b33]',
          subText: 'text-slate-500',
          border: 'border-slate-200/60',
          input: 'bg-white border-slate-200 text-slate-700',
          button: 'bg-[#0a1b33] text-white hover:bg-slate-800',
          activeText: 'text-[#0a1b33]',
          accent: 'blue'
        };
      case 'dark':
      default:
        return {
          bg: 'bg-neutral-950 border-white/10 text-white shadow-[0_40px_100px_-20px_rgba(255,255,255,0.015)]',
          card: 'bg-neutral-900 border-white/5 text-white',
          text: 'text-white',
          subText: 'text-neutral-400',
          border: 'border-white/10',
          input: 'bg-white/5 border-white/10 text-white',
          button: 'bg-white text-black hover:bg-neutral-200',
          activeText: 'text-white',
          accent: 'blue'
        };
    }
  };
  const themeCls = getThemeClasses();

  // Load diagnostics & settings on start, heavily deferred to keep them out of the critical path
  // Use 5s delay so LCP + FCP are fully painted before any backend API requests fire
  useEffect(() => {
    let diagInterval: any;
    const timer = setTimeout(() => {
      fetchDiagnostics();
      fetchSettings();
      diagInterval = setInterval(fetchDiagnostics, 8000); // 8 seconds polling to reduce main-thread pressure
    }, 5000);
    return () => {
      clearTimeout(timer);
      if (diagInterval) clearInterval(diagInterval);
    };
  }, []);

  // Automatic screen glitch transition hook wkwk
  useEffect(() => {
    setGlitchActive(true);
    const timer = setTimeout(() => setGlitchActive(false), 250);
    return () => clearTimeout(timer);
  }, [theme, view]);


  // Global Keyboard Shortcuts Event Listener
  useEffect(() => {
    const handleKeyDownGlobal = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowCommandPalette(false);
        setShowShortcutsHelp(false);
        setConsoleOpen(false);
        setChatOpen(false);
        setSettingsOpen(false);
        playSound('click');
        return;
      }
      
      if (e.key === '?' && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setShowShortcutsHelp(prev => !prev);
        playSound('click');
        return;
      }



      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'k') {
          e.preventDefault();
          setShowCommandPalette(prev => !prev);
          playSound('click');
        } else if (e.key === 'd') {
          e.preventDefault();
          setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
          playSound('theme');
        } else if (e.key === 'l') {
          e.preventDefault();
          setConsoleOpen(prev => !prev);
          playSound('click');
        } else if (e.key === 'm') {
          e.preventDefault();
          setIsMuted(prev => !prev);
          playSound('click');
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDownGlobal);
    return () => window.removeEventListener('keydown', handleKeyDownGlobal);
  }, [isMuted, soundProfile]);

  // Global Drag and Drop Listeners
  useEffect(() => {
    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      dragCounter.current++;
      if (e.dataTransfer && e.dataTransfer.items.length > 0) {
        setIsDragging(true);
        addConsoleLog('[DRAG] File entering browser window bounds.');
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      dragCounter.current--;
      if (dragCounter.current === 0) {
        setIsDragging(false);
        addConsoleLog('[DRAG] File left window bounds.');
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      dragCounter.current = 0;

      if (e.dataTransfer && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        const ext = file.name.split('.').pop()?.toLowerCase();
        addConsoleLog(`[DRAG] Dropped file: "${file.name}" (${formatBytes(file.size)}).`);

        if (ext === 'docx') {
          setView('dashboard');
          setWordFile(file);
          setConvertedPdfUrl(null);
          setChatMessages(prev => [...prev, {
            sender: 'agent',
            text: `Berkas Word **${file.name}** berhasil terdeteksi dari drag-and-drop! Formulir konversi di dashboard telah aktif.`,
            toolType: 'word-to-pdf'
          }]);
          setChatOpen(true);
        } else if (ext === 'pdf') {
          setView('dashboard');
          setPdfFile(file);
          setCompressionResult(null);
          setChatMessages(prev => [...prev, {
            sender: 'agent',
            text: `Berkas PDF **${file.name}** berhasil terdeteksi dari drag-and-drop! Formulir kompresi di dashboard telah aktif.`,
            toolType: 'pdf-compressor'
          }]);
          setChatOpen(true);
        } else {
          setChatMessages(prev => [...prev, {
            sender: 'agent',
            text: `Anda menjatuhkan berkas **${file.name}** (${formatBytes(file.size)}). Sistem Mainframe mendeteksi berkas ini tetapi memerlukan format .docx atau .pdf untuk diproses otomatis.`,
          }]);
          setChatOpen(true);
        }
      }
    };

    window.addEventListener('dragenter', handleDragEnter);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragenter', handleDragEnter);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('drop', handleDrop);
    };
  }, []);



  // System time and Cryptographic Key Rotation countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSystemTime(new Date());
      setKeyRotationCountdown(prev => {
        if (prev <= 1) {
          addConsoleLog('[SECURE] Secondary cryptographic keys rotated.');
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Breach Protocol game countdown timer
  useEffect(() => {
    if (!breachActive || breachResult !== null) return;
    if (breachTimeLeft <= 0) {
      setBreachResult('failed');
      playSound('alarm', true);
      addConsoleLog('[WARNING] Breach Protocol failed: TIME ELAPSED.');
      return;
    }
    const timer = setTimeout(() => {
      setBreachTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [breachActive, breachTimeLeft, breachResult]);

  // ====================================================
  // API INTEGRATIONS
  // ====================================================

  const fetchDiagnostics = async () => {
    try {
      const res = await authFetch(`${API_BASE}/diagnostics`);
      if (res.ok) {
        const data = await res.json();
        setDiagnostics(data);
        // Warning system triggers wkwk
        const cpuNum = parseFloat(data.cpu.replace('%', ''));
        const ramNum = parseFloat(data.ram.replace('%', ''));

        // Warning system triggers wkwk
        if (cpuNum > 80 || ramNum > 80) {
          setHighLoadWarning(true);
          playSound('alarm');
        } else {
          setHighLoadWarning(false);
        }
      }
    } catch (err) {
      console.warn('Diagnostics offline');
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await authFetch(`${API_BASE}/settings`);
      if (res.ok) {
        const data = await res.json();
        if (data.gemini_api_key) {
          setGeminiKey(data.gemini_api_key);
        }
      }
    } catch (err) {
      console.warn('Settings endpoint offline');
    }
  };



  const startBreachGame = () => {
    const hexCodes = ['E9', '7A', '1C', '55', 'BD', 'FF', '4A'];
    const grid: string[][] = [];
    for (let r = 0; r < 5; r++) {
      const row: string[] = [];
      for (let c = 0; c < 5; c++) {
        row.push(hexCodes[Math.floor(Math.random() * hexCodes.length)]);
      }
      grid.push(row);
    }
    
    // Generate valid target sequence from grid walking paths
    const seq: string[] = [];
    let currRow = 0;
    let currCol = Math.floor(Math.random() * 5);
    seq.push(grid[currRow][currCol]);
    
    currRow = Math.floor(Math.random() * 5);
    seq.push(grid[currRow][currCol]);
    
    currCol = Math.floor(Math.random() * 5);
    seq.push(grid[currRow][currCol]);
    
    setBreachGrid(grid);
    setBreachSequence(seq);
    setBreachInput([]);
    setBreachActiveRow(0); // Top row active
    setBreachActiveCol(null);
    setBreachTimeLeft(30);
    setBreachResult(null);
    setBreachActive(true);
    playSound('startup', true);
    addConsoleLog('[SYSTEM] Initializing system Breach Protocol decryptor...');
  };

  const exportConsoleLogs = () => {
    try {
      const content = consoleLogs.join('\n');
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `mainframe-session-${new Date().toISOString().slice(0,10)}.log`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      addConsoleLog('[SYSTEM] Console logs exported successfully.');
      playSound('success');
    } catch (err) {
      console.error(err);
      addConsoleLog('[ERROR] Gagal mengekspor log.');
    }
  };

  const saveSettings = async () => {
    setSettingsLoading(true);
    addConsoleLog('[SETTINGS] Uploading API Key to Go SQLite database...');
    try {
      const res = await authFetch(`${API_BASE}/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gemini_api_key: geminiKey })
      });
      if (res.ok) {
        showToast('API Key berhasil disimpan ke database SQLite!', 'success');
        addConsoleLog('[SETTINGS] API Key saved successfully.');
      } else {
        showToast('Gagal menyimpan API Key', 'error');
        addConsoleLog('[SETTINGS] Failed to save key.');
      }
    } catch (err) {
      showToast('Koneksi database gagal.', 'error');
      addConsoleLog('[SETTINGS] Server offline error.');
    } finally {
      setSettingsLoading(false);
    }
  };

  const handlePing = async () => {
    const start = performance.now();
    addConsoleLog('[DIAGNOSTICS] Pinging Go Backend...');
    try {
      const res = await authFetch(`${API_BASE}/diagnostics`);
      if (res.ok) {
        const end = performance.now();
        const latency = Math.round(end - start);
        setPingLatency(latency);
        addConsoleLog(`[DIAGNOSTICS] Ping successful. Latency: ${latency} ms.`);
      }
    } catch (err) {
      setPingLatency(null);
      addConsoleLog('[DIAGNOSTICS] Ping failed. Backend unreachable.');
    }
  };

  // AI Chat Submit
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');
    setChatLoading(true);
    setChatLogs([{ step: 'Inisialisasi', detail: 'Menghubungkan ke server backend...' }]);
    addConsoleLog(`[CHAT] User query: "${userMsg}"`);

    // Conversational keywords triggers
    const lower = userMsg.toLowerCase();
    let detectedTool: string | undefined;
    
    if (lower.includes('word') || lower.includes('docx') || lower.includes('convert') || lower.includes('konversi')) {
      detectedTool = 'word-to-pdf';
    } else if (lower.includes('compress') || lower.includes('kompres') || lower.includes('pdf')) {
      detectedTool = 'pdf-compressor';
    } else if (lower.includes('download') || lower.includes('video') || lower.includes('youtube') || lower.includes('cobalt')) {
      detectedTool = 'media-downloader';

    } else if (lower.includes('diagnostics') || lower.includes('cpu') || lower.includes('ram') || lower.includes('ping') || lower.includes('settings')) {
      detectedTool = 'diagnostics';
    }

    try {
      const res = await authFetch(`${API_BASE}/agent-chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });

      if (res.ok) {
        const data = await res.json();
        setChatMessages(prev => [...prev, {
          sender: 'agent',
          text: data.answer,
          sources: data.sources,
          toolType: detectedTool
        }]);
        if (data.logs) {
          setChatLogs(data.logs);
        }
      } else {
        const errMsg = 'Gagal mendapatkan respon dari server. Menjalankan fallback offline.';
        setChatMessages(prev => [...prev, {
          sender: 'agent',
          text: errMsg,
          toolType: detectedTool
        }]);
      }
    } catch (err) {
      setChatMessages(prev => [...prev, {
        sender: 'agent',
        text: 'Mengaktifkan widget lokal di obrolan Anda:',
        toolType: detectedTool || undefined
      }]);
    } finally {
      setChatLoading(false);
    }
  };

  // Word PDF Conversion
  const handleWordConversion = async () => {
    if (!wordFile) return;
    setConverting(true);
    setConvertedPdfUrl(null);
    addConsoleLog(`[CONVERTER] Opening Word parser stream for "${wordFile.name}"...`);

    const formData = new FormData();
    formData.append('file', wordFile);

    try {
      const res = await authFetch(`${API_BASE}/convert-word-pdf`, {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setConvertedPdfUrl(url);
        addConsoleLog('[CONVERTER] File successfully converted into A4 PDF.');
        playSound('success');

        const a = document.createElement('a');
        a.href = url;
        a.download = wordFile.name.replace(/\.[^/.]+$/, '') + '.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        showToast('Gagal mengonversi file.', 'error');
        addConsoleLog('[CONVERTER] Conversion failure.');
      }
    } catch (err) {
      showToast('Terjadi kesalahan jaringan.', 'error');
      addConsoleLog('[CONVERTER] Network error contacting Go server.');
    } finally {
      setConverting(false);
    }
  };

  // PDF Compressor
  const handleCompressPdf = async () => {
    if (!pdfFile) return;
    setCompressing(true);
    setCompressionResult(null);
    addConsoleLog(`[COMPRESSOR] Initializing PDF structural compression for "${pdfFile.name}"...`);

    const formData = new FormData();
    formData.append('file', pdfFile);

    try {
      const res = await authFetch(`${API_BASE}/compress-pdf`, {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const originalSize = parseInt(res.headers.get('x-original-size') || '0', 10);
        const compressedSize = parseInt(res.headers.get('x-compressed-size') || '0', 10);

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);

        setCompressionResult({
          originalSize,
          compressedSize,
          pdfUrl: url
        });

        addConsoleLog(`[COMPRESSOR] PDF size optimized: ${formatBytes(originalSize)} -> ${formatBytes(compressedSize)}.`);
        playSound('success');

        const a = document.createElement('a');
        a.href = url;
        a.download = 'compressed_' + pdfFile.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        showToast('Gagal mengompres PDF.', 'error');
        addConsoleLog('[COMPRESSOR] Compression failed.');
      }
    } catch (err) {
      showToast('Terjadi kesalahan jaringan.', 'error');
      addConsoleLog('[COMPRESSOR] Network error contacting Go server.');
    } finally {
      setCompressing(false);
    }
  };

  // PDF Merger
  const handleMergePdfs = async () => {
    if (pdfMergeFiles.length < 2) return;
    setMergingPdfs(true);
    setMergedPdfUrl(null);
    addConsoleLog(`[MERGER] Merging ${pdfMergeFiles.length} PDF files...`);

    const formData = new FormData();
    pdfMergeFiles.forEach(file => {
      formData.append('files', file);
    });

    try {
      const res = await authFetch(`${API_BASE}/merge-pdfs`, {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setMergedPdfUrl(url);
        addConsoleLog('[MERGER] PDF files merged successfully.');
        playSound('success');

        const a = document.createElement('a');
        a.href = url;
        a.download = 'merged_document.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        showToast('Gagal menggabungkan PDF.', 'error');
        addConsoleLog('[MERGER] Merge failed.');
      }
    } catch (err) {
      showToast('Terjadi kesalahan jaringan.', 'error');
      addConsoleLog('[MERGER] Network error.');
    } finally {
      setMergingPdfs(false);
    }
  };

  // Images to PDF
  const handleImagesToPdf = async () => {
    if (imageFiles.length === 0) return;
    setConvertingImages(true);
    setImagesPdfUrl(null);
    addConsoleLog(`[IMAGE2PDF] Converting ${imageFiles.length} images to PDF...`);

    const formData = new FormData();
    imageFiles.forEach(file => {
      formData.append('files', file);
    });

    try {
      const res = await authFetch(`${API_BASE}/images-to-pdf`, {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setImagesPdfUrl(url);
        addConsoleLog('[IMAGE2PDF] Images converted to PDF successfully.');
        playSound('success');

        const a = document.createElement('a');
        a.href = url;
        a.download = 'images_converted.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        showToast('Gagal mengonversi gambar ke PDF.', 'error');
        addConsoleLog('[IMAGE2PDF] Conversion failed.');
      }
    } catch (err) {
      showToast('Terjadi kesalahan jaringan.', 'error');
      addConsoleLog('[IMAGE2PDF] Network error.');
    } finally {
      setConvertingImages(false);
    }
  };

  // Split PDF
  const handleSplitPdf = async () => {
    if (!splitFile) return;
    setSplittingPdf(true);
    playSound('click');
    addConsoleLog('[PDF] Memulai proses split PDF...');
    try {
      const formData = new FormData();
      formData.append('file', splitFile);
      const response = await authFetch(`${API_BASE}/split-pdf`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Split failed');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `split_${splitFile.name.replace(/\.[^/.]+$/, "")}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      playSound('success');
      addConsoleLog('[PDF] Split PDF sukses. ZIP diunduh.');
    } catch (err: any) {
      playSound('alarm');
      addConsoleLog(`[ERROR] Gagal split PDF: ${err.message}`);
      showToast(`Gagal memecah PDF: ${err.message}`, 'error');
    } finally {
      setSplittingPdf(false);
    }
  };

  // Rotate PDF
  const handleRotatePdf = async () => {
    if (!rotateFile) return;
    setRotatingPdf(true);
    playSound('click');
    addConsoleLog('[PDF] Memulai proses rotasi PDF...');
    try {
      const formData = new FormData();
      formData.append('file', rotateFile);
      formData.append('rotation', rotation.toString());
      const response = await authFetch(`${API_BASE}/rotate-pdf`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Rotate failed');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `rotated_${rotateFile.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      playSound('success');
      addConsoleLog('[PDF] Rotasi PDF sukses. PDF diunduh.');
    } catch (err: any) {
      playSound('alarm');
      addConsoleLog(`[ERROR] Gagal rotasi PDF: ${err.message}`);
      showToast(`Gagal memutar PDF: ${err.message}`, 'error');
    } finally {
      setRotatingPdf(false);
    }
  };

  // Protect PDF
  const handleProtectPdf = async () => {
    if (!protectFile || !protectPassword) return;
    setProtectingPdf(true);
    playSound('click');
    addConsoleLog('[PDF] Mengunci PDF...');
    try {
      const formData = new FormData();
      formData.append('file', protectFile);
      formData.append('password', protectPassword);
      const response = await authFetch(`${API_BASE}/protect-pdf`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Encrypt failed');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `protected_${protectFile.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      playSound('success');
      addConsoleLog('[PDF] Kunci PDF sukses. PDF diunduh.');
    } catch (err: any) {
      playSound('alarm');
      addConsoleLog(`[ERROR] Gagal mengunci PDF: ${err.message}`);
      showToast(`Gagal mengunci PDF: ${err.message}`, 'error');
    } finally {
      setProtectingPdf(false);
    }
  };

  // Unlock PDF
  const handleUnlockPdf = async () => {
    if (!unlockFile) return;
    setUnlockingPdf(true);
    playSound('click');
    addConsoleLog('[PDF] Membuka kunci PDF...');
    try {
      const formData = new FormData();
      formData.append('file', unlockFile);
      formData.append('password', unlockPassword);
      const response = await authFetch(`${API_BASE}/unlock-pdf`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Decrypt failed');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `unlocked_${unlockFile.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      playSound('success');
      addConsoleLog('[PDF] Buka kunci PDF sukses. PDF diunduh.');
    } catch (err: any) {
      playSound('alarm');
      addConsoleLog(`[ERROR] Gagal membuka kunci PDF: ${err.message}`);
      showToast(`Gagal membuka kunci PDF: ${err.message}`, 'error');
    } finally {
      setUnlockingPdf(false);
    }
  };

  // Page Numbers
  const handleAddPageNums = async () => {
    if (!pageNumFile) return;
    setAddingPageNums(true);
    playSound('click');
    addConsoleLog('[PDF] Menambahkan nomor halaman ke PDF...');
    try {
      const formData = new FormData();
      formData.append('file', pageNumFile);
      formData.append('position', pageNumPosition);
      const response = await authFetch(`${API_BASE}/add-page-numbers`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Add watermark failed');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `numbered_${pageNumFile.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      playSound('success');
      addConsoleLog('[PDF] Tambah nomor halaman sukses. PDF diunduh.');
    } catch (err: any) {
      playSound('alarm');
      addConsoleLog(`[ERROR] Gagal menambah nomor halaman: ${err.message}`);
      showToast(`Gagal menambah nomor halaman: ${err.message}`, 'error');
    } finally {
      setAddingPageNums(false);
    }
  };

  // Extract Pages
  const handleExtractPages = async () => {
    if (!extractFile || !extractPagesVal) return;
    setExtractingPages(true);
    playSound('click');
    addConsoleLog('[PDF] Mengekstrak halaman PDF...');
    try {
      const formData = new FormData();
      formData.append('file', extractFile);
      formData.append('pages', extractPagesVal);
      const response = await authFetch(`${API_BASE}/extract-pages`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Extract failed');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `extracted_${extractFile.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      playSound('success');
      addConsoleLog('[PDF] Ekstrak halaman PDF sukses. PDF diunduh.');
    } catch (err: any) {
      playSound('alarm');
      addConsoleLog(`[ERROR] Gagal mengekstrak halaman PDF: ${err.message}`);
      showToast(`Gagal mengekstrak halaman PDF: ${err.message}`, 'error');
    } finally {
      setExtractingPages(false);
    }
  };

  // PDF to JPG (100% Client-side using pdfjs-dist and JSZip)
  const handlePdfToJpg = async () => {
    if (!pdfToJpgFile) return;
    setConvertingPdfToJpg(true);
    setPdfToJpgProgress(0);
    playSound('click');
    addConsoleLog('[PDF] Memulai konversi PDF ke JPG di browser...');
    try {
      addConsoleLog('[PDF] Memuat library pdfjs, jszip, dan file-saver...');
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
      
      const JSZip = (await import('jszip')).default;
      const { saveAs } = await import('file-saver');

      const arrayBuffer = await pdfToJpgFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      addConsoleLog(`[PDF] Dokumen dimuat: ${numPages} halaman.`);

      const zip = new JSZip();

      for (let i = 1; i <= numPages; i++) {
        setPdfToJpgProgress(Math.round(((i - 1) / numPages) * 100));
        addConsoleLog(`[PDF] Rendering halaman ${i} dari ${numPages}...`);
        
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 });
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Canvas context is null');
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport, canvas }).promise;
        
        const blob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob((b) => resolve(b), 'image/jpeg', 0.95);
        });

        if (blob) {
          zip.file(`page_${i}.jpg`, blob);
        }
      }

      setPdfToJpgProgress(100);
      addConsoleLog('[PDF] Mengemas file JPG ke dalam ZIP...');
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `${pdfToJpgFile.name.replace(/\.[^/.]+$/, "")}_jpg.zip`);
      playSound('success');
      addConsoleLog('[PDF] Konversi PDF ke JPG sukses. ZIP diunduh.');
    } catch (err: any) {
      playSound('alarm');
      addConsoleLog(`[ERROR] Gagal konversi PDF ke JPG: ${err.message}`);
      showToast(`Gagal konversi PDF ke JPG: ${err.message}`, 'error');
    } finally {
      setConvertingPdfToJpg(false);
    }
  };

  // Media Downloader
  const handleMediaDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaUrl.trim()) return;

    setDownloadingMedia(true);
    setDownloaderResult(null);
    addConsoleLog(`[DOWNLOADER] Intercepting link payload: "${mediaUrl}"...`);

    try {
      const res = await authFetch(`${API_BASE}/media-download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: mediaUrl,
          format: mediaFormat,
          quality: mediaQuality
        })
      });

      if (res.ok) {
        const data = await res.json();
        setDownloaderResult({
          title: data.title,
          downloadUrl: data.downloadUrl,
          status: data.status
        });
        addConsoleLog(`[DOWNLOADER] Cobalt API returned download link for "${data.title}".`);
        playSound('success');
      } else {
        showToast('Gagal mendapatkan tautan download.', 'error');
        addConsoleLog('[DOWNLOADER] API retrieval failed.');
      }
    } catch (err) {
      showToast('Koneksi backend gagal.', 'error');
      addConsoleLog('[DOWNLOADER] Connection refused.');
    } finally {
      setDownloadingMedia(false);
    }
  };

  // ====================================================
  // INTERACTIVE BEHAVIORS & UTILITIES
  // ====================================================

  const triggerToolInChat = (toolKey: string, toolLabel: string) => {
    addConsoleLog(`[CHAT] Injecting inline tool widget: "${toolLabel}".`);
    setChatMessages(prev => [...prev, {
      sender: 'agent',
      text: `Berikut adalah perkakas **${toolLabel}** yang Anda minta. Silakan gunakan formulir interaktif di bawah ini:`,
      toolType: toolKey
    }]);
  };

  // Helper renderer for inline tools inside chat messages
  const renderChatTool = (toolType: string) => {
    const cardBg = theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10';
    const textTheme = theme === 'light' ? 'text-[#0a1b33]' : 'text-white';
    const inputTheme = theme === 'light' ? 'bg-white border-slate-200 text-slate-700' : 'bg-white/5 border-white/10 text-white';

    switch (toolType) {
      case 'word-to-pdf':
        return (
          <div className={`mt-3 p-4 border rounded-2xl space-y-4 shadow-sm ${cardBg}`}>
            <h4 className="text-xs font-bold flex items-center space-x-1.5"><FileText className="w-3.5 h-3.5 text-blue-500" /><span className={textTheme}>Word to PDF Converter</span></h4>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsWordDragHover(true);
              }}
              onDragLeave={() => setIsWordDragHover(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsWordDragHover(false);
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  setWordFile(e.dataTransfer.files[0]);
                }
              }}
              style={{ '--glow-color': getThemeAccentColor() } as React.CSSProperties}
              className={`border border-dashed border-slate-300 rounded-xl p-4 text-center bg-white/20 transition-all ${
                isWordDragHover ? 'uploader-glow' : ''
              }`}
            >
              <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <input
                type="file"
                accept=".docx"
                onChange={e => {
                  if (e.target.files && e.target.files[0]) {
                    setWordFile(e.target.files[0]);
                  }
                }}
                className="hidden"
                id="chat-docx-uploader"
              />
              <label
                htmlFor="chat-docx-uploader"
                className="inline-block bg-[#0a1b33] text-white text-[10px] font-semibold px-3 py-1.5 rounded-full cursor-pointer hover:bg-slate-800"
              >
                Upload DOCX
              </label>
              {wordFile && <p className="text-[10px] text-blue-500 mt-2 font-semibold">{wordFile.name}</p>}
            </div>
            {wordFile && (
              <button
                onClick={handleWordConversion}
                disabled={converting}
                className="w-full bg-[#0a1b33] text-white py-2 rounded-lg font-bold hover:bg-slate-800 cursor-pointer flex items-center justify-center space-x-1.5 text-[10px]"
              >
                {converting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <FileDown className="w-3.5 h-3.5" />}
                <span>{converting ? 'Converting...' : 'Convert to PDF'}</span>
              </button>
            )}
            {convertedPdfUrl && (
              <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-between text-[10px]">
                <span className="text-blue-500">Generated successfully!</span>
                <a href={convertedPdfUrl} download="converted.pdf" className="text-blue-500 hover:underline font-bold">Download</a>
              </div>
            )}
          </div>
        );
      case 'pdf-compressor':
        return (
          <div className={`mt-3 p-4 border rounded-2xl space-y-4 shadow-sm ${cardBg}`}>
            <h4 className="text-xs font-bold flex items-center space-x-1.5"><FileCode className="w-3.5 h-3.5 text-purple-500" /><span className={textTheme}>PDF Compressor</span></h4>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsPdfDragHover(true);
              }}
              onDragLeave={() => setIsPdfDragHover(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsPdfDragHover(false);
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  setPdfFile(e.dataTransfer.files[0]);
                }
              }}
              style={{ '--glow-color': getThemeAccentColor() } as React.CSSProperties}
              className={`border border-dashed border-slate-300 rounded-xl p-4 text-center bg-white/20 transition-all ${
                isPdfDragHover ? 'uploader-glow' : ''
              }`}
            >
              <FileCode className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <input
                type="file"
                accept=".pdf"
                onChange={e => {
                  if (e.target.files && e.target.files[0]) {
                    setPdfFile(e.target.files[0]);
                  }
                }}
                className="hidden"
                id="chat-pdf-uploader"
              />
              <label
                htmlFor="chat-pdf-uploader"
                className="inline-block bg-[#0a1b33] text-white text-[10px] font-semibold px-3 py-1.5 rounded-full cursor-pointer hover:bg-slate-800"
              >
                Upload PDF
              </label>
              {pdfFile && <p className="text-[10px] text-blue-500 mt-2 font-semibold">{pdfFile.name}</p>}
            </div>
            {pdfFile && (
              <button
                onClick={handleCompressPdf}
                disabled={compressing}
                className="w-full bg-[#0a1b33] text-white py-2 rounded-lg font-bold hover:bg-slate-800 cursor-pointer flex items-center justify-center space-x-1.5 text-[10px]"
              >
                {compressing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                <span>{compressing ? 'Optimizing...' : 'Compress PDF'}</span>
              </button>
            )}
            {compressionResult && (
              <div className="p-3 bg-white/10 border border-slate-200/20 rounded-xl text-[10px] space-y-2.5">
                <div className="flex justify-between font-semibold border-b border-slate-200/10 pb-1.5">
                  <span>Hasil Kompresi PDF</span>
                  <span className="text-blue-500 font-bold">
                    {Math.round((1 - compressionResult.compressedSize / compressionResult.originalSize) * 100)}% Hemat
                  </span>
                </div>
                
                {/* Visual Comparative Chart */}
                <div className="space-y-2">
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-[8px] text-slate-400">
                      <span>Original Size</span>
                      <span>{formatBytes(compressionResult.originalSize)}</span>
                    </div>
                    <div className="w-full bg-slate-200/30 h-3.5 rounded-full overflow-hidden">
                      <div className="bg-slate-400 h-full rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>
                  
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-[8px] text-slate-400">
                      <span>Optimized Size</span>
                      <span className="text-blue-500 font-bold">{formatBytes(compressionResult.compressedSize)}</span>
                    </div>
                    <div className="w-full bg-slate-200/30 h-3.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-blue-500 h-full rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: `${(compressionResult.compressedSize / compressionResult.originalSize) * 100}%` }} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case 'media-downloader':
        return (
          <div className={`mt-3 p-4 border rounded-2xl space-y-3 shadow-sm ${cardBg}`}>
            <h4 className="text-xs font-bold flex items-center space-x-1.5"><Video className="w-3.5 h-3.5 text-rose-500" /><span className={textTheme}>Media Downloader</span></h4>
            <input
              type="url"
              placeholder="Paste social media URL here..."
              value={mediaUrl}
              onChange={e => setMediaUrl(e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-[10px] outline-none ${inputTheme}`}
            />
            <div className="grid grid-cols-2 gap-2">
              <select value={mediaFormat} onChange={e => setMediaFormat(e.target.value)} className={`border rounded-lg px-2 py-1.5 text-[10px] outline-none ${inputTheme}`}>
                <option value="mp4" className="text-slate-700">MP4 (Video)</option>
                <option value="mp3" className="text-slate-700">MP3 (Audio)</option>
              </select>
              <select value={mediaQuality} onChange={e => setMediaQuality(e.target.value)} className={`border rounded-lg px-2 py-1.5 text-[10px] outline-none ${inputTheme}`}>
                <option value="1080" className="text-slate-700">1080p</option>
                <option value="720" className="text-slate-700">720p</option>
                <option value="480" className="text-slate-700">480p</option>
              </select>
            </div>
            <button
              onClick={handleMediaDownload}
              disabled={downloadingMedia}
              className="w-full bg-[#0a1b33] text-white py-2 rounded-lg font-bold hover:bg-slate-800 cursor-pointer flex items-center justify-center space-x-1.5 text-[10px]"
            >
              {downloadingMedia ? <Loader2 className="w-3 h-3 animate-spin" /> : <Video className="w-3.5 h-3.5" />}
              <span>Get Download Link</span>
            </button>
            {downloaderResult && (
              <div className="p-3 bg-white/10 border border-slate-200/20 rounded-2xl space-y-2 text-[10px]">
                <div className="flex items-center justify-between">
                  <span className="truncate max-w-[150px] font-semibold text-slate-200">{downloaderResult.title}</span>
                  <a href={downloaderResult.downloadUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline font-bold">Download Link</a>
                </div>
                {downloaderResult.downloadUrl && (
                  <div className="relative rounded-xl overflow-hidden border border-white/5 bg-black/40 aspect-video flex items-center justify-center">
                    <video
                      src={downloaderResult.downloadUrl}
                      controls
                      preload="metadata"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        console.warn("Inline player blocked by CORS or codec", e);
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        );
      case 'diagnostics':
        return (
          <div className={`mt-3 p-4 border rounded-2xl space-y-3 shadow-sm ${cardBg}`}>
            <h4 className="text-xs font-bold flex items-center justify-between w-full">
              <span className="flex items-center space-x-1.5">
                <Activity className="w-3.5 h-3.5 text-blue-500" />
                <span className={textTheme}>System Diagnostics</span>
              </span>
              {highLoadWarning && (
                <span className="bg-red-500/20 border border-red-500/40 text-red-500 text-[7px] font-bold px-1.5 py-0.5 rounded animate-pulse select-none">
                  ⚠️ CRITICAL LOAD
                </span>
              )}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="bg-white/20 p-2.5 rounded-xl border border-slate-200/40 flex flex-col justify-between">
                <div>
                  <span className="text-slate-400 block text-[8px]">CPU Load</span>
                  <span className="font-bold">{diagnostics?.cpu || '0.0%'}</span>
                </div>
              </div>
              <div className="bg-white/20 p-2.5 rounded-xl border border-slate-200/40 flex flex-col justify-between">
                <div>
                  <span className="text-slate-400 block text-[8px]">RAM Load</span>
                  <span className="font-bold">{diagnostics?.ram || '0.0%'}</span>
                </div>
              </div>
            </div>
            
            {/* System Clock & Countdown HUD */}
            <div className="bg-black/40 p-2.5 rounded-xl border border-blue-500/10 grid grid-cols-2 gap-1.5 text-[8.5px] font-mono leading-tight">
              <div>
                <span className="text-slate-500 block text-[7px] uppercase font-semibold">Local HUD Clock</span>
                <span className="text-[#00ffcc] font-bold text-[10px]">
                  {systemTime.toLocaleTimeString()}
                </span>
                <span className="text-slate-400 block text-[6.5px]">
                  WIB (UTC+7)
                </span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block text-[7px] uppercase font-semibold">Crypto Rotation</span>
                <span className="text-yellow-400 font-bold block text-[10px] animate-pulse">
                  {keyRotationCountdown}s
                </span>
                <span className="text-[6.5px] text-slate-400">
                  Sec-Keys Rotate
                </span>
              </div>
            </div>

            <button onClick={handlePing} className="w-full bg-[#0a1b33] text-white py-1.5 rounded-lg font-bold hover:bg-slate-800 text-[10px]">Ping Latency</button>
            {pingLatency !== null && <p className="text-[10px] text-blue-500 text-center font-bold">Latency: {pingLatency} ms</p>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen w-full py-10 px-4 md:px-10 flex flex-col justify-start transition-colors duration-500 theme-${theme} ${
        theme === 'light' ? 'bg-[#f9fafb]' : 'bg-[#000000]'
      } ${themeCls.text} ${crtActive ? 'crt-screen crt-flicker' : ''} ${glitchActive ? 'cyber-glitch' : ''}`}
    >
      {isLocked && (
        <div className="fixed inset-0 z-[9999] bg-neutral-950/95 backdrop-blur-lg flex flex-col items-center justify-center font-mono p-6 text-emerald-400 select-none">
          {crtActive && <div className="crt-screen crt-flicker absolute inset-0 pointer-events-none" />}
          
          <div className="w-full max-w-md p-8 border border-emerald-500/20 bg-black/40 rounded-3xl text-center space-y-6 relative overflow-hidden shadow-[0_0_50px_rgba(0,255,0,0.05)] animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.2)]">
              <Lock className="w-10 h-10 text-red-500" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-sm font-bold tracking-widest text-red-500 uppercase">
                ⚠️ CORE COGNITIVE ENCLAVE LOCKED
              </h2>
              <p className="text-[9px] text-slate-400">
                Unauthorized access will trigger secondary alarms. Enter bypass credentials to unlock.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (lockPassword === 'admin') {
                  setLockError(false);
                  setLockPassword('');
                  setIsLocked(false);
                  playSound('success', true);
                  setGlitchActive(true);
                  setTimeout(() => setGlitchActive(false), 300);
                  addConsoleLog('[SYSTEM] Decryption bypass successful. Terminal unlocked.');
                } else {
                  setLockError(true);
                  playSound('alarm', true);
                  addConsoleLog('[WARNING] Decryption bypass failed: ACCESS DENIED.');
                }
              }}
              className="space-y-4"
            >
              <div className="relative">
                <input
                  type="password"
                  value={lockPassword}
                  onChange={(e) => {
                    setLockPassword(e.target.value);
                    setLockError(false);
                  }}
                  placeholder="Enter bypass passcode..."
                  className={`w-full bg-black/50 border rounded-xl px-4 py-2 text-center text-xs tracking-wider outline-none font-mono ${
                    lockError ? 'border-red-500 text-red-500 animate-shake' : 'border-emerald-500/30 text-emerald-400 placeholder-emerald-700/50'
                  }`}
                  autoFocus
                />
              </div>

              {lockError && (
                <div className="text-[8px] text-red-500 font-bold tracking-wider animate-pulse">
                  [ACCESS DENIED: CREDENTIAL MISMATCH]
                </div>
              )}

              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold py-2 rounded-xl text-[10px] transition-all cursor-pointer active:scale-95"
                >
                  DECRYPT ACCESS
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLockPassword('admin');
                    setLockError(false);
                  }}
                  className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-slate-400 px-3 py-2 rounded-xl text-[8px] transition-all cursor-pointer"
                  title="Quick Fill Bypass Code"
                >
                  Clue
                </button>
              </div>
            </form>
            
            <div className="text-[7px] text-slate-500 font-semibold border-t border-slate-800/30 pt-3">
              SYSTEM LOCKDOWN STATE: SECURE // CRYPTO-KEY STAGE 2
            </div>
          </div>
        </div>
      )}

            {breachActive && (
        <div className="fixed inset-0 z-[9999] bg-[#020707]/97 backdrop-blur-xl flex flex-col items-center justify-center font-mono p-6 text-emerald-400 select-none">
          {crtActive && <div className="crt-screen crt-flicker absolute inset-0 pointer-events-none" />}
          
          <div className="w-full max-w-2xl border border-emerald-500/20 bg-[#010a0a]/80 p-6 rounded-3xl space-y-6 shadow-[0_0_60px_rgba(0,255,200,0.1)] animate-fade-in">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-emerald-500/20 pb-4">
              <div className="flex items-center space-x-2">
                <Terminal className="w-5 h-5 text-[#00ffcc] animate-pulse" />
                <span className="text-sm font-bold tracking-wider text-[#00ffcc]">BREACH_PROTOCOL // V3.21</span>
              </div>
              <div className={`text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 ${
                breachTimeLeft <= 10 ? 'text-red-500 border-red-500/30 animate-pulse' : 'text-emerald-400'
              }`}>
                TIMER: {breachTimeLeft}s
              </div>
            </div>

            {breachResult === null ? (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {/* Left: Code Matrix */}
                <div className="md:col-span-3 space-y-2">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">
                    Code Matrix
                  </div>
                  <div className="grid grid-cols-5 gap-1.5 bg-black/60 p-3 rounded-2xl border border-emerald-500/10">
                    {breachGrid.map((row, r) => 
                      row.map((cell, c) => {
                        const isRowActive = breachActiveRow === r;
                        const isColActive = breachActiveCol === c;
                        const isPlayable = (breachActiveRow !== null && isRowActive) || (breachActiveCol !== null && isColActive);
                        
                        return (
                          <button
                            key={`${r}-${c}`}
                            onClick={() => handleBreachCellClick(r, c, cell)}
                            disabled={cell === '--'}
                            className={`aspect-square flex items-center justify-center text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
                              cell === '--'
                                ? 'bg-neutral-900 border-neutral-800 text-neutral-700 cursor-not-allowed'
                                : isPlayable
                                ? 'bg-emerald-500/10 border-[#00ffcc]/40 text-[#00ffcc] hover:bg-[#00ffcc]/20 shadow-[0_0_10px_rgba(0,255,204,0.15)] active:scale-95'
                                : 'bg-transparent border-emerald-500/5 text-emerald-800 hover:text-emerald-600'
                            }`}
                          >
                            {cell}
                          </button>
                        );
                      })
                    )}
                  </div>
                  <div className="text-[7px] text-slate-500 uppercase tracking-wider">
                    {breachActiveRow !== null ? '💡 Pilih dari baris yang tersorot' : '💡 Pilih dari kolom yang tersorot'}
                  </div>
                </div>

                {/* Right: Sequences and Buffer */}
                <div className="md:col-span-2 space-y-5">
                  {/* Target Sequence */}
                  <div className="space-y-2">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Upload Sequence
                    </div>
                    <div className="flex space-x-2 bg-black/40 p-3 rounded-2xl border border-emerald-500/10 items-center justify-center">
                      {breachSequence.map((val, idx) => {
                        const isInputMatched = breachInput[idx] === val;
                        return (
                          <span
                            key={idx}
                            className={`px-2 py-1 rounded text-[9px] font-bold border transition-colors ${
                              isInputMatched
                                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                                : 'bg-neutral-900 border-neutral-800 text-slate-400'
                            }`}
                          >
                            {val}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Buffer */}
                  <div className="space-y-2">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Buffer (Memory)
                    </div>
                    <div className="flex space-x-1.5 bg-black/50 p-3 rounded-2xl border border-emerald-500/10 min-h-11 items-center justify-start overflow-hidden">
                      {Array(4).fill(null).map((_, idx) => {
                        const val = breachInput[idx];
                        return (
                          <span
                            key={idx}
                            className={`w-8 h-8 rounded flex items-center justify-center text-[9px] font-bold border ${
                              val
                                ? 'bg-emerald-500/10 border-[#00ffcc]/30 text-[#00ffcc]'
                                : 'bg-transparent border-dashed border-emerald-500/10 text-emerald-800'
                            }`}
                          >
                            {val || ''}
                          </span>
                        );
                      })}
                    </div>
                    <div className="text-[7.5px] text-slate-500">
                      Buffer limit: 4 inputs.
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Success / Failure Result Splash screen */
              <div className="text-center py-8 space-y-6 animate-fade-in">
                {breachResult === 'success' ? (
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.3)] animate-pulse">
                      <Terminal className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold tracking-widest text-[#00ffcc] uppercase">
                        🎉 BREACH SUCCESSFUL // GHOST THEME UNLOCKED
                      </h3>
                      <p className="text-[9px] text-slate-400">
                        Workspace encryption bypassed. Ghost Hack visual theme has been registered.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-pulse">
                      <Lock className="w-8 h-8 text-red-500" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold tracking-widest text-red-500 uppercase">
                        ❌ DECRYPTION FAILED // ACCESS DENIED
                      </h3>
                      <p className="text-[9px] text-slate-400">
                        Memory buffer overload or timeout expired. Intruder alert registered.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex space-x-2 justify-center max-w-xs mx-auto">
                  {breachResult === 'failed' && (
                    <button
                      onClick={startBreachGame}
                      className="flex-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-bold py-2 rounded-xl text-[9px] transition-all cursor-pointer active:scale-95"
                    >
                      TRY AGAIN
                    </button>
                  )}
                  {breachResult === 'success' && (
                    <button
                      onClick={() => {
                        setTheme('dark');
                        setBreachActive(false);
                      }}
                      className="flex-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold py-2 rounded-xl text-[9px] transition-all cursor-pointer active:scale-95"
                    >
                      ACTIVATE DARK MODE
                    </button>
                  )}
                  <button
                    onClick={() => setBreachActive(false)}
                    className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-slate-400 px-4 py-2 rounded-xl text-[9px] transition-all cursor-pointer"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            )}

            {breachResult === null && (
              <div className="flex justify-between items-center pt-4 border-t border-emerald-500/20">
                <div className="text-[7.5px] text-slate-500 uppercase">
                  STATUS: RUNNING DECRYPTOR EXECUTABLE // BYPASS METHOD: WALKMATRIX
                </div>
                <button
                  onClick={() => {
                    setBreachActive(false);
                    addConsoleLog('[SYSTEM] Breach Protocol aborted by user.');
                  }}
                  className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-bold px-3 py-1.5 rounded-xl text-[8.5px] transition-all cursor-pointer active:scale-95"
                >
                  ABORT SYSTEM BYPASS
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Main Hero Container (Rounded card layout) */}
      <div
        className={`relative w-full max-w-[1400px] mx-auto rounded-[48px] overflow-hidden h-[600px] flex flex-col transition-all duration-500 border ${themeCls.bg}`}
      >
        {/* Underlying video layer */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
          {window.innerWidth >= 768 ? (
            <video
              key={theme}
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              poster={heroImg}
              className="w-full h-full object-cover scale-105 transition-transform duration-1000"
              src={
                theme === 'light'
                  ? 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260505_101331_74f9b798-3f00-4e86-8a01-377aa16ffeaa.mp4'
                  : 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4'
              }
            />
          ) : (
            <img
              src={heroImg}
              alt="Background"
              width={343}
              height={361}
              fetchPriority="high"
              loading="eager"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <CanvasParticles theme={theme} />

        {/* Dynamic transition for Hero Content vs Dashboard Grid */}
        <AnimatePresence mode="wait">
          {view === 'hero' ? (
            <motion.div
              key="hero-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="relative z-20 flex-1 px-8 md:px-16 pt-12 md:pt-16 flex flex-col items-start justify-start"
            >
              <div className="flex flex-col items-start space-y-5 max-w-xl">

                <h1
                  className={`text-[42px] md:text-[56px] font-medium tracking-tight leading-[1.1] font-display transition-colors ${
                    theme === 'dark' ? 'text-white' : 'text-[#0a1b33]'
                  }`}
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  The Interactive<br />Developer Hub
                </h1>

                <p className={`text-[14px] md:text-[15px] leading-relaxed font-sans transition-colors ${
                  theme === 'dark' ? 'text-neutral-400' : 'text-[#64748b]'
                }`}>
                  Pusat kendali dan portofolio interaktif Firzan Syaroni. Eksplorasi rekam jejak karya di bidang rekayasa perangkat lunak, media kreatif, asisten AI, dan berbagai alat produktivitas developer dalam satu dashboard terpadu.
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setChatOpen(true)}
                  className={`text-xs font-semibold px-6 py-3 rounded-full shadow-lg transition-colors cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-white text-black hover:bg-neutral-200'
                      : 'bg-[#0a152d] text-white hover:bg-slate-800'
                  }`}
                >
                  Jalankan Aplikasi
                </motion.button>
              </div>
            </motion.div>
          ) : view === 'dashboard' ? (
            // 2. "Command Center" Grid Dashboard View
            <motion.div
              key="dashboard-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="relative z-20 flex-1 p-6 md:p-8 flex flex-col justify-start h-full"
            >
              {/* Header inside Dashboard */}
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={() => setView('hero')}
                  className={`flex items-center space-x-2 text-xs font-semibold cursor-pointer border rounded-full px-4 py-2 transition-all ${
                    theme === 'dark'
                      ? 'bg-black/30 backdrop-blur-md border-white/20 text-white hover:bg-black/50 hover:border-white/30'
                      : 'border-slate-200 text-[#0a1b33] hover:bg-slate-50'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Home</span>
                </button>

                {/* Search Bar / Button shortcut inside Dashboard */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      setShowCommandPalette(true);
                      setSearchQuery('');
                      playSound('click');
                    }}
                    className={`flex items-center space-x-1.5 text-[10px] font-mono border rounded-full px-3 py-1.5 transition-all cursor-pointer ${
                      theme === 'dark'
                        ? 'bg-black/30 backdrop-blur-md border-white/20 text-white hover:bg-black/50 hover:border-white/30'
                        : 'border-slate-200 text-slate-500 hover:text-[#0a1b33] hover:bg-slate-50'
                    }`}
                  >
                    <Search className="w-3 h-3 text-blue-400" />
                    <span>Search Tools (Ctrl+K)</span>
                  </button>
                  <h2 className="text-sm font-bold tracking-widest uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">Command Center</h2>
                  <button
                    onClick={() => {
                      setSettingsOpen(true);
                      playSound('click');
                    }}
                    className={`p-1.5 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                      theme === 'dark'
                        ? 'bg-black/30 backdrop-blur-md border-white/20 text-white hover:bg-black/50 hover:border-white/30'
                        : 'border-slate-200 text-slate-500 hover:text-[#0a1b33] hover:bg-slate-50'
                    }`}
                    title="Settings"
                    aria-label="Open Settings"
                  >
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Grid Layout of Bento widgets with bottom padding to clear floating navbar */}
              <div ref={dashboardRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto max-h-[440px] pr-2 pb-28 relative">
                


                {/* WIDGET 2: Word to PDF Converter */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`p-4 border rounded-3xl flex flex-col justify-between min-h-[180px] ${
                    theme === 'dark' ? 'bg-neutral-950/80 border-white/10' : 'bg-slate-50 border-slate-200/60'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-1 select-none">
                      <h3 className="text-xs font-bold flex items-center space-x-1.5"><FileText className="w-3.5 h-3.5 text-blue-500" /><span>Word Converter</span></h3>
                    </div>
                    <input
                      type="file"
                      accept=".docx"
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          setWordFile(e.target.files[0]);
                          setConvertedPdfUrl(null);
                        }
                      }}
                      className="hidden"
                      id="grid-docx-uploader"
                    />
                    <label
                      htmlFor="grid-docx-uploader"
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsWordGridDragHover(true);
                      }}
                      onDragLeave={() => setIsWordGridDragHover(false)}
                      onDrop={() => setIsWordGridDragHover(false)}
                      style={{ '--glow-color': getThemeAccentColor() } as React.CSSProperties}
                      className={`block border border-dashed border-slate-300 rounded-xl p-2.5 text-center cursor-pointer text-[9px] hover:bg-white/10 bg-white/5 transition-all ${
                        isWordGridDragHover ? 'uploader-glow' : ''
                      }`}
                    >
                      {wordFile ? wordFile.name : 'Pilih DOCX'}
                    </label>
                  </div>
                  {wordFile && (
                    <button
                      onClick={handleWordConversion}
                      disabled={converting}
                      className="w-full bg-[#0a1b33] text-white text-[10px] py-1.5 rounded-xl font-bold hover:bg-slate-800 cursor-pointer mt-2"
                    >
                      {converting ? 'Converting...' : 'Convert DOCX'}
                    </button>
                  )}
                </motion.div>

                {/* WIDGET 3: PDF Compressor */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`p-4 border rounded-3xl flex flex-col justify-between min-h-[180px] ${
                    theme === 'dark' ? 'bg-neutral-950/80 border-white/10' : 'bg-slate-50 border-slate-200/60'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-1 select-none">
                      <h3 className="text-xs font-bold flex items-center space-x-1.5"><FileCode className="w-3.5 h-3.5 text-purple-500" /><span>PDF Compressor</span></h3>
                    </div>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          setPdfFile(e.target.files[0]);
                          setCompressionResult(null);
                        }
                      }}
                      className="hidden"
                      id="grid-pdf-uploader"
                    />
                    <label
                      htmlFor="grid-pdf-uploader"
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsPdfGridDragHover(true);
                      }}
                      onDragLeave={() => setIsPdfGridDragHover(false)}
                      onDrop={() => setIsPdfGridDragHover(false)}
                      style={{ '--glow-color': getThemeAccentColor() } as React.CSSProperties}
                      className={`block border border-dashed border-slate-300 rounded-xl p-2.5 text-center cursor-pointer text-[9px] hover:bg-white/10 bg-white/5 transition-all ${
                        isPdfGridDragHover ? 'uploader-glow' : ''
                      }`}
                    >
                      {pdfFile ? pdfFile.name : 'Pilih PDF'}
                    </label>
                  </div>
                  {compressionResult && (
                    <div className={`mt-2 p-2 rounded-xl text-[9px] space-y-1.5 border ${themeCls.input}`}>
                      <div className="flex justify-between font-semibold">
                        <span>Optimized</span>
                        <span className="text-blue-500 font-bold">
                          {Math.round((1 - compressionResult.compressedSize / compressionResult.originalSize) * 100)}% Saved
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="w-full bg-slate-200/20 h-2 rounded-full overflow-hidden">
                          <div className="bg-slate-400 h-full rounded-full" style={{ width: '100%' }} />
                        </div>
                        <div className="w-full bg-slate-200/20 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-blue-500 h-full rounded-full transition-all duration-1000 ease-out" 
                            style={{ width: `${(compressionResult.compressedSize / compressionResult.originalSize) * 100}%` }} 
                          />
                        </div>
                        <div className={`flex justify-between text-[7.5px] ${themeCls.subText}`}>
                          <span>{formatBytes(compressionResult.originalSize)}</span>
                          <span>{formatBytes(compressionResult.compressedSize)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {pdfFile && !compressionResult && (
                    <button
                      onClick={handleCompressPdf}
                      disabled={compressing}
                      className="w-full bg-[#0a1b33] text-white text-[10px] py-1.5 rounded-xl font-bold hover:bg-slate-800 cursor-pointer mt-2"
                    >
                      {compressing ? 'Compressing...' : 'Compress PDF'}
                    </button>
                  )}
                </motion.div>

                {/* WIDGET 4: PDF Merger (Gabung PDF) */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`p-4 border rounded-3xl flex flex-col justify-between min-h-[180px] ${
                    theme === 'dark' ? 'bg-neutral-950/80 border-white/10' : 'bg-slate-50 border-slate-200/60'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-1 select-none">
                      <h3 className="text-xs font-bold flex items-center space-x-1.5"><FileText className="w-3.5 h-3.5 text-blue-500" /><span>Gabung PDF</span></h3>
                    </div>
                    <input
                      type="file"
                      accept=".pdf"
                      multiple
                      onChange={e => {
                        if (e.target.files) {
                          setPdfMergeFiles(Array.from(e.target.files));
                          setMergedPdfUrl(null);
                        }
                      }}
                      className="hidden"
                      id="grid-pdf-merger-uploader"
                    />
                    <label
                      htmlFor="grid-pdf-merger-uploader"
                      className="block border border-dashed border-slate-300 rounded-xl p-2.5 text-center cursor-pointer text-[9px] hover:bg-white/10 bg-white/5 transition-all"
                    >
                      {pdfMergeFiles.length > 0 ? `${pdfMergeFiles.length} PDF Terpilih` : 'Pilih Multiple PDF'}
                    </label>
                    {pdfMergeFiles.length > 0 && (
                      <div className="mt-1.5 max-h-[50px] overflow-y-auto space-y-1 pr-1">
                        {pdfMergeFiles.map((f, idx) => (
                          <div key={idx} className="text-[8px] text-slate-400 truncate flex justify-between">
                            <span>{idx + 1}. {f.name}</span>
                            <span>{formatBytes(f.size)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {pdfMergeFiles.length >= 2 ? (
                    <button
                      onClick={handleMergePdfs}
                      disabled={mergingPdfs}
                      className="w-full bg-[#0a1b33] text-white text-[10px] py-1.5 rounded-xl font-bold hover:bg-slate-800 cursor-pointer mt-2"
                    >
                      {mergingPdfs ? 'Menggabungkan...' : 'Gabungkan PDF'}
                    </button>
                  ) : (
                    <div className="text-[8.5px] text-slate-400 text-center py-1.5 border border-transparent select-none mt-2">
                      Upload min. 2 PDF
                    </div>
                  )}
                </motion.div>

                {/* WIDGET 5: Images to PDF */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`p-4 border rounded-3xl flex flex-col justify-between min-h-[180px] ${
                    theme === 'dark' ? 'bg-neutral-950/80 border-white/10' : 'bg-slate-50 border-slate-200/60'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-1 select-none">
                      <h3 className="text-xs font-bold flex items-center space-x-1.5"><FileCode className="w-3.5 h-3.5 text-orange-500" /><span>Gambar ke PDF</span></h3>
                    </div>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      multiple
                      onChange={e => {
                        if (e.target.files) {
                          setImageFiles(Array.from(e.target.files));
                          setImagesPdfUrl(null);
                        }
                      }}
                      className="hidden"
                      id="grid-images-pdf-uploader"
                    />
                    <label
                      htmlFor="grid-images-pdf-uploader"
                      className="block border border-dashed border-slate-300 rounded-xl p-2.5 text-center cursor-pointer text-[9px] hover:bg-white/10 bg-white/5 transition-all"
                    >
                      {imageFiles.length > 0 ? `${imageFiles.length} Gambar Terpilih` : 'Pilih Gambar (KTM/Sertifikat)'}
                    </label>
                    {imageFiles.length > 0 && (
                      <div className="mt-1.5 max-h-[50px] overflow-y-auto space-y-1 pr-1">
                        {imageFiles.map((f, idx) => (
                          <div key={idx} className="text-[8px] text-slate-400 truncate flex justify-between">
                            <span>{idx + 1}. {f.name}</span>
                            <span>{formatBytes(f.size)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {imageFiles.length > 0 ? (
                    <button
                      onClick={handleImagesToPdf}
                      disabled={convertingImages}
                      className="w-full bg-[#0a1b33] text-white text-[10px] py-1.5 rounded-xl font-bold hover:bg-slate-800 cursor-pointer mt-2"
                    >
                      {convertingImages ? 'Mengonversi...' : 'Konversi ke PDF'}
                    </button>
                  ) : (
                    <div className="text-[8.5px] text-slate-400 text-center py-1.5 border border-transparent select-none mt-2">
                      Pilih min. 1 Gambar
                    </div>
                  )}
                </motion.div>

                {/* WIDGET 6: Media Downloader */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`p-4 border rounded-3xl flex flex-col justify-between min-h-[180px] space-y-2.5 ${
                    theme === 'dark' ? 'bg-neutral-950/80 border-white/10' : 'bg-slate-50 border-slate-200/60'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center select-none mb-1">
                      <h3 className="text-xs font-bold flex items-center space-x-1.5"><Video className="w-3.5 h-3.5 text-rose-500" /><span>Media Downloader</span></h3>
                    </div>
                    <p className="text-[7.5px] text-slate-400 mt-0.5 select-none leading-tight">Mendukung unduhan YouTube, TikTok, dan Instagram secara instan.</p>
                  </div>
                  <div className="space-y-1.5">
                    <input
                      type="url"
                      placeholder="Masukkan URL Media..."
                      value={mediaUrl}
                      onChange={e => setMediaUrl(e.target.value)}
                      className="w-full border rounded-lg px-2.5 py-1 text-[9px] bg-white/10 outline-none"
                    />
                    <button
                      onClick={handleMediaDownload}
                      disabled={downloadingMedia}
                      className="w-full bg-[#0a1b33] text-white text-[10px] py-1.5 rounded-xl font-bold hover:bg-slate-800 cursor-pointer"
                    >
                      {downloadingMedia ? 'Mengunduh...' : 'Download HD'}
                    </button>
                  </div>
                </motion.div>

                {/* WIDGET 7: Split PDF */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`p-4 border rounded-3xl flex flex-col justify-between min-h-[180px] ${
                    theme === 'dark' ? 'bg-neutral-950/80 border-white/10' : 'bg-slate-50 border-slate-200/60'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-1 select-none">
                      <h3 className="text-xs font-bold flex items-center space-x-1.5"><Scissors className="w-3.5 h-3.5 text-rose-500" /><span>Pecah PDF</span></h3>
                    </div>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          setSplitFile(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                      id="grid-split-pdf-uploader"
                    />
                    <label
                      htmlFor="grid-split-pdf-uploader"
                      className="block border border-dashed border-slate-300 rounded-xl p-2.5 text-center cursor-pointer text-[9px] hover:bg-white/10 bg-white/5 transition-all truncate"
                    >
                      {splitFile ? splitFile.name : 'Pilih PDF'}
                    </label>
                  </div>
                  {splitFile && (
                    <button
                      onClick={handleSplitPdf}
                      disabled={splittingPdf}
                      className="w-full bg-[#0a1b33] text-white text-[10px] py-1.5 rounded-xl font-bold hover:bg-slate-800 cursor-pointer mt-2"
                    >
                      {splittingPdf ? 'Memecah...' : 'Pecah PDF'}
                    </button>
                  )}
                </motion.div>

                {/* WIDGET 8: Rotate PDF */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`p-4 border rounded-3xl flex flex-col justify-between min-h-[180px] ${
                    theme === 'dark' ? 'bg-neutral-950/80 border-white/10' : 'bg-slate-50 border-slate-200/60'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-1 select-none">
                      <h3 className="text-xs font-bold flex items-center space-x-1.5"><RotateCw className="w-3.5 h-3.5 text-blue-500" /><span>Putar PDF</span></h3>
                    </div>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          setRotateFile(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                      id="grid-rotate-pdf-uploader"
                    />
                    <label
                      htmlFor="grid-rotate-pdf-uploader"
                      className="block border border-dashed border-slate-300 rounded-xl p-2.5 text-center cursor-pointer text-[9px] hover:bg-white/10 bg-white/5 transition-all truncate"
                    >
                      {rotateFile ? rotateFile.name : 'Pilih PDF'}
                    </label>
                    {rotateFile && (
                      <div className="mt-2 flex items-center justify-between text-[9px]">
                        <span>Sudut:</span>
                        <select
                          value={rotation}
                          onChange={e => setRotation(parseInt(e.target.value))}
                          className="bg-white/10 text-xs rounded border px-1 outline-none"
                        >
                          <option value={90} className="text-neutral-900">90°</option>
                          <option value={180} className="text-neutral-900">180°</option>
                          <option value={270} className="text-neutral-900">270°</option>
                        </select>
                      </div>
                    )}
                  </div>
                  {rotateFile && (
                    <button
                      onClick={handleRotatePdf}
                      disabled={rotatingPdf}
                      className="w-full bg-[#0a1b33] text-white text-[10px] py-1.5 rounded-xl font-bold hover:bg-slate-800 cursor-pointer mt-2"
                    >
                      {rotatingPdf ? 'Memutar...' : 'Putar PDF'}
                    </button>
                  )}
                </motion.div>

                {/* WIDGET 9: Protect PDF */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`p-4 border rounded-3xl flex flex-col justify-between min-h-[180px] ${
                    theme === 'dark' ? 'bg-neutral-950/80 border-white/10' : 'bg-slate-50 border-slate-200/60'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-1 select-none">
                      <h3 className="text-xs font-bold flex items-center space-x-1.5"><Lock className="w-3.5 h-3.5 text-amber-500" /><span>Kunci PDF</span></h3>
                    </div>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          setProtectFile(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                      id="grid-protect-pdf-uploader"
                    />
                    <label
                      htmlFor="grid-protect-pdf-uploader"
                      className="block border border-dashed border-slate-300 rounded-xl p-2.5 text-center cursor-pointer text-[9px] hover:bg-white/10 bg-white/5 transition-all truncate"
                    >
                      {protectFile ? protectFile.name : 'Pilih PDF'}
                    </label>
                    {protectFile && (
                      <input
                        type="password"
                        placeholder="Password..."
                        value={protectPassword}
                        onChange={e => setProtectPassword(e.target.value)}
                        className="w-full border rounded-lg px-2.5 py-1 text-[9px] bg-white/10 outline-none mt-2"
                      />
                    )}
                  </div>
                  {protectFile && (
                    <button
                      onClick={handleProtectPdf}
                      disabled={protectingPdf || !protectPassword}
                      className="w-full bg-[#0a1b33] text-white text-[10px] py-1.5 rounded-xl font-bold hover:bg-slate-800 cursor-pointer mt-2 disabled:opacity-50"
                    >
                      {protectingPdf ? 'Mengunci...' : 'Kunci PDF'}
                    </button>
                  )}
                </motion.div>

                {/* WIDGET 10: Unlock PDF */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`p-4 border rounded-3xl flex flex-col justify-between min-h-[180px] ${
                    theme === 'dark' ? 'bg-neutral-950/80 border-white/10' : 'bg-slate-50 border-slate-200/60'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-1 select-none">
                      <h3 className="text-xs font-bold flex items-center space-x-1.5"><Unlock className="w-3.5 h-3.5 text-blue-500" /><span>Buka Kunci PDF</span></h3>
                    </div>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          setUnlockFile(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                      id="grid-unlock-pdf-uploader"
                    />
                    <label
                      htmlFor="grid-unlock-pdf-uploader"
                      className="block border border-dashed border-slate-300 rounded-xl p-2.5 text-center cursor-pointer text-[9px] hover:bg-white/10 bg-white/5 transition-all truncate"
                    >
                      {unlockFile ? unlockFile.name : 'Pilih PDF'}
                    </label>
                    {unlockFile && (
                      <input
                        type="password"
                        placeholder="Password..."
                        value={unlockPassword}
                        onChange={e => setUnlockPassword(e.target.value)}
                        className="w-full border rounded-lg px-2.5 py-1 text-[9px] bg-white/10 outline-none mt-2"
                      />
                    )}
                  </div>
                  {unlockFile && (
                    <button
                      onClick={handleUnlockPdf}
                      disabled={unlockingPdf}
                      className="w-full bg-[#0a1b33] text-white text-[10px] py-1.5 rounded-xl font-bold hover:bg-slate-800 cursor-pointer mt-2"
                    >
                      {unlockingPdf ? 'Membuka...' : 'Buka Kunci PDF'}
                    </button>
                  )}
                </motion.div>

                {/* WIDGET 11: Add Page Numbers */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`p-4 border rounded-3xl flex flex-col justify-between min-h-[180px] ${
                    theme === 'dark' ? 'bg-neutral-950/80 border-white/10' : 'bg-slate-50 border-slate-200/60'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-1 select-none">
                      <h3 className="text-xs font-bold flex items-center space-x-1.5"><Hash className="w-3.5 h-3.5 text-violet-500" /><span>Nomor Halaman</span></h3>
                    </div>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          setPageNumFile(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                      id="grid-pagenum-pdf-uploader"
                    />
                    <label
                      htmlFor="grid-pagenum-pdf-uploader"
                      className="block border border-dashed border-slate-300 rounded-xl p-2.5 text-center cursor-pointer text-[9px] hover:bg-white/10 bg-white/5 transition-all truncate"
                    >
                      {pageNumFile ? pageNumFile.name : 'Pilih PDF'}
                    </label>
                    {pageNumFile && (
                      <div className="mt-2 flex items-center justify-between text-[9px]">
                        <span>Posisi:</span>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => setPageNumPosition('top')}
                            className={`px-1.5 py-0.5 rounded text-[8px] font-semibold border ${
                              pageNumPosition === 'top' ? 'bg-[#0a1b33] text-white border-[#0a1b33]' : 'bg-white/5 border-slate-300/30'
                            }`}
                          >
                            Atas
                          </button>
                          <button
                            onClick={() => setPageNumPosition('bottom')}
                            className={`px-1.5 py-0.5 rounded text-[8px] font-semibold border ${
                              pageNumPosition === 'bottom' ? 'bg-[#0a1b33] text-white border-[#0a1b33]' : 'bg-white/5 border-slate-300/30'
                            }`}
                          >
                            Bawah
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {pageNumFile && (
                    <button
                      onClick={handleAddPageNums}
                      disabled={addingPageNums}
                      className="w-full bg-[#0a1b33] text-white text-[10px] py-1.5 rounded-xl font-bold hover:bg-slate-800 cursor-pointer mt-2"
                    >
                      {addingPageNums ? 'Memproses...' : 'Tambah Nomor'}
                    </button>
                  )}
                </motion.div>

                {/* WIDGET 12: Extract Pages */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`p-4 border rounded-3xl flex flex-col justify-between min-h-[180px] ${
                    theme === 'dark' ? 'bg-neutral-950/80 border-white/10' : 'bg-slate-50 border-slate-200/60'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-1 select-none">
                      <h3 className="text-xs font-bold flex items-center space-x-1.5"><FileOutput className="w-3.5 h-3.5 text-cyan-500" /><span>Ekstrak Halaman</span></h3>
                    </div>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          setExtractFile(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                      id="grid-extract-pdf-uploader"
                    />
                    <label
                      htmlFor="grid-extract-pdf-uploader"
                      className="block border border-dashed border-slate-300 rounded-xl p-2.5 text-center cursor-pointer text-[9px] hover:bg-white/10 bg-white/5 transition-all truncate"
                    >
                      {extractFile ? extractFile.name : 'Pilih PDF'}
                    </label>
                    {extractFile && (
                      <input
                        type="text"
                        placeholder="Halaman (misal: 1,3-5)..."
                        value={extractPagesVal}
                        onChange={e => setExtractPagesVal(e.target.value)}
                        className="w-full border rounded-lg px-2.5 py-1 text-[9px] bg-white/10 outline-none mt-2"
                      />
                    )}
                  </div>
                  {extractFile && (
                    <button
                      onClick={handleExtractPages}
                      disabled={extractingPages || !extractPagesVal}
                      className="w-full bg-[#0a1b33] text-white text-[10px] py-1.5 rounded-xl font-bold hover:bg-slate-800 cursor-pointer mt-2 disabled:opacity-50"
                    >
                      {extractingPages ? 'Mengekstrak...' : 'Ekstrak Halaman'}
                    </button>
                  )}
                </motion.div>

                {/* WIDGET 13: PDF to JPG */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`p-4 border rounded-3xl flex flex-col justify-between min-h-[180px] ${
                    theme === 'dark' ? 'bg-neutral-950/80 border-white/10' : 'bg-slate-50 border-slate-200/60'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-1 select-none">
                      <h3 className="text-xs font-bold flex items-center space-x-1.5"><ImageIcon className="w-3.5 h-3.5 text-pink-500" /><span>PDF ke JPG</span></h3>
                    </div>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          setPdfToJpgFile(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                      id="grid-pdftojpg-uploader"
                    />
                    <label
                      htmlFor="grid-pdftojpg-uploader"
                      className="block border border-dashed border-slate-300 rounded-xl p-2.5 text-center cursor-pointer text-[9px] hover:bg-white/10 bg-white/5 transition-all truncate"
                    >
                      {pdfToJpgFile ? pdfToJpgFile.name : 'Pilih PDF'}
                    </label>
                    {convertingPdfToJpg && (
                      <div className="mt-2 space-y-1">
                        <div className="w-full bg-slate-200/20 h-1 rounded-full overflow-hidden">
                          <div className="bg-pink-500 h-full rounded-full transition-all duration-300" style={{ width: `${pdfToJpgProgress}%` }} />
                        </div>
                        <div className="text-[7.5px] text-slate-400 text-right">{pdfToJpgProgress}% Selesai</div>
                      </div>
                    )}
                  </div>
                  {pdfToJpgFile && (
                    <button
                      onClick={handlePdfToJpg}
                      disabled={convertingPdfToJpg}
                      className="w-full bg-[#0a1b33] text-white text-[10px] py-1.5 rounded-xl font-bold hover:bg-slate-800 cursor-pointer mt-2"
                    >
                      {convertingPdfToJpg ? 'Mengonversi...' : 'Konversi ke JPG'}
                    </button>
                  )}
                </motion.div>

              </div>
            </motion.div>
          ) : (
            // 3. "About Me" Bento Grid View
            <motion.div
              key="about-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="relative z-20 flex-1 p-5 md:p-8 flex flex-col justify-start h-full overflow-y-auto custom-scrollbar"
              style={{ scrollbarWidth: 'thin' }}
            >
              {/* Header inside About */}
              <div className="flex justify-between items-center mb-6 shrink-0">
                <button
                  onClick={() => setView('hero')}
                  className={`flex items-center space-x-2 text-xs font-semibold cursor-pointer border rounded-full px-4 py-2 transition-all ${
                    theme === 'dark'
                      ? 'border-white/10 text-white hover:bg-white/5'
                      : 'border-slate-200 text-[#0a1b33] hover:bg-slate-50'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Home</span>
                </button>
                <h2 className="text-sm font-bold tracking-widest uppercase">About Me</h2>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-auto">
                
                {/* Column Left: Interactive Profile Intro */}
                <div className="lg:col-span-5 flex flex-col space-y-6">
                  <motion.div
                    whileHover={{ scale: 1.002 }}
                    className={`relative rounded-[32px] p-6 flex flex-col items-center justify-between border overflow-hidden flex-1 ${themeCls.card}`}
                  >
                    {/* Glowing background circles for visual depth */}
                    <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

                    <div className="w-full flex flex-col items-center text-center">
                      {/* Interactive portrait wrapper */}
                      {/* Interactive portrait wrapper with floating orbiting logos */}
                      <div className="relative group w-full h-64 md:h-72 mt-6 mb-6 flex items-center justify-center overflow-visible select-none">
                        {/* Soft glow behind the user portrait */}
                        <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-blue-500/20 to-blue-500/20 blur-2xl opacity-80" />
                        
                        {/* Main Portrait image - larger set to h-56 md:h-64 */}
                        <motion.img
                          src={operatorCutout}
                          alt="Firzan Syaroni"
                          width={512}
                          height={452}
                          className="h-56 md:h-64 object-contain relative z-10 drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)] select-none pointer-events-none transition-transform duration-500 group-hover:scale-103"
                        />

                        {/* Floating Orbiting Badges (TikTok, GitHub, Instagram, Gmail, LinkedIn) */}
                        {[
                          {
                            name: 'TikTok',
                            url: '/library/tiktok-icon-dark.svg',
                            link: 'https://www.tiktok.com/@firzangames',
                            pos: 'top-2 left-6 md:left-12',
                            animate: { y: [0, -8, 0], rotate: [0, 6, 0] },
                            duration: 3.8,
                            customClass: 'bg-black border-neutral-900 p-2.5'
                          },
                          {
                            name: 'GitHub',
                            url: '/library/github.svg',
                            link: 'https://github.com/King-Zays',
                            pos: '-top-6 left-1/2 -translate-x-1/2',
                            animate: { y: [0, -10, 0], scale: [1, 1.05, 1] },
                            duration: 4.2
                          },
                          {
                            name: 'Instagram',
                            url: '/library/instagram-icon.svg',
                            link: 'https://www.instagram.com/zaysss._/',
                            pos: 'top-2 right-6 md:right-12',
                            animate: { y: [0, -6, 0], rotate: [0, -8, 0] },
                            duration: 3.4
                          },
                          {
                            name: 'Gmail',
                            url: '/library/gmail.svg',
                            link: 'https://mail.google.com/mail/?view=cm&fs=1&to=firzansyaroni999@gmail.com',
                            pos: 'bottom-8 left-4 md:left-8',
                            animate: { y: [0, -7, 0], rotate: [0, -5, 0] },
                            duration: 3.6
                          },
                          {
                            name: 'LinkedIn',
                            url: '/library/linkedin.svg',
                            link: 'https://www.linkedin.com/in/firzan-syaroni-476202329/',
                            pos: 'bottom-8 right-4 md:right-8',
                            animate: { y: [0, -9, 0], rotate: [0, 8, 0] },
                            duration: 4.0
                          }
                        ].map((badge: any, idx) => (
                          <motion.a
                            key={idx}
                            href={badge.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            animate={badge.animate}
                            transition={{
                              duration: badge.duration,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: idx * 0.3
                            }}
                            whileHover={{ scale: 1.15, rotate: 0, zIndex: 40 }}
                            className={`absolute ${badge.pos} w-11 h-11 md:w-12 md:h-12 rounded-full border shadow-[0_6px_16px_rgba(0,0,0,0.08)] flex items-center justify-center transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] cursor-pointer z-20 ${
                              badge.customClass || 'bg-white border-slate-200/80 p-2.5'
                            }`}
                            title={badge.name}
                          >
                            <img
                              src={badge.url}
                              alt={badge.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-contain select-none pointer-events-none"
                            />
                          </motion.a>
                        ))}
                      </div>

                      <h1 className="text-xl md:text-2xl font-bold font-display tracking-tight leading-tight">
                        Firzan Syaroni
                      </h1>
                      <p className={`text-[9px] uppercase tracking-widest font-mono mt-1 font-bold ${
                        theme === 'light' ? 'text-slate-500' : 'text-blue-400'
                      }`}>
                        Mahasiswa Informatika & Kreator Digital
                      </p>
                      
                      <div className="w-12 h-0.5 bg-neutral-500/20 my-4 rounded-full" />
                      
                      <p className={`text-[11px] leading-relaxed max-w-sm px-2 text-center ${themeCls.subText}`}>
                        Saya merupakan mahasiswa Informatika di UPN "Veteran" Jawa Timur yang menggabungkan keterampilan IT teknis dengan kepekaan artistik. Sebagai pembelajar mandiri (autodidak) yang adaptif, saya memiliki kemampuan untuk menguasai teknologi dan keahlian baru secara cepat dengan memanfaatkan tutorial digital serta kolaborasi bersama AI.
                      </p>
                      <p className={`text-[11px] leading-relaxed max-w-sm px-2 mt-2.5 text-center ${themeCls.subText}`}>
                        Saya berdedikasi menciptakan karya kreatif mulai dari ilustrasi hingga web fullstack yang tidak hanya estetis tetapi juga fungsional dan berdampak. Dalam mewujudkannya, saya mengandalkan kemampuan berpikir kritis dan pemecahan masalah secara kreatif, serta kolaborasi tim, manajemen kepanitiaan, dan fleksibilitas untuk terus beradaptasi dengan lingkungan baru.
                      </p>
                    </div>

                    {/* Social Dock */}
                    <div className="flex items-center justify-center gap-2.5 mt-6 w-full">
                      {[
                        {
                          icon: (
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                            </svg>
                          ),
                          url: 'https://github.com/King-Zays',
                          label: 'GitHub'
                        },
                        {
                          icon: (
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          ),
                          url: 'https://www.linkedin.com/in/firzan-syaroni-476202329/',
                          label: 'LinkedIn'
                        },
                        {
                          icon: (
                            <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                            </svg>
                          ),
                          url: 'https://www.instagram.com/zaysss._/',
                          label: 'Instagram'
                        },
                        {
                          icon: (
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                          ),
                          url: 'https://www.youtube.com/@FirzanGames',
                          label: 'YouTube'
                        },
                        {
                          icon: <Mail className="w-3.5 h-3.5" />,
                          url: 'mailto:firzansyaroni999@gmail.com',
                          label: 'Email'
                        }
                      ].map((social, idx) => (
                        <motion.a
                          key={idx}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.15, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 border backdrop-blur-md shadow-sm hover:shadow-md ${
                            theme === 'light'
                              ? 'bg-slate-50/60 border-slate-200/60 text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 shadow-slate-100 hover:shadow-slate-200/50'
                              : 'bg-white/[0.03] border-white/10 text-slate-400 hover:bg-white/[0.08] hover:text-white shadow-inner'
                          }`}
                          title={social.label}
                        >
                          {social.icon}
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Column Right: Bento Cards Grid */}
                <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Card 1: Akademik & Jalur Prestasi */}
                  <motion.div
                    whileHover={{ y: -3, scale: 1.002 }}
                    className={`rounded-3xl p-5 border flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative overflow-hidden ${themeCls.card}`}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <div className={`p-1.5 rounded-xl border ${
                          theme === 'light' ? 'bg-slate-100 border-slate-200 text-[#0a1b33]' : 'bg-white/5 border-white/10 text-blue-400'
                        }`}>
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <h3 className="text-xs font-bold uppercase tracking-wider">Akademik</h3>
                      </div>
                      {/* UPN Jatim */}
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-bold leading-snug">UPN "Veteran" Jawa Timur</h4>
                        <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 font-mono">
                          <span>S-1 INFORMATIKA</span>
                          <span>2024 - SEKARANG</span>
                        </div>
                        <ul className={`text-[10.5px] mt-1 space-y-0.5 list-disc pl-4 ${themeCls.subText}`}>
                          <li>IPK saat ini: <strong>3.907 / 4.00</strong> (Semester 4)</li>
                          <li>Masuk jalur prestasi <strong>SNBP</strong></li>
                        </ul>
                      </div>

                      <div className="w-full h-px bg-neutral-500/10 my-2.5" />

                      {/* SMAN 1 Gedangan */}
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-bold leading-snug">SMA Negeri 1 Gedangan</h4>
                        <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 font-mono">
                          <span>MIPA (XII MIPA 1)</span>
                          <span>2021 - 2024</span>
                        </div>
                        <ul className={`text-[10.5px] mt-1 space-y-0.5 list-disc pl-4 ${themeCls.subText}`}>
                          <li>Nilai Akhir: <strong>93.94</strong></li>
                          <li><strong>Top 5 Siswa Eligible</strong> se-angkatan</li>
                          <li><strong>Top 1 Paralel Kelas</strong> berturut-turut (Kelas X - XII)</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 2: Pengalaman Organisasi */}
                  <motion.div
                    whileHover={{ y: -3, scale: 1.002 }}
                    className={`rounded-3xl p-5 border flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative overflow-hidden ${themeCls.card}`}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <div className={`p-1.5 rounded-xl border ${
                          theme === 'light' ? 'bg-slate-100 border-slate-200 text-[#0a1b33]' : 'bg-white/5 border-white/10 text-blue-400'
                        }`}>
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <h3 className="text-xs font-bold uppercase tracking-wider">Organisasi</h3>
                      </div>
                      <h4 className="text-sm font-bold leading-snug">Kepemimpinan & Kolaborasi</h4>
                      <p className={`text-[10px] font-semibold mt-0.5 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                        Peran Aktif di Lingkungan Kampus
                      </p>
                      <ul className={`text-[10.5px] mt-2.5 space-y-1 list-disc pl-4 ${themeCls.subText}`}>
                         <li><strong>Ketua Pelaksana PEMABA Informatika 2025</strong> (Memimpin 75 panitia aktif dari berbagai divisi untuk mengoordinasikan orientasi 300+ mahasiswa baru)</li>
                        <li><strong>Staff HIMATIFA UPN Jatim</strong> (Divisi Kaderisasi: Mengoordinasi & mendiskusikan alur seluruh ospek jurusan, serta aktif dalam beberapa kepanitiaan)</li>
                        <li><strong>OSIS / MPK SMAN 1 Gedangan</strong> (Pengurus Sekbid 5 - Demokrasi & HAM, serta Ketua Pelaksana event MPLS)</li>
                      </ul>
                    </div>
                  </motion.div>

                  {/* Card 3: Tech Stack & Tools */}
                  <motion.div
                    whileHover={{ y: -3, scale: 1.002 }}
                    className={`rounded-3xl p-5 border flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative overflow-hidden md:col-span-2 ${themeCls.card}`}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <div className={`p-1.5 rounded-xl border ${
                          theme === 'light' ? 'bg-slate-100 border-slate-200 text-[#0a1b33]' : 'bg-white/5 border-white/10 text-blue-400'
                        }`}>
                          <Code className="w-4 h-4" />
                        </div>
                        <h3 className="text-xs font-bold uppercase tracking-wider">Tech Stack & Tools</h3>
                      </div>
                      <h4 className="text-sm font-bold leading-snug mb-2">Kombinasi Rekayasa Perangkat Lunak & Media Kreatif</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        {/* DevOps & Code */}
                        <div className="space-y-1.5">
                          <span className={`text-[9px] font-bold uppercase tracking-wider block ${
                            theme === 'light' ? 'text-slate-500' : 'text-blue-400'
                          }`}>Programming & DevOps</span>
                          <div className="flex flex-wrap gap-1.5">
                            {['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Python', 'Java', 'React', 'Tailwind', 'Docker', 'Git'].map((t, i) => (
                              <span key={i} className={`text-[9.5px] px-2 py-0.5 rounded-md border font-mono ${
                                theme === 'light' ? 'bg-white border-slate-200 text-slate-700' : 'bg-white/5 border-white/10 text-slate-300'
                              }`}>{t}</span>
                            ))}
                          </div>
                        </div>
                        
                        {/* Design & Camera */}
                        <div className="space-y-1.5">
                          <span className={`text-[9px] font-bold uppercase tracking-wider block ${
                            theme === 'light' ? 'text-slate-500' : 'text-blue-400'
                          }`}>Design & Creative</span>
                          <div className="flex flex-wrap gap-1.5">
                            {['Figma', 'Canva', 'Affinity Designer', 'DaVinci Resolve', 'Premiere Pro', 'Fujifilm X-T20'].map((t, i) => (
                              <span key={i} className={`text-[9.5px] px-2 py-0.5 rounded-md border font-mono ${
                                theme === 'light' ? 'bg-white border-slate-200 text-slate-700' : 'bg-white/5 border-white/10 text-slate-300'
                              }`}>{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 4: Projek Terbaik */}
                  <motion.div
                    whileHover={{ y: -3, scale: 1.002 }}
                    className={`rounded-3xl p-5 border flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative overflow-hidden md:col-span-2 ${themeCls.card}`}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
                    <div>
                      <div className="flex items-center space-x-2 mb-4">
                        <div className={`p-1.5 rounded-xl border ${
                          theme === 'light' ? 'bg-slate-100 border-slate-200 text-[#0a1b33]' : 'bg-white/5 border-white/10 text-blue-400'
                        }`}>
                          <FileCode className="w-4 h-4" />
                        </div>
                        <h3 className="text-xs font-bold uppercase tracking-wider">Projek Terbaik</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Project 1: Sakha Art */}
                        <ProjectCard
                          title="Sakha Art"
                          badgeText="Web AI"
                          description="Web generator henna pertama berbasis AI. Membantu pengguna membuat rancangan desain henna secara instan lewat bantuan teknologi generative AI."
                          techStack="React • AI API"
                          theme={theme}
                          links={[
                            { label: "Kunjungi Web", href: "https://sakha-art-701792984767.asia-southeast2.run.app/" }
                          ]}
                        />

                        {/* Project 2: Bake n Brew */}
                        <ProjectCard
                          title="Bake n Brew"
                          badgeText="E-Commerce"
                          description="Website e-commerce toko kue & kopi. Dilengkapi dengan sistem checkout, cetak struk pembayaran, serta halaman admin panel untuk manajemen inventaris cafe."
                          techStack="PHP • MySQL"
                          theme={theme}
                          links={[
                            { label: "User Panel", href: "https://app-59c3ea74-3368-4cb2-9a9e-d507d9783e8d.cleverapps.io/" },
                            { label: "Admin Panel", href: "https://app-59c3ea74-3368-4cb2-9a9e-d507d9783e8d.cleverapps.io/admin/login.php" }
                          ]}
                        />
                      </div>
                    </div>
                  </motion.div>

                </div>

              </div>
              {/* Bulletproof spacer to ensure the cards scroll past the floating bottom navbar and have balanced breathing room */}
              <div className="h-16 md:h-20 shrink-0 pointer-events-none" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4. Floating Bottom Navbar */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 w-auto px-4">
          <motion.nav
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className={`flex items-center backdrop-blur-2xl px-1.5 py-1.5 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.08)] border space-x-1 whitespace-nowrap transition-colors duration-500 ${
              theme === 'dark'
                ? 'bg-neutral-950/90 border-white/10 text-white'
                : 'bg-white/90 border-slate-200/40 text-slate-700'
            }`}
          >


                <button
                  onClick={() => {
                    const newMute = !isMuted;
                    setIsMuted(newMute);
                    if (!newMute) {
                      playSound('success', true);
                    } else {
                      playSound('click');
                    }
                  }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer border shadow-sm ${
                    theme === 'light'
                      ? 'bg-slate-50 border-slate-200/80 hover:bg-slate-100 text-slate-700'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                  }`}
                  aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
    
                {/* Theme toggle button inside navbar */}
                <button
                  onClick={() => {
                    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
                    playSound('theme');
                  }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer border shadow-sm ${
                    theme === 'light'
                      ? 'bg-slate-50 border-slate-200/80 hover:bg-slate-100 text-slate-700'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                  }`}
                  aria-label="Toggle Theme"
                >
                  <motion.div animate={{ rotate: theme === 'light' ? 0 : 360 }}>
                    {theme === 'light' ? <Moon className="w-3.5 h-3.5 text-[#0a1b33]" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
                  </motion.div>
                </button>
    
                {/* Help cheatsheet button inside navbar */}
                <button
                  onClick={() => {
                    setShowShortcutsHelp(prev => !prev);
                    playSound('click');
                  }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer border shadow-sm ${
                    theme === 'light'
                      ? 'bg-slate-50 border-slate-200/80 hover:bg-slate-100 text-slate-700'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                  }`}
                  title="Keyboard Shortcuts (?)"
                  aria-label="Keyboard Shortcuts Help"
                >
                  <span className="text-xs font-bold font-mono">?</span>
                </button>

            {/* Nav button 1 (Home layout switcher) */}
            <button
              onClick={() => {
                setView('hero');
                playSound('click');
              }}
              className={`w-9 h-9 md:w-auto md:h-auto md:px-3.5 md:py-2 rounded-full transition-all cursor-pointer flex items-center justify-center ${
                view === 'hero'
                  ? theme === 'light'
                    ? 'bg-slate-100 text-[#0a1b33] font-bold'
                    : 'bg-white/10 text-white font-bold'
                  : theme === 'light'
                    ? 'text-slate-500 hover:text-[#0a1b33] hover:bg-slate-50'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Home className="w-3.5 h-3.5" /><span className="hidden md:inline ml-1.5">Home</span>
            </button>

            {/* Nav button 2 (Dashboard Grid view switcher) */}
            <button
              onClick={() => {
                setView('dashboard');
                playSound('click');
              }}
              className={`w-9 h-9 md:w-auto md:h-auto md:px-3.5 md:py-2 rounded-full transition-all cursor-pointer flex items-center justify-center ${
                view === 'dashboard'
                  ? theme === 'light'
                    ? 'bg-slate-100 text-[#0a1b33] font-bold'
                    : 'bg-white/10 text-white font-bold'
                  : theme === 'light'
                    ? 'text-slate-500 hover:text-[#0a1b33] hover:bg-slate-50'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" /><span className="hidden md:inline ml-1.5">Products</span>
            </button>

            {/* Nav button 2.5 (About Me view switcher) */}
            <button
              onClick={() => {
                setView('about');
                playSound('click');
              }}
              className={`w-9 h-9 md:w-auto md:h-auto md:px-3.5 md:py-2 rounded-full transition-all cursor-pointer flex items-center justify-center ${
                view === 'about'
                  ? theme === 'light'
                    ? 'bg-slate-100 text-[#0a1b33] font-bold'
                    : 'bg-white/10 text-white font-bold'
                  : theme === 'light'
                    ? 'text-slate-500 hover:text-[#0a1b33] hover:bg-slate-50'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Info className="w-3.5 h-3.5" /><span className="hidden md:inline ml-1.5">About</span>
            </button>

            {/* Nav button 4 (Collapsible Side-panel Chat switcher) */}
            <button
              onClick={() => {
                setChatOpen(prev => !prev);
                playSound('click');
              }}
              className={`w-9 h-9 md:w-auto md:h-auto md:px-5 md:py-2 rounded-full text-[12px] font-semibold transition-all flex items-center justify-center cursor-pointer border shadow-sm ${
                theme === 'light'
                  ? 'bg-[#0a1b33] text-white hover:bg-slate-800 border-slate-200'
                  : 'bg-white text-[#0a1b33] hover:bg-neutral-200 border-white/10'
              }`}
            >
              <Mail className="w-3.5 h-3.5" /><span className="hidden md:inline ml-1.5">Get in touch</span><ChevronRight className="w-3.5 h-3.5 stroke-[2.5px] hidden md:inline ml-1" />
            </button>
          </motion.nav>
        </div>

      </div>

      {/* 5. Seamless Marquee Logo Scroller Component with 3D Card Tilt (Enhancement 3) */}
      <div className="relative w-full max-w-[1400px] mx-auto mt-10 overflow-hidden select-none">
        
        {/* Left/Right masking gradients */}
        <div
          className={`absolute inset-y-0 left-0 w-24 z-10 pointer-events-none transition-colors duration-500 ${
            theme === 'dark' ? 'bg-gradient-to-r from-black to-transparent' : 'bg-gradient-to-r from-[#f9fafb] to-transparent'
          }`}
        />
        <div
          className={`absolute inset-y-0 right-0 w-24 z-10 pointer-events-none transition-colors duration-500 ${
            theme === 'dark' ? 'bg-gradient-to-l from-black to-transparent' : 'bg-gradient-to-l from-[#f9fafb] to-transparent'
          }`}
        />

        {/* Scrolling elements wrapper */}
        <div
          onMouseMove={handleMarqueeMouseMove}
          onMouseLeave={() => {
            setMarqueeDuration('30s');
            lastMouseX.current = null;
          }}
          style={{
            // @ts-ignore
            '--marquee-duration': marqueeDuration,
            // @ts-ignore
            '--marquee-play-state': marqueePlayState
          }}
          className="animate-marquee flex gap-6 py-4"
        >
          {[...logoList, ...logoList].map((logo, idx) => (
            <TiltCard key={idx} logo={logo} theme={theme} />
          ))}
        </div>
      </div>

      {/* ====================================================
          COLLAPSIBLE SIDE-PANEL CHAT SIDEBAR (Split Screen)
         ==================================================== */}
      <AnimatePresence>
        {chatOpen && (
          <div className="fixed inset-y-0 right-0 z-50 flex justify-end w-full max-w-[450px]">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className={`w-full h-full border-l shadow-2xl flex flex-col backdrop-blur-2xl ${
                theme === 'dark'
                  ? 'bg-[#08080c]/95 border-white/10 text-white'
                  : 'bg-white/95 border-slate-200 text-slate-700'
              }`}
            >
              {/* Sidebar Header */}
              <div className={`p-4 border-b flex justify-between items-center bg-transparent ${
                theme === 'dark' ? 'border-white/10' : 'border-slate-100'
              }`}>
                <div className="flex items-center space-x-2.5">
                  <Activity className="w-4.5 h-4.5 text-blue-400" />
                  <div>
                    <h2 className="text-xs font-bold">Mainframe Chat OS</h2>
                    <p className="text-[9px] text-slate-400">Conversational Web Agent & Tools</p>
                  </div>
                </div>
                <button
                  onClick={() => setChatOpen(false)}
                  className={`p-1.5 rounded-full border transition-colors cursor-pointer ${
                    theme === 'dark' ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 hover:bg-slate-50'
                  }`}
                  aria-label="Close Chat"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Chat Content Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                
                {/* Message Log */}
                <div className={`flex-1 overflow-y-auto space-y-3.5 p-2 rounded-2xl border max-h-[460px] ${
                  theme === 'dark' ? 'bg-black/30 border-white/5' : 'bg-slate-50 border-slate-100'
                }`}>
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[90%] p-3.5 rounded-2xl text-[11px] leading-relaxed shadow-sm ${
                          msg.sender === 'user'
                            ? 'bg-[#0a1b33] text-white'
                            : theme === 'dark'
                              ? 'bg-neutral-900 border border-white/5 text-white'
                              : 'bg-white border border-slate-200 text-slate-700'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                        
                        {/* Inline tools renderer */}
                        {msg.toolType && renderChatTool(msg.toolType)}
                        
                        {msg.sources && msg.sources.length > 0 && (
                          <div className="mt-2.5 pt-2 border-t border-slate-200/50 text-[9px] text-slate-400">
                            <strong>Sources:</strong>
                            {msg.sources.map((src, idx) => (
                              <a
                                key={idx}
                                href={src.url}
                                target="_blank"
                                rel="noreferrer"
                                className="block text-blue-500 hover:underline mt-0.5"
                              >
                                [{src.source}] {src.title}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Agent Logs Terminal */}
                {chatLogs.length > 0 && (
                  <div className={`p-3 border rounded-2xl font-mono text-[9px] max-h-24 overflow-y-auto ${
                    theme === 'dark' ? 'bg-black/55 border-white/10 text-neutral-400' : 'bg-slate-100 border-slate-200 text-slate-500'
                  }`}>
                    <div className="flex items-center justify-between mb-1.5 font-bold">
                      <span className="flex items-center space-x-1">
                        <Terminal className="w-3 h-3 text-blue-400" />
                        <span>Execution log:</span>
                      </span>
                      {chatLoading && <Loader2 className="w-2.5 h-2.5 animate-spin text-blue-400" />}
                    </div>
                    {chatLogs.map((log, i) => (
                      <div key={i} className="flex justify-between">
                        <span>• {log.step}</span>
                        <span className="opacity-80">{log.detail}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Chat Input Footer */}
              <div className={`p-4 border-t ${theme === 'dark' ? 'border-white/10' : 'border-slate-100'}`}>
                
                {/* Tools Toolbar injector */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  <button
                    onClick={() => triggerToolInChat('word-to-pdf', 'Word to PDF')}
                    className="chat-tool-btn border text-[8.5px] font-bold px-2.5 py-1 rounded-full cursor-pointer transition-all"
                  >
                    📄 Word PDF
                  </button>
                  
                  <button
                    onClick={() => triggerToolInChat('pdf-compressor', 'PDF Compressor')}
                    className="chat-tool-btn border text-[8.5px] font-bold px-2.5 py-1 rounded-full cursor-pointer transition-all"
                  >
                    📉 Compressor
                  </button>
                  
                  <button
                    onClick={() => triggerToolInChat('media-downloader', 'Media Downloader')}
                    className="chat-tool-btn border text-[8.5px] font-bold px-2.5 py-1 rounded-full cursor-pointer transition-all"
                  >
                    📥 Downloader
                  </button>
                  
                  <button
                    onClick={() => triggerToolInChat('diagnostics', 'Diagnostics')}
                    className="chat-tool-btn border text-[8.5px] font-bold px-2.5 py-1 rounded-full cursor-pointer transition-all"
                  >
                    ⚙️ Diagnostics
                  </button>
                </div>

                {/* Preset Questions Toolbar */}
                <div className="flex flex-wrap gap-1.5 mb-3 px-0.5">
                  <span className={`text-[8.5px] block w-full mb-1 select-none font-semibold ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    Tanya Asisten AI (Guest Mode):
                  </span>
                  
                  <button
                    type="button"
                    onClick={() => { setChatInput('Siapa itu Firzan Syaroni?'); }}
                    className="chat-preset-btn text-[8.5px] px-2.5 py-1 rounded-full border transition-all cursor-pointer font-medium"
                  >
                    Siapa Firzan?
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => { setChatInput('Apa saja tech stack yang dikuasai Firzan?'); }}
                    className="chat-preset-btn text-[8.5px] px-2.5 py-1 rounded-full border transition-all cursor-pointer font-medium"
                  >
                    Tech Stack
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => { setChatInput('Ceritakan tentang proyek Sakha Art!'); }}
                    className="chat-preset-btn text-[8.5px] px-2.5 py-1 rounded-full border transition-all cursor-pointer font-medium"
                  >
                    Sakha Art
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => { setChatInput('Apa saja organisasi yang pernah diikuti Firzan?'); }}
                    className="chat-preset-btn text-[8.5px] px-2.5 py-1 rounded-full border transition-all cursor-pointer font-medium"
                  >
                    Organisasi
                  </button>
                </div>

                <form onSubmit={handleChatSubmit} className="flex items-center space-x-2">
                  {/* Voice Microphone recording button */}
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                      isListening
                        ? 'bg-red-500 border-red-600 text-white animate-pulse'
                        : theme === 'dark'
                          ? 'border-white/10 hover:bg-white/5 text-neutral-400'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-500'
                    }`}
                  >
                    <Mic className="w-4 h-4" />
                  </button>

                  {isListening && (
                    <div className="flex items-center justify-center space-x-0.5 px-1 bg-red-500/10 border border-red-500/20 rounded-xl h-8 shrink-0">
                      <span className="w-0.5 bg-red-500 rounded-full animate-wave-bar h-3" style={{ animationDelay: '0.1s' }} />
                      <span className="w-0.5 bg-red-500 rounded-full animate-wave-bar h-5" style={{ animationDelay: '0.3s' }} />
                      <span className="w-0.5 bg-red-500 rounded-full animate-wave-bar h-2" style={{ animationDelay: '0.2s' }} />
                      <span className="w-0.5 bg-red-500 rounded-full animate-wave-bar h-4" style={{ animationDelay: '0.4s' }} />
                      <span className="w-0.5 bg-red-500 rounded-full animate-wave-bar h-1.5" style={{ animationDelay: '0.0s' }} />
                    </div>
                  )}

                  <input
                    type="text"
                    placeholder="Ask the AI agent..."
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    disabled={chatLoading}
                    className={`flex-1 border rounded-xl px-3.5 py-2.5 outline-none text-xs ${
                      theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={chatLoading}
                    className="bg-[#0a1b33] hover:bg-slate-800 text-white p-2.5 rounded-xl cursor-pointer disabled:opacity-50 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ====================================================
          GLOBAL DRAG AND DROP FILE DROP OVERLAY
         ==================================================== */}
      <AnimatePresence>
        {isDragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a1b33]/85 backdrop-blur-md text-white border-4 border-dashed border-white/20 m-6 rounded-[32px] pointer-events-none"
          >
            <FileUp className="w-16 h-16 animate-bounce text-white mb-4" />
            <h2 className="text-2xl font-bold font-display">Lepas berkas untuk diproses</h2>
            <p className="text-sm text-slate-300">Konversi otomatis untuk berkas DOCX | Kompresi otomatis untuk PDF</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================
          COMMAND PALETTE OVERLAY (⌘K / Ctrl+K)
         ==================================================== */}
      <AnimatePresence>
        {showCommandPalette && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCommandPalette(false)}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              <div className="p-4 border-b border-slate-100 flex items-center space-x-3">
                <Search className="text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Type a command or search workspace..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-[#0a1b33] placeholder-slate-400 border-none outline-none text-sm"
                  autoFocus
                />
                <button
                  onClick={() => setShowCommandPalette(false)}
                  className="text-[10px] text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md"
                >
                  ESC
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto p-2">
                {commandList.length === 0 ? (
                  <p className="text-slate-400 text-xs p-4 text-center">No workspace commands found.</p>
                ) : (
                  commandList.map((cmd: { name: string; desc: string; key: string }) => (
                    <button
                      key={cmd.key}
                      onClick={() => handleCommandPaletteSelect(cmd.key)}
                      className="w-full text-left p-3 rounded-2xl hover:bg-slate-50 flex items-center justify-between group transition-colors cursor-pointer"
                    >
                      <div>
                        <h4 className="text-xs font-semibold text-[#0a1b33]">{cmd.name}</h4>
                        <p className="text-[10px] text-slate-400">{cmd.desc}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0a1b33] transition-colors" />
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ====================================================
          FLOATING SYSTEM CONSOLE CLI LOG DRAWER (Enhancement 2)
         ==================================================== */}
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={() => setConsoleOpen(prev => !prev)}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-[10px] font-mono cursor-pointer shadow-md transition-all ${
            theme === 'dark'
              ? 'bg-neutral-900 border-white/10 hover:bg-neutral-800 text-blue-400'
              : 'bg-white border-slate-200 hover:bg-slate-50 text-[#0a1b33]'
          }`}
        >
          <Terminal className="w-3.5 h-3.5 animate-pulse" />
          <span>Console Log ({consoleLogs.length})</span>
        </button>

        <AnimatePresence>
          {consoleOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className={`absolute bottom-10 left-0 w-80 h-48 border rounded-2xl shadow-xl p-3 font-mono text-[8px] flex flex-col justify-between overflow-hidden z-50 ${
                theme === 'dark' ? 'bg-[#06060c] border-white/10 text-slate-300' : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              <div className="flex justify-between items-center pb-1.5 border-b border-slate-200/50 mb-1.5">
                <span className="text-[9px] font-bold flex items-center space-x-1"><Terminal className="w-3 h-3 text-blue-400" /><span>System Logs</span></span>
                <div className="flex space-x-2">
                  <button onClick={exportConsoleLogs} className="text-blue-400 hover:underline text-[8px] font-bold">Export</button>
                  <button onClick={() => setConsoleLogs([])} className="text-red-500 hover:underline text-[8px]">Clear</button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto space-y-1 pr-1 select-text text-[7.5px] mb-2 font-mono">
                {consoleLogs.map((log, i) => (
                  <div key={i} className="leading-tight">{log}</div>
                ))}
              </div>
              {consoleInput.trim() && (
                <div className="flex flex-wrap gap-1.5 mb-1 pb-1 border-b border-white/5">
                  {AVAILABLE_CONSOLE_COMMANDS
                    .filter(c => c.startsWith(consoleInput.trim().toLowerCase()) && c !== consoleInput.trim().toLowerCase())
                    .map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          setConsoleInput(s);
                          playSound('click');
                        }}
                        className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 rounded px-1.5 py-0.5 text-[6.5px] font-mono transition-all cursor-pointer"
                      >
                        {s}
                      </button>
                    ))}
                </div>
              )}
              <form onSubmit={handleConsoleCommandSubmit} className="flex items-center space-x-1 border-t border-slate-200/30 pt-1.5">
                <span className="text-blue-400 font-bold font-mono text-[9px]">$</span>
                <input
                  type="text"
                  value={consoleInput}
                  onChange={e => setConsoleInput(e.target.value)}
                  onKeyDown={handleConsoleInputKeyDown}
                  placeholder="Type command (try 'help')..."
                  className="flex-1 bg-transparent border-none outline-none text-[8px] font-mono text-blue-400 placeholder-blue-500/50"
                />
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Keyboard Shortcuts Cheat Sheet Modal */}
      <AnimatePresence>
        {showShortcutsHelp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShortcutsHelp(false)}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`relative w-full max-w-sm border rounded-3xl overflow-hidden shadow-2xl z-10 p-6 ${
                theme === 'dark' ? 'bg-[#06060c] border-white/10 text-white' : 'bg-white border-slate-200 text-[#0a1b33]'
              }`}
            >
              <div className="flex justify-between items-center mb-4 border-b pb-2 border-slate-100">
                <h3 className="text-xs font-bold flex items-center space-x-1.5">
                  <Terminal className="w-4 h-4 text-blue-500 animate-pulse" />
                  <span>Keyboard Shortcuts</span>
                </h3>
                <button
                  onClick={() => setShowShortcutsHelp(false)}
                  className="text-slate-400 hover:text-slate-600 text-[10px] font-semibold"
                >
                  Close (Esc)
                </button>
              </div>
              
              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-[11px]">Command Palette</span>
                  <kbd className="bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-[9px] font-mono shadow-sm text-slate-700">Ctrl + K</kbd>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-[11px]">Toggle Shortcuts Menu</span>
                  <kbd className="bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-[9px] font-mono shadow-sm text-slate-700">Shift + /</kbd>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-[11px]">Toggle Dark/Light Theme</span>
                  <kbd className="bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-[9px] font-mono shadow-sm text-slate-700">Ctrl + D</kbd>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-[11px]">Toggle Console Log Drawer</span>
                  <kbd className="bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-[9px] font-mono shadow-sm text-slate-700">Ctrl + L</kbd>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-[11px]">Mute/Unmute UI Audio</span>
                  <kbd className="bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-[9px] font-mono shadow-sm text-slate-700">Ctrl + M</kbd>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* System Diagnostics & Settings Modal */}
      <AnimatePresence>
        {settingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSettingsOpen(false)}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`relative w-full max-w-md border rounded-3xl overflow-hidden shadow-2xl z-10 p-6 ${
                theme === 'dark' ? 'bg-[#06060c] border-white/10 text-white' : 'bg-white border-slate-200 text-[#0a1b33]'
              }`}
            >
              <div className="flex justify-between items-center mb-6 border-b pb-3 border-slate-200/50">
                <h3 className="text-sm font-bold flex items-center space-x-2">
                  <Settings className={`w-4 h-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'} animate-spin-slow`} />
                  <span>System Diagnostics & Settings</span>
                </h3>
                <button
                  onClick={() => setSettingsOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-[10px] font-semibold cursor-pointer"
                >
                  Close (Esc)
                </button>
              </div>
              
              {/* Diagnostics Section */}
              <div className="space-y-4 mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Server Diagnostics</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-3 border rounded-2xl ${theme === 'dark' ? 'bg-neutral-900/50 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-[10px] text-slate-400 block">CPU Load</span>
                    <span className="text-sm font-bold font-mono">{diagnostics?.cpu || '0.0%'}</span>
                  </div>
                  <div className={`p-3 border rounded-2xl ${theme === 'dark' ? 'bg-neutral-900/50 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-[10px] text-slate-400 block">RAM Load</span>
                    <span className="text-sm font-bold font-mono">{diagnostics?.ram || '0.0%'}</span>
                  </div>
                </div>
                
                <div className={`p-3 border rounded-2xl flex items-center justify-between ${theme === 'dark' ? 'bg-neutral-900/50 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Connection Latency (Ping)</span>
                    <span className="text-xs font-bold font-mono">
                      {pingLatency !== null ? `${pingLatency} ms` : 'Not tested'}
                    </span>
                  </div>
                  <button
                    onClick={handlePing}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-bold cursor-pointer transition-all active:scale-95 ${
                      theme === 'dark' 
                        ? 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20' 
                        : 'bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-100'
                    }`}
                  >
                    Test Ping
                  </button>
                </div>
              </div>
              
              {/* Settings Configuration Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Settings Configuration</h4>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Gemini API Key</label>
                  <input
                    type="password"
                    value={geminiKey}
                    onChange={(e) => setGeminiKey(e.target.value)}
                    placeholder="Enter your Gemini API key..."
                    className={`w-full px-3 py-2 rounded-xl border text-xs outline-none transition-all ${
                      theme === 'dark'
                        ? 'bg-neutral-900 border-white/10 text-white focus:border-blue-500/50'
                        : 'bg-white border-slate-200 text-slate-800 focus:border-blue-500'
                    }`}
                  />
                  <p className="text-[9px] text-slate-400 mt-1 leading-normal">
                    Key ini disimpan secara lokal di SQLite database Anda untuk mendukung obrolan AI Command Center.
                  </p>
                </div>

                <div className="mt-2.5">
                  <label className="text-[10px] text-slate-400 block mb-1">Admin Access Password</label>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => {
                      setAdminPassword(e.target.value);
                      localStorage.setItem('admin_password', e.target.value);
                    }}
                    placeholder="Enter Admin Access Password..."
                    className={`w-full px-3 py-2 rounded-xl border text-xs outline-none transition-all ${
                      theme === 'dark'
                        ? 'bg-neutral-900 border-white/10 text-white focus:border-blue-500/50'
                        : 'bg-white border-slate-200 text-slate-800 focus:border-blue-500'
                    }`}
                  />
                  <p className="text-[9px] text-slate-400 mt-1 leading-normal">
                    Password ini digunakan untuk mengautentikasi seluruh request ke server di production.
                  </p>
                </div>
                
                <button
                  onClick={saveSettings}
                  disabled={settingsLoading}
                  className={`w-full py-2 rounded-xl text-xs font-bold cursor-pointer transition-all active:scale-95 flex items-center justify-center space-x-1.5 ${
                    theme === 'dark'
                      ? 'bg-blue-500 hover:bg-blue-600 text-neutral-950 disabled:bg-neutral-800 disabled:text-slate-500'
                      : 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-slate-200 disabled:text-slate-400'
                  }`}
                >
                  {settingsLoading ? 'Saving...' : 'Save Configuration'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Premium Toast Notification System */}
      <AnimatePresence>
        {toast.visible && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[10000] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className={`px-4 py-2.5 rounded-full border shadow-2xl backdrop-blur-md flex items-center space-x-2 text-[10px] font-semibold tracking-wide pointer-events-auto ${
                toast.type === 'success'
                  ? theme === 'dark'
                    ? 'bg-blue-500/10 border-blue-500/20 text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.1)]'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-lg'
                  : toast.type === 'error'
                    ? theme === 'dark'
                      ? 'bg-red-500/10 border-red-500/20 text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.1)]'
                      : 'bg-red-50 border-red-200 text-red-700 shadow-lg'
                    : theme === 'dark'
                      ? 'bg-blue-500/10 border-blue-500/20 text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.1)]'
                      : 'bg-blue-50 border-blue-200 text-blue-700 shadow-lg'
              }`}
            >
              {toast.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5" />}
              {toast.type === 'error' && <XCircle className="w-3.5 h-3.5" />}
              {toast.type === 'info' && <Info className="w-3.5 h-3.5" />}
              <span>{toast.message}</span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
