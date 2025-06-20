
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Target, Minimize2, Maximize2, Zap } from 'lucide-react';
import { GroqService } from '@/services/groqService';

interface RealityCompressionPanelProps {
  groq: GroqService;
}

export const RealityCompressionPanel = ({ groq }: RealityCompressionPanelProps) => {
  const [complexGoal, setComplexGoal] = useState('');
  const [kernel, setKernel] = useState('');
  const [expansion, setExpansion] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);

  const compress = async () => {
    if (!complexGoal.trim()) return;
    
    setIsCompressing(true);
    try {
      const compressed = await groq.compress(complexGoal);
      setKernel(compressed);
    } catch (error) {
      console.error('Compression failed:', error);
      setKernel('Error: Unable to compress goal');
    }
    setIsCompressing(false);
  };

  const expand = async () => {
    if (!kernel.trim()) return;
    
    setIsExpanding(true);
    try {
      const expanded = await groq.expand(kernel);
      setExpansion(expanded);
    } catch (error) {
      console.error('Expansion failed:', error);
      setExpansion('Error: Unable to expand kernel');
    }
    setIsExpanding(false);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-400">
            <Target className="h-5 w-5" />
            <span>Reality Compression Mode</span>
            <Zap className="h-4 w-4 text-yellow-400" />
          </CardTitle>
          <CardDescription className="text-gray-400">
            Compress complex goals to irreducible kernels, then expand using first principles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Complex Goal</label>
            <Textarea
              placeholder="Describe your complex goal with all its nuances, assumptions, and dependencies..."
              value={complexGoal}
              onChange={(e) => setComplexGoal(e.target.value)}
              className="bg-gray-800 border-gray-700 text-gray-100 min-h-[120px] resize-none"
            />
            <Button
              onClick={compress}
              disabled={!complexGoal.trim() || isCompressing}
              className="mt-3 bg-green-600 hover:bg-green-700"
            >
              <Minimize2 className="h-4 w-4 mr-2" />
              {isCompressing ? 'Compressing...' : 'Compress to Kernel'}
            </Button>
          </div>

          {kernel && (
            <div className="border-t border-gray-700 pt-6">
              <label className="text-sm text-gray-300 mb-2 block">Irreducible Kernel</label>
              <div className="bg-gray-800 border border-green-500/30 rounded-lg p-4 mb-3">
                <div className="text-green-300 text-sm leading-relaxed">{kernel}</div>
              </div>
              <Button
                onClick={expand}
                disabled={isExpanding}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Maximize2 className="h-4 w-4 mr-2" />
                {isExpanding ? 'Expanding...' : 'Expand with First Principles'}
              </Button>
            </div>
          )}

          {expansion && (
            <div className="border-t border-gray-700 pt-6">
              <label className="text-sm text-gray-300 mb-2 block">First Principles Scaffold</label>
              <div className="bg-gray-800 border border-blue-500/30 rounded-lg p-4">
                <div className="text-blue-300 text-sm leading-relaxed whitespace-pre-wrap">{expansion}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
