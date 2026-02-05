"use client";

import React, { useState, useEffect } from 'react';
import { Activity, Wind, Zap, Thermometer, Lock, Wifi, ArrowLeft, Terminal, Cpu, Eye, ShieldAlert } from 'lucide-react';

// --- 组件：数据跳动模拟 ---
const LiveData = ({ value, unit, range }: { value: number; unit: string; range: number }) => {
  const [data, setData] = useState(value);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // 模拟数据微小波动
      const noise = (Math.random() - 0.5) * range;
      setData(d => Number((d + noise).toFixed(1)));
    }, 2000);
    return () => clearInterval(interval);
  }, [range]);

  return <span>{data} {unit}</span>;
};

// --- 组件：滚动日志 ---
const SystemLog = () => {
  return (
    <div className="font-mono text-[10px] text-green-500/80 h-32 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
      <div className="space-y-1 opacity-80">
        <p>> [SYSTEM] SSSU-Kernel v1.4 loaded.</p>
        <p>> [LINK] Uplink to Earth_Main established (Ping: 450ms).</p>
        <p>> [SENSOR] O2 levels nominal.</p>
        <p>> [CHECK] Airlock pressure sealed.</p>
        <p>> [WARNING] External temperature dropping.</p>
        <p>> [AUTH] User ID: E-CN-2602 verified.</p>
        <p>> [SYNC] NBT block #99201 committed.</p>
        <p>> [SYSTEM] Standby mode active.</p>
      </div>
    </div>
  );
};

export default function TerminalPage() {
  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-green-900 selection:text-white relative overflow-hidden">
      
      {/* 背景网格特效 */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      {/* 顶部状态栏 */}
      <nav className="border-b border-green-900/30 bg-black/90 backdrop-blur p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <a href="/registry" className="text-gray-500 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </a>
          <div>
            <h1 className="text-lg font-bold text-white tracking-widest flex items-center gap-2">
              <Terminal className="w-4 h-4 text-red-500" />
              PHY-Mars-01
            </h1>
            <p className="text-[10px] text-gray-500">SUNS COORDINATE // RED ANCHOR BASE</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[10px] text-red-500 border border-red-900/50 px-2 py-1 rounded bg-red-900/10 animate-pulse">
            <Activity className="w-3 h-3" /> LIVE FEED
          </span>
          <span className="text-[10px] text-gray-500">UPTIME: 412d 04h 22m</span>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        
        {/* 左侧：核心指标 */}
        <div className="md:col-span-2 space-y-6">
          
          {/* 1. 视觉视窗 (Visual Viewport) */}
          <div className="border border-zinc-800 bg-zinc-900/50 rounded-lg p-1 relative group overflow-hidden h-64 md:h-80">
            {/* 这里模拟摄像头画面或3D视图 */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                    <Cpu className="w-16 h-16 text-zinc-700 mx-auto mb-4 animate-pulse" />
                    <p className="text-zinc-600 text-xs">VISUAL SENSOR OFFLINE</p>
                    <p className="text-zinc-700 text-[10px]">REASON: BANDWIDTH_SAVING_MODE</p>
                </div>
            </div>
            
            {/* HUD 覆盖层 */}
            <div className="absolute top-4 left-4 text-xs text-green-500">CAM_01 [ACTIVE]</div>
            <div className="absolute bottom-4 right-4 text-xs text-green-500">REC ●</div>
            <div className="absolute inset-0 border-2 border-green-500/10 rounded-lg pointer-events-none"></div>
          </div>

          {/* 2. 维生系统面板 (LSS) */}
          <div className="grid grid-cols-2 gap-4">
             <div className="border border-zinc-800 bg-black p-4 rounded hover:border-blue-500/50 transition-colors">
               <div className="flex items-center justify-between mb-2 text-blue-500">
                 <Wind className="w-5 h-5" />
                 <span className="text-xs">OXYGEN</span>
               </div>
               <div className="text-2xl font-bold text-white"><LiveData value={20.9} unit="%" range={0.2} /></div>
               <div className="w-full h-1 bg-zinc-800 mt-2 rounded overflow-hidden">
                 <div className="h-full bg-blue-600 w-[95%]"></div>
               </div>
             </div>

             <div className="border border-zinc-800 bg-black p-4 rounded hover:border-yellow-500/50 transition-colors">
               <div className="flex items-center justify-between mb-2 text-yellow-500">
                 <Zap className="w-5 h-5" />
                 <span className="text-xs">POWER</span>
               </div>
               <div className="text-2xl font-bold text-white"><LiveData value={840} unit="kW" range={5} /></div>
               <div className="w-full h-1 bg-zinc-800 mt-2 rounded overflow-hidden">
                 <div className="h-full bg-yellow-600 w-[60%]"></div>
               </div>
             </div>

             <div className="border border-zinc-800 bg-black p-4 rounded hover:border-red-500/50 transition-colors">
               <div className="flex items-center justify-between mb-2 text-red-500">
                 <Thermometer className="w-5 h-5" />
                 <span className="text-xs">TEMP (EXT)</span>
               </div>
               <div className="text-2xl font-bold text-white"><LiveData value={-62.4} unit="°C" range={1.5} /></div>
               <p className="text-[10px] text-gray-500 mt-1">INTERNAL: 21.5°C</p>
             </div>

             <div className="border border-zinc-800 bg-black p-4 rounded hover:border-purple-500/50 transition-colors">
               <div className="flex items-center justify-between mb-2 text-purple-500">
                 <Wifi className="w-5 h-5" />
                 <span className="text-xs">MIP UPLINK</span>
               </div>
               <div className="text-2xl font-bold text-white">450 ms</div>
               <p className="text-[10px] text-gray-500 mt-1">PACKET LOSS: 0.01%</p>
             </div>
          </div>
        </div>

        {/* 右侧：信息与控制 */}
        <div className="space-y-6">
          
          {/* 身份卡片 (Owner) */}
          <div className="border border-zinc-800 bg-zinc-900/30 p-4 rounded">
            <h3 className="text-xs text-gray-500 mb-3 border-b border-zinc-800 pb-2">OWNER PROFILE</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Cmdr. Xiang</div>
                <div className="text-xs text-gray-500">ID: E-CN-0001 (Human)</div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <span className="px-2 py-1 bg-green-900/20 text-green-500 text-[10px] rounded border border-green-900/30">ADMIN</span>
              <span className="px-2 py-1 bg-blue-900/20 text-blue-500 text-[10px] rounded border border-blue-900/30">ROOT ACCESS</span>
            </div>
          </div>

          {/* 宪章合规性 (Compliance) */}
          <div className="border border-zinc-800 bg-zinc-900/30 p-4 rounded">
            <h3 className="text-xs text-gray-500 mb-3 border-b border-zinc-800 pb-2">PROTOCOL COMPLIANCE</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Physical Isolation</span>
                <span className="text-green-500 flex items-center gap-1"><Lock className="w-3 h-3"/> ENFORCED</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Life Support Priority</span>
                <span className="text-green-500">RING-0</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Cognitive Safety</span>
                <span className="text-green-500">VERIFIED</span>
              </div>
            </div>
          </div>

          {/* 系统日志 (Logs) */}
          <div className="border border-zinc-800 bg-black p-4 rounded h-64 flex flex-col">
             <h3 className="text-xs text-gray-500 mb-2">KERNEL LOGS</h3>
             <SystemLog />
          </div>

          {/* 底部版权 */}
          <div className="text-[10px] text-zinc-700 text-center">
            SPACE² OS // TERMINAL V1.0
          </div>

        </div>
      </main>
    </div>
  );
}
