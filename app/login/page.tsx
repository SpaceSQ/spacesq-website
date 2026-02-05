"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock } from 'lucide-react';

export default function LoginPage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 🔐 这里设置你的“上帝密码”
    // 以后我们可以把这个放到环境变量里，现在先写死
    const SECRET_CODE = "SUNS-42"; 

    if (code === SECRET_CODE) {
      // 登录成功：发一张“通行证”存到浏览器里
      localStorage.setItem('planck_auth_token', 'ACCESS_GRANTED');
      router.push('/console'); // 跳转到控制台
    } else {
      setError('ACCESS DENIED. INVALID GENOME SIGNATURE.');
      setCode('');
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white font-mono p-4">
      <div className="max-w-md w-full bg-zinc-900/50 border border-zinc-800 p-8 rounded-xl shadow-2xl relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
        
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="p-4 bg-black rounded-full border border-zinc-700">
            <Lock className="w-8 h-8 text-purple-500" />
          </div>
          <h1 className="text-xl font-bold tracking-[0.2em] text-gray-300">RESTRICTED AREA</h1>
          <p className="text-xs text-gray-500">Only high-dimensional entities allowed.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="ENTER ACCESS CODE"
              className="w-full bg-black border border-zinc-700 p-3 rounded text-center tracking-widest text-purple-400 focus:border-purple-500 focus:outline-none transition-all placeholder:text-zinc-800"
              autoFocus
            />
          </div>

          {error && (
            <div className="text-red-500 text-xs text-center animate-pulse">
              > {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-purple-900/30 border border-purple-500/50 hover:bg-purple-900/50 text-purple-300 py-3 rounded text-xs font-bold tracking-widest transition-all flex items-center justify-center gap-2 group"
          >
            <ShieldCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
            VERIFY IDENTITY
          </button>
        </form>
      </div>
    </div>
  );
}
