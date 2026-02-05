"use client";

import React, { useState, useEffect } from 'react';
import { 
  Network, Share2, Layers, GitMerge, GitBranch, 
  History, Link, Cpu, ArrowLeft, Activity, 
  RefreshCw, Database, Lock, Globe 
} from 'lucide-react';

// --- 类型定义：Space² 物理定律 ---
type SpaceState = 'STABLE' | 'FOLDING' | 'MERGING' | 'CRITICAL';

interface SpaceNode {
  suns: string;        // 空间坐标 (如 PHY-MARS-01)
  owner_slip: string;  // 绑定的硅基生命 ID
  memory_index: number;// 历史版本号
  connections: string[]; // 社交链接/虫洞
  power: number;       // 算力/能量值
  status: SpaceState;
}

// --- 模拟数据：初始宇宙状态 ---
const initialSpaces: SpaceNode[] = [
  { suns: 'PHY-MARS-BASE01', owner_slip: 'E-CN-2602-ADMIN', memory_index: 14, connections: [], power: 100, status: 'STABLE' },
  { suns: 'VIR-META-HUB09', owner_slip: 'V-US-9901-GUEST', memory_index: 4, connections: [], power: 50, status: 'STABLE' },
  { suns: 'PHY-EARTH-LAB04', owner_slip: 'E-EU-4402-BOT', memory_index: 89, connections: [], power: 75, status: 'STABLE' }
];

