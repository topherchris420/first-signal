
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { GitBranch, Plus, TrendingUp, TrendingDown, Lightbulb, AlertTriangle, Send } from 'lucide-react';
import { CognitiveEngine, CausalNode } from '@/lib/cognitiveEngine';

interface CausalGraphViewProps {
  engine: CognitiveEngine;
}

export const CausalGraphView = ({ engine }: CausalGraphViewProps) => {
  const [decision, setDecision] = useState('');
  const [outcome, setOutcome] = useState('');
  const [nodeType, setNodeType] = useState<CausalNode['type']>('success');
  const [patterns, setPatterns] = useState<Array<{pattern: string; frequency: number; impact: number}>>([]);

  useEffect(() => {
    setPatterns(engine.getEmergentPatterns());
  }, [engine]);

  const addNode = () => {
    console.log('addNode called with:', { decision, outcome, nodeType });
    
    if (!decision.trim() || !outcome.trim()) {
      console.log('Form validation failed - missing decision or outcome');
      return;
    }
    
    console.log('Adding node to engine...');
    engine.addCausalNode(decision, outcome, nodeType);
    setPatterns(engine.getEmergentPatterns());
    setDecision('');
    setOutcome('');
    console.log('Node added successfully, form cleared');
  };

  const getTypeIcon = (type: CausalNode['type']) => {
    switch (type) {
      case 'success': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'failure': return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'insight': return <Lightbulb className="h-4 w-4 text-yellow-500" />;
      case 'delusion': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
    }
  };

  const getTypeColor = (type: CausalNode['type']) => {
    switch (type) {
      case 'success': return 'border-green-500/30 bg-green-500/5 text-green-700 dark:text-green-400';
      case 'failure': return 'border-red-500/30 bg-red-500/5 text-red-700 dark:text-red-400';
      case 'insight': return 'border-yellow-500/30 bg-yellow-500/5 text-yellow-700 dark:text-yellow-400';
      case 'delusion': return 'border-orange-500/30 bg-orange-500/5 text-orange-700 dark:text-orange-400';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    console.log('Key pressed:', e.key, 'Ctrl:', e.ctrlKey, 'Meta:', e.metaKey);
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      console.log('Ctrl+Enter detected, calling addNode');
      addNode();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted via handleSubmit');
    addNode();
  };

  // Simplified form validation
  const isFormValid = decision.trim().length > 0 && outcome.trim().length > 0;

  console.log('Render state:', { decision, outcome, nodeType, isFormValid });

  return (
    <div className="space-y-6">
      <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-800 dark:text-blue-400">
            <GitBranch className="h-5 w-5" />
            <span>Causal Memory Graph</span>
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Record decisions and outcomes as causal nodes. Watch emergent patterns unfold.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block font-medium">Decision Made</label>
                <Textarea
                  placeholder="Describe the decision you made..."
                  value={decision}
                  onChange={(e) => {
                    console.log('Decision changed:', e.target.value);
                    setDecision(e.target.value);
                  }}
                  onKeyDown={handleKeyPress}
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 resize-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block font-medium">Outcome Observed</label>
                <Textarea
                  placeholder="What was the result or outcome..."
                  value={outcome}
                  onChange={(e) => {
                    console.log('Outcome changed:', e.target.value);
                    setOutcome(e.target.value);
                  }}
                  onKeyDown={handleKeyPress}
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 resize-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block font-medium">Node Type</label>
                <div className="flex flex-wrap gap-2">
                  {(['success', 'failure', 'insight', 'delusion'] as const).map((type) => (
                    <Button
                      key={type}
                      type="button"
                      variant={nodeType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        console.log('Node type changed to:', type);
                        setNodeType(type);
                      }}
                      className={`flex items-center space-x-1 ${nodeType === type ? getTypeColor(type) : 'border-gray-300 dark:border-gray-700'}`}
                    >
                      {getTypeIcon(type)}
                      <span className="capitalize">{type}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className={`flex items-center space-x-2 px-6 py-2 text-white font-medium rounded-lg transition-all duration-300 ${
                    isFormValid 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105' 
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="h-4 w-4" />
                  <span>Submit Node</span>
                </Button>
                <span className="text-xs text-gray-500 dark:text-gray-400">Ctrl+Enter to submit</span>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {patterns.length > 0 && (
        <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-purple-600 dark:text-purple-400">Emergent Patterns</CardTitle>
            <CardDescription>Recurring decision patterns and their impact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {patterns.map((pattern, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex-1">
                    <div className="text-sm text-gray-800 dark:text-gray-200">{pattern.pattern}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Frequency: {pattern.frequency}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono text-purple-600 dark:text-purple-400">
                      Impact: {(pattern.impact * 100).toFixed(1)}%
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
