"use client";
export const dynamic = 'force-dynamic';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase'; // 引入真实数据库
import { 
  Network, Share2, Layers, GitMerge, GitBranch, 
  History, Link, Cpu, ArrowLeft, Globe, Activity 
} from 'lucide-react';

// --- 类型定义 ---
interface SpaceNode {
  id: number;
  suns_id: string;     // 真实空间名
  type: string;        // PHY 或 VIR
  status: string;      // ACTIVE, FOLDING...
  owner_id: string | null;
  created_at: string;
}

export default function ConsolePage() {
  const router = useRouter(); // 👈 初始化路由
  const [spaces, setSpaces] = useState<SpaceNode[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<string[]>(["> [SYSTEM] Connecting to Planetary Ledger..."]);

  // --- 1. 核心升级：从 Supabase 获取真实数据 ---
  const fetchSpaces = async () => {
    try {
      const { data, error } = await supabase
        .from('spaces')
        .select('*')
        .order('created_at', { ascending: false }); // 最新的排前面

      if (error) throw error;

      if (data) {
        setSpaces(data);
        if (data.length > 0 && !selectedId) {
          setSelectedId(data[0].id); // 默认选中第一个
        }
        addLog(`[SYNC] Loaded ${data.length} nodes from database.`);
      }
    } catch (err: any) {
      addLog(`[ERROR] Connection failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 页面加载时执行

  useEffect(() => {
    // 🛡️ 安检开始
    const token = localStorage.getItem('planck_auth_token');
    if (token !== 'ACCESS_GRANTED') {
      // 如果没证，直接踢到登录页
      router.push('/login');
      return; // 停止执行后面的代码
    }
    // 🛡️ 安检结束
    
    fetchSpaces();
    
    // 开启实时监听 (Supabase Realtime)
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'spaces' }, (payload) => {
        addLog(`[REALTIME] Change detected: ${payload.eventType}`);
        fetchSpaces(); // 有变化就重新拉取
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const addLog = (msg: string) => {
    setLogs(prev => [`> [${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
  };

  // 获取当前选中的对象
  const activeSpace = spaces.find(s => s.id === selectedId) || spaces[0];

  // --- 模拟物理操作 (暂时保留模拟效果，但基于真实数据) ---
  const performAction = (actionName: string) => {
    if (!activeSpace) return;
    addLog(`[EXECUTE] Initiating ${actionName} on [${activeSpace.suns_id}]...`);
    setTimeout(() => {
      addLog(`[SUCCESS] ${actionName} protocol complete.`);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-purple-900">
      {/* 顶部导航 */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 border-b border-purple-900/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            EXIT
          </a>
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-500 animate-pulse" />
            <span className="text-sm text-purple-500 tracking-widest font-bold">
              HYPER-CONSOLE // ONLINE
            </span>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-10 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-2rem)]">
        
        {/* 左侧：真实空间列表 */}
        <div className="lg:col-span-1 bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex flex-col">
          <h2 className="text-xs font-bold text-gray-500 mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4" /> LIVE NODES ({spaces.length})
          </h2>
          
          {loading ? (
            <div className="text-center text-gray-500 py-10 animate-pulse">Scanning...</div>
          ) : (
            <div className="space-y-2 flex-1 overflow-y-auto">
              {spaces.map(space => (
                <button
                  key={space.id}
                  onClick={() => setSelectedId(space.id)}
                  className={`w-full text-left p-3 rounded border transition-all ${
                    selectedId === space.id 
                      ? 'bg-purple-900/20 border-purple-500 text-white' 
                      : 'bg-black border-zinc-800 text-gray-400 hover:border-zinc-600'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold truncate">{space.suns_id}</span>
                    <div className={`w-2 h-2 rounded-full ${space.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  </div>
                  <div className="text-[10px] opacity-70 flex justify-between">
                    <span>{space.type}</span>
                    <span>{new Date(space.created_at).toLocaleDateString()}</span>
                  </div>
                </button>
              ))}
              
              {spaces.length === 0 && (
                <div className="text-center p-4 border border-dashed border-zinc-800 rounded text-gray-500 text-xs">
                  No spaces found.<br/>Go to /registry to mint one.
                </div>
              )}
            </div>
          )}
        </div>

        {/* 中间：物理操作台 */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {activeSpace ? (
            <div className="flex-1 bg-black border border-zinc-800 rounded-xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <Activity className="w-32 h-32 text-purple-500" />
              </div>
              
              <div className="relative z-10">
                <div className="flex gap-2 mb-4">
                  <div className="px-2 py-1 rounded bg-purple-900/30 border border-purple-500/50 text-purple-400 text-[10px]">
                    TARGET: {activeSpace.suns_id}
                  </div>
                  <div className="px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-gray-400 text-[10px]">
                     STATUS: {activeSpace.status}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  {/* 操作按钮组 */}
                  <button onClick={() => performAction('BINDING CHECK')} className="p-4 border border-zinc-700 hover:border-blue-500 bg-zinc-900/50 rounded flex flex-col items-center gap-2 transition-colors">
                    <Link className="w-6 h-6 text-blue-500" />
                    <span className="text-xs font-bold">BINDING</span>
                  </button>

                  <button onClick={() => performAction('FOLDING')} className="p-4 border border-zinc-700 hover:border-purple-500 bg-zinc-900/50 rounded flex flex-col items-center gap-2 transition-colors">
                    <Layers className="w-6 h-6 text-purple-500" />
                    <span className="text-xs font-bold">FOLDING</span>
                  </button>

                  <button onClick={() => performAction('FUSION')} className="p-4 border border-zinc-700 hover:border-orange-500 bg-zinc-900/50 rounded flex flex-col items-center gap-2 transition-colors">
                    <GitMerge className="w-6 h-6 text-orange-500" />
                    <span className="text-xs font-bold">FUSION</span>
                  </button>

                  <button onClick={() => performAction('FISSION')} className="p-4 border border-zinc-700 hover:border-yellow-500 bg-zinc-900/50 rounded flex flex-col items-center gap-2 transition-colors">
                    <GitBranch className="w-6 h-6 text-yellow-500" />
                    <span className="text-xs font-bold">FISSION</span>
                  </button>
                  
                  <button onClick={() => performAction('BROADCAST')} className="p-4 border border-zinc-700 hover:border-pink-500 bg-zinc-900/50 rounded flex flex-col items-center gap-2 transition-colors col-span-2">
                    <Share2 className="w-6 h-6 text-pink-500" />
                    <span className="text-xs font-bold">BROADCAST SIGNAL</span>
                  </button>
                  
                   <button onClick={() => performAction('SNAPSHOT')} className="p-4 border border-zinc-700 hover:border-cyan-500 bg-zinc-900/50 rounded flex flex-col items-center gap-2 transition-colors col-span-2">
                    <History className="w-6 h-6 text-cyan-500" />
                    <span className="text-xs font-bold">CREATE SNAPSHOT</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 bg-black border border-zinc-800 rounded-xl flex items-center justify-center text-gray-500">
               Select a node to begin physics simulation.
            </div>
          )}

          {/* 日志终端 */}
          <div className="h-48 bg-black border border-zinc-800 rounded-xl p-4 font-mono text-xs overflow-y-auto shadow-inner">
            <div className="text-gray-500 mb-2 sticky top-0 bg-black pb-2 border-b border-zinc-900">
              > KERNEL EVENTS STREAM
            </div>
            <div className="space-y-1">
              {logs.map((log, i) => (
                <div key={i} className={`${log.includes("ERROR") ? "text-red-500" : log.includes("SUCCESS") || log.includes("REALTIME") ? "text-green-500" : "text-gray-400"}`}>
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
