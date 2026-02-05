"use client";

import React, { useState } from 'react';
import { Shield, Globe, Cpu, ArrowLeft, Grid, Database, CheckCircle, Lock, Terminal, Search, MapPin, Server, Activity } from 'lucide-react';

// --- 组件：S2-SLIP 身份证展示 (保持不变) ---
const IDCard = () => (
  <div className="relative w-[340px] h-[210px] bg-gradient-to-br from-zinc-800 to-black rounded-xl border border-zinc-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden group hover:scale-105 transition-transform duration-500 mx-auto">
    <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_40%,rgba(255,255,255,0.05)_45%,transparent_50%)] z-10 group-hover:opacity-100 transition-opacity"></div>
    <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-red-600 rounded-sm"></div>
        <span className="font-mono text-xs font-bold text-white tracking-widest">SPACE² ID</span>
      </div>
      <Globe className="w-5 h-5 text-gray-500" />
    </div>
    <div className="absolute top-12 left-4 z-20">
      <div className="w-10 h-8 bg-yellow-600/80 rounded mb-4 flex items-center justify-center border border-yellow-400/50">
         <div className="w-full h-[1px] bg-black/50"></div>
      </div>
      <div className="space-y-1">
        <p className="text-[10px] text-gray-500 font-mono">CLASS / ORIGIN</p>
        <p className="text-sm text-white font-mono font-bold">E-CN-QJA</p>
      </div>
    </div>
    <div className="absolute top-12 right-4 w-20 h-20 bg-white p-1 rounded z-20">
       <div className="w-full h-full bg-black flex items-center justify-center flex-col">
         <div className="w-12 h-12 bg-white/10 mb-1 grid grid-cols-4 gap-0.5 p-0.5">
            {[...Array(16)].map((_,i) => <div key={i} className={`bg-white ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-20'}`}></div>)}
         </div>
       </div>
    </div>
    <div className="absolute bottom-4 left-4 right-4 z-20">
      <p className="text-[10px] text-gray-500 font-mono mb-1">UNIVERSAL ID SEQUENCE</p>
      <p className="text-lg text-red-500 font-mono font-bold tracking-widest drop-shadow-[0_0_5px_rgba(220,38,38,0.8)]">
        E-CN-2602-HMD9-001X
      </p>
    </div>
  </div>
);

