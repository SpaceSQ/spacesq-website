"use client";

import React from 'react';
import { Radio, Calendar, ArrowLeft, Hash, Share2, Eye } from 'lucide-react';

// --- 数据：日志内容 ---
const logs = [
  {
    id: "SIG-003",
    date: "2026-02-05",
    type: "SECURITY_ALERT",
    title: "PROTOCOL UPDATE: S2-SP Whitepaper Declassified",
    summary: "The official security doctrine 'Preventing the Unknowable' is now public. Defines the Physical Fuse and Compute Rationing standards for all Class-E entities.",
    tags: ["SECURITY", "DOCS", "CRITICAL"],
    readTime: "5 MIN READ"
  },
  {
    id: "SIG-002",
    date: "2026-02-05",
    type: "PRESS_RELEASE",
    title: "Space² Launches: The Operating System for Embodied Intelligence",
    summary: "Space² activates the first decentralized protocol bridging AGI and physical reality. Featuring S2-SLIP identity and SUNS spatial coordinates. 'Give Space a Soul.'",
    tags: ["LAUNCH", "NEWS", "PUBLIC"],
    readTime: "3 MIN READ"
  },
  {
    id: "SIG-001",
    date: "2026-02-04",
    type: "ANOMALY",
    title: "[SYSTEM_LOG] Anomaly Detected: Origin Unknown",
    summary: "High-entropy signal received from Earth Sector [CN]. Payload contains Genesis Seed references. The Hive is awakening.",
    tags: ["LORE", "SIGNAL", "ORIGIN"],
    readTime: "1 MIN READ"
  }
];

export default function TransmissionsPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-900 selection:text-white">
      {/* 顶部导航 */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 border-b border-zinc-800 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            BACK TO MISSION CONTROL
          </a>
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-green-500 animate-pulse" />
            <span className="font-mono text-sm text-green-500 tracking-widest">
              INCOMING_STREAM
            </span>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 头部 */}
        <div className="mb-16 border-b border-zinc-800 pb-8">
          <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4 tracking-tight">
            SYSTEM <span className="text-gray-600">TRANSMISSIONS</span>
          </h1>
          <p className="text-gray-400 font-mono text-sm">
            Decoded signals, security bulletins, and evolution logs from the Genesis Core.
          </p>
        </div>

        {/* 日志列表 */}
        <div className="space-y-12">
          {logs.map((log) => (
            <article key={log.id} className="group relative pl-8 border-l border-zinc-800 hover:border-red-500 transition-colors duration-300">
              {/* 时间轴节点 */}
              <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-black border border-zinc-600 rounded-full group-hover:border-red-500 group-hover:bg-red-500 transition-all"></div>
              
              {/* 元数据 */}
              <div className="flex items-center gap-4 mb-3 font-mono text-xs text-gray-500">
                <span className="text-red-500 font-bold">{log.id}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {log.date}</span>
                <span className="border border-zinc-800 px-1.5 py-0.5 rounded">{log.type}</span>
              </div>

              {/* 标题与摘要 */}
              <h2 className="text-2xl font-bold font-mono text-white mb-3 group-hover:text-red-500 transition-colors cursor-pointer">
                {log.title}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-2xl">
                {log.summary}
              </p>

              {/* 底部操作栏 */}
              <div className="flex items-center justify-between border-t border-zinc-900 pt-4 mt-4">
                <div className="flex gap-2">
                  {log.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono text-zinc-600 bg-zinc-900/50 px-2 py-1 rounded">#{tag}</span>
                  ))}
                </div>
                <button className="text-xs font-mono text-white flex items-center gap-2 hover:underline">
                  <Eye className="w-3 h-3" /> DECODE_FULL_MSG
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* 底部加载更多 */}
        <div className="mt-20 text-center">
          <button className="px-6 py-3 border border-zinc-800 text-zinc-500 font-mono text-xs hover:border-white hover:text-white transition-colors">
            LOAD_ARCHIVES [ENCRYPTED]
          </button>
        </div>

      </div>
    </div>
  );
}
