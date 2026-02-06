"use client";
import React, { useState, useEffect } from 'react';

// --- 模拟引擎配置 ---
const SIMULATION_CONFIG = {
  // 1. 空间体积 (初始 480万立方米, 约50万个标准单元)
  volume: { start: 4805200.0, growthRate: 9.6, interval: 2000 }, 
  
  // 2. 硅基生命 (初始 3.4万个)
  agents: { start: 34205, growthRate: 1, interval: 1500 },
  
  // 3. 单元时 SUH (流转极快)
  suh: { start: 8910200, growthRate: 5, interval: 100 },
  
  // 4. 物理融合计算 (疯狂跳动)
  fusion: { start: 102400000, growthRate: 128, interval: 50 }
};

export const GenesisDashboard = () => {
  const [metrics, setMetrics] = useState({
    volume: SIMULATION_CONFIG.volume.start,
    agents: SIMULATION_CONFIG.agents.start,
    suh: SIMULATION_CONFIG.suh.start,
    fusion: SIMULATION_CONFIG.fusion.start,
  });

  // 格式化数字 (加逗号)
  const fmt = (num: number, decimals: number = 0) => 
    new Intl.NumberFormat('en-US', { 
      minimumFractionDigits: decimals, 
      maximumFractionDigits: decimals 
    }).format(num);

  useEffect(() => {
    // 启动模拟引擎 (Simulation Engine)
    const intervals: NodeJS.Timeout[] = [];

    // 1. 体积增长 (模拟新用户注册空间)
    intervals.push(setInterval(() => {
      setMetrics(prev => ({ ...prev, volume: prev.volume + (Math.random() > 0.5 ? 9.6 : 0) }));
    }, SIMULATION_CONFIG.volume.interval));

    // 2. 硅基生命 (模拟 Agent 上线)
    intervals.push(setInterval(() => {
      setMetrics(prev => ({ ...prev, agents: prev.agents + Math.floor(Math.random() * 3) }));
    }, SIMULATION_CONFIG.agents.interval));

    // 3. SUH (模拟时间流逝与计费)
    intervals.push(setInterval(() => {
      setMetrics(prev => ({ ...prev, suh: prev.suh + Math.floor(Math.random() * 10) }));
    }, SIMULATION_CONFIG.suh.interval));

    // 4. 物理计算 (模拟后台运算)
    intervals.push(setInterval(() => {
      setMetrics(prev => ({ ...prev, fusion: prev.fusion + Math.floor(Math.random() * 500) }));
    }, SIMULATION_CONFIG.fusion.interval));

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div className="w-full bg-black/90 border-y border-zinc-800 p-6 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        
        {/* 标题区 */}
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 font-mono text-xl font-bold tracking-widest">
                /// GENESIS LIVE METRICS
            </h2>
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-zinc-500 text-xs font-mono">SYSTEM ONLINE</span>
            </div>
        </div>

        {/* 仪表盘核心区 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* 指标 1: 空间体积 */}
            <div className="relative group">
                <div className="text-zinc-500 text-xs font-mono mb-1 uppercase">Total Registered Volume</div>
                <div className="text-3xl text-white font-mono font-bold tabular-nums tracking-tight">
                    {fmt(metrics.volume, 1)} <span className="text-sm text-zinc-600">m³</span>
                </div>
                <div className="text-[10px] text-zinc-600 mt-2 border-l border-zinc-700 pl-2">
                    Global X-SSSU Allocation
                </div>
            </div>

            {/* 指标 2: 硅基实体 */}
            <div className="relative group">
                <div className="text-zinc-500 text-xs font-mono mb-1 uppercase">Active Silicon Agents</div>
                <div className="text-3xl text-blue-400 font-mono font-bold tabular-nums tracking-tight">
                    {fmt(metrics.agents)}
                </div>
                <div className="text-[10px] text-zinc-600 mt-2 border-l border-zinc-700 pl-2">
                    Digital Humans & Bots Online
                </div>
            </div>

            {/* 指标 3: 标准单元时 */}
            <div className="relative group">
                <div className="text-zinc-500 text-xs font-mono mb-1 uppercase">Standard Unit Hours (SUH)</div>
                <div className="text-3xl text-purple-400 font-mono font-bold tabular-nums tracking-tight">
                    {fmt(metrics.suh)}
                </div>
                <div className="text-[10px] text-zinc-600 mt-2 border-l border-zinc-700 pl-2">
                    Cumulative Space Time Value
                </div>
            </div>

            {/* 指标 4: 物理融合事件 */}
            <div className="relative group">
                <div className="text-zinc-500 text-xs font-mono mb-1 uppercase">Physics Fusion Events</div>
                <div className="text-3xl text-green-400 font-mono font-bold tabular-nums tracking-tight">
                    {fmt(metrics.fusion)}
                </div>
                <div className="text-[10px] text-zinc-600 mt-2 border-l border-zinc-700 pl-2">
                    Real-time Element Calculations
                </div>
            </div>

        </div>

        {/* 模拟数据声明 (Disclaimer) */}
        <div className="mt-8 pt-4 border-t border-zinc-900 flex justify-end">
            <p className="text-[9px] text-zinc-700 font-mono">
                * SIMULATION MODE ACTIVE: DATA SHOWN IS FOR DEMONSTRATION OF SYSTEM CAPACITY AND GROWTH TRENDS. NOT REAL-TIME OPERATIONAL METRICS.
            </p>
        </div>

      </div>
    </div>
  );
};
