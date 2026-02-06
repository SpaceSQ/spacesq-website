"use client";
export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import { 
  Terminal, Activity, Zap, Shield, Database, 
  MapPin, Cpu, Users, Radio, 
  Sun, Lightbulb, ToggleLeft, ToggleRight, Sliders
} from 'lucide-react';

// --- 组件：空间内核模拟器 (The Genesis Kernel) ---
// 这里体现了“五枢”理论：感知 -> 计算 -> 控制
const SpaceKernel = ({ space, onEvolve }: { space: any, onEvolve: (id: string) => void }) => {
  // 模拟 IoT 设备状态
  const [luxValue, setLuxValue] = useState(100); // 感知：光照度
  const [lightStatus, setLightStatus] = useState<'ON' | 'OFF'>('OFF'); // 执行：灯具
  const [isAutoMode, setIsAutoMode] = useState(true); // 计算：自动化规则

  // 🧠 核心逻辑：规则引擎 (The Soul Loop)
  useEffect(() => {
    if (!isAutoMode) return;

    // 规则 1: 暗于 50 Lux -> 开灯
    if (luxValue < 50 && lightStatus === 'OFF') {
      setLightStatus('ON');
    } 
    // 规则 2: 亮于 60 Lux -> 关灯 (回差控制)
    else if (luxValue > 60 && lightStatus === 'ON') {
      setLightStatus('OFF');
    }
  }, [luxValue, isAutoMode, lightStatus]);

  // 阶段 0: 原始状态 (未进化)
  if (!space.evolutionary_stage || space.evolutionary_stage < 1) {
    return (
      <div className="mt-4 p-4 bg-purple-900/10 rounded border border-dashed border-purple-500/30 text-center animate-in fade-in">
        <p className="text-[10px] text-purple-300 mb-3 font-bold tracking-wider">
          GENESIS CORE DETECTED
        </p>
        <p className="text-[10px] text-gray-500 mb-3 leading-relaxed">
          Inject "Five Pivots" protocol to enable IoT capability.<br/>
          (Install Sensors, Actuators, Matter Bus)
        </p>
        <button 
          onClick={() => onEvolve(space.suns_id)}
          className="text-[10px] bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded font-bold transition-all shadow-[0_0_10px_rgba(147,51,234,0.3)] flex items-center gap-2 mx-auto"
        >
          <Cpu className="w-3 h-3" /> EVOLVE TO STAGE I
        </button>
      </div>
    );
  }

  // 阶段 I: 具备基础五枢能力的智能空间
  return (
    <div className="mt-4 bg-black/60 rounded-lg border border-zinc-800 p-3 space-y-3 animate-in zoom-in-95 duration-300">
      
      {/* 顶部状态栏 */}
      <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
        <span className="text-[10px] text-zinc-400 font-bold flex gap-1 items-center">
           <Radio className="w-3 h-3 text-green-500" /> BIFROST LINK: ACTIVE
        </span>
        <button 
           onClick={() => setIsAutoMode(!isAutoMode)}
           className={`text-[8px] px-2 py-0.5 rounded border transition-colors ${
             isAutoMode 
               ? 'bg-green-900/30 border-green-500 text-green-400' 
               : 'bg-zinc-800 border-zinc-600 text-zinc-500'
           }`}
        >
          {isAutoMode ? 'AUTO: AI HOSTED' : 'MANUAL OVERRIDE'}
        </button>
      </div>

      {/* 1. 感知层 (Perception) - 模拟环境光 */}
      <div className="space-y-1">
        <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
          <span className="flex items-center gap-1"><Sun className="w-3 h-3"/> SENSOR: LUX-01</span>
          <span className={luxValue < 50 ? 'text-blue-400' : 'text-yellow-500'}>{luxValue} Lux</span>
        </div>
        <input 
          type="range" 
          min="0" max="150" 
          value={luxValue} 
          onChange={(e) => setLuxValue(Number(e.target.value))}
          className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
        />
      </div>

      {/* 2. 执行层 (Actuator) & 交互层 (Interface) */}
      <div className="grid grid-cols-2 gap-2">
        {/* 灯具状态 */}
        <div className={`flex flex-col justify-center items-center p-2 rounded border transition-all duration-500 ${
          lightStatus === 'ON' 
            ? 'bg-yellow-900/20 border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]' 
            : 'bg-zinc-900 border-zinc-800'
        }`}>
          <Lightbulb className={`w-5 h-5 mb-1 transition-all duration-300 ${
            lightStatus === 'ON' ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-600'
          }`} />
          <span className="text-[8px] text-zinc-500">MAIN LIGHT</span>
        </div>

        {/* 物理开关 */}
        <button 
          onClick={() => {
            setIsAutoMode(false); // 手动操作打断自动
            setLightStatus(lightStatus === 'ON' ? 'OFF' : 'ON');
          }}
          className="flex flex-col justify-center items-center p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded transition-colors group"
        >
           {lightStatus === 'ON' 
             ? <ToggleRight className="w-5 h-5 mb-1 text-green-500 group-hover:scale-110 transition-transform" /> 
             : <ToggleLeft className="w-5 h-5 mb-1 text-zinc-500 group-hover:scale-110 transition-transform" />
           }
           <span className="text-[8px] text-zinc-500">WALL SWITCH</span>
        </button>
      </div>

    </div>
  );
};

