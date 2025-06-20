
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Zap, Clock, Eye, Target, Layers, TrendingUp, Activity } from 'lucide-react';
import { CognitiveEngine, CausalNode } from '@/lib/cognitiveEngine';
import { GroqService } from '@/services/groqService';
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
  const [activeMode, setActiveMode] = useState<string>('compression');
  const [cognitiveState, setCognitiveState] = useState(engine.getCognitiveState());

  useEffect(() => {
    const interval = setInterval(() => {
      setCognitiveState(engine.getCognitiveState());
    }, 1000);
    return () => clearInterval(interval);
  }, [engine]);

  // Add some sample data to make the cognitive state more meaningful
  useEffect(() => {
    // Add some initial causal nodes to demonstrate functionality
    if (cognitiveState.causalGraph.length === 0) {
      engine.addCausalNode(
        "Launched First Signal app",
        "User engagement increased by 15%",
        "success"
      );
      engine.addCausalNode(
        "Implemented cognitive matrix",
        "Processing speed improved significantly",
        "insight"
      );
      engine.addCausalNode(
        "Added Groq integration",
        "AI responses became faster and more accurate",
        "success"
      );
    }
  }, [engine, cognitiveState.causalGraph.length]);

  const modes = [
    { id: 'compression', label: 'Reality Compression', icon: Target, color: 'green' },
    { id: 'delusion', label: 'Delusion Injection', icon: Eye, color: 'red' },
    { id: 'mirror', label: 'Mirror Mode', icon: Brain, color: 'purple' },
    { id: 'temporal', label: 'Temporal Challenge', icon: Clock, color: 'yellow' },
    { id: 'synaptic', label: 'Synaptic Scoring', icon: Zap, color: 'orange' }
  ];

  const renderActiveMode = () => {
    switch (activeMode) {
      case 'compression':
        return <RealityCompressionPanel groq={groq} />;
      case 'delusion':
        return <DelusionSimulator groq={groq} />;
      case 'mirror':
        return <MirrorDialogue groq={groq} biasProfile={cognitiveState.biasProfile} />;
      case 'temporal':
        return <TemporalChallenge groq={groq} />;
      case 'synaptic':
        return <SynapticScoring cognitiveState={cognitiveState} engine={engine} />;
      default:
        return <RealityCompressionPanel groq={groq} />;
    }
  };

  // Calculate dynamic metrics
  const totalNodes = cognitiveState.causalGraph.length;
  const successNodes = cognitiveState.causalGraph.filter(node => node.type === 'success').length;
  const insightNodes = cognitiveState.causalGraph.filter(node => node.type === 'insight').length;
  const dynamicEfficiency = totalNodes > 0 ? (successNodes + insightNodes) / totalNodes : 0.5;
  const recentActivity = cognitiveState.causalGraph.filter(node => 
    Date.now() - node.timestamp < 300000 // Last 5 minutes
  ).length;

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
            Living cognition engine with ultra-fast Groq inference • Synaptic Efficiency: {(dynamicEfficiency * 100).toFixed(1)}%
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Mode Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
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

      {/* Enhanced Cognitive State Overview */}
      <Card className="bg-white/80 backdrop-blur-sm border-pink-200/50 shadow-lg">
        <CardHeader>
          <CardTitle className="text-sm text-gray-700 flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>Live Cognitive State Vector</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-200/50">
              <div className="text-blue-600 text-xs font-medium flex items-center space-x-1">
                <TrendingUp className="h-3 w-3" />
                <span>Causal Nodes</span>
              </div>
              <div className="text-blue-800 font-mono text-lg">{totalNodes}</div>
              <div className="text-blue-600 text-xs mt-1">
                {successNodes} success, {insightNodes} insights
              </div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-3 rounded-lg border border-pink-200/50">
              <div className="text-pink-600 text-xs font-medium flex items-center space-x-1">
                <Zap className="h-3 w-3" />
                <span>Synaptic Efficiency</span>
              </div>
              <div className="text-pink-800 font-mono text-lg">{(dynamicEfficiency * 100).toFixed(1)}%</div>
              <div className="text-pink-600 text-xs mt-1">
                Dynamic calculation
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-lg border border-purple-200/50">
              <div className="text-purple-600 text-xs font-medium flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>Temporal Alignment</span>
              </div>
              <div className="text-purple-800 font-mono text-lg">{(cognitiveState.temporalAlignment * 100).toFixed(1)}%</div>
              <div className="text-purple-600 text-xs mt-1">
                Future readiness
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg border border-green-200/50">
              <div className="text-green-600 text-xs font-medium flex items-center space-x-1">
                <Activity className="h-3 w-3" />
                <span>Recent Activity</span>
              </div>
              <div className="text-green-800 font-mono text-lg">{recentActivity}</div>
              <div className="text-green-600 text-xs mt-1">
                Last 5 minutes
              </div>
            </div>
          </div>
          
          {/* Real-time Pattern Analysis */}
          {totalNodes > 0 && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-xs text-gray-600 mb-2 font-medium">Live Pattern Recognition</div>
              <div className="text-sm text-gray-800">
                {successNodes > insightNodes 
                  ? "🎯 Success-oriented decision pattern detected"
                  : insightNodes > 0
                  ? "💡 Learning-focused cognitive mode active"
                  : "🔄 Building cognitive foundation..."
                }
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const SynapticScoring = ({ cognitiveState, engine }: { cognitiveState: any; engine: CognitiveEngine }) => {
  const [realTimeScore, setRealTimeScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate real-time synaptic score based on actual node data
      const nodes = cognitiveState.causalGraph;
      if (nodes.length > 0) {
        const avgScore = nodes.reduce((sum: number, node: any) => sum + node.synapticScore, 0) / nodes.length;
        setRealTimeScore(avgScore);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [cognitiveState]);

  // Calculate dimensional scores based on actual data
  const totalNodes = cognitiveState.causalGraph.length;
  const successRate = totalNodes > 0 ? 
    (cognitiveState.causalGraph.filter((n: any) => n.type === 'success').length / totalNodes) * 100 : 87.3;
  const insightRate = totalNodes > 0 ? 
    (cognitiveState.causalGraph.filter((n: any) => n.type === 'insight').length / totalNodes) * 100 : 74.8;
  const coherenceScore = Math.min(95, 70 + (totalNodes * 2)); // Improves with more data
  const usefulnessScore = Math.min(95, 80 + (successRate * 0.15));

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-orange-200/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-orange-600">Live Synaptic Efficiency Analysis</CardTitle>
        <CardDescription className="text-gray-600">Real-time decision quality across reality, mission, humility, and usefulness dimensions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-5xl font-mono text-orange-600 mb-2">
              {totalNodes > 0 ? (realTimeScore * 100).toFixed(1) : (cognitiveState.synapticEfficiency * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600 font-medium">Overall Synaptic Efficiency</div>
            <div className="text-xs text-gray-500 mt-1">
              Based on {totalNodes} causal nodes
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200/50">
              <div className="text-xs text-blue-600 mb-1 font-medium">Reality Alignment</div>
              <div className="text-2xl font-mono text-blue-700">{successRate.toFixed(1)}%</div>
              <div className="text-xs text-blue-600 mt-1">Success rate</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200/50">
              <div className="text-xs text-green-600 mb-1 font-medium">Mission Coherence</div>
              <div className="text-2xl font-mono text-green-700">{coherenceScore.toFixed(1)}%</div>
              <div className="text-xs text-green-600 mt-1">Data coherence</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200/50">
              <div className="text-xs text-purple-600 mb-1 font-medium">Intellectual Humility</div>
              <div className="text-2xl font-mono text-purple-700">{insightRate.toFixed(1)}%</div>
              <div className="text-xs text-purple-600 mt-1">Learning rate</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl border border-yellow-200/50">
              <div className="text-xs text-yellow-600 mb-1 font-medium">Practical Usefulness</div>
              <div className="text-2xl font-mono text-yellow-700">{usefulnessScore.toFixed(1)}%</div>
              <div className="text-xs text-yellow-600 mt-1">Impact score</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
