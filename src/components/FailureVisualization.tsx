
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Zap } from 'lucide-react';

interface FailureVisualizationProps {
  causalChain: string[];
}

export const FailureVisualization = ({ causalChain }: FailureVisualizationProps) => {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-yellow-400 text-sm flex items-center space-x-2">
          <Zap className="h-4 w-4" />
          <span>Causal Failure Chain</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center gap-2">
          {causalChain.map((step, index) => (
            <React.Fragment key={index}>
              <div className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 min-w-0 flex-shrink-0">
                {step}
              </div>
              {index < causalChain.length - 1 && (
                <ArrowRight className="h-4 w-4 text-red-400 flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="mt-4 p-3 bg-red-950/30 border border-red-500/30 rounded-lg">
          <p className="text-xs text-red-300">
            <strong>Reality Check:</strong> Each step increases commitment while decreasing ability to pivot. 
            The longer the chain, the higher the sunk cost when reality intervenes.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
