"use client";
export const dynamic = 'force-dynamic';
import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';// 引入真实的数据库连接
import { Shield, Globe, Cpu, ArrowLeft, Grid, Server, Activity, CheckCircle, AlertTriangle } from 'lucide-react';

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

// --- 组件：SUNS 真实空间注册机 ---
const SpaceRegistrar = () => {
  const [domain, setDomain] = useState("");
  const [type, setType] = useState("VIR");
  const [status, setStatus] = useState<'IDLE' | 'CHECKING' | 'AVAILABLE' | 'TAKEN' | 'ERROR'>('IDLE');
  const [errorMsg, setErrorMsg] = useState("");
  const [step, setStep] = useState(1);
  const [regStatus, setRegStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS'>('IDLE');

  // 1. 真实查询函数
  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) return;
    setStatus('CHECKING');
    
    const fullSuns = `${type}-${domain.toUpperCase()}-ROOT`;

    try {
      // 查询 Supabase 数据库
      const { data, error } = await supabase
        .from('spaces')
        .select('suns_id')
        .eq('suns_id', fullSuns)
        .single();

      if (error && error.code !== 'PGRST116') { 
        // PGRST116 意思是没找到数据(好事)，其他错误才是真错误
        console.error("DB Error:", error);
        setStatus('ERROR');
        return;
      }

      if (data) {
        setStatus('TAKEN'); // 查到了，说明被占用了
      } else {
        setStatus('AVAILABLE'); // 没查到，说明可用
      }
} catch (err: any) {
  console.error("Network Error:", err);
  setErrorMsg(err.message || JSON.stringify(err)); // 👈 抓住具体错误
  setStatus('ERROR');
}
  };

  // 2. 真实注册函数
  const handleRegister = async () => {
    setRegStatus('SUBMITTING');
    const fullSuns = `${type}-${domain.toUpperCase()}-ROOT`;

    try {
      // 插入数据到 Supabase
      const { error } = await supabase
        .from('spaces')
        .insert([
          { 
            suns_id: fullSuns, 
            type: type,
            status: 'ACTIVE'
            // 注意：因为我们现在还没做强制登录，所以 owner_id 暂时留空或由后端处理
            // 在生产环境中，这里会自动读取当前登录用户的 ID
          }
        ]);

      if (error) {
        console.error("Insert Error:", error);
        alert("Registration Failed: " + error.message);
        setRegStatus('IDLE');
      } else {
        setRegStatus('SUCCESS');
      }
    } catch (err) {
       alert("System Error");
       setRegStatus('IDLE');
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-8 max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-blue-900/50 text-blue-400 text-[10px] font-mono px-3 py-1 rounded-bl border-b border-l border-blue-500/30">
        SUNS LIVE DATABASE
      </div>

      <div className="text-center mb-8">
        <Server className="w-12 h-12 text-blue-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white font-mono">CLAIM YOUR SPACE</h3>
        <p className="text-sm text-gray-400 font-mono mt-2">
          Apply for a Top-Level Seed Node. Recorded on Planetary Ledger.
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
                 {status === 'CHECKING' ? '...' : 'CHECK AVAILABILITY'}
               </button>
            </div>
          </form>

          {/* 状态反馈 */}
          {status === 'CHECKING' && (
             <div className="text-center py-4 space-y-2">
               <div className="inline-block w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
               <p className="text-xs text-blue-400 font-mono">Querying Supabase Node [Singapore]...</p>
             </div>
          )}

          {status === 'ERROR' && (
             <div className="text-center py-4 text-red-500 text-xs font-mono">
               DATABASE CONNECTION FAILED. PLEASE CHECK .ENV.LOCAL CONFIG.
             </div>
          )}

          {status === 'TAKEN' && (
            <div className="bg-red-900/20 border border-red-500/50 p-4 rounded text-center animate-fade-in">
              <p className="text-red-500 font-mono font-bold mb-1">❌ DOMAIN UNAVAILABLE</p>
              <p className="text-gray-400 text-xs font-mono">
                Coordinates [{type}-{domain.toUpperCase()}-ROOT] are already anchored.
              </p>
            </div>
          )}

          {status === 'AVAILABLE' && (
            <div className="bg-green-900/20 border border-green-500/50 p-6 rounded text-center animate-fade-in">
              <p className="text-green-500 font-mono font-bold text-lg mb-2">✓ AVAILABLE FOR REGISTRY</p>
              <div className="bg-black/50 p-3 rounded border border-zinc-700 font-mono text-white mb-4">
                {type}-{domain.toUpperCase()}-ROOT
              </div>
              <button 
                onClick={() => setStep(2)}
                className="w-full bg-white text-black font-mono font-bold py-3 rounded hover:bg-gray-200 transition-colors"
              >
                PROCEED TO CLAIM
              </button>
            </div>
          )}
        </>
      )}

      {step === 2 && regStatus !== 'SUCCESS' && (
        <div className="animate-slide-up">
           <div className="mb-6 p-4 bg-zinc-950 border border-zinc-800 rounded font-mono text-xs text-gray-400 space-y-2">
              <div className="flex justify-between">
                <span>TARGET ROOT:</span>
                <span className="text-white font-bold">{type}-{domain.toUpperCase()}-ROOT</span>
              </div>
              <div className="flex justify-between">
                <span>STATUS:</span>
                <span className="text-blue-400">READY TO WRITE</span>
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
               onClick={handleRegister}
               disabled={regStatus === 'SUBMITTING'}
               className="flex-1 bg-green-600 hover:bg-green-500 text-white font-mono font-bold text-xs py-3 rounded disabled:opacity-50"
             >
               {regStatus === 'SUBMITTING' ? 'WRITING TO LEDGER...' : 'CONFIRM REGISTRATION'}
             </button>
           </div>
        </div>
      )}

      {regStatus === 'SUCCESS' && (
        <div className="text-center py-8 animate-fade-in">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white font-mono mb-2">REGISTRATION COMPLETE</h3>
          <p className="text-gray-400 font-mono text-sm mb-6">
            Node [{type}-{domain.toUpperCase()}-ROOT] has been permanently recorded in the Space² Ledger.
          </p>
          <button 
             onClick={() => { setStep(1); setStatus('IDLE'); setRegStatus('IDLE'); setDomain(''); }}
             className="px-6 py-2 border border-zinc-700 text-white font-mono text-xs rounded hover:bg-zinc-800"
          >
            REGISTER ANOTHER
          </button>
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
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-mono font-bold mb-6 tracking-tight">
            THE <span className="text-red-600">REGISTRY</span>
          </h1>
          <p className="text-xl text-gray-400 font-mono max-w-2xl mx-auto mb-10">
            Official Database of Silicon Life Identities (SLIP) and Spatial Coordinates (SUNS).
          </p>
          
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

        <div className="animate-fade-in">
          {activeTab === 'SPACE' && (
            <div className="space-y-20">
              <SpaceRegistrar />
              {/* 下方静态内容省略，可保留原样 */}
            </div>
          )}

          {activeTab === 'IDENTITY' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border-t border-zinc-900 pt-16">
              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-red-500" />
                  <h2 className="text-2xl font-bold font-mono">S2-SLIP IDENTITY</h2>
                </div>
                 <a href="/developers" className="inline-block px-6 py-3 bg-red-700 hover:bg-red-600 text-white font-mono text-sm rounded transition-colors w-full md:w-auto text-center">
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
