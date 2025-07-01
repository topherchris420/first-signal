
import React, { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { ModuleGrid } from '@/components/ModuleGrid';
import { CognitionMatrix } from '@/components/CognitionMatrix';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { RefreshCw, Zap } from 'lucide-react';

const Index = () => {
  const [groqApiKey, setGroqApiKey] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Get Groq API key from Supabase secrets
    const getGroqKey = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.functions.invoke('get-groq-key');
        if (data?.apiKey) {
          setGroqApiKey(data.apiKey);
          setError('');
        } else if (error) {
          throw error;
        }
      } catch (error) {
        console.error('Failed to get Groq API key:', error);
        setError('Failed to connect to Groq. Using demo mode.');
        // Fallback - try to get from environment
        setGroqApiKey('dummy-key-for-demo');
      } finally {
        setIsLoading(false);
      }
    };

    getGroqKey();
  }, []);

  const retryConnection = () => {
    setError('');
    setIsLoading(true);
    // Re-trigger the useEffect
    window.location.reload();
  };

  return (
    <div className="min-h-screen relative overflow-hidden transition-all duration-700 ease-out">
      {/* Enhanced Van Gogh-inspired background with better gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-200 via-orange-300 to-red-400 dark:from-amber-700 dark:via-orange-700 dark:to-red-700 animate-pulse" style={{ animationDuration: '8s' }}></div>
      
      {/* Enhanced swirling sky texture overlay with more depth */}
      <div className="absolute inset-0 opacity-70 dark:opacity-50 transition-opacity duration-500" style={{
        backgroundImage: `
          radial-gradient(ellipse at 25% 35%, rgba(255, 215, 0, 0.4) 0%, transparent 60%),
          radial-gradient(ellipse at 75% 25%, rgba(255, 165, 0, 0.5) 0%, transparent 50%),
          radial-gradient(ellipse at 65% 75%, rgba(255, 69, 0, 0.4) 0%, transparent 55%),
          radial-gradient(ellipse at 35% 80%, rgba(255, 140, 0, 0.3) 0%, transparent 45%),
          linear-gradient(135deg, transparent 35%, rgba(255, 140, 0, 0.15) 50%, transparent 65%),
          linear-gradient(-135deg, transparent 35%, rgba(255, 215, 0, 0.15) 50%, transparent 65%),
          linear-gradient(45deg, rgba(255, 165, 0, 0.1) 0%, transparent 25%, rgba(255, 215, 0, 0.1) 50%, transparent 75%),
          conic-gradient(from 45deg at 50% 50%, transparent, rgba(255, 140, 0, 0.1), transparent)
        `
      }}></div>

      {/* Enhanced animated geometric elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Larger, more dynamic geometric shapes */}
        <div className="absolute top-16 right-24 w-48 h-36 bg-gradient-to-br from-orange-300/25 to-red-400/25 dark:from-orange-400/20 dark:to-red-500/20 transform rotate-12 rounded-2xl animate-pulse shadow-2xl backdrop-blur-sm" style={{ animationDelay: '0s', animationDuration: '6s' }}></div>
        <div className="absolute top-40 left-16 w-36 h-48 bg-gradient-to-br from-yellow-300/30 to-orange-400/30 dark:from-yellow-400/25 dark:to-orange-500/25 transform -rotate-6 rounded-2xl animate-pulse shadow-2xl backdrop-blur-sm" style={{ animationDelay: '2s', animationDuration: '8s' }}></div>
        <div className="absolute bottom-48 right-12 w-40 h-32 bg-gradient-to-br from-red-300/25 to-orange-400/25 dark:from-red-400/20 dark:to-orange-500/20 transform rotate-6 rounded-2xl animate-pulse shadow-2xl backdrop-blur-sm" style={{ animationDelay: '4s', animationDuration: '7s' }}></div>
        <div className="absolute top-1/3 left-1/3 w-28 h-24 bg-gradient-to-br from-amber-300/20 to-yellow-400/20 dark:from-amber-400/15 dark:to-yellow-500/15 transform rotate-45 rounded-xl animate-pulse shadow-xl backdrop-blur-sm" style={{ animationDelay: '1s', animationDuration: '9s' }}></div>
        
        {/* Enhanced worker/activity elements with better animations */}
        <div className="absolute bottom-32 left-16 w-10 h-10 bg-gradient-to-r from-blue-500/40 to-cyan-500/40 dark:from-blue-400/30 dark:to-cyan-400/30 rounded-full animate-bounce shadow-lg backdrop-blur-sm" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
        <div className="absolute bottom-36 left-32 w-8 h-8 bg-gradient-to-r from-blue-600/40 to-indigo-500/40 dark:from-blue-500/30 dark:to-indigo-400/30 rounded-full animate-bounce shadow-lg backdrop-blur-sm" style={{ animationDelay: '2.5s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-28 left-48 w-9 h-9 bg-gradient-to-r from-blue-400/40 to-purple-500/40 dark:from-blue-300/30 dark:to-purple-400/30 rounded-full animate-bounce shadow-lg backdrop-blur-sm" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
        <div className="absolute bottom-40 left-64 w-7 h-7 bg-gradient-to-r from-cyan-400/40 to-blue-500/40 dark:from-cyan-300/30 dark:to-blue-400/30 rounded-full animate-bounce shadow-lg backdrop-blur-sm" style={{ animationDelay: '3s', animationDuration: '2.8s' }}></div>
        
        {/* Enhanced flowing water elements */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-blue-300/25 via-cyan-300/20 to-transparent dark:from-blue-400/20 dark:via-cyan-400/15 backdrop-blur-sm"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-teal-200/20 via-blue-200/15 to-transparent dark:from-teal-300/15 dark:via-blue-300/10 animate-pulse" style={{ animationDuration: '12s' }}></div>
        
        {/* Enhanced sun element */}
        <div className="absolute top-12 right-16 w-32 h-32 bg-gradient-to-r from-yellow-400/50 to-orange-400/50 dark:from-yellow-500/40 dark:to-orange-500/40 rounded-full animate-pulse shadow-2xl backdrop-blur-sm" style={{ animationDelay: '1s', animationDuration: '4s' }}>
          <div className="absolute inset-2 bg-gradient-to-r from-yellow-300/60 to-amber-300/60 dark:from-yellow-400/50 dark:to-amber-400/50 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
        </div>
        
        {/* Additional floating elements for more atmosphere */}
        <div className="absolute top-1/2 right-1/4 w-20 h-16 bg-gradient-to-br from-orange-400/20 to-red-400/20 dark:from-orange-500/15 dark:to-red-500/15 transform rotate-45 rounded-lg animate-pulse shadow-lg backdrop-blur-sm" style={{ animationDelay: '6s', animationDuration: '11s' }}></div>
        <div className="absolute top-3/4 left-1/5 w-24 h-18 bg-gradient-to-br from-yellow-400/25 to-orange-400/25 dark:from-yellow-500/20 dark:to-orange-500/20 transform -rotate-12 rounded-lg animate-pulse shadow-lg backdrop-blur-sm" style={{ animationDelay: '8s', animationDuration: '7s' }}></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-6 space-y-8">
          <Header />
          
          {/* Enhanced App Description with better typography and effects */}
          <div className="text-center mb-12 px-4">
            <div className="max-w-5xl mx-auto">
              <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-100 font-medium leading-relaxed bg-white/40 dark:bg-gray-900/40 backdrop-blur-md rounded-2xl p-8 border border-white/30 dark:border-gray-700/30 shadow-2xl transition-all duration-500 hover:bg-white/50 dark:hover:bg-gray-900/50 hover:shadow-3xl hover:scale-[1.02]">
                <span className="block text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-orange-600 dark:from-gray-100 dark:to-orange-400 bg-clip-text text-transparent mb-4">
                  First Signal
                </span>
                <span className="text-lg md:text-xl">
                  An app that helps builders, founders, and deep thinkers make better decisions by showing what's real, not what's comfortable.
                </span>
                <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span>Reality-Constrained Decision Engine</span>
                  <Zap className="h-4 w-4 text-yellow-500" />
                </div>
              </p>
            </div>
          </div>
          
          {/* Enhanced main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-12">
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-80 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl border border-white/40 dark:border-gray-700/40 shadow-2xl">
                  <div className="text-center space-y-6">
                    <div className="relative">
                      <div className="text-gray-700 dark:text-gray-200 mb-4 text-lg font-medium">Initializing Cognitive Matrix...</div>
                      <div className="flex items-center justify-center space-x-3">
                        <div className="animate-spin w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full relative">
                          <div className="absolute inset-1 bg-white dark:bg-gray-800 rounded-full"></div>
                        </div>
                        <div className="animate-pulse w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                        <div className="animate-bounce w-4 h-4 bg-gradient-to-r from-red-400 to-pink-500 rounded-full"></div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
                      Establishing neural pathways and reality constraints...
                    </div>
                  </div>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center h-80 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl border border-red-200/50 dark:border-red-700/50 shadow-2xl">
                  <div className="text-center space-y-6">
                    <div className="text-red-600 dark:text-red-400 mb-4 text-lg font-medium">{error}</div>
                    <Button 
                      onClick={retryConnection}
                      className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Retry Connection
                    </Button>
                    <div className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
                      Running in demo mode with limited functionality
                    </div>
                  </div>
                </div>
              ) : (
                <CognitionMatrix groqApiKey={groqApiKey} />
              )}
            </div>
            <div className="lg:col-span-1">
              <ModuleGrid />
            </div>
          </div>

          {/* Enhanced footer with better styling */}
          <div className="text-center mt-16 pb-8">
            <div className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-gray-700/20 shadow-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <span>Built with</span>
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium text-orange-600 dark:text-orange-400">Ultra-High Interference AI</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  Reality-first decision making for the builders of tomorrow
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
