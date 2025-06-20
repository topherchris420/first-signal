
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, TrendingDown, Clock } from 'lucide-react';
import { GroqService } from '@/services/groqService';

interface DelusionSimulatorProps {
  groq: GroqService;
}

export const DelusionSimulator = ({ groq }: DelusionSimulatorProps) => {
  const [assumption, setAssumption] = useState('');
  const [timeHorizon, setTimeHorizon] = useState('6 months');
  const [simulation, setSimulation] = useState<Array<{step: number; outcome: string; decay: number}>>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const runSimulation = async () => {
    if (!assumption.trim()) return;
    
    setIsSimulating(true);
    try {
      const result = await groq.simulateDelusion(assumption, timeHorizon);
      setSimulation(result);
    } catch (error) {
      console.error('Simulation failed:', error);
      setSimulation([
        { step: 1, outcome: "Initial confidence based on false assumption", decay: 0.15 },
        { step: 2, outcome: "First reality friction points emerge", decay: 0.35 },
        { step: 3, outcome: "Cognitive dissonance creates stress", decay: 0.60 },
        { step: 4, outcome: "System integrity compromised (Error: Check Groq API)", decay: 0.85 }
      ]);
    }
    setIsSimulating(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      runSimulation();
    }
  };

  const getDecayColor = (decay: number) => {
    if (decay < 0.3) return 'text-yellow-500';
    if (decay < 0.6) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-800 dark:text-red-400">
            <Eye className="h-5 w-5" />
            <span>Delusion Injection Simulator</span>
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Inject false assumptions and observe decision decay over time
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block font-medium">False Foundational Assumption</label>
            <Textarea
              placeholder="Enter a false assumption to inject into the decision-making process..."
              value={assumption}
              onChange={(e) => setAssumption(e.target.value)}
              onKeyDown={handleKeyPress}
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 min-h-[100px] resize-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block font-medium">Time Horizon</label>
            <Select value={timeHorizon} onValueChange={setTimeHorizon}>
              <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
                <SelectItem value="1 month">1 Month</SelectItem>
                <SelectItem value="3 months">3 Months</SelectItem>
                <SelectItem value="6 months">6 Months</SelectItem>
                <SelectItem value="1 year">1 Year</SelectItem>
                <SelectItem value="2 years">2 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Button
              onClick={runSimulation}
              disabled={!assumption.trim() || isSimulating}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
            >
              <TrendingDown className="h-4 w-4 mr-2" />
              {isSimulating ? 'Simulating Decay...' : 'Run Delusion Simulation'}
            </Button>
            <span className="text-xs text-gray-500 dark:text-gray-400">Ctrl+Enter to submit</span>
          </div>
        </CardContent>
      </Card>

      {simulation.length > 0 && (
        <Card className="bg-white/90 dark:bg-gray-900/90 border-red-200 dark:border-red-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400">Decay Timeline</CardTitle>
            <CardDescription>Decision integrity decay over {timeHorizon}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {simulation.map((step, index) => (
                <div key={index} className="flex items-start space-x-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-center w-8 h-8 bg-red-500 rounded-full text-white text-sm font-bold">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-800 dark:text-gray-200 text-sm">{step.outcome}</div>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs text-gray-600 dark:text-gray-400">Decay Level:</span>
                      <span className={`text-sm font-mono ${getDecayColor(step.decay)}`}>
                        {(step.decay * 100).toFixed(1)}%
                      </span>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            step.decay < 0.3 ? 'bg-yellow-400' : 
                            step.decay < 0.6 ? 'bg-orange-400' : 'bg-red-400'
                          }`}
                          style={{ width: `${step.decay * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