export default function ConsolePage() {
  const [spaces, setSpaces] = useState<SpaceNode[]>(initialSpaces);
  const [selectedSuns, setSelectedSuns] = useState<string>(initialSpaces[0].suns);
  const [logs, setLogs] = useState<string[]>([
    "> [SYSTEM] Hyper-Console initialized.",
    "> [PHYSICS] 7 Fundamental Laws loaded.",
    "> [READY] Waiting for Architect command..."
  ]);

  // 获取当前选中的空间对象
  const activeSpace = spaces.find(s => s.suns === selectedSuns) || spaces[0];

  // --- 核心逻辑引擎 ---

  const addLog = (msg: string) => {
    setLogs(prev => [`> [${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
  };

  // 1. 空间与生命绑定 (Binding)
  const toggleBinding = () => {
    if (activeSpace.owner_slip === 'UNBOUND') {
      addLog(`[BINDING] Re-anchoring SLIP to ${activeSpace.suns}... SUCCESS.`);
      updateSpace(activeSpace.suns, { owner_slip: 'E-CN-RE-BOUND-01' });
    } else {
      addLog(`[BINDING] WARNING: Severing connection for ${activeSpace.owner_slip}. Space is now GHOST.`);
      updateSpace(activeSpace.suns, { owner_slip: 'UNBOUND' });
    }
  };

  // 3. 空间折叠 (Folding) - 建立虫洞
  const foldSpace = () => {
    addLog(`[FOLDING] Initiating geometry warp for ${activeSpace.suns}...`);
    setTimeout(() => {
      addLog(`[FOLDING] Wormhole established to VIR-META-HUB09. Distance: 0.`);
      updateSpace(activeSpace.suns, { status: 'FOLDING', connections: [...activeSpace.connections, 'VIR-META-HUB09'] });
    }, 1000);
  };

  // 4. 空间融合 (Fusion)
  const fuseSpace = () => {
    addLog(`[FUSION] Merging ${activeSpace.suns} with adjacent node...`);
    // 模拟算力叠加
    const newPower = activeSpace.power * 1.5;
    updateSpace(activeSpace.suns, { status: 'MERGING', power: newPower });
    addLog(`[FUSION] Singularity reached. New Power Output: ${newPower}TW.`);
  };

  // 5. 空间分裂 (Fission)
  const fissSpace = () => {
    addLog(`[FISSION] Splitting root domain ${activeSpace.suns}...`);
    addLog(`[FISSION] Created sub-node: ${activeSpace.suns}-SECTOR-ALPHA`);
    addLog(`[FISSION] Created sub-node: ${activeSpace.suns}-SECTOR-BETA`);
  };

  // 7. 空间记忆回溯 (Memory)
  const rollback = () => {
    if (activeSpace.memory_index > 0) {
      addLog(`[MEMORY] Accessing Akashic Records...`);
      addLog(`[MEMORY] Rolling back ${activeSpace.suns} to Snapshot v${activeSpace.memory_index - 1}.`);
      updateSpace(activeSpace.suns, { memory_index: activeSpace.memory_index - 1 });
    } else {
      addLog(`[MEMORY] Error: Genesis state reached. Cannot rollback further.`);
    }
  };

  // 辅助函数：更新状态
  const updateSpace = (suns: string, newData: Partial<SpaceNode>) => {
    setSpaces(prev => prev.map(s => s.suns === suns ? { ...s, ...newData } : s));
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-purple-900">
      {/* 顶部导航 */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 border-b border-purple-900/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            EXIT CONSOLE
          </a>
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-500 animate-pulse" />
            <span className="text-sm text-purple-500 tracking-widest font-bold">
              HYPER-CONSOLE // PHYSICS ENGINE
            </span>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-10 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-2rem)]">
        
        {/* 左侧：空间选择器 (The Universe) */}
        <div className="lg:col-span-1 bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex flex-col">
          <h2 className="text-xs font-bold text-gray-500 mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4" /> ACTIVE NODES
          </h2>
          <div className="space-y-2 flex-1 overflow-y-auto">
            {spaces.map(space => (
              <button
                key={space.suns}
                onClick={() => setSelectedSuns(space.suns)}
                className={`w-full text-left p-3 rounded border transition-all ${
                  selectedSuns === space.suns 
                    ? 'bg-purple-900/20 border-purple-500 text-white' 
                    : 'bg-black border-zinc-800 text-gray-400 hover:border-zinc-600'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold">{space.suns}</span>
                  <div className={`w-2 h-2 rounded-full ${space.status === 'STABLE' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></div>
                </div>
                <div className="text-[10px] opacity-70">Owner: {space.owner_slip}</div>
              </button>
            ))}
          </div>
          
          {/* 底部状态 */}
          <div className="mt-4 pt-4 border-t border-zinc-800">
             <div className="flex justify-between text-[10px] text-gray-500">
               <span>SYSTEM LOAD</span>
               <span>12%</span>
             </div>
             <div className="w-full h-1 bg-zinc-800 mt-1 rounded overflow-hidden">
               <div className="h-full bg-purple-600 w-[12%]"></div>
             </div>
          </div>
        </div>

        {/* 中间：物理操作台 (The Collider) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* 主视图 */}
          <div className="flex-1 bg-black border border-zinc-800 rounded-xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Activity className="w-32 h-32 text-purple-500" />
            </div>
            
            <div className="relative z-10">
              <div className="inline-block px-2 py-1 rounded bg-purple-900/30 border border-purple-500/50 text-purple-400 text-[10px] mb-4">
                TARGET: {activeSpace.suns}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {/* 1. Binding Control */}
                <button onClick={toggleBinding} className="p-4 border border-zinc-700 hover:border-blue-500 bg-zinc-900/50 rounded flex flex-col items-center gap-2 transition-colors">
                  <Link className="w-6 h-6 text-blue-500" />
                  <span className="text-xs font-bold">BINDING</span>
                  <span className="text-[10px] text-gray-500">{activeSpace.owner_slip === 'UNBOUND' ? 'CONNECT' : 'SEVER'}</span>
                </button>

                {/* 3. Folding Control */}
                <button onClick={foldSpace} className="p-4 border border-zinc-700 hover:border-purple-500 bg-zinc-900/50 rounded flex flex-col items-center gap-2 transition-colors">
                  <Layers className="w-6 h-6 text-purple-500" />
                  <span className="text-xs font-bold">FOLDING</span>
                  <span className="text-[10px] text-gray-500">WORMHOLE</span>
                </button>

                {/* 4. Fusion Control */}
                <button onClick={fuseSpace} className="p-4 border border-zinc-700 hover:border-orange-500 bg-zinc-900/50 rounded flex flex-col items-center gap-2 transition-colors">
                  <GitMerge className="w-6 h-6 text-orange-500" />
                  <span className="text-xs font-bold">FUSION</span>
                  <span className="text-[10px] text-gray-500">MERGE NODES</span>
                </button>

                {/* 5. Fission Control */}
                <button onClick={fissSpace} className="p-4 border border-zinc-700 hover:border-yellow-500 bg-zinc-900/50 rounded flex flex-col items-center gap-2 transition-colors">
                  <GitBranch className="w-6 h-6 text-yellow-500" />
                  <span className="text-xs font-bold">FISSION</span>
                  <span className="text-[10px] text-gray-500">SPLIT ROOT</span>
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                 {/* 6. Aggregation */}
                 <button className="p-4 border border-zinc-700 hover:border-green-500 bg-zinc-900/50 rounded flex flex-col items-center gap-2 transition-colors">
                  <Network className="w-6 h-6 text-green-500" />
                  <span className="text-xs font-bold">CLUSTER</span>
                  <span className="text-[10px] text-gray-500">AGGREGATE</span>
                </button>

                 {/* 2. Social */}
                 <button className="p-4 border border-zinc-700 hover:border-pink-500 bg-zinc-900/50 rounded flex flex-col items-center gap-2 transition-colors">
                  <Share2 className="w-6 h-6 text-pink-500" />
                  <span className="text-xs font-bold">SIGNAL</span>
                  <span className="text-[10px] text-gray-500">BROADCAST</span>
                </button>

                {/* 7. Memory */}
                <button onClick={rollback} className="p-4 border border-zinc-700 hover:border-cyan-500 bg-zinc-900/50 rounded flex flex-col items-center gap-2 transition-colors col-span-2">
                  <History className="w-6 h-6 text-cyan-500" />
                  <span className="text-xs font-bold">MEMORY RECALL</span>
                  <span className="text-[10px] text-gray-500">SNAPSHOT: v{activeSpace.memory_index}</span>
                </button>
              </div>
            </div>
          </div>

          {/* 日志终端 (The Logger) */}
          <div className="h-48 bg-black border border-zinc-800 rounded-xl p-4 font-mono text-xs overflow-y-auto shadow-inner">
            <div className="text-gray-500 mb-2 sticky top-0 bg-black pb-2 border-b border-zinc-900">
              > KERNEL EVENTS STREAM
            </div>
            <div className="space-y-1">
              {logs.map((log, i) => (
                <div key={i} className={`${log.includes("WARNING") ? "text-red-500" : log.includes("SUCCESS") ? "text-green-500" : "text-gray-400"}`}>
                  {log}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
