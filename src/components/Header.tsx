
import React from 'react';
import { Zap } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm rounded-xl border border-pink-200/50 shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <img 
                src="/lovable-uploads/4e1c17e5-f410-458f-b4ee-b7d91649fab2.png" 
                alt="First Signal Logo"
                className="h-8 w-8 object-cover rounded"
              />
            </div>
            <Zap className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 drop-shadow-sm" />
          </div>
          <div>
            <a 
              href="https://vers3dynamics.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-pink-600 transition-colors"
            >
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-pink-600 bg-clip-text text-transparent">
                First Signal
              </h1>
            </a>
            <p className="text-sm text-gray-600 font-medium">Reality-Constrained Decision Engine</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-pink-500 uppercase tracking-wider font-semibold">Powered by Groq</div>
          <div className="text-sm text-purple-600 font-medium">Ultra-Low Latency AI</div>
        </div>
      </div>
    </header>
  );
};
