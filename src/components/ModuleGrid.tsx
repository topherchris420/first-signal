
import React from 'react';
import { ModuleCard } from './ModuleCard';
import { 
  AlertTriangle, 
  Search, 
  Target, 
  Mirror, 
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
    status: 'active',
    color: 'red'
  },
  {
    id: 'truth-engine',
    title: 'Truth Engine',
    description: 'Hypothesis verification',
    icon: Search,
    status: 'coming-soon',
    color: 'blue'
  },
  {
    id: 'usefulness-meter',
    title: 'Usefulness Meter',
    description: 'Impact × Scale analysis',
    icon: Target,
    status: 'coming-soon',
    color: 'green'
  },
  {
    id: 'ego-detector',
    title: 'Ego Dissonance',
    description: 'Distortion analysis',
    icon: Mirror,
    status: 'coming-soon',
    color: 'purple'
  },
  {
    id: 'first-principles',
    title: 'First Principles',
    description: 'Elemental breakdown',
    icon: Atom,
    status: 'coming-soon',
    color: 'yellow'
  },
  {
    id: 'activity-tracker',
    title: 'Action Tracker',
    description: 'Mission-critical habits',
    icon: Activity,
    status: 'coming-soon',
    color: 'orange'
  },
  {
    id: 'future-shock',
    title: 'Future Shock Node',
    description: 'Long-term relevance',
    icon: Rocket,
    status: 'coming-soon',
    color: 'cyan'
  }
];

export const ModuleGrid = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">Analysis Modules</h2>
      <div className="grid gap-3">
        {modules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
};