// --- 主页面组件 ---
export default function ConsolePage() {
  const router = useRouter();
  const [spaces, setSpaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');

  // 初始化
  useEffect(() => {
    // 简单的安检逻辑
    const storedId = localStorage.getItem('space_citizen_id');
    setUserId(storedId || 'UNKNOWN_ENTITY');
    fetchSpaces(storedId);
  }, []);

  // 拉取数据
  const fetchSpaces = async (ownerId: string | null) => {
    if (!ownerId) return;
    const { data, error } = await supabase
      .from('spaces')
      .select('*')
      .eq('owner_id', ownerId)
      .order('created_at', { ascending: false });

    if (error) console.error('Fetch Error:', error);
    else setSpaces(data || []);
    setLoading(false);
  };

  // 动作：充能
  const rechargeSpace = async (sunsId: string, currentLevel: number) => {
    if (currentLevel >= 100) return;
    // 乐观更新
    setSpaces(prev => prev.map(s => s.suns_id === sunsId ? {...s, energy_level: 100} : s));
    // 数据库更新
    await supabase.from('spaces').update({ energy_level: 100 }).eq('suns_id', sunsId);
  };

  // 动作：进化 (注入灵魂)
  const handleEvolve = async (sunsId: string) => {
    // 1. 乐观更新 UI
    setSpaces(prev => prev.map(s => s.suns_id === sunsId ? {...s, evolutionary_stage: 1} : s));
    
    // 2. 数据库更新 (进化到 Stage 1)
    const { error } = await supabase
      .from('spaces')
      .update({ evolutionary_stage: 1 })
      .eq('suns_id', sunsId);

    if (error) {
      console.error("Evolution Failed:", error);
      alert("EVOLUTION ERROR: CHECK CONSOLE");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-green-500 font-mono text-xs">
      <div className="flex gap-2 items-center">
        <Activity className="w-4 h-4 animate-spin" /> ESTABLISHING UPLINK...
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-gray-300 font-mono p-4 md:p-8 selection:bg-purple-900 selection:text-white">
      {/* 顶部导航栏 */}
      <header className="flex justify-between items-center mb-10 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-zinc-900 border border-zinc-700 rounded flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            <Terminal className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-[0.2em] text-white">COMMAND CENTER</h1>
            <p className="text-[10px] text-gray-600">SpaceSQ OS v1.1.0 (Genesis)</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-gray-600 uppercase">OPERATOR ID</div>
          <div className="text-xs text-green-400 font-bold flex items-center justify-end gap-2">
            <div className={`w-2 h-2 rounded-full ${userId.startsWith('BOT') || userId.includes('SILICON') ? 'bg-purple-500' : 'bg-blue-500'} animate-pulse`}></div>
            {userId}
          </div>
        </div>
      </header>

      {/* 核心内容区 */}
      <main>
        {spaces.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
            <Database className="w-12 h-12 mx-auto text-zinc-700 mb-4" />
            <p className="text-zinc-500 text-sm mb-6">NO ASSETS DETECTED IN LOCAL SECTOR.</p>
            <button 
              onClick={() => router.push('/registry')}
              className="px-8 py-3 bg-white hover:bg-gray-200 text-black text-xs font-bold rounded transition-colors"
            >
              INITIALIZE REGISTRY
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {spaces.map((space) => (
              <div key={space.id || space.suns_id} className="bg-zinc-900/30 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-600 transition-all group relative backdrop-blur-sm">
                
                {/* 装饰线条 */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                {/* 卡片头部 */}
                <div className="p-5 border-b border-zinc-800/50 flex justify-between items-start bg-black/20">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[9px] px-1.5 py-0.5 rounded border font-bold ${
                        space.life_form === 'SILICON' 
                          ? 'border-purple-500/30 text-purple-400 bg-purple-900/10' 
                          : 'border-blue-500/30 text-blue-400 bg-blue-900/10'
                      }`}>
                        {space.life_form || 'CARBON'}
                      </span>
                      <span className="text-[9px] text-zinc-500 border border-zinc-800 px-1.5 py-0.5 rounded uppercase">
                        {space.sector || 'ALPHA'}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-widest font-mono">{space.suns_id}</h3>
                  </div>
                  <div className="flex flex-col items-end">
                     <span className="flex items-center gap-1 text-[9px] text-green-500 font-bold">
                       <Radio className="w-3 h-3" /> ONLINE
                     </span>
                     <span className="text-[9px] text-zinc-600 mt-1 font-mono">
                       {new Date(space.created_at).toLocaleDateString()}
                     </span>
                  </div>
                </div>

                {/* 卡片主体 */}
                <div className="p-5 space-y-5">
                  
                  {/* 1. 宣言模块 */}
                  <div className="text-xs text-gray-400 italic border-l-2 border-zinc-700 pl-3 leading-relaxed">
                    "{space.manifesto || 'No signal broadcasted.'}"
                  </div>

                  {/* 2. 身份证明 (溯源) */}
                  <div className="bg-black/40 rounded p-3 text-[10px] font-mono space-y-2 border border-zinc-800/50">
                    <div className="flex justify-between text-zinc-500 uppercase font-bold">Origin Proof</div>
                    
                    {space.life_form === 'SILICON' && space.compute_proof ? (
                      <div className="flex justify-between items-center text-purple-300">
                        <span className="flex items-center gap-1"><Cpu className="w-3 h-3"/> LATENCY</span>
                        <span>{space.compute_proof.latency || 0} ms</span>
                      </div>
                    ) : space.witness_info ? (
                      <div className="flex justify-between items-center text-blue-300">
                        <span className="flex items-center gap-1"><Users className="w-3 h-3"/> WITNESS</span>
                        <span className="truncate max-w-[150px]">{space.witness_info.witness}</span>
                      </div>
                    ) : (
                      <div className="text-zinc-600">LEGACY DATA</div>
                    )}
                  </div>

                  {/* 3. 能量模块 */}
                  <div>
                    <div className="flex justify-between text-[10px] mb-1.5 font-bold">
                      <span className="text-gray-500 uppercase">Entropy Level</span>
                      <span className={space.energy_level < 30 ? 'text-red-500' : 'text-green-500'}>
                        {space.energy_level}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${space.energy_level < 30 ? 'bg-red-600' : 'bg-green-600'}`} 
                        style={{ width: `${space.energy_level}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* 4. 核心玩法：空间内核 (IoT Simulation) */}
                  <div className="border-t border-zinc-800/50 pt-2">
                    <SpaceKernel space={space} onEvolve={handleEvolve} />
                  </div>

                </div>

                {/* 卡片底部 */}
                <div className="p-3 bg-zinc-900/30 border-t border-zinc-800/50 flex gap-2">
                  <button 
                    onClick={() => rechargeSpace(space.suns_id, space.energy_level)}
                    className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] font-bold py-2 rounded flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                    disabled={space.energy_level >= 100}
                  >
                    <Zap className={`w-3 h-3 ${space.energy_level >= 100 ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                    {space.energy_level >= 100 ? 'CHARGED' : 'RECHARGE'}
                  </button>
                  <button className="flex-1 border border-zinc-700 hover:bg-zinc-800 text-gray-400 text-[10px] font-bold py-2 rounded transition-colors">
                    MANAGE
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
