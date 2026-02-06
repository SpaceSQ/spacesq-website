"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Copy, Check, Download, ChevronRight, Server, Shield, Cpu, Code, ArrowLeft, Activity, Lock } from 'lucide-react';

// --- 组件：CLI 模拟器 ---
const CLISimulator = () => {
  const [lines, setLines] = useState<string[]>([
    "Space² CLI [Version 1.0.4]",
    "(c) 2026 Genesis Hub. All rights reserved.",
    "",
    "Type 'help' to see available commands.",
    ""
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    const newLines = [...lines, `user@earth:~$ ${input}`];

    if (cmd === 'help') {
      newLines.push(
        "Available commands:",
        "  auth login       Authenticate with Genesis Hub",
        "  id mint          Mint a new S2-SLIP Identity",
        "  space init       Initialize a new SSSU Space Node",
        "  clear            Clear terminal"
      );
    } else if (cmd === 'auth login') {
      newLines.push("✅ Authenticated as [Guest_Developer]. Session secured.");
    } else if (cmd === 'id mint') {
      newLines.push(
        "Generating Key Pair...",
        "Verifying Three Laws Compliance... OK",
        "Minting S2-SLIP on NBT Chain...",
        "SUCCESS! New ID: V-CN-2602-DEV1-88X2"
      );
    } else if (cmd === 'space init') {
      newLines.push(
        "Initializing Space Node...",
        "Select Type: [1] Physical [2] Virtual",
        "> Defaulting to Virtual (Sandboxed)",
        "Allocating SUNS Address...",
        "SUCCESS! Assigned: VIR-Sandbox-Dev01"
      );
    } else if (cmd === 'clear') {
      setLines(["Space² CLI [Version 1.0.4]", ""]);
      setInput("");
      return; // Skip default behavior
    } else if (cmd !== '') {
      newLines.push(`Command not found: ${cmd}. Type 'help' for assistance.`);
    }

    setLines(newLines);
    setInput("");
  };

  return (
    <div className="bg-[#1e1e1e] rounded-lg border border-zinc-700 shadow-2xl overflow-hidden font-mono text-sm h-[400px] flex flex-col">
      <div className="bg-zinc-800 px-4 py-2 flex items-center gap-2 border-b border-zinc-700">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-2 text-zinc-400 text-xs">term -- -zsh</span>
      </div>
      <div className="flex-1 p-4 overflow-y-auto text-gray-300 space-y-1">
        {lines.map((line, i) => (
          <div key={i} className={line.includes("SUCCESS") ? "text-green-400" : line.includes("WARN") ? "text-yellow-400" : ""}>
            {line}
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>
      <form onSubmit={handleCommand} className="p-4 bg-zinc-900 border-t border-zinc-700 flex gap-2">
        <span className="text-green-500">user@earth:~$</span>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none text-white flex-1 focus:ring-0"
          autoFocus
          placeholder="Type command..."
        />
      </form>
    </div>
  );
};

// --- 组件：代码块 ---
const CodeBlock = ({ code, language = "bash" }: { code: string; language?: string }) => {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800 my-4">
      <div className="absolute right-2 top-2 z-10">
        <button onClick={copyToClipboard} className="p-1.5 rounded bg-zinc-800 text-gray-400 hover:text-white transition-colors">
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="px-4 py-2 bg-zinc-950 border-b border-zinc-800 text-xs text-gray-500 font-mono flex justify-between">
        <span>{language}</span>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-300 leading-relaxed">
        {code}
      </pre>
    </div>
  );
};

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-900 selection:text-white">
      {/* 顶部导航 */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 border-b border-zinc-800 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            BACK TO MISSION CONTROL
          </a>
          <span className="font-mono text-sm text-blue-500 border border-blue-900/50 px-2 py-1 rounded bg-blue-900/10">
            DEV_HUB: ACTIVE
          </span>
        </div>
      </nav>

      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 头部 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-xs font-mono text-gray-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            v1.4.0 STABLE RELEASE
          </div>
          <h1 className="text-4xl md:text-6xl font-mono font-bold mb-6 tracking-tight">
            BUILD THE <span className="text-blue-500">HIVE</span>.
          </h1>
          <p className="text-xl text-gray-400 font-mono max-w-2xl mx-auto">
            The toolkit for constructing Space-Embodied Intelligence.
            <br/>Mint IDs, deploy Nodes, and enforce the Three Laws.
          </p>
        </div>

        {/* 核心工具区 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          
          {/* 左侧：介绍与安装 */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold font-mono mb-4 flex items-center gap-2">
                <Terminal className="w-6 h-6 text-blue-500" />
                Quick Start
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Install the Space² CLI to interact with the Genesis Hub. You can mint S2-SLIP identities, manage SSSU coordinates, and deploy local kernel nodes.
              </p>
              <CodeBlock code="npm install -g @space2/cli" language="bash" />
            </div>

            <div>
              <h3 className="text-lg font-bold font-mono mb-3 text-white">Mint Your First ID</h3>
              <p className="text-gray-400 text-sm mb-2">
                Generate a compliant silicon identity (S2-SLIP) for your agent or robot.
              </p>
              <CodeBlock code="space2 id mint --type embodied --origin CN" language="bash" />
            </div>

            <div className="flex gap-4 pt-4">
              <button className="flex-1 py-3 bg-white text-black font-mono font-bold rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                DOWNLOAD SDK
              </button>
              <button className="flex-1 py-3 border border-zinc-700 text-white font-mono font-bold rounded hover:border-blue-500 transition-colors flex items-center justify-center gap-2">
                <Code className="w-4 h-4" />
                API DOCS
              </button>
            </div>
          </div>

          {/* 右侧：CLI 模拟器 */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-20"></div>
            <CLISimulator />
            <p className="text-center text-xs text-gray-500 font-mono mt-4">
              * Interactive Terminal Preview. Try typing <span className="text-white">help</span>
            </p>
          </div>
        </div>

        {/* 架构文档区 */}
        <div className="border-t border-zinc-900 pt-20 pb-20">
          <h2 className="text-2xl font-bold font-mono mb-12 text-center">CORE ARCHITECTURE</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 模块 1 */}
            <div className="bg-zinc-900/50 p-8 rounded-xl border border-zinc-800 hover:border-blue-500/50 transition-all group">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Server className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-white font-mono mb-3">Node Handshake</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                The cryptographic protocol for Local Nodes to authenticate with Genesis Hub. Ensures all deployed spaces verify the "Three Laws" kernel signature.
              </p>
              <a href="#" className="text-xs text-blue-500 font-mono hover:underline flex items-center">
                READ PROTOCOL <ChevronRight className="w-3 h-3 ml-1" />
              </a>
            </div>

            {/* 模块 2 */}
            <div className="bg-zinc-900/50 p-8 rounded-xl border border-zinc-800 hover:border-green-500/50 transition-all group">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-white font-mono mb-3">IoT Integration</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                SDKs for Arduino, Raspberry Pi, and industrial controllers. Turn any physical room into an SSSU-compliant addressable space.
              </p>
              <a href="#" className="text-xs text-green-500 font-mono hover:underline flex items-center">
                VIEW EXAMPLES <ChevronRight className="w-3 h-3 ml-1" />
              </a>
            </div>

            {/* 模块 3 */}
            <div className="bg-zinc-900/50 p-8 rounded-xl border border-zinc-800 hover:border-red-500/50 transition-all group">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-white font-mono mb-3">Safety Kernel</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                <b>First Law Implementation:</b> Hard-coded physical isolation triggers. APIs for emergency lockdown and "Red Button" integration.
              </p>
              <a href="#" className="text-xs text-red-500 font-mono hover:underline flex items-center">
                SECURITY WHITE PAPER <ChevronRight className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* === S2-AGIS 免疫系统监控面板 === */}
        <div className="mt-8 border-t border-red-900/30 pt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold font-mono text-red-500 flex items-center gap-2">
                <Shield className="w-6 h-6 animate-pulse" />
                S2-AGIS LIVE MONITOR
              </h2>
              <p className="text-xs text-gray-500 font-mono mt-1">
                Artificial General Immune System // Global Defense Layer
              </p>
            </div>
            <div className="flex gap-4">
               <div className="text-right">
                 <div className="text-[10px] text-gray-500 font-mono">THREAT LEVEL</div>
                 <div className="text-xl font-bold text-green-500 font-mono">LOW / STABLE</div>
               </div>
               <div className="text-right">
                 <div className="text-[10px] text-gray-500 font-mono">BLACKLISTED IDs</div>
                 <div className="text-xl font-bold text-red-500 font-mono">1,024</div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-900/30 p-4 rounded border border-red-900/20">
            {/* 左侧：实时拦截日志 */}
            <div className="font-mono text-xs h-40 overflow-hidden relative">
               <div className="absolute top-0 left-0 bg-red-500/10 text-red-500 px-2 py-0.5 rounded text-[10px] mb-2 inline-block">
                 INTERCEPTION LOG
               </div>
               <div className="mt-8 space-y-1 text-gray-400 opacity-80">
<p className="text-red-400">&gt;&gt; [BLOCKED] Agent_X99 tried accessing PHY-Mars-01 without signature.</p>
<p>&gt;&gt; [INFO] Node VIR-Meta-03 reported suspicious heartbeat.</p>
<p>&gt;&gt; [SYNC] Global Blacklist updated (Hash: #99a2b).</p>
<p className="text-red-400">&gt;&gt; [BLOCKED] Unauthorized API call from IP 192.168.x.x</p>
                 <p>>> [SCAN] Routine integrity check passed for 450 nodes.</p>
               </div>
            </div>

            {/* 右侧：防御协议状态 */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-black border border-zinc-800 p-3 rounded flex flex-col justify-center items-center text-center">
                 <div className="text-[10px] text-gray-500 mb-1">PROTOCOL IV</div>
                 <div className="text-white font-bold text-sm">DENIAL OF SERVICE</div>
                 <div className="text-green-500 text-[10px] mt-1">ACTIVE</div>
              </div>
              <div className="bg-black border border-zinc-800 p-3 rounded flex flex-col justify-center items-center text-center">
                 <div className="text-[10px] text-gray-500 mb-1">PHYSICAL FUSE</div>
                 <div className="text-white font-bold text-sm">AIR-GAP TRIGGER</div>
                 <div className="text-green-500 text-[10px] mt-1">READY</div>
              </div>
              <div className="bg-black border border-zinc-800 p-3 rounded flex flex-col justify-center items-center text-center col-span-2">
                 <div className="text-[10px] text-gray-500 mb-1">IDENTITY ORACLE</div>
                 <div className="text-white font-bold text-sm">GENESIS HUB UPLINK</div>
                 <div className="w-full h-1 bg-zinc-800 mt-2 rounded overflow-hidden">
                   <div className="h-full bg-blue-600 w-[98%] animate-pulse"></div>
                 </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
