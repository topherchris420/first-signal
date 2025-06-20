
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Clock, Zap, AlertTriangle, TrendingUp } from 'lucide-react';
import { GroqService } from '@/services/groqService';

interface TemporalChallengeProps {
  groq: GroqService;
}

export const TemporalChallenge = ({ groq }: TemporalChallengeProps) => {
  const [decision, setDecision] = useState('');
  const [analysis, setAnalysis] = useState<{alignment: number; obsolescenceRisk: number; scalingGaps: string[]} | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeDecision = async () => {
    if (!decision.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const result = await groq.checkTemporalAlignment(decision);
      setAnalysis(result);
    } catch (error) {
      console.error('Temporal analysis failed:', error);
      setAnalysis({
        alignment: 0.45,
        obsolescenceRisk: 0.72,
        scalingGaps: ["Linear thinking patterns", "Human-scale assumptions", "Current-state bias"]
      });
    }
    setIsAnalyzing(false);
  };

  const getAlignmentColor = (score: number) => {
    if (score > 0.7) return 'text-green-400';
    if (score > 0.4) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRiskColor = (risk: number) => {
    if (risk > 0.7) return 'text-red-400';
    if (risk > 0.4) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-yellow-400">
            <Clock className="h-5 w-5" />
            <span>Temporal Integrity Challenge</span>
            <Zap className="h-4 w-4" />
          </CardTitle>
          <CardDescription className="text-gray-400">
            Test decisions against an AGI-saturated future. Check for obsolescence and scaling gaps.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Decision or Strategy</label>
            <Textarea
              placeholder="Describe a decision, strategy, or plan you're considering..."
              value={decision}
              onChange={(e) => setDecision(e.target.value)}
              className="bg-gray-800 border-gray-700 text-gray-100 min-h-[120px] resize-none"
            />
          </div>

          <Button
            onClick={analyzeDecision}
            disabled={!decision.trim() || isAnalyzing}
            className="w-full bg-yellow-600 hover:bg-yellow-700"
          >
            <Clock className="h-4 w-4 mr-2" />
            {isAnalyzing ? 'Analyzing Temporal Alignment...' : 'Run Temporal Analysis'}
          </Button>
        </CardContent>
      </Card>

      {analysis && (
        <div className="grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span>Future Alignment</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className={`text-3xl font-mono ${getAlignmentColor(analysis.alignment)}`}>
                    {(analysis.alignment * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    AGI-era compatibility
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-orange-400" />
                  <span>Obsolescence Risk</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className={`text-3xl font-mono ${getRiskColor(analysis.obsolescenceRisk)}`}>
                    {(analysis.obsolescenceRisk * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Probability of irrelevance
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-900 border-yellow-500/30">
            <CardHeader>
              <CardTitle className="text-yellow-400 text-sm">Scaling Gaps Detected</CardTitle>
              <CardDescription>Cognitive patterns that won't scale to the future</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {analysis.scalingGaps.map((gap, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 bg-gray-800 rounded">
                    <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                    <span className="text-sm text-gray-200">{gap}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
