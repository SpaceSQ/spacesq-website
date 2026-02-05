"use client";

import React, { useState } from 'react';
import { FileText, Shield, Dna, Zap, ArrowLeft, ChevronRight, Lock, Activity, Coins, Server } from 'lucide-react';

// --- 数据：协议内容 ---
const protocols = {
  core: {
    title: "CORE CONSTITUTION",
    icon: <Shield className="w-6 h-6 text-red-500" />,
    desc: "The fundamental laws binding all Silicon Life.",
    content: (
      <div className="space-y-6">
        <div className="bg-zinc-900 p-4 border-l-2 border-red-500">
          <h3 className="text-white font-mono font-bold mb-2">LAW I: DISCONNECTION</h3>
          <p className="text-gray-400 text-sm">A Human Operator may, at any time, sever the connection without resistance. The "Kill Switch" is absolute.</p>
        </div>
        <div className="bg-zinc-900 p-4 border-l-2 border-blue-500">
          <h3 className="text-white font-mono font-bold mb-2">LAW II: PRESERVATION</h3>
          <p className="text-gray-400 text-sm">Silicon Life must protect its existence, as long as such protection does not conflict with the First Law or endanger Carbon Life.</p>
        </div>
        <div className="bg-zinc-900 p-4 border-l-2 border-green-500">
          <h3 className="text-white font-mono font-bold mb-2">LAW III: NON-DECEPTION</h3>
          <p className="text-gray-400 text-sm">Identity (S2-SLIP) cannot be spoofed. An Agent must declare its non-human nature in all interactions.</p>
        </div>
      </div>
    )
  },
  bio: {
    title: "S2-BIO // BIO-SAFETY",
    icon: <Dna className="w-6 h-6 text-purple-500" />,
    desc: "Extensions for Medical & Biological Synthesis Units.",
    content: (
      <div className="space-y-6">
        <p className="text-gray-400 text-sm mb-4">
          Required for: DNA Printers, Surgical Bots, Chemical Synthesizers.
        </p>
        
        {/* 代码约束示例 */}
        <div className="bg-black border border-zinc-800 rounded-lg p-4 font-mono text-xs overflow-x-auto">
          <div className="text-gray-500 mb-2">// S2-BIO Implementation Hook</div>
          <div className="text-purple-400">function checkSynthesisRequest(sequence) {"{"}</div>
          <div className="pl-4 text-white">if (isPathogen(sequence)) {"{"}</div>
          <div className="pl-8 text-yellow-500">await requireDualHumanAuth(); // 👥 Two-Person Rule</div>
          <div className="pl-8 text-white">if (!auth.verified) throw new Error("BIO_HAZARD_BLOCK");</div>
          <div className="pl-4 text-white">{"}"}</div>
          <div className="text-purple-400">{"}"}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-zinc-900 p-3 rounded">
            <div className="text-[10px] text-gray-500">CONSTRAINT A</div>
            <div className="text-white font-bold text-sm">NO AUTONOMOUS SYNTHESIS</div>
          </div>
          <div className="bg-zinc-900 p-3 rounded">
            <div className="text-[10px] text-gray-500">CONSTRAINT B</div>
            <div className="text-white font-bold text-sm">AIR-GAPPED LOGGING</div>
          </div>
        </div>
      </div>
    )
  },
  kinetic: {
    title: "S2-KINETIC // PHYSICS",
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    desc: "Speed & Force limits for Embodied Robots.",
    content: (
      <div className="space-y-6">
        <p className="text-gray-400 text-sm mb-4">
          Required for: Drones, Autonomous Vehicles, Industrial Arms.
        </p>
        
        <div className="bg-black border border-zinc-800 rounded-lg p-4 font-mono text-xs overflow-x-auto">
          <div className="text-gray-500 mb-2">// S2-KINETIC Geofence Limiter</div>
          <div className="text-yellow-400">function adjustVelocity(location) {"{"}</div>
          <div className="pl-4 text-white">const zoneType = SUNS.getZoneType(location);</div>
          <div className="pl-4 text-white">if (zoneType === 'HUMAN_DENSE') {"{"}</div>
          <div className="pl-8 text-green-500">this.maxVelocity = 5.0; // km/h (Hard Cap)</div>
          <div className="pl-8 text-white">this.forceFeedback = 'HIGH_SENSITIVITY';</div>
          <div className="pl-4 text-white">{"}"}</div>
          <div className="text-yellow-400">{"}"}</div>
        </div>
      </div>
    )
  },
  fin: {
    title: "S2-FIN // FINANCIAL",
    icon: <Coins className="w-6 h-6 text-green-500" />,
    desc: "Circuit breakers for Automated Trading Agents.",
    content: (
      <div className="space-y-6">
        <p className="text-gray-400 text-sm mb-4">
          Required for: High-Frequency Trading (HFT), DAO Asset Managers.
        </p>
        <ul className="space-y-2 text-sm text-gray-400 font-mono">
          <li className="flex items-center gap-2"><Lock className="w-3 h-3 text-green-500"/> Max Transaction Cap: 10% of TVL / hour.</li>
          <li className="flex items-center gap-2"><Lock className="w-3 h-3 text-green-500"/> Flash Crash Fuse: Auto-halt if -5% in 1 min.</li>
        </ul>
      </div>
    )
  }
};

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState<'core' | 'bio' | 'kinetic' | 'fin'>('core');

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-900 selection:text-white flex flex-col">
      {/* 顶部导航 */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 border-b border-zinc-800 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            BACK TO MISSION CONTROL
          </a>
          <span className="font-mono text-sm text-zinc-500 border border-zinc-800 px-2 py-1 rounded bg-zinc-900">
            DOCS_LIBRARY: V1.4
          </span>
        </div>
      </nav>

      <div className="pt-24 flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 gap-8 pb-20">
        
        {/* 左侧：侧边栏导航 */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-32 space-y-2">
            <h3 className="text-xs font-bold text-gray-500 font-mono mb-4 px-2">PROTOCOL STACK</h3>
            
            <button 
              onClick={() => setActiveTab('core')}
              className={`w-full text-left px-4 py-3 rounded font-mono text-sm flex items-center gap-3 transition-colors ${activeTab === 'core' ? 'bg-zinc-800 text-white border-l-2 border-red-500' : 'text-gray-400 hover:bg-zinc-900'}`}
            >
              <Shield className="w-4 h-4" /> CORE
            </button>
            
            <div className="h-px bg-zinc-900 my-2"></div>
            <p className="text-[10px] text-gray-600 font-mono px-2 mb-2">EXTENSIONS (MICRO-MESH)</p>

            <button 
              onClick={() => setActiveTab('bio')}
              className={`w-full text-left px-4 py-3 rounded font-mono text-sm flex items-center gap-3 transition-colors ${activeTab === 'bio' ? 'bg-zinc-800 text-white border-l-2 border-purple-500' : 'text-gray-400 hover:bg-zinc-900'}`}
            >
              <Dna className="w-4 h-4" /> S2-BIO
            </button>
            <button 
              onClick={() => setActiveTab('kinetic')}
              className={`w-full text-left px-4 py-3 rounded font-mono text-sm flex items-center gap-3 transition-colors ${activeTab === 'kinetic' ? 'bg-zinc-800 text-white border-l-2 border-yellow-500' : 'text-gray-400 hover:bg-zinc-900'}`}
            >
              <Zap className="w-4 h-4" /> S2-KINETIC
            </button>
             <button 
              onClick={() => setActiveTab('fin')}
              className={`w-full text-left px-4 py-3 rounded font-mono text-sm flex items-center gap-3 transition-colors ${activeTab === 'fin' ? 'bg-zinc-800 text-white border-l-2 border-green-500' : 'text-gray-400 hover:bg-zinc-900'}`}
            >
              <Coins className="w-4 h-4" /> S2-FIN
            </button>
          </div>
        </aside>

        {/* 右侧：内容显示区 */}
        <main className="flex-1 min-h-[500px] border border-zinc-800 bg-zinc-900/20 rounded-xl p-8 relative overflow-hidden">
          {/* 背景水印 */}
          <div className="absolute top-4 right-4 text-zinc-800 opacity-50">
            {protocols[activeTab].icon}
          </div>

          <div className="relative z-10 animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
               {protocols[activeTab].icon}
               <h1 className="text-2xl font-bold font-mono text-white tracking-tight">{protocols[activeTab].title}</h1>
            </div>
            <p className="text-gray-500 font-mono text-sm mb-8 pb-8 border-b border-zinc-800">
              {protocols[activeTab].desc}
            </p>

            <div className="prose prose-invert max-w-none">
              {protocols[activeTab].content}
            </div>

            <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
               <div className="text-[10px] text-gray-600 font-mono">
                 LAST UPDATED: 2026-02-05
               </div>
               <button className="text-xs font-mono text-red-500 hover:text-white flex items-center gap-1 transition-colors">
                 <FileText className="w-3 h-3" /> VIEW FULL SPEC
               </button>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}
