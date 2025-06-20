
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  status: 'active' | 'coming-soon';
  color: string;
}

interface ModuleCardProps {
  module: Module;
}

const colorMap = {
  red: 'border-red-500/30 bg-red-500/5 text-red-400',
  blue: 'border-blue-500/30 bg-blue-500/5 text-blue-400',
  green: 'border-green-500/30 bg-green-500/5 text-green-400',
  purple: 'border-purple-500/30 bg-purple-500/5 text-purple-400',
  yellow: 'border-yellow-500/30 bg-yellow-500/5 text-yellow-400',
  orange: 'border-orange-500/30 bg-orange-500/5 text-orange-400',
  cyan: 'border-cyan-500/30 bg-cyan-500/5 text-cyan-400',
};

export const ModuleCard = ({ module }: ModuleCardProps) => {
  const { icon: Icon, title, description, status, color } = module;
  const colorClasses = colorMap[color as keyof typeof colorMap] || colorMap.blue;

  return (
    <div className={`border rounded-lg p-4 transition-all duration-200 ${colorClasses} ${
      status === 'active' ? 'hover:scale-105 cursor-pointer' : 'opacity-60'
    }`}>
      <div className="flex items-start space-x-3">
        <Icon className="h-5 w-5 mt-0.5" />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-white">{title}</h3>
          <p className="text-xs text-gray-400 mt-1">{description}</p>
          {status === 'coming-soon' && (
            <span className="text-xs text-gray-500 mt-2 block">Coming Soon</span>
          )}
        </div>
      </div>
    </div>
  );
};
