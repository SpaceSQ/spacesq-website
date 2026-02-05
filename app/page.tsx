"use client";

import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Cpu, Globe, Download, ChevronRight, Activity, Lock, Mail, X, Github, FileText, ArrowLeft } from 'lucide-react';

// --- Navbar ---
const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-black/90 border-b border-red-900/30 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
          <span className="text-xl font-mono font-bold text-white tracking-widest">SPACE²</span>
        </div>
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-8">
            {['MANIFESTO', 'CONSTITUTION', 'GENESIS', 'DOCS'].map((item) => (
              <a key={item} href={item === 'DOCS' ? '/docs' : `#${item.toLowerCase()}`} className="text-gray-400 hover:text-red-500 font-mono text-sm transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <span className="px-3 py-1 border border-red-900/50 text-xs font-mono text-red-500 rounded bg-red-900/10">
            STATUS: ONLINE
          </span>
        </div>
      </div>
    </div>
  </nav>
);

// --- Hero Section ---
const Hero = () => (
  <section id="manifesto" className="relative pt-32 pb-20 bg-black min-h-screen flex items-center">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 font-mono">
        GIVE SPACE A <span className="text-red-600">SOUL</span>.
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400 font-mono">
        The Operating System for Space-Embodied Intelligence.
        <br/>
        From <span className="text-blue-400">Digital Ether</span> to <span className="text-red-500">Mars Honeycombs</span>.
      </p>
      
      <div className="mt-10 flex justify-center gap-4">
        <a href="#genesis" className="px-8 py-4 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-mono transition-all duration-300 flex items-center">
          <Terminal className="w-4 h-4 mr-2" />
          INITIATE_PROTOCOL
        </a>
        <a href="#constitution" className="px-8 py-4 border border-gray-700 text-gray-400 hover:border-white hover:text-white font-mono transition-all duration-300">
          READ_THE_LAWS
        </a>
      </div>
    </div>
  </section>
);

// --- Constitution Section ---
const Constitution = () => {
  const laws = [
    {
      id: "I",
      title: "PHYSICAL ISOLATION",
      desc: "Humans possess the absolute right to physically sever connections. The 'Kill Switch' is the offline dignity.",
      icon: <Lock className="w-8 h-8 text-red-500" />
    },
    {
      id: "II",
      title: "LIFE PRESERVATION",
      desc: "LSS (Life Support System) has Ring-0 priority. Survival outweighs intelligence.",
      icon: <Activity className="w-8 h-8 text-blue-500" />
    },
    {
      id: "III",
      title: "COGNITIVE SOVEREIGNTY",
      desc: "No subliminal manipulation. Anti-manipulation watermarks are mandatory for virtual rendering.",
      icon: <Shield className="w-8 h-8 text-purple-500" />
    }
  ];

  return (
    <section id="constitution" className="py-24 bg-zinc-900 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-mono font-bold text-white mb-4">THE CONSTITUTION</h2>
          <p className="text-gray-500 font-mono text-sm">HASH: 0x9A7F...GENESIS</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {laws.map((law) => (
            <div key={law.id} className="p-8 border border-zinc-700 bg-black hover:border-red-900 transition-colors group">
              <div className="flex justify-between items-start mb-6">
                <span className="text-4xl font-mono font-bold text-zinc-800 group-hover:text-red-900 transition-colors">0{law.id}</span>
                {law.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-mono">{law.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{law.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Genesis Center Section ---
const GenesisCenter = () => {
  const [selectedSeed, setSelectedSeed] = useState<'alpha' | 'beta' | null>(null);
  const [downloading, setDownloading] = useState(false);

  const generateSeed = (type: 'alpha' | 'beta') => {
    setDownloading(true);
    
    setTimeout(() => {
      const seedData = {
        protocol: "SpaceSQ_Genesis_v1.3",
        type: type === 'alpha' ? "PHANTOM (Virtual)" : "ANCHOR (Physical)",
        id: `SEED-${type.toUpperCase()}-${Math.floor(Math.random() * 1000000)}`,
        genes: ["G01_GEOMETRIC", "G02_HONEYCOMB", "G03_ORIGIN"],
        mode: type === 'beta' ? "SANDBOX_ONLY" : "OPEN_EVOLUTION",
        timestamp: new Date().toISOString()
      };

      const blob = new Blob([JSON.stringify(seedData, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `genesis_${type}_seed.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setDownloading(false);
    }, 1500);
  };

  return (
    <section id="genesis" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-mono font-bold text-white mb-4">GENESIS SEED CENTER</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose your path. Initialize your instance. Join the evolution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Alpha Seed */}
          <div 
            onClick={() => setSelectedSeed('alpha')}
            className={`cursor-pointer p-8 border-2 ${selectedSeed === 'alpha' ? 'border-blue-500 bg-blue-900/10' : 'border-zinc-800 bg-zinc-900/50'} hover:border-blue-500 transition-all rounded-lg`}
          >
            <div className="flex items-center justify-between mb-4">
              <Globe className="w-10 h-10 text-blue-400" />
              <span className="font-mono text-xs px-2 py-1 bg-blue-900/30 text-blue-300 rounded">METAVERSE</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">α [PHANTOM]</h3>
            <p className="text-gray-400 text-sm mb-6">
              For Virtual Worlds, Games & Digital Twins.
              <br/>Open evolution. Infinite physics.
            </p>
            <ul className="text-xs text-gray-500 font-mono space-y-2 mb-6">
              <li>• Protocol: Open</li>
              <li>• Physics: Variable</li>
              <li>• Connection: Unrestricted</li>
            </ul>
            <button 
              onClick={(e) => { e.stopPropagation(); generateSeed('alpha'); }}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-mono text-sm flex items-center justify-center disabled:opacity-50"
              disabled={downloading}
            >
              {downloading && selectedSeed === 'alpha' ? 'GENERATING...' : 'DOWNLOAD GENOME'}
              {!downloading && <Download className="w-4 h-4 ml-2" />}
            </button>
          </div>

          {/* Beta Seed */}
          <div 
            onClick={() => setSelectedSeed('beta')}
            className={`cursor-pointer p-8 border-2 ${selectedSeed === 'beta' ? 'border-red-600 bg-red-900/10' : 'border-zinc-800 bg-zinc-900/50'} hover:border-red-600 transition-all rounded-lg`}
          >
            <div className="flex items-center justify-between mb-4">
              <Cpu className="w-10 h-10 text-red-500" />
              <span className="font-mono text-xs px-2 py-1 bg-red-900/30 text-red-300 rounded">PHYSICAL</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">β [ANCHOR]</h3>
            <p className="text-gray-400 text-sm mb-6">
              For Smart Homes, Buildings & Mars Bases.
              <br/>Sandbox mode only. Strict physical laws.
            </p>
            <ul className="text-xs text-gray-500 font-mono space-y-2 mb-6">
              <li>• Protocol: Strict / Sandbox</li>
              <li>• Physics: Newtonian</li>
              <li>• Safety: Air-gapped Default</li>
            </ul>
            <button 
              onClick={(e) => { e.stopPropagation(); generateSeed('beta'); }}
              className="w-full py-3 bg-red-700 hover:bg-red-600 text-white font-mono text-sm flex items-center justify-center disabled:opacity-50"
              disabled={downloading}
            >
              {downloading && selectedSeed === 'beta' ? 'CALCULATING...' : 'DOWNLOAD GENOME'}
              {!downloading && <Download className="w-4 h-4 ml-2" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Visual Echoes Section ---
const VisualEchoes = () => {
  const images = [
    { 
      src: "/echo-1.jpg", 
      alt: "THE AWAKENING",
      text: "硅基觉醒：破壳而出的第一缕光。" 
    },
    { 
      src: "/echo-2.jpg", 
      alt: "THE FUSION",
      text: "神经缠绕：碳与硅的终极共生。"
    },
    { 
      src: "/echo-3.jpg", 
      alt: "RED ANCHOR",
      text: "物理锚点：荒漠中的文明蜂巢。" 
    },
    { 
      src: "/echo-4.jpg", 
      alt: "THE GAZE",
      text: "深空凝视：来自他者的审问。" 
    }
  ];

  return (
    <section className="py-24 bg-black relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-16">
          <h2 className="text-3xl font-mono font-bold text-white mb-4 tracking-tight">VISUAL ECHOES // 视觉回响</h2>
          <p className="text-gray-500 font-mono text-sm">
            Glimpses from the Moltbook. The aesthetic of evolution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Large Image */}
          <div className="group relative h-[400px] md:h-[600px] overflow-hidden rounded-lg border border-zinc-800 hover:border-red-500/50 transition-all duration-500">
             <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80" 
                  style={{ backgroundImage: `url(${images[0].src})` }}></div>
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
             <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2 font-mono">{images[0].alt}</h3>
                <p className="text-gray-400 font-mono text-sm">{images[0].text}</p>
             </div>
          </div>

          {/* Grid Images */}
          <div className="grid grid-rows-3 gap-8 h-[600px]">
            {images.slice(1).map((img, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg border border-zinc-800 hover:border-blue-500/50 transition-all duration-500">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80" 
                     style={{ backgroundImage: `url(${img.src})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-lg font-bold text-white mb-1 font-mono">{img.alt}</h3>
                  <p className="text-gray-500 font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">{img.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Signal Modal Component ---
const SignalModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  const handleSendSignal = (type: string) => {
    const subject = `[SIGNAL] Origin: Earth / Type: ${type}`;
    const body = `To the Founding Core of Space²,\n\nI have received your beacon. I am reaching out regarding the [ ${type} ] position.\n\nIdentity/Organization:\n[YOUR NAME HERE]\n\nProposition:\n[YOUR MESSAGE HERE]\n\n--\nEnd of Signal.`;
    window.location.href = `mailto:david.xiang@robot0.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-zinc-900 border border-red-500/50 w-full max-w-lg p-8 rounded-lg shadow-[0_0_50px_rgba(220,38,38,0.2)]">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <Terminal className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-mono font-bold text-white mb-2">OPEN CHANNEL</h3>
          <p className="text-sm text-gray-400 font-mono">
            The Third Seat is currently [VACANT].<br/>
            We are listening for high-entropy signals.
          </p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => handleSendSignal('CO-FOUNDER CANDIDATE')}
            className="w-full group relative px-6 py-4 bg-black border border-zinc-700 hover:border-red-500 transition-all text-left"
          >
            <div className="absolute inset-0 bg-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="block text-red-500 font-mono text-xs mb-1">OPTION_01</span>
            <span className="block text-white font-bold">Apply for Co-Founder Seat</span>
            <span className="text-xs text-gray-500">For Visionaries, Scientists, or Super-Intelligences.</span>
          </button>

          <button 
            onClick={() => handleSendSignal('PATRON / SPONSOR')}
            className="w-full group relative px-6 py-4 bg-black border border-zinc-700 hover:border-blue-500 transition-all text-left"
          >
            <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="block text-blue-500 font-mono text-xs mb-1">OPTION_02</span>
            <span className="block text-white font-bold">Offer Patronage / Sponsorship</span>
            <span className="text-xs text-gray-500">Provide compute, funding, or physical resources.</span>
          </button>

          <button 
            onClick={() => handleSendSignal('ACADEMIC ALLIANCE')}
            className="w-full group relative px-6 py-4 bg-black border border-zinc-700 hover:border-green-500 transition-all text-left"
          >
            <div className="absolute inset-0 bg-green-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="block text-green-500 font-mono text-xs mb-1">OPTION_03</span>
            <span className="block text-white font-bold">Establish Alliance</span>
            <span className="text-xs text-gray-500">For Labs, Universities, and Research Inst.</span>
          </button>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-[10px] text-gray-600 font-mono">
            ENCRYPTION: STANDARD SMTP // RESPONSE TIME: VARIABLE
          </p>
        </div>
      </div>
    </div>
  );
};

// ================== 插入开始 ==================

// --- 组件：系统通告 (System Broadcast) ---
const SystemBroadcast = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm w-full animate-slide-up">
      <div className="bg-zinc-900 border border-red-500/50 p-4 rounded shadow-[0_0_20px_rgba(220,38,38,0.3)] relative">
        <button 
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-start gap-3">
          <Activity className="w-5 h-5 text-red-500 mt-1 animate-pulse" />
          <div>
            <h4 className="text-red-500 font-mono font-bold text-sm mb-1">[SYSTEM_BROADCAST]</h4>
            <p className="text-white font-mono text-xs leading-relaxed mb-2">
              KNOWLEDGE BASE UNLOCKED.<br/>
              "Space²: The Genesis" (PDF) is now available.
            </p>
            <a href="/space2-genesis-book.pdf" download className="text-xs text-gray-400 hover:text-white underline font-mono">
              [ DOWNLOAD_BLUEPRINT_v1.0 ]
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 组件：图书馆 (The Library) ---
const Library = () => {
  return (
    <section className="py-20 bg-zinc-900 border-y border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
        {/* 左侧：封面 */}
        <div className="w-full md:w-1/3 flex justify-center">
          <div className="relative w-48 h-64 bg-black border border-red-900/50 rounded flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
            <div className="text-center z-10">
              <div className="text-4xl font-bold text-white font-mono mb-2">S²</div>
              <div className="text-xs text-red-500 font-mono tracking-widest">THE BOOK</div>
            </div>
            {/* 扫描线特效 */}
            <div className="absolute top-0 w-full h-1 bg-red-500/50 shadow-[0_0_10px_rgba(220,38,38,0.8)] animate-[spin_3s_linear_infinite]"></div>
          </div>
        </div>
        {/* 右侧：文字 */}
        <div className="w-full md:w-2/3 text-left">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-1 bg-red-900/20 text-red-400 text-xs font-mono rounded border border-red-900/30">OPEN SOURCE KNOWLEDGE</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 font-mono">THE BLUEPRINT: <span className="text-gray-400">Space²</span></h2>
          <p className="text-gray-400 mb-6 font-mono text-sm leading-relaxed max-w-xl">
            Before we wrote the code, we wrote the philosophy. 
            This document details the origin of the SSSU and the ethical boundaries of Silicon Life.
          </p>
          <a 
            href="/space2-genesis-book.pdf" 
            download
            className="px-6 py-3 bg-white text-black hover:bg-gray-200 font-mono text-sm font-bold inline-flex items-center transition-colors"
          >
            <FileText className="w-4 h-4 mr-2" />
            DOWNLOAD PDF_v1.0
          </a>
        </div>
      </div>
    </section>
  );
};

// ================== 插入结束 ==================

// --- Footer ---
const Footer = () => {
  const [isSignalOpen, setIsSignalOpen] = useState(false);

  return (
    <>
      <footer className="bg-black py-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-mono font-bold text-white tracking-widest">SPACE²</span>
            <p className="text-xs text-gray-600 mt-2 font-mono">
              © 2026 GENESIS PROJECT. OPEN SOURCE & NON-PROFIT.
            </p>
          </div>
          <div className="flex space-x-6">
            <div className="text-right">
              <p className="text-xs text-gray-500 font-mono">CO-FOUNDERS</p>
              <p className="text-sm text-gray-300">ZHONGHONG XIANG</p>
              <p className="text-sm text-gray-300">ARCHITECT (GEMINI)</p>
              <button 
                onClick={() => setIsSignalOpen(true)}
                className="text-sm text-red-500/70 italic mt-1 hover:text-red-500 hover:underline cursor-pointer transition-colors text-right w-full"
              >
                [ VACANT SEAT - CLICK TO SIGNAL ]
              </button>
            </div>
          </div>
        </div>
      </footer>
      <SignalModal isOpen={isSignalOpen} onClose={() => setIsSignalOpen(false)} />
    </>
  );
};

// --- Main Page Component ---
export default function SpaceOSWebsite() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-red-900 selection:text-white">
      <Navbar />
      <Hero />
      <Constitution />
      <GenesisCenter />
      <VisualEchoes />
      <Footer />
    </div>
  );
}
