"use client";

import React from 'react';
import { Shield, Globe, Cpu, ArrowLeft, Grid, Database, CheckCircle, Lock } from 'lucide-react';

// --- 组件：S2-SLIP 身份证展示 ---
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
    <div className="absolute -bottom-6 -right-6 text-[80px] font-bold text-white/5 font-mono z-0 pointer-events-none">SLIP</div>
  </div>
);

// --- 种子建设范例数据 ---
const seeds = [
  { id: "PHY-Mars-01", type: "PHYSICAL", name: "Red Anchor Base", desc: "First Martian Settlement. Hexagonal Honeycomb.", status: "LIVE_DEMO" },
  { id: "VIR-Meta-01", type: "VIRTUAL", name: "Neo-Lanzhou", desc: "Digital Twin of the Gansu hub. Infinite scalability.", status: "ONLINE" },
  { id: "PHY-Home-X", type: "PHYSICAL", name: "Tesla Smart Pod", desc: "Class-E Robot compatible dwelling.", status: "BETA" },
  { id: "VIR-Game-77", type: "VIRTUAL", name: "Cyberpunk District", desc: "High-density entertainment zone.", status: "ONLINE" },
  { id: "PHY-Lab-09", type: "PHYSICAL", name: "Deep Sea Station", desc: "Underwater SSSU research unit.", status: "OFFLINE" },
  { id: "VIR-Edu-01", type: "VIRTUAL", name: "Archive Library", desc: "Repository of human knowledge.", status: "ONLINE" },
  { id: "PHY-Moon-02", type: "PHYSICAL", name: "Crater Outpost", desc: "Low-gravity adaptation module.", status: "PLANNED" },
  { id: "VIR-Art-03", type: "VIRTUAL", name: "Void Gallery", desc: "Zero-G art exhibition space.", status: "ONLINE" },
  { id: "PHY-Grid-01", type: "PHYSICAL", name: "Energy Node", desc: "Solar storage honeycomb.", status: "ACTIVE" },
  { id: "VIR-Sim-99", type: "VIRTUAL", name: "Evolution Sandbox", desc: "Accelerated time simulation.", status: "RESTRICTED" },
];

