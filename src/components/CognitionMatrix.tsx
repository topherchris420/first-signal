
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Zap, Clock, Eye, Target, GitBranch, Layers } from 'lucide-react';
import { CognitiveEngine, CausalNode } from '@/lib/cognitiveEngine';
import { GroqService } from '@/services/groqService';
import { CausalGraphView } from './CausalGraphView';
import { RealityCompressionPanel } from './RealityCompressionPanel';
import { DelusionSimulator } from './DelusionSimulator';
import { MirrorDialogue } from './MirrorDialogue';
import { TemporalChallenge } from './TemporalChallenge';

interface CognitionMatrixProps {
  groqApiKey: string;
}

export const CognitionMatrix = ({ groqApiKey }: CognitionMatrixProps) => {
  const [engine] = useState(() => new CognitiveEngine('user-1'));
  const [groq] = useState(() => new GroqService(groqApiKey));
  const [activeMode, setActiveMode] = useState<string>('causal');
  const [cognitiveState, setCognitiveState] = useState(engine.getCognitiveState());

  useEffect(() => {
    const interval = setInterval(() => {
      setCognitiveState(engine.getCognitiveState());
    }, 1000);
    return () => clearInterval(interval);
  }, [engine]);

  const modes = [
    { id: 'causal', label: 'Causal Memory', icon: GitBranch, color: 'blue' },
    { id: 'compression', label: 'Reality Compression', icon: Target, color: 'green' },
    { id: 'delusion', label: 'Delusion Injection', icon: Eye, color: 'red' },
    { id: 'mirror', label: 'Mirror Mode', icon: Brain, color: 'purple' },
    { id: 'temporal', label: 'Temporal Challenge', icon: Clock, color: 'yellow' },
    { id: 'synaptic', label: 'Synaptic Scoring', icon: Zap, color: 'orange' }
  ];

  const renderActiveMode = () => {
    switch (activeMode) {
      case 'causal':
        return <CausalGraphView engine={engine} />;
      case 'compression':
        return <RealityCompressionPanel groq={groq} />;
      case 'delusion':
        return <DelusionSimulator groq={groq} />;
      case 'mirror':
        return <MirrorDialogue groq={groq} biasProfile={cognitiveState.biasProfile} />;
      case 'temporal':
        return <TemporalChallenge groq={groq} />;
      case 'synaptic':
        return <SynapticScoring cognitiveState={cognitiveState} />;
      default:
        return <CausalGraphView engine={engine} />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Brain className="h-6 w-6 text-blue-400" />
            <span>First Signal Cognition Matrix</span>
            <Zap className="h-4 w-4 text-yellow-400" />
          </CardTitle>
          <CardDescription className="text-gray-400">
            Living cognition engine with ultra-fast Groq inference • Synaptic Efficiency: {(cognitiveState.synapticEfficiency * 100).toFixed(1)}%
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Mode Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = activeMode === mode.id;
          return (
            <Button
              key={mode.id}
              variant={isActive ? "default" : "outline"}
              onClick={() => setActiveMode(mode.id)}
              className={`h-auto p-3 flex flex-col items-center space-y-1 ${
                isActive 
                  ? `bg-${mode.color}-600 hover:bg-${mode.color}-700` 
                  : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-xs text-center">{mode.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Active Mode Content */}
      <div className="min-h-[500px]">
        {renderActiveMode()}
      </div>

      {/* Cognitive State Overview */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-sm text-gray-300">Cognitive State Vector</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-gray-400">Causal Nodes</div>
              <div className="text-white font-mono">{cognitiveState.causalGraph.length}</div>
            </div>
            <div>
              <div className="text-gray-400">Synaptic Efficiency</div>
              <div className="text-white font-mono">{(cognitiveState.synapticEfficiency * 100).toFixed(1)}%</div>
            </div>
            <div>
              <div className="text-gray-400">Temporal Alignment</div>
              <div className="text-white font-mono">{(cognitiveState.temporalAlignment * 100).toFixed(1)}%</div>
            </div>
            <div>
              <div className="text-gray-400">Last Update</div>
              <div className="text-white font-mono">{new Date(cognitiveState.lastUpdated).toLocaleTimeString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const SynapticScoring = ({ cognitiveState }: { cognitiveState: any }) => {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-orange-400">Synaptic Efficiency Analysis</CardTitle>
        <CardDescription>Track decision quality across reality, mission, humility, and usefulness dimensions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-4xl font-mono text-orange-400 mb-2">
              {(cognitiveState.synapticEfficiency * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-400">Overall Synaptic Efficiency</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 p-3 rounded">
              <div className="text-xs text-gray-400 mb-1">Reality Alignment</div>
              <div className="text-lg font-mono text-blue-400">87.3%</div>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <div className="text-xs text-gray-400 mb-1">Mission Coherence</div>
              <div className="text-lg font-mono text-green-400">92.1%</div>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <div className="text-xs text-gray-400 mb-1">Intellectual Humility</div>
              <div className="text-lg font-mono text-purple-400">74.8%</div>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <div className="text-xs text-gray-400 mb-1">Practical Usefulness</div>
              <div className="text-lg font-mono text-yellow-400">89.6%</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
