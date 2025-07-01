
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Zap, Clock, Eye, Target, Layers, TrendingUp, Activity, Sparkles, BarChart3 } from 'lucide-react';
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
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCognitiveState(engine.getCognitiveState());
    }, 1000);
    return () => clearInterval(interval);
  }, [engine]);

  // Initialize with enhanced sample data
  useEffect(() => {
    if (cognitiveState.causalGraph.length === 0 && !isInitialized) {
      setIsInitialized(true);
      
      // Add comprehensive initial causal nodes
      engine.addCausalNode(
        "Launched First Signal cognitive engine",
        "Successfully established reality-constraint framework with 94% accuracy",
        "success"
      );
      engine.addCausalNode(
        "Integrated Groq's ultra-high interference AI",
        "Achieved sub-100ms response times with enhanced reasoning depth",
        "success"
      );
      engine.addCausalNode(
        "Implemented multi-modal cognitive analysis",
        "Discovered 3 critical bias patterns in initial decision framework",
        "insight"
      );
      engine.addCausalNode(
        "Attempted to ignore temporal scaling requirements",
        "Created technical debt that slowed development by 40%",
        "failure"
      );
      engine.addCausalNode(
        "Applied Van Gogh-inspired design philosophy",
        "Increased user engagement and emotional resonance by 65%",
        "success"
      );
      engine.addCausalNode(
        "Assumed linear AI progress without interference modeling",
        "Led to underestimating complexity by factor of 3",
        "delusion"
      );
    }
  }, [engine, cognitiveState.causalGraph.length, isInitialized]);

  const modes = [
    { id: 'compression', label: 'Reality Compression', icon: Target, color: 'emerald', description: 'Distill complex goals to irreducible kernels' },
    { id: 'delusion', label: 'Delusion Injection', icon: Eye, color: 'red', description: 'Simulate decay of false assumptions' },
    { id: 'mirror', label: 'Mirror Mode', icon: Brain, color: 'purple', description: 'Dialogue with your cognitive biases' },
    { id: 'temporal', label: 'Temporal Challenge', icon: Clock, color: 'blue', description: 'Test decisions against future scaling' },
    { id: 'synaptic', label: 'Synaptic Scoring', icon: Zap, color: 'orange', description: 'Real-time decision quality metrics' }
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

  // Enhanced dynamic metrics calculations
  const totalNodes = cognitiveState.causalGraph.length;
  const successNodes = cognitiveState.causalGraph.filter(node => node.type === 'success').length;
  const insightNodes = cognitiveState.causalGraph.filter(node => node.type === 'insight').length;
  const failureNodes = cognitiveState.causalGraph.filter(node => node.type === 'failure').length;
  const delusionNodes = cognitiveState.causalGraph.filter(node => node.type === 'delusion').length;
  
  const dynamicEfficiency = totalNodes > 0 ? (successNodes + insightNodes) / totalNodes : 0.5;
  const learningRate = totalNodes > 0 ? (insightNodes + failureNodes) / totalNodes : 0.3;
  const realityAlignment = totalNodes > 0 ? (successNodes + insightNodes) / (totalNodes - delusionNodes || 1) : 0.7;
  
  const recentActivity = cognitiveState.causalGraph.filter(node => 
    Date.now() - node.timestamp < 300000 // Last 5 minutes
  ).length;

  const avgSynapticScore = totalNodes > 0 ? 
    cognitiveState.causalGraph.reduce((sum, node) => sum + node.synapticScore, 0) / totalNodes : 0.5;

  return (
    <div className="space-y-8">
      {/* Enhanced header card */}
      <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-pink-200/50 dark:border-purple-500/30 shadow-2xl hover:shadow-3xl transition-all duration-500">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-3 text-gray-800 dark:text-gray-100">
            <div className="relative">
              <Brain className="h-7 w-7 text-pink-500 dark:text-pink-400" />
              <Sparkles className="h-3 w-3 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="text-xl bg-gradient-to-r from-gray-800 to-pink-600 dark:from-gray-100 dark:to-pink-400 bg-clip-text text-transparent font-bold">
              First Signal Cognition Matrix
            </span>
            <div className="flex items-center space-x-1">
              <Zap className="h-4 w-4 text-yellow-500 animate-pulse" />
              <span className="text-sm font-mono text-green-600 dark:text-green-400">
                {(avgSynapticScore * 100).toFixed(1)}%
              </span>
            </div>
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400 text-base">
            Living cognition engine with ultra-high interference AI • 
            <span className="font-semibold text-pink-600 dark:text-pink-400 ml-1">
              {totalNodes} nodes processed
            </span> • 
            <span className="font-semibold text-purple-600 dark:text-purple-400 ml-1">
              Reality alignment: {(realityAlignment * 100).toFixed(1)}%
            </span>
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Enhanced mode navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = activeMode === mode.id;
          const colorClasses = {
            emerald: isActive ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600' : 'hover:border-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20',
            red: isActive ? 'bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600' : 'hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20',
            purple: isActive ? 'bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600' : 'hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20',
            blue: isActive ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600' : 'hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20',
            orange: isActive ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600' : 'hover:border-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20'
          };
          
          return (
            <Button
              key={mode.id}
              variant={isActive ? "default" : "outline"}
              onClick={() => setActiveMode(mode.id)}
              className={`h-auto p-5 flex flex-col items-center space-y-3 transition-all duration-300 transform hover:scale-[1.02] ${
                isActive 
                  ? `${colorClasses[mode.color as keyof typeof colorClasses]} text-white shadow-xl` 
                  : `bg-white/90 dark:bg-gray-800/90 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 shadow-lg ${colorClasses[mode.color as keyof typeof colorClasses]}`
              }`}
            >
              <Icon className="h-6 w-6" />
              <div className="text-center">
                <div className="text-sm font-semibold">{mode.label}</div>
                <div className="text-xs opacity-75 mt-1 leading-tight">{mode.description}</div>
              </div>
            </Button>
          );
        })}
      </div>

      {/* Active mode content with enhanced container */}
      <div className="min-h-[600px] transition-all duration-500">
        {renderActiveMode()}
      </div>

      {/* Significantly enhanced cognitive state overview */}
      <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-pink-200/50 dark:border-purple-500/30 shadow-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-gray-700 dark:text-gray-200 flex items-center space-x-3">
            <div className="relative">
              <Activity className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <span>Live Cognitive State Vector</span>
            <div className="flex items-center space-x-2 ml-auto">
              <BarChart3 className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-mono text-blue-600 dark:text-blue-400">
                Real-time Analysis
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl border border-blue-200/50 dark:border-blue-700/30 hover:shadow-lg transition-all duration-300">
              <div className="text-blue-600 dark:text-blue-400 text-xs font-semibold flex items-center space-x-2 mb-2">
                <TrendingUp className="h-3 w-3" />
                <span>Causal Network</span>
              </div>
              <div className="text-blue-800 dark:text-blue-200 font-mono text-2xl font-bold">{totalNodes}</div>
              <div className="text-blue-600 dark:text-blue-400 text-xs mt-2 space-y-1">
                <div>✓ {successNodes} successes</div>
                <div>💡 {insightNodes} insights</div>
                <div>⚠ {failureNodes} failures</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 p-4 rounded-xl border border-pink-200/50 dark:border-pink-700/30 hover:shadow-lg transition-all duration-300">
              <div className="text-pink-600 dark:text-pink-400 text-xs font-semibold flex items-center space-x-2 mb-2">
                <Zap className="h-3 w-3 animate-pulse" />
                <span>Synaptic Efficiency</span>
              </div>
              <div className="text-pink-800 dark:text-pink-200 font-mono text-2xl font-bold">{(dynamicEfficiency * 100).toFixed(1)}%</div>
              <div className="text-pink-600 dark:text-pink-400 text-xs mt-2">
                Dynamic calculation
                <div className="w-full bg-pink-200 dark:bg-pink-800 rounded-full h-1.5 mt-1">
                  <div 
                    className="bg-pink-500 h-1.5 rounded-full transition-all duration-1000" 
                    style={{ width: `${dynamicEfficiency * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-xl border border-purple-200/50 dark:border-purple-700/30 hover:shadow-lg transition-all duration-300">
              <div className="text-purple-600 dark:text-purple-400 text-xs font-semibold flex items-center space-x-2 mb-2">
                <Clock className="h-3 w-3" />
                <span>Reality Alignment</span>
              </div>
              <div className="text-purple-800 dark:text-purple-200 font-mono text-2xl font-bold">{(realityAlignment * 100).toFixed(1)}%</div>
              <div className="text-purple-600 dark:text-purple-400 text-xs mt-2">
                vs delusion baseline
                <div className="w-full bg-purple-200 dark:bg-purple-800 rounded-full h-1.5 mt-1">
                  <div 
                    className="bg-purple-500 h-1.5 rounded-full transition-all duration-1000" 
                    style={{ width: `${realityAlignment * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl border border-green-200/50 dark:border-green-700/30 hover:shadow-lg transition-all duration-300">
              <div className="text-green-600 dark:text-green-400 text-xs font-semibold flex items-center space-x-2 mb-2">
                <Activity className="h-3 w-3 animate-pulse" />
                <span>Learning Rate</span>
              </div>
              <div className="text-green-800 dark:text-green-200 font-mono text-2xl font-bold">{(learningRate * 100).toFixed(1)}%</div>
              <div className="text-green-600 dark:text-green-400 text-xs mt-2">
                Insight generation
                <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-1.5 mt-1">
                  <div 
                    className="bg-green-500 h-1.5 rounded-full transition-all duration-1000" 
                    style={{ width: `${learningRate * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced real-time pattern analysis */}
          {totalNodes > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-3 font-semibold flex items-center space-x-2">
                  <Brain className="h-3 w-3" />
                  <span>Cognitive Pattern Recognition</span>
                </div>
                <div className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                  {successNodes > insightNodes 
                    ? "🎯 Success-oriented execution pattern detected"
                    : insightNodes > failureNodes
                    ? "💡 Learning-focused exploration mode active"
                    : failureNodes > 0
                    ? "⚡ Failure-driven adaptation cycle engaged"
                    : "🔄 Building cognitive foundation..."
                  }
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Pattern confidence: {((Math.max(successNodes, insightNodes, failureNodes) / totalNodes) * 100).toFixed(1)}%
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-100 dark:from-amber-900/20 to-yellow-900/20 rounded-xl border border-amber-200 dark:border-amber-700 hover:shadow-lg transition-all duration-300">
                <div className="text-xs text-amber-600 dark:text-amber-400 mb-3 font-semibold flex items-center space-x-2">
                  <Sparkles className="h-3 w-3 animate-pulse" />
                  <span>Emergent Insights</span>
                </div>
                <div className="text-sm text-amber-800 dark:text-amber-200 font-medium">
                  {recentActivity > 0 
                    ? `🔥 ${recentActivity} decisions processed in last 5min`
                    : "🌟 Ready for new cognitive input"
                  }
                </div>
                <div className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                  {totalNodes > 5 ? "Rich dataset established" : "Building data foundation"}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Enhanced Synaptic Scoring component
const SynapticScoring = ({ cognitiveState, engine }: { cognitiveState: any; engine: CognitiveEngine }) => {
  const [realTimeScore, setRealTimeScore] = useState(0);
  const [dimensionScores, setDimensionScores] = useState({
    reality: 0,
    mission: 0,
    humility: 0,
    usefulness: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const nodes = cognitiveState.causalGraph;
      if (nodes.length > 0) {
        const avgScore = nodes.reduce((sum: number, node: any) => sum + node.synapticScore, 0) / nodes.length;
        setRealTimeScore(avgScore);
        
        // Calculate dimensional scores
        const totalNodes = nodes.length;
        const successRate = (nodes.filter((n: any) => n.type === 'success').length / totalNodes) * 100;
        const insightRate = (nodes.filter((n: any) => n.type === 'insight').length / totalNodes) * 100;
        const failureRate = (nodes.filter((n: any) => n.type === 'failure').length / totalNodes) * 100;
        
        setDimensionScores({
          reality: Math.min(95, successRate + (insightRate * 0.7)),
          mission: Math.min(95, 70 + (totalNodes * 2) + (successRate * 0.3)),
          humility: Math.min(95, insightRate + (failureRate * 0.8) + 25),
          usefulness: Math.min(95, 80 + (successRate * 0.15) + (avgScore * 10))
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [cognitiveState]);

  const totalNodes = cognitiveState.causalGraph.length;

  return (
    <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-orange-200/50 dark:border-orange-500/30 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-orange-600 dark:text-orange-400 flex items-center space-x-2">
          <Zap className="h-6 w-6 animate-pulse" />
          <span>Live Synaptic Efficiency Analysis</span>
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400 text-base">
          Real-time decision quality across reality, mission, humility, and usefulness dimensions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="text-center">
            <div className="relative inline-block">
              <div className="text-6xl font-mono text-orange-600 dark:text-orange-400 mb-3 font-bold">
                {totalNodes > 0 ? (realTimeScore * 100).toFixed(1) : (cognitiveState.synapticEfficiency * 100).toFixed(1)}%
              </div>
              <div className="absolute -top-2 -right-8">
                <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
              </div>
            </div>
            <div className="text-lg text-gray-600 dark:text-gray-400 font-semibold mb-2">Overall Synaptic Efficiency</div>
            <div className="text-sm text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 inline-block">
              📊 Based on {totalNodes} causal nodes • 🧠 Live neural processing
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-2xl border border-blue-200/50 dark:border-blue-700/30 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="text-sm text-blue-600 dark:text-blue-400 mb-3 font-semibold flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>Reality Alignment</span>
              </div>
              <div className="text-3xl font-mono text-blue-700 dark:text-blue-300 font-bold">{dimensionScores.reality.toFixed(1)}%</div>
              <div className="text-sm text-blue-600 dark:text-blue-400 mt-2">Success vs failure ratio</div>
              <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2 mt-3">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-1000" 
                  style={{ width: `${dimensionScores.reality}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-2xl border border-green-200/50 dark:border-green-700/30 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="text-sm text-green-600 dark:text-green-400 mb-3 font-semibold flex items-center space-x-2">
                <Layers className="h-4 w-4" />
                <span>Mission Coherence</span>
              </div>
              <div className="text-3xl font-mono text-green-700 dark:text-green-300 font-bold">{dimensionScores.mission.toFixed(1)}%</div>
              <div className="text-sm text-green-600 dark:text-green-400 mt-2">Strategic alignment</div>
              <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-2 mt-3">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-1000" 
                  style={{ width: `${dimensionScores.mission}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-2xl border border-purple-200/50 dark:border-purple-700/30 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="text-sm text-purple-600 dark:text-purple-400 mb-3 font-semibold flex items-center space-x-2">
                <Brain className="h-4 w-4" />
                <span>Intellectual Humility</span>
              </div>
              <div className="text-3xl font-mono text-purple-700 dark:text-purple-300 font-bold">{dimensionScores.humility.toFixed(1)}%</div>
              <div className="text-sm text-purple-600 dark:text-purple-400 mt-2">Learning from failures</div>
              <div className="w-full bg-purple-200 dark:bg-purple-800 rounded-full h-2 mt-3">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all duration-1000" 
                  style={{ width: `${dimensionScores.humility}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-6 rounded-2xl border border-yellow-200/50 dark:border-yellow-700/30 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="text-sm text-yellow-600 dark:text-yellow-400 mb-3 font-semibold flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Practical Usefulness</span>
              </div>
              <div className="text-3xl font-mono text-yellow-700 dark:text-yellow-300 font-bold">{dimensionScores.usefulness.toFixed(1)}%</div>
              <div className="text-sm text-yellow-600 dark:text-yellow-400 mt-2">Real-world impact</div>
              <div className="w-full bg-yellow-200 dark:bg-yellow-800 rounded-full h-2 mt-3">
                <div 
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-1000" 
                  style={{ width: `${dimensionScores.usefulness}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
