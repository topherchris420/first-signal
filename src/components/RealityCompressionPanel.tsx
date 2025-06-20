
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
      setKernel('Error: Unable to compress goal. Please check your Groq API connection.');
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
      setExpansion('Error: Unable to expand kernel. Please check your Groq API connection.');
    }
    setIsExpanding(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      action();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-800 dark:text-green-400">
            <Target className="h-5 w-5" />
            <span>Reality Compression Engine</span>
            <Zap className="h-4 w-4 text-yellow-400" />
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Compress complex goals to irreducible kernels, then expand using first principles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block font-medium">Complex Goal or Idea</label>
            <Textarea
              placeholder="Describe your complex goal, startup idea, or strategy with all its nuances, assumptions, and dependencies..."
              value={complexGoal}
              onChange={(e) => setComplexGoal(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e, compress)}
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 min-h-[120px] resize-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center justify-between mt-3">
              <Button
                onClick={compress}
                disabled={!complexGoal.trim() || isCompressing}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
              >
                <Minimize2 className="h-4 w-4 mr-2" />
                {isCompressing ? 'Compressing...' : 'Compress to Core'}
              </Button>
              <span className="text-xs text-gray-500 dark:text-gray-400">Ctrl+Enter to submit</span>
            </div>
          </div>

          {kernel && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block font-medium">Irreducible Kernel</label>
              <div className="bg-green-50 dark:bg-gray-800 border border-green-200 dark:border-green-500/30 rounded-lg p-4 mb-3">
                <div className="text-green-800 dark:text-green-300 text-sm leading-relaxed">{kernel}</div>
              </div>
              <Button
                onClick={expand}
                disabled={isExpanding}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
              >
                <Maximize2 className="h-4 w-4 mr-2" />
                {isExpanding ? 'Expanding...' : 'Expand with First Principles'}
              </Button>
            </div>
          )}

          {expansion && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block font-medium">First Principles Scaffold</label>
              <div className="bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-blue-500/30 rounded-lg p-4">
                <div className="text-blue-800 dark:text-blue-300 text-sm leading-relaxed whitespace-pre-wrap">{expansion}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
