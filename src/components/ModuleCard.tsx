
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
  red: 'border-red-200 dark:border-red-700/50 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 text-red-700 dark:text-red-300 hover:from-red-100 hover:to-red-200 dark:hover:from-red-800/40 dark:hover:to-red-700/40',
  blue: 'border-blue-200 dark:border-blue-700/50 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-700 dark:text-blue-300 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800/40 dark:hover:to-blue-700/40',
  green: 'border-green-200 dark:border-green-700/50 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 text-green-700 dark:text-green-300 hover:from-green-100 hover:to-green-200 dark:hover:from-green-800/40 dark:hover:to-green-700/40',
  purple: 'border-purple-200 dark:border-purple-700/50 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-700 dark:text-purple-300 hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-800/40 dark:hover:to-purple-700/40',
  yellow: 'border-yellow-200 dark:border-yellow-700/50 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 text-yellow-700 dark:text-yellow-300 hover:from-yellow-100 hover:to-yellow-200 dark:hover:from-yellow-800/40 dark:hover:to-yellow-700/40',
  orange: 'border-orange-200 dark:border-orange-700/50 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 text-orange-700 dark:text-orange-300 hover:from-orange-100 hover:to-orange-200 dark:hover:from-orange-800/40 dark:hover:to-orange-700/40',
  cyan: 'border-cyan-200 dark:border-cyan-700/50 bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/30 dark:to-cyan-800/30 text-cyan-700 dark:text-cyan-300 hover:from-cyan-100 hover:to-cyan-200 dark:hover:from-cyan-800/40 dark:hover:to-cyan-700/40',
};

export const ModuleCard = ({ module }: ModuleCardProps) => {
  const { icon: Icon, title, description, status, color } = module;
  const colorClasses = colorMap[color as keyof typeof colorMap] || colorMap.blue;

  return (
    <div className={`border-2 rounded-xl p-4 transition-all duration-300 shadow-sm hover:shadow-md ${colorClasses} ${
      status === 'active' ? 'hover:scale-105 cursor-pointer' : 'opacity-60'
    }`}>
      <div className="flex items-start space-x-3">
        <div className="p-2 rounded-lg bg-white/70 dark:bg-gray-800/70 shadow-sm">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-xs opacity-80 mt-1">{description}</p>
          {status === 'active' && (
            <span className="text-xs font-medium mt-2 block bg-white/50 dark:bg-gray-700/50 px-2 py-1 rounded-full inline-block">
              Active
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
