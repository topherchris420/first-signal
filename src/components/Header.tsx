
import React from 'react';
import { Zap } from 'lucide-react';

export const Header = () => {
  return (
    <header className="border-b border-gray-800 pb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img 
              src="/lovable-uploads/4e1c17e5-f410-458f-b4ee-b7d91649fab2.png" 
              alt="First Signal Logo"
              className="h-8 w-8 object-cover rounded"
            />
            <Zap className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1" />
          </div>
          <div>
            <a 
              href="https://vers3dynamics.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <h1 className="text-2xl font-bold text-white">First Signal</h1>
            </a>
            <p className="text-sm text-gray-400">Reality-Constrained Decision Engine</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500 uppercase tracking-wider">Powered by Groq</div>
          <div className="text-sm text-blue-400">Ultra-Low Latency AI</div>
        </div>
      </div>
    </header>
  );
};