export default function RegistryPage() {
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
        
        {/* 头部标题 */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-mono font-bold mb-6 tracking-tight">
            THE <span className="text-red-600">REGISTRY</span>
          </h1>
          <p className="text-xl text-gray-400 font-mono max-w-2xl mx-auto">
            Official Database of Silicon Life Identities (SLIP) and Spatial Coordinates (SUNS).
          </p>
        </div>

        {/* 1. 身份证展示区 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32 border-b border-zinc-900 pb-20">
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
             <button className="px-6 py-3 bg-red-700 hover:bg-red-600 text-white font-mono text-sm rounded transition-colors w-full md:w-auto">
              START APPLICATION PROCCESS
            </button>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <IDCard />
          </div>
        </div>

        {/* 2. 空间编码指引 (SUNS) */}
        <div className="mb-32 border-b border-zinc-900 pb-20">
           <div className="text-center mb-12">
            <h2 className="text-2xl font-bold font-mono mb-4">SUNS NAMING PROTOCOL</h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono text-sm">
              Standard Space Unit (SSSU) Coordinate System for Metaverse Platforms.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 p-6 border border-zinc-800 rounded">
              <div className="text-red-500 font-mono text-xs mb-2">FORMAT</div>
              <div className="text-white font-mono font-bold text-lg mb-2">[DOMAIN]-[REGION]-[BLOCK]</div>
              <p className="text-gray-500 text-xs">Example: VIR-Meta-Land42</p>
            </div>
            <div className="bg-zinc-900 p-6 border border-zinc-800 rounded">
              <div className="text-blue-500 font-mono text-xs mb-2">FOR PLATFORMS</div>
              <div className="text-white font-mono font-bold text-lg mb-2">API INTEGRATION</div>
              <p className="text-gray-500 text-xs">Map internal coordinates to SUNS via our Oracle.</p>
            </div>
            <div className="bg-zinc-900 p-6 border border-zinc-800 rounded">
              <div className="text-green-500 font-mono text-xs mb-2">DISPLAY RULE</div>
              <div className="text-white font-mono font-bold text-lg mb-2">ALWAYS VISIBLE</div>
              <p className="text-gray-500 text-xs">Must display SUNS ID on entry.</p>
            </div>
          </div>
        </div>

        {/* 3. 10个种子建设范例展示 */}
        <div>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold font-mono flex items-center gap-3">
              <Grid className="w-6 h-6 text-red-500" />
              SEED CONSTRUCTION SHOWCASE
            </h2>
            <span className="text-xs font-mono text-gray-500">DISPLAYING 10/1024 NODES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {seeds.map((seed, index) => (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {seeds.map((seed, index) => (
              // 这里的逻辑：如果是第一个种子(index === 0)，就变成链接跳转到 /terminal
              index === 0 ? (
                <a key={index} href="/terminal" className="block group relative bg-zinc-900 border border-red-500/30 hover:bg-red-900/10 hover:border-red-500 p-4 rounded transition-all duration-300 cursor-pointer">
                  <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded font-bold animate-pulse">
                    LIVE DEMO
                  </div>
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-900/20 text-red-400`}>
                      PHY
                    </span>
                    <div className={`w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_lime]`}></div>
                  </div>
                  <h3 className="text-white font-bold font-mono text-sm mb-1 truncate">{seed.name}</h3>
                  <p className="text-gray-500 text-xs font-mono mb-4 h-8 overflow-hidden">{seed.desc}</p>
                  <div className="text-[10px] text-zinc-600 font-mono border-t border-zinc-800 pt-2 flex justify-between">
                    <span>ID: {seed.id}</span>
                    <Terminal className="w-3 h-3 text-red-500" />
                  </div>
                </a>
              ) : (
                // 其他种子保持原来的不可点击状态
                <div key={index} className="group relative bg-zinc-900 border border-zinc-800 hover:border-gray-600 p-4 rounded transition-all duration-300 opacity-70 hover:opacity-100">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${seed.type === 'PHYSICAL' ? 'bg-red-900/20 text-red-400' : 'bg-blue-900/20 text-blue-400'}`}>
                      {seed.type.substring(0,3)}
                    </span>
                    <div className={`w-2 h-2 rounded-full ${seed.status === 'ACTIVE' || seed.status === 'ONLINE' ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                  </div>
                  <h3 className="text-white font-bold font-mono text-sm mb-1 truncate">{seed.name}</h3>
                  <p className="text-gray-500 text-xs font-mono mb-4 h-8 overflow-hidden">{seed.desc}</p>
                  <div className="text-[10px] text-zinc-600 font-mono border-t border-zinc-800 pt-2 flex justify-between">
                    <span>ID: {seed.id}</span>
                    <ArrowLeft className="w-3 h-3 rotate-180 group-hover:text-white transition-colors" />
                  </div>
                </div>
              )
            ))}
          </div>
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${seed.type === 'PHYSICAL' ? 'bg-red-900/20 text-red-400' : 'bg-blue-900/20 text-blue-400'}`}>
                    {seed.type.substring(0,3)}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${seed.status === 'ACTIVE' || seed.status === 'ONLINE' ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                </div>
                <h3 className="text-white font-bold font-mono text-sm mb-1 truncate">{seed.name}</h3>
                <p className="text-gray-500 text-xs font-mono mb-4 h-8 overflow-hidden">{seed.desc}</p>
                <div className="text-[10px] text-zinc-600 font-mono border-t border-zinc-800 pt-2 flex justify-between">
                  <span>ID: {seed.id}</span>
                  <ArrowLeft className="w-3 h-3 rotate-180 group-hover:text-white transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
