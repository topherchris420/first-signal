
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
      <Card className="bg-white/80 backdrop-blur-sm border-pink-200/50 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-800">
            <Brain className="h-6 w-6 text-pink-500" />
            <span className="bg-gradient-to-r from-gray-800 to-pink-600 bg-clip-text text-transparent">
              First Signal Cognition Matrix
            </span>
            <Zap className="h-4 w-4 text-yellow-500" />
          </CardTitle>
          <CardDescription className="text-gray-600">
            Living cognition engine with ultra-fast Groq inference • Synaptic Efficiency: {(cognitiveState.synapticEfficiency * 100).toFixed(1)}%
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Mode Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = activeMode === mode.id;
          return (
            <Button
              key={mode.id}
              variant={isActive ? "default" : "outline"}
              onClick={() => setActiveMode(mode.id)}
              className={`h-auto p-4 flex flex-col items-center space-y-2 transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg' 
                  : 'bg-white/80 border-gray-200 hover:bg-white hover:border-pink-300 text-gray-700'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs text-center font-medium">{mode.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Active Mode Content */}
      <div className="min-h-[500px]">
        {renderActiveMode()}
      </div>

      {/* Cognitive State Overview */}
      <Card className="bg-white/80 backdrop-blur-sm border-pink-200/50 shadow-lg">
        <CardHeader>
          <CardTitle className="text-sm text-gray-700">Cognitive State Vector</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg">
              <div className="text-blue-600 text-xs font-medium">Causal Nodes</div>
              <div className="text-blue-800 font-mono text-lg">{cognitiveState.causalGraph.length}</div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-3 rounded-lg">
              <div className="text-pink-600 text-xs font-medium">Synaptic Efficiency</div>
              <div className="text-pink-800 font-mono text-lg">{(cognitiveState.synapticEfficiency * 100).toFixed(1)}%</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-lg">
              <div className="text-purple-600 text-xs font-medium">Temporal Alignment</div>
              <div className="text-purple-800 font-mono text-lg">{(cognitiveState.temporalAlignment * 100).toFixed(1)}%</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg">
              <div className="text-green-600 text-xs font-medium">Last Update</div>
              <div className="text-green-800 font-mono text-sm">{new Date(cognitiveState.lastUpdated).toLocaleTimeString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const SynapticScoring = ({ cognitiveState }: { cognitiveState: any }) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-orange-200/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-orange-600">Synaptic Efficiency Analysis</CardTitle>
        <CardDescription className="text-gray-600">Track decision quality across reality, mission, humility, and usefulness dimensions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-5xl font-mono text-orange-600 mb-2">
              {(cognitiveState.synapticEfficiency * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600 font-medium">Overall Synaptic Efficiency</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
              <div className="text-xs text-blue-600 mb-1 font-medium">Reality Alignment</div>
              <div className="text-2xl font-mono text-blue-700">87.3%</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
              <div className="text-xs text-green-600 mb-1 font-medium">Mission Coherence</div>
              <div className="text-2xl font-mono text-green-700">92.1%</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
              <div className="text-xs text-purple-600 mb-1 font-medium">Intellectual Humility</div>
              <div className="text-2xl font-mono text-purple-700">74.8%</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl">
              <div className="text-xs text-yellow-600 mb-1 font-medium">Practical Usefulness</div>
              <div className="text-2xl font-mono text-yellow-700">89.6%</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
