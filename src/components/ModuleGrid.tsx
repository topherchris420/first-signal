
import React from 'react';
import { ModuleCard } from './ModuleCard';
import { 
  AlertTriangle, 
  Search, 
  Target, 
  Eye, 
  Atom, 
  Activity,
  Rocket
} from 'lucide-react';

const modules = [
  {
    id: 'failure-sandbox',
    title: 'Failure Sandbox',
    description: 'Probabilistic outcome modeling',
    icon: AlertTriangle,
    status: 'active' as const,
    color: 'red'
  },
  {
    id: 'truth-engine',
    title: 'Truth Engine',
    description: 'Hypothesis verification',
    icon: Search,
    status: 'active' as const,
    color: 'blue'
  },
  {
    id: 'usefulness-meter',
    title: 'Usefulness Meter',
    description: 'Impact × Scale analysis',
    icon: Target,
    status: 'active' as const,
    color: 'green'
  },
  {
    id: 'ego-detector',
    title: 'Ego Dissonance',
    description: 'Distortion analysis',
    icon: Eye,
    status: 'active' as const,
    color: 'purple'
  },
  {
    id: 'first-principles',
    title: 'First Principles',
    description: 'Elemental breakdown',
    icon: Atom,
    status: 'active' as const,
    color: 'yellow'
  },
  {
    id: 'activity-tracker',
    title: 'Action Tracker',
    description: 'Mission-critical habits',
    icon: Activity,
    status: 'active' as const,
    color: 'orange'
  },
  {
    id: 'future-shock',
    title: 'Future Shock Node',
    description: 'Long-term relevance',
    icon: Rocket,
    status: 'active' as const,
    color: 'cyan'
  }
];

export const ModuleGrid = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Analysis Modules</h2>
      <div className="grid gap-3">
        {modules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
};
