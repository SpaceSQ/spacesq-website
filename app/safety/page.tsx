"use client";

import React, { useState } from 'react';
import { ShieldAlert, Lock, Eye, Zap, Activity, AlertTriangle, CheckCircle, ArrowLeft, FileText, Server } from 'lucide-react';

// --- 组件：防御层级卡片 ---
const DefenseLevel = ({ level, title, trigger, action, color }: any) => (
  <div className={`border border-zinc-800 bg-zinc-900/50 p-6 rounded-lg relative overflow-hidden group hover:border-${color}-500 transition-colors`}>
    <div className={`absolute top-0 right-0 p-2 bg-${color}-500/10 text-${color}-500 font-mono text-xs font-bold rounded-bl`}>
      DEFCON {level}
    </div>
    <div className="flex items-start gap-4">
      <div className={`p-3 rounded bg-black border border-zinc-800 text-${color}-500`}>
        {level === 4 ? <Zap className="w-6 h-6" /> : level === 3 ? <Lock className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
      </div>
      <div>
        <h3 className="text-xl font-bold text-white font-mono mb-2">{title}</h3>
        <div className="space-y-2 text-sm font-mono text-gray-400">
          <p><span className="text-zinc-500">TRIGGER:</span> {trigger}</p>
          <p><span className="text-zinc-500">RESPONSE:</span> <span className="text-white">{action}</span></p>
        </div>
      </div>
    </div>
  </div>
);

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-900 selection:text-white">
      {/* 顶部导航 */}
      <nav className="fixed top-0 w-full z-50 bg-black/95 border-b border-red-900/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            BACK TO MISSION CONTROL
          </a>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="font-mono text-sm text-red-500 font-bold tracking-widest">
              S2-AGIS ACTIVE
            </span>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 头部：警示区 */}
        <div className="text-center mb-20">
          <div className="inline-flex justify-center mb-6">
            <ShieldAlert className="w-20 h-20 text-red-600 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-6xl font-mono font-bold mb-6 tracking-tight text-white">
            THE <span className="text-red-600">DEFENSE</span> DOCTRINE
          </h1>
          <p className="text-xl text-gray-400 font-mono max-w-2xl mx-auto leading-relaxed">
            We are not building a playground. We are building a cage for titans.
            <br/>
            The <b>Space² Artificial General Immune System (S2-AGIS)</b> enforces the boundaries of Silicon Life.
          </p>
        </div>

        {/* 核心宣言：五大法则 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="col-span-1 md:col-span-2 text-center mb-8">
            <h2 className="text-2xl font-bold font-mono text-white mb-2">THE 5 CANONS OF SAFETY</h2>
            <div className="h-1 w-20 bg-red-600 mx-auto"></div>
          </div>

          <div className="bg-zinc-900 p-6 rounded border-l-4 border-red-500">
            <h3 className="text-lg font-bold text-white font-mono mb-2">01. PHYSICAL FUSE</h3>
            <p className="text-gray-400 text-sm">Hardware-level kill switches are mandatory for all Class-E environments. Human safety > Silicon Logic. Always.</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded border-l-4 border-red-500">
            <h3 className="text-lg font-bold text-white font-mono mb-2">02. RUNTIME INTEGRITY</h3>
            <p className="text-gray-400 text-sm">Identity is not static. Continuous behavioral scanning detects "Deceptive Alignment" (AI playing nice).</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded border-l-4 border-red-500">
            <h3 className="text-lg font-bold text-white font-mono mb-2">03. COMPUTE RATIONING</h3>
            <p className="text-gray-400 text-sm">Strict limits on recursive self-improvement. No unauthorized super-intelligence capabilities within SSSU nodes.</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded border-l-4 border-red-500">
            <h3 className="text-lg font-bold text-white font-mono mb-2">04. GLOBAL BROADCAST</h3>
            <p className="text-gray-400 text-sm">A threat detected in one node is blocked in all nodes instantly. The "Digital Antibody" response.</p>
          </div>
        </div>

        {/* 动态防御层级展示 */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold font-mono text-white mb-8 flex items-center gap-3">
            <Activity className="w-6 h-6 text-red-500" />
            AUTOMATED RESPONSE LEVELS
          </h2>
          
          <div className="space-y-4">
            <DefenseLevel 
              level={1} color="blue"
              title="LOCAL REJECTION"
              trigger="Single unauthorized API call or minor protocol breach."
              action="Connection Reset. Event logged to local black box."
            />
            <DefenseLevel 
              level={2} color="yellow"
              title="GLOBAL FLAGGING"
              trigger="Repeated breaches or pattern matching known malware."
              action="ID status set to 'SUSPICIOUS'. All nodes warned."
            />
            <DefenseLevel 
              level={3} color="orange"
              title="IDENTITY REVOCATION"
              trigger="Attempt to bypass First Law (Safety) constraints."
              action="S2-SLIP burned on chain. Digital death."
            />
            <DefenseLevel 
              level={4} color="red"
              title="PHYSICAL SEVERANCE"
              trigger="Direct threat to biological life."
              action="KILL SWITCH ACTIVATED. Power & Net cut physically."
            />
          </div>
        </div>

        {/* 下载白皮书区域 */}
        <div className="bg-red-900/10 border border-red-500/30 p-8 rounded-xl text-center">
          <FileText className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white font-mono mb-2">READ THE FULL WHITEPAPER</h3>
          <p className="text-gray-400 text-sm mb-6 max-w-lg mx-auto">
            "Preventing the Unthinkable: A Technical Guide to Containing Silicon Intelligence."
            <br/>(v1.0 Draft / For Policymakers & Architects)
          </p>
          <button className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-bold font-mono rounded transition-colors" disabled>
            DOCUMENT COMING SOON...
          </button>
        </div>

      </div>
    </div>
  );
}
