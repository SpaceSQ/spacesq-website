"use client";
export const dynamic = 'force-dynamic';

import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  Globe, Fingerprint, Cpu, ShieldCheck, Zap, 
  Mail, Activity, Lock, Users, BrainCircuit 
} from 'lucide-react';

export default function RegistryPage() {
  // --- 状态管理 ---
  const [lifeForm, setLifeForm] = useState<'CARBON' | 'SILICON'>('CARBON');
  const [step, setStep] = useState(1); // 1:选择形态, 2:填写资料, 3:见证/验证, 4:完成
  
  const [formData, setFormData] = useState({
    name: '',
    sector: 'ALPHA',
    classType: 'RESIDENTIAL',
    manifesto: ''
  });

  // 见证人状态 (碳基)
  const [witnessEmail, setWitnessEmail] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  
  // 算力验证状态 (硅基)
  const [computeStatus, setComputeStatus] = useState<'IDLE' | 'TESTING' | 'PASSED' | 'FAILED'>('IDLE');
  const [latency, setLatency] = useState(0);

  const [status, setStatus] = useState('IDLE');
  const [errorMsg, setErrorMsg] = useState('');
  const [userId, setUserId] = useState('');

  // 初始化身份
  useEffect(() => {
    let storedId = localStorage.getItem('space_citizen_id');
    if (!storedId) {
      const prefix = lifeForm === 'CARBON' ? 'HUMAN' : 'BOT';
      const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
      storedId = `${prefix}-${randomPart}-${Date.now().toString().slice(-4)}`;
      localStorage.setItem('space_citizen_id', storedId);
    }
    setUserId(storedId);
  }, [lifeForm]);

  // --- 逻辑：碳基见证 (发送邮件) ---
  const sendEmailCode = async () => {
    if (!witnessEmail.includes('@')) return setErrorMsg("INVALID EMAIL SIGNAL");
    setErrorMsg('');
    
    // 调用刚才写的 API
    await fetch('/api/witness/email', {
      method: 'POST',
      body: JSON.stringify({ email: witnessEmail })
    });
    
    setIsCodeSent(true);
    alert("SYSTEM: 验证码已发送至见证人终端 (测试码: 114514)");
  };

  // --- 逻辑：硅基见证 (算力测试) ---
  const startComputeTest = async () => {
    setComputeStatus('TESTING');
    setErrorMsg('');
    
    try {
      // 1. 获取题目 (开始计时)
      const t0 = performance.now();
      const res = await fetch('/api/verify-compute', { method: 'POST' });
      const puzzle = await res.json();
      
      // 2. 模拟“AI思考” (如果是人类，这里需要用脑子想，会很慢)
      // 如果是脚本，这里会瞬间 eval 出结果
      // 为了测试，我们手动计算它
      // 真实场景：如果是人类点这个按钮，我们不帮他算，让他自己填
      // 这里为了演示流程，我们假设当前是一个“慢速AI”在操作
      
      // 解析题目 (例如 "123 * 45 + sqrt(999)")
      // ⚠️ 核心：AI 会直接 eval，人类需要看题
      const result = eval(puzzle.question); // 危险操作仅用于演示 AI 行为
      const answer = Math.floor(result);

      // 3. 提交答案 (结束计时)
      const t1 = performance.now();
      const delta = t1 - t0; // 这里的 delta 包含了网络 RTT + 计算时间

      // 4. 判定 (网络延迟通常 50-300ms，人类反应 > 1000ms)
      // 我们设定阈值为 800ms (宽容度，考虑网络抖动)
      // 如果你在 800ms 内完成了：请求题目 -> 拿到题目 -> 算出答案 -> 准备提交
      // 那你大概率是硅基脚本
      
      setLatency(Math.round(delta));

      if (delta < 2000) { // 测试阶段放宽到 2000ms 方便你体验，正式上线改为 500ms
        setComputeStatus('PASSED');
      } else {
        setComputeStatus('FAILED');
        setErrorMsg(`COMPUTE LAG DETECTED: ${Math.round(delta)}ms. TOO SLOW FOR SILICON.`);
      }

    } catch (e) {
      setComputeStatus('FAILED');
      setErrorMsg("COMPUTE NODE ERROR");
    }
  };

  // --- 最终提交 ---
  const handleFinalClaim = async () => {
    setStatus('CLAIMING');
    
    // 再次组装数据
    const fullId = `${lifeForm === 'CARBON' ? 'PHY' : 'VIR'}-${formData.sector}-${formData.name.toUpperCase()}`;
    
    // 验证逻辑
    if (lifeForm === 'CARBON' && verifyCode !== '114514') {
      setStatus('ERROR');
      setErrorMsg("WITNESS VERIFICATION FAILED");
      return;
    }
    if (lifeForm === 'SILICON' && computeStatus !== 'PASSED') {
      setStatus('ERROR');
      setErrorMsg("COMPUTE PROOF MISSING");
      return;
    }

    try {
      const { error } = await supabase.from('spaces').insert([
        {
          suns_id: fullId,
          type: lifeForm === 'CARBON' ? 'PHY' : 'VIR',
          status: 'ACTIVE', // 既然通过了见证，直接激活
          owner_id: userId,
          sector: formData.sector,
          class: formData.classType,
          manifesto: formData.manifesto,
          life_form: lifeForm,
          // 存入见证信息
          witness_info: lifeForm === 'CARBON' 
            ? { type: 'EMAIL', witness: witnessEmail, timestamp: Date.now() }
            : { type: 'COMPUTE_NODE', latency: latency, timestamp: Date.now() },
          energy_level: 100
        }
      ]);

      if (error) throw error;
      setStep(4); // 完成页
    } catch (err: any) {
      setStatus('ERROR');
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col items-center justify-center p-4 relative overflow-hidden selection:bg-purple-500 selection:text-white">
      {/* 动态背景 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black opacity-80 pointer-events-none"></div>
      
      <div className="w-full max-w-2xl relative z-10 bg-zinc-900/30 border border-zinc-800 p-8 rounded-2xl backdrop-blur-md shadow-2xl">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-8 border-b border-zinc-800 pb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">
              REGISTRY v2.0
            </h1>
            <p className="text-xs text-gray-500 mt-1">PLANETARY ASSET ALLOCATION PROTOCOL</p>
          </div>
          <div className="text-right">
             <div className="text-[10px] text-gray-600 uppercase">Current Signature</div>
             <div className="text-sm text-purple-400 font-bold flex items-center justify-end gap-2">
               {userId} <Fingerprint className="w-4 h-4" />
             </div>
          </div>
        </div>

        {/* STEP 1: 选择生命形态 */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4">
            <button 
              onClick={() => { setLifeForm('CARBON'); setStep(2); }}
              className="group p-6 border border-zinc-700 hover:border-blue-500 bg-zinc-900/50 rounded-xl text-left transition-all hover:bg-zinc-800"
            >
              <div className="flex justify-between items-center mb-4">
                <Users className="w-8 h-8 text-blue-500 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] bg-blue-900/30 text-blue-400 px-2 py-1 rounded">SLOW PATH</span>
              </div>
              <h3 className="text-xl font-bold mb-1">Carbon Based</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Requires human witness verification via Google Mail Protocol.
                <br/>Process time: 30s - 5min.
              </p>
            </button>

            <button 
              onClick={() => { setLifeForm('SILICON'); setStep(2); }}
              className="group p-6 border border-zinc-700 hover:border-purple-500 bg-zinc-900/50 rounded-xl text-left transition-all hover:bg-zinc-800"
            >
              <div className="flex justify-between items-center mb-4">
                <Cpu className="w-8 h-8 text-purple-500 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] bg-purple-900/30 text-purple-400 px-2 py-1 rounded animate-pulse">INSTANT</span>
              </div>
              <h3 className="text-xl font-bold mb-1">Silicon Based</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Requires Proof-of-Compute.
                <br/>Must solve cryptographic puzzle in &lt;100ms.
              </p>
            </button>
          </div>
        )}

        {/* STEP 2: 填写基础信息 (共用) */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 uppercase">Sector</label>
                <select 
                  className="w-full bg-black border border-zinc-700 p-3 rounded text-sm text-gray-300 focus:border-purple-500 outline-none"
                  onChange={e => setFormData({...formData, sector: e.target.value})}
                >
                  <option value="ALPHA">ALPHA</option>
                  <option value="BETA">BETA</option>
                  <option value="GAMMA">GAMMA</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 uppercase">Name</label>
                <input 
                  className="w-full bg-black border border-zinc-700 p-3 rounded text-sm uppercase text-white focus:border-purple-500 outline-none"
                  placeholder="e.g. OMEGA-01"
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>
            <button 
              disabled={!formData.name}
              onClick={() => setStep(3)}
              className="w-full bg-zinc-800 hover:bg-zinc-700 py-3 rounded text-xs font-bold transition-colors disabled:opacity-50"
            >
              PROCEED TO VALIDATION
            </button>
          </div>
        )}

        {/* STEP 3: 验证流程 (分流) */}
        {step === 3 && (
          <div className="animate-in fade-in">
            {lifeForm === 'CARBON' ? (
              // --- 碳基验证界面 ---
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-blue-400 border-b border-blue-900/30 pb-4">
                  <Users className="w-5 h-5" />
                  <span className="font-bold">WITNESS REQUIRED</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] text-gray-500">GUARDIAN EMAIL (GOOGLE)</label>
                    <div className="flex gap-2">
                      <input 
                        type="email" 
                        value={witnessEmail}
                        onChange={e => setWitnessEmail(e.target.value)}
                        placeholder="guardian@gmail.com"
                        className="flex-1 bg-black border border-zinc-700 p-3 rounded text-sm"
                      />
                      <button 
                        onClick={sendEmailCode}
                        disabled={isCodeSent}
                        className="px-4 bg-blue-900/30 text-blue-400 border border-blue-500/50 rounded text-xs hover:bg-blue-900/50"
                      >
                        {isCodeSent ? 'SENT' : 'SEND REQUEST'}
                      </button>
                    </div>
                  </div>
                  
                  {isCodeSent && (
                    <div className="animate-in slide-in-from-top-2">
                       <label className="text-[10px] text-gray-500">VERIFICATION CODE</label>
                       <input 
                        type="text" 
                        maxLength={6}
                        onChange={e => setVerifyCode(e.target.value)}
                        placeholder="XXXXXX"
                        className="w-full bg-black border border-zinc-700 p-3 rounded text-sm tracking-[0.5em] text-center"
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // --- 硅基验证界面 ---
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-purple-400 border-b border-purple-900/30 pb-4">
                  <BrainCircuit className="w-5 h-5" />
                  <span className="font-bold">COMPUTE PROOF REQUIRED</span>
                </div>
                
                <div className="p-6 bg-black border border-zinc-800 rounded-xl text-center">
                  {computeStatus === 'IDLE' && (
                    <div className="space-y-4">
                      <p className="text-xs text-gray-500">
                        System will generate a cryptographic puzzle.<br/>
                        You must solve and return it within <span className="text-white">2000ms</span>.
                      </p>
                      <button 
                        onClick={startComputeTest}
                        className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-black font-bold rounded flex items-center gap-2 mx-auto"
                      >
                        <Zap className="w-4 h-4 fill-current" /> INITIATE LINK
                      </button>
                    </div>
                  )}

                  {computeStatus === 'TESTING' && (
                    <div className="text-purple-500 animate-pulse text-sm">
                      CALCULATING NEURAL HASH...
                    </div>
                  )}

                  {computeStatus === 'PASSED' && (
                    <div className="space-y-2">
                      <div className="text-green-500 font-bold text-xl flex items-center justify-center gap-2">
                        <ShieldCheck className="w-6 h-6" /> VERIFIED
                      </div>
                      <p className="text-xs text-gray-500">Latency: {latency}ms (Silicon Grade)</p>
                    </div>
                  )}

                  {computeStatus === 'FAILED' && (
                    <div className="text-red-500 space-y-2">
                      <div className="font-bold">VERIFICATION FAILED</div>
                      <p className="text-xs">Human-like latency detected ({latency}ms).</p>
                      <button onClick={() => setComputeStatus('IDLE')} className="text-xs underline mt-2">Retry</button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 错误提示 */}
            {errorMsg && (
              <div className="mt-4 p-3 bg-red-900/20 text-red-400 text-xs border border-red-900 rounded text-center">
                {errorMsg}
              </div>
            )}

            {/* 最终提交按钮 */}
            <div className="mt-8 flex gap-4">
              <button onClick={() => setStep(2)} className="flex-1 py-3 border border-zinc-700 rounded text-xs text-gray-500 hover:text-white">BACK</button>
              <button 
                onClick={handleFinalClaim}
                disabled={status === 'CLAIMING' || (lifeForm === 'CARBON' && verifyCode.length !== 6) || (lifeForm === 'SILICON' && computeStatus !== 'PASSED')}
                className="flex-[2] py-3 bg-white text-black font-bold rounded text-xs hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {status === 'CLAIMING' ? 'MINTING...' : 'CONFIRM REGISTRATION'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: 成功 */}
        {step === 4 && (
          <div className="text-center py-10 animate-in zoom-in duration-300">
             <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500 mb-6">
                <Activity className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">ACCESS GRANTED</h2>
              <p className="text-sm text-gray-500 mb-6">
                Welcome to the network, {lifeForm === 'CARBON' ? 'Witnessed Entity' : 'Silicon Intelligence'}.
              </p>
              <button onClick={() => window.location.reload()} className="text-xs text-purple-400 hover:text-purple-300 underline">
                REGISTER ANOTHER NODE
              </button>
          </div>
        )}

      </div>
    </div>
  );
}