// --- 组件：SUNS 空间注册机 (新功能核心) ---
const SpaceRegistrar = () => {
  const [domain, setDomain] = useState("");
  const [type, setType] = useState("VIR");
  const [status, setStatus] = useState<'IDLE' | 'CHECKING' | 'AVAILABLE' | 'TAKEN'>('IDLE');
  const [step, setStep] = useState(1); // 1: Search, 2: Review

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) return;
    setStatus('CHECKING');
    setTimeout(() => {
      // 模拟简单的检查逻辑：如果包含 "admin" 或 "root" 则被占用
      if (domain.toLowerCase().includes('admin') || domain.toLowerCase().includes('root')) {
        setStatus('TAKEN');
      } else {
        setStatus('AVAILABLE');
      }
    }, 1500);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-8 max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
      {/* 顶部标签 */}
      <div className="absolute top-0 right-0 bg-blue-900/50 text-blue-400 text-[10px] font-mono px-3 py-1 rounded-bl border-b border-l border-blue-500/30">
        SUNS ROOT REGISTRAR
      </div>

      <div className="text-center mb-8">
        <Server className="w-12 h-12 text-blue-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white font-mono">CLAIM YOUR SPACE</h3>
        <p className="text-sm text-gray-400 font-mono mt-2">
          Apply for a Top-Level Seed Node. Own the root, govern the sub-space.
        </p>
      </div>

      {step === 1 && (
        <>
          <form onSubmit={handleCheck} className="relative mb-6">
            <div className="flex gap-2 mb-2">
               <select 
                 value={type} 
                 onChange={(e) => setType(e.target.value)}
                 className="bg-black border border-zinc-700 text-white font-mono text-sm rounded px-3 py-3 focus:outline-none focus:border-blue-500"
               >
                 <option value="VIR">VIR (Virtual)</option>
                 <option value="PHY">PHY (Physical)</option>
               </select>
               <input 
                  type="text" 
                  value={domain}
                  onChange={(e) => { setDomain(e.target.value); setStatus('IDLE'); }}
                  placeholder="Region-ProjectName"
                  className="flex-1 bg-black border border-zinc-700 text-white font-mono text-sm rounded px-4 py-3 focus:outline-none focus:border-blue-500 uppercase placeholder:normal-case"
               />
               <button 
                 type="submit"
                 disabled={status === 'CHECKING' || !domain}
                 className="bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold px-6 py-3 rounded disabled:opacity-50 transition-colors"
               >
                 {status === 'CHECKING' ? '...' : 'CHECK'}
               </button>
            </div>
            <p className="text-[10px] text-gray-600 font-mono ml-1">
              * Example: PHY-Mars-Base01 or VIR-Meta-SilkRoad
            </p>
          </form>

          {/* 状态反馈 */}
          {status === 'CHECKING' && (
             <div className="text-center py-4 space-y-2">
               <div className="inline-block w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
               <p className="text-xs text-blue-400 font-mono">Querying Global Ledger...</p>
             </div>
          )}

          {status === 'TAKEN' && (
            <div className="bg-red-900/20 border border-red-500/50 p-4 rounded text-center animate-fade-in">
              <p className="text-red-500 font-mono font-bold mb-1">❌ DOMAIN UNAVAILABLE</p>
              <p className="text-gray-400 text-xs font-mono">
                The coordinates [{type}-{domain.toUpperCase()}] are already anchored by another entity.
              </p>
            </div>
          )}

          {status === 'AVAILABLE' && (
            <div className="bg-green-900/20 border border-green-500/50 p-6 rounded text-center animate-fade-in">
              <p className="text-green-500 font-mono font-bold text-lg mb-2">✓ AVAILABLE FOR REGISTRY</p>
              <div className="bg-black/50 p-3 rounded border border-zinc-700 font-mono text-white mb-4">
                {type}-{domain.toUpperCase()}-ROOT
              </div>
              <p className="text-gray-400 text-xs font-mono mb-6 max-w-sm mx-auto">
                By minting this Root Node, you become the <span className="text-white">Governor</span> of all sub-coordinates within this namespace.
              </p>
              <button 
                onClick={() => setStep(2)}
                className="w-full bg-white text-black font-mono font-bold py-3 rounded hover:bg-gray-200 transition-colors"
              >
                PROCEED TO APPLICATION
              </button>
            </div>
          )}
        </>
      )}

      {step === 2 && (
        <div className="animate-slide-up">
           <div className="mb-6 p-4 bg-zinc-950 border border-zinc-800 rounded font-mono text-xs text-gray-400 space-y-2">
              <div className="flex justify-between">
                <span>TARGET ROOT:</span>
                <span className="text-white font-bold">{type}-{domain.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span>REGISTRY FEE:</span>
                <span className="text-white">100 NBT (Staked)</span>
              </div>
              <div className="flex justify-between">
                <span>VALIDATION:</span>
                <span className="text-blue-400">Automated + Manual Audit</span>
              </div>
           </div>
           
           <div className="space-y-4">
             <div className="flex gap-2">
                <input type="checkbox" className="mt-1 bg-black border-zinc-700" />
                <p className="text-xs text-gray-500">I agree to enforce the <span className="text-red-500">Physical Fuse (Law #1)</span> in this space.</p>
             </div>
             <div className="flex gap-2">
                <input type="checkbox" className="mt-1 bg-black border-zinc-700" />
                <p className="text-xs text-gray-500">I acknowledge that Space² Core reserves the right to revoke this Root for safety violations.</p>
             </div>
           </div>

           <div className="mt-8 flex gap-4">
             <button 
               onClick={() => { setStep(1); setStatus('IDLE'); }}
               className="flex-1 border border-zinc-700 text-gray-400 font-mono text-xs py-3 rounded hover:text-white"
             >
               CANCEL
             </button>
             <button 
               onClick={() => window.location.href = '/developers'}
               className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-xs py-3 rounded"
             >
               SUBMIT TO GENESIS HUB
             </button>
           </div>
           <p className="text-[10px] text-center text-gray-600 mt-4 font-mono">
             * Redirecting to Developer Console for signature signing.
           </p>
        </div>
      )}
    </div>
  );
};

