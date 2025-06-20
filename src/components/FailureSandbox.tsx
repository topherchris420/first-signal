
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, TrendingDown, Clock, Lightbulb } from 'lucide-react';
import { FailureVisualization } from './FailureVisualization';

interface FailureAnalysis {
  failureProbability: number;
  primaryRisks: string[];
  causalChain: string[];
  recommendations: string[];
  timeToFailure: string;
}

export const FailureSandbox = () => {
  const [strategy, setStrategy] = useState('');
  const [analysis, setAnalysis] = useState<FailureAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeStrategy = async () => {
    if (!strategy.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate Groq API call with realistic analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockAnalysis: FailureAnalysis = {
      failureProbability: Math.floor(Math.random() * 15) + 85, // 85-99%
      primaryRisks: [
        'Market timing misalignment',
        'Insufficient product-market fit validation',
        'Capital runway optimization failure',
        'Team scaling premature commitment'
      ],
      causalChain: [
        'Hypothesis → Market assumption',
        'Assumption → Resource allocation',
        'Allocation → Execution commitment',
        'Commitment → Sunk cost escalation',
        'Escalation → Reality collision'
      ],
      recommendations: [
        'Reduce scope to testable minimum viable assumptions',
        'Implement weekly reality-check protocols',
        'Define failure criteria before commitment',
        'Establish resource withdrawal triggers'
      ],
      timeToFailure: '3-8 months'
    };
    
    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <span>Failure Sandbox</span>
          </CardTitle>
          <CardDescription className="text-gray-400">
            Input your strategy and receive probabilistic failure analysis with causal chains
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Describe your startup strategy, product launch plan, or business decision..."
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            className="bg-gray-800 border-gray-700 text-gray-100 min-h-[120px] resize-none"
          />
          <Button
            onClick={analyzeStrategy}
            disabled={!strategy.trim() || isAnalyzing}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            {isAnalyzing ? 'Analyzing Reality...' : 'Run Failure Analysis'}
          </Button>
        </CardContent>
      </Card>

      {analysis && (
        <div className="grid gap-4">
          <Card className="bg-gray-900 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center space-x-2">
                <TrendingDown className="h-5 w-5" />
                <span>Failure Probability: {analysis.failureProbability}%</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress 
                value={analysis.failureProbability} 
                className="h-3 bg-gray-800"
              />
              <div className="mt-4 flex items-center space-x-2 text-sm text-gray-400">
                <Clock className="h-4 w-4" />
                <span>Estimated time to failure: {analysis.timeToFailure}</span>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-orange-400 text-sm">Primary Risk Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-300">
                  {analysis.primaryRisks.map((risk, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-orange-400 mt-1">•</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-blue-400 text-sm flex items-center space-x-2">
                  <Lightbulb className="h-4 w-4" />
                  <span>Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-300">
                  {analysis.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-blue-400 mt-1">→</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <FailureVisualization causalChain={analysis.causalChain} />
        </div>
      )}
    </div>
  );
};
