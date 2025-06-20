
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
  red: 'border-red-200 bg-gradient-to-br from-red-50 to-red-100 text-red-700 hover:from-red-100 hover:to-red-200',
  blue: 'border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 hover:from-blue-100 hover:to-blue-200',
  green: 'border-green-200 bg-gradient-to-br from-green-50 to-green-100 text-green-700 hover:from-green-100 hover:to-green-200',
  purple: 'border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 text-purple-700 hover:from-purple-100 hover:to-purple-200',
  yellow: 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100 text-yellow-700 hover:from-yellow-100 hover:to-yellow-200',
  orange: 'border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 text-orange-700 hover:from-orange-100 hover:to-orange-200',
  cyan: 'border-cyan-200 bg-gradient-to-br from-cyan-50 to-cyan-100 text-cyan-700 hover:from-cyan-100 hover:to-cyan-200',
};

export const ModuleCard = ({ module }: ModuleCardProps) => {
  const { icon: Icon, title, description, status, color } = module;
  const colorClasses = colorMap[color as keyof typeof colorMap] || colorMap.blue;

  return (
    <div className={`border-2 rounded-xl p-4 transition-all duration-300 shadow-sm hover:shadow-md ${colorClasses} ${
      status === 'active' ? 'hover:scale-105 cursor-pointer' : 'opacity-60'
    }`}>
      <div className="flex items-start space-x-3">
        <div className="p-2 rounded-lg bg-white/70 shadow-sm">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-xs opacity-80 mt-1">{description}</p>
          {status === 'active' && (
            <span className="text-xs font-medium mt-2 block bg-white/50 px-2 py-1 rounded-full inline-block">
              Active
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
