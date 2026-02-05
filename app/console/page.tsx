"use client";

import React, { useState } from 'react';

export default function ConsolePage() {
  const [logs, setLogs] = useState<string[]>(["> System Initialized..."]);

  const addLog = () => {
    setLogs(prev => [...prev, `> Action at ${new Date().toLocaleTimeString()}`]);
  };

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-8">
      <h1 className="text-2xl border-b border-green-800 pb-4 mb-4">SPACE² CONSOLE (LITE)</h1>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-green-800 p-4">
          <h2 className="mb-4 text-white">CONTROLS</h2>
          <button 
            onClick={addLog}
            className="px-4 py-2 bg-green-900 text-white hover:bg-green-700"
          >
            TEST BUTTON
          </button>
        </div>
        
        <div className="border border-green-800 p-4 h-64 overflow-y-auto">
          <h2 className="mb-4 text-white">LOGS</h2>
          {logs.map((log, i) => (
            <div key={i}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