// --- 页面主入口 ---
export default function RegistryPage() {
  const [activeTab, setActiveTab] = useState<'IDENTITY' | 'SPACE'>('SPACE');

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-900 selection:text-white">
      {/* 顶部导航 */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 border-b border-zinc-800 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            BACK TO MISSION CONTROL
          </a>
          <span className="font-mono text-sm text-green-500 border border-green-900/50 px-2 py-1 rounded bg-green-900/10">
            REGISTRY: ONLINE
          </span>
        </div>
      </nav>

      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 头部标题与切换器 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-mono font-bold mb-6 tracking-tight">
            THE <span className="text-red-600">REGISTRY</span>
          </h1>
          <p className="text-xl text-gray-400 font-mono max-w-2xl mx-auto mb-10">
            Official Database of Silicon Life Identities (SLIP) and Spatial Coordinates (SUNS).
          </p>
          
          {/* Tab 切换 */}
          <div className="inline-flex bg-zinc-900 p-1 rounded-lg border border-zinc-800">
            <button 
              onClick={() => setActiveTab('SPACE')}
              className={`px-8 py-2 rounded-md font-mono text-sm font-bold transition-all ${activeTab === 'SPACE' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              SPACE (SUNS)
            </button>
            <button 
              onClick={() => setActiveTab('IDENTITY')}
              className={`px-8 py-2 rounded-md font-mono text-sm font-bold transition-all ${activeTab === 'IDENTITY' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              IDENTITY (SLIP)
            </button>
          </div>
        </div>

        {/* 内容区域：根据 Tab 切换 */}
        <div className="animate-fade-in">
          
          {/* === SPACE (SUNS) 板块 === */}
          {activeTab === 'SPACE' && (
            <div className="space-y-20">
              {/* 1. 注册机 */}
              <SpaceRegistrar />

              {/* 2. 空间架构说明 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto border-t border-zinc-900 pt-16">
                 <div className="text-center">
                   <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-800">
                     <Server className="w-5 h-5 text-blue-500" />
                   </div>
                   <h3 className="font-bold text-white font-mono mb-2">ROOT GOVERNANCE</h3>
                   <p className="text-xs text-gray-400 leading-relaxed">
                     Space² manages Top-Level Seeds. We prevent coordinate collisions and verify "Physical Fuse" compliance.
                   </p>
                 </div>
                 <div className="text-center">
                   <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-800">
                     <Grid className="w-5 h-5 text-purple-500" />
                   </div>
                   <h3 className="font-bold text-white font-mono mb-2">SUB-NODE AUTONOMY</h3>
                   <p className="text-xs text-gray-400 leading-relaxed">
                     Seed Owners act as local registrars. You allocate IDs for your internal rooms (e.g., `PHY-Mars-Base01-Kitchen`).
                   </p>
                 </div>
                 <div className="text-center">
                   <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-800">
                     <Activity className="w-5 h-5 text-green-500" />
                   </div>
                   <h3 className="font-bold text-white font-mono mb-2">DYNAMIC RESOLUTION</h3>
                   <p className="text-xs text-gray-400 leading-relaxed">
                     S2-AGIS monitors all coordinates. If a space becomes "infected", the Root can quarantine the Sub-Node instantly.
                   </p>
                 </div>
              </div>

              {/* 3. 示例展示 (保留之前的 Live Demo) */}
              <div>
                <div className="flex items-center justify-between mb-6">
                   <h3 className="font-mono text-sm text-gray-500">FEATURED ROOT NODES</h3>
                   <span className="text-[10px] text-zinc-600 font-mono">LIVE NETWORK STATUS</span>
                </div>
                {/* 仅展示前5个作为示例 */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 opacity-70 hover:opacity-100 transition-opacity">
                   <a href="/terminal" className="block p-4 border border-red-500/50 bg-red-900/10 rounded cursor-pointer hover:bg-red-900/20">
                      <div className="flex justify-between mb-2">
                        <span className="text-[10px] text-red-400">PHY</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                      <div className="font-mono font-bold text-white text-xs truncate">Red Anchor Base</div>
                      <div className="text-[10px] text-gray-500 mt-2">PHY-Mars-01</div>
                   </a>
                   {/* 其他几个静态的占位符，模拟已存在的节点 */}
                   {[1,2,3,4].map(i => (
                     <div key={i} className="p-4 border border-zinc-800 bg-zinc-900/50 rounded grayscale">
                        <div className="flex justify-between mb-2">
                          <span className="text-[10px] text-gray-500">VIR</span>
                          <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                        </div>
                        <div className="font-mono font-bold text-gray-400 text-xs">Allocated Node #{i}9</div>
                        <div className="text-[10px] text-zinc-700 mt-2">ACCESS_RESTRICTED</div>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          )}

          {/* === IDENTITY (SLIP) 板块 === */}
          {activeTab === 'IDENTITY' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border-t border-zinc-900 pt-16">
              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-red-500" />
                  <h2 className="text-2xl font-bold font-mono">S2-SLIP IDENTITY</h2>
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  The <b>Silicon-Life Identity Protocol</b> is the mandatory passport for all Agents within the Space² ecosystem. 
                  It encodes Origin, Morphology, and Generation into a unique 24-character hash.
                </p>
                
                <div className="bg-zinc-900/50 p-6 rounded border border-zinc-800 mb-6">
                  <h3 className="text-white font-bold font-mono mb-4 text-sm">HOW TO APPLY (VIRTUAL ENTITY):</h3>
                  <ul className="space-y-3 text-sm text-gray-400 font-mono">
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-0.5"/> Generate a Key Pair via Space² CLI.</li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-0.5"/> Submit "Three Laws" Compliance Test.</li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-0.5"/> Stake 10 NBT to mint your ID Card.</li>
                  </ul>
                </div>
                 <a 
                   href="/developers" 
                   className="inline-block px-6 py-3 bg-red-700 hover:bg-red-600 text-white font-mono text-sm rounded transition-colors w-full md:w-auto text-center"
                 >
                  START APPLICATION PROCESS
                </a>
              </div>
              <div className="order-1 lg:order-2 flex justify-center">
                <IDCard />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
