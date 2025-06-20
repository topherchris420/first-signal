
import React, { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { ModuleGrid } from '@/components/ModuleGrid';
import { CognitionMatrix } from '@/components/CognitionMatrix';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const [groqApiKey, setGroqApiKey] = useState<string>('');

  useEffect(() => {
    // Get Groq API key from Supabase secrets
    const getGroqKey = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-groq-key');
        if (data?.apiKey) {
          setGroqApiKey(data.apiKey);
        }
      } catch (error) {
        console.error('Failed to get Groq API key:', error);
        // Fallback - try to get from environment
        setGroqApiKey('dummy-key-for-demo');
      }
    };

    getGroqKey();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-500">
      {/* Artistic Van Gogh-inspired background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-orange-400 to-red-400 dark:from-yellow-600 dark:via-orange-600 dark:to-red-600"></div>
      
      {/* Swirling sky texture overlay */}
      <div className="absolute inset-0 opacity-60 dark:opacity-40" style={{
        backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(255, 215, 0, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 165, 0, 0.4) 0%, transparent 40%),
          radial-gradient(circle at 60% 70%, rgba(255, 69, 0, 0.3) 0%, transparent 50%),
          linear-gradient(45deg, transparent 40%, rgba(255, 140, 0, 0.1) 50%, transparent 60%),
          linear-gradient(-45deg, transparent 40%, rgba(255, 215, 0, 0.1) 50%, transparent 60%)
        `
      }}></div>

      {/* Animated geometric elements inspired by the painting's structure */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large geometric shapes representing buildings/structures */}
        <div className="absolute top-20 right-32 w-40 h-32 bg-gradient-to-br from-orange-300/20 to-red-400/20 dark:from-orange-400/15 dark:to-red-500/15 transform rotate-12 rounded-lg animate-pulse" style={{ animationDelay: '0s', animationDuration: '6s' }}></div>
        <div className="absolute top-32 left-24 w-32 h-40 bg-gradient-to-br from-yellow-300/25 to-orange-400/25 dark:from-yellow-400/20 dark:to-orange-500/20 transform -rotate-6 rounded-lg animate-pulse" style={{ animationDelay: '2s', animationDuration: '8s' }}></div>
        <div className="absolute bottom-40 right-20 w-36 h-28 bg-gradient-to-br from-red-300/20 to-orange-400/20 dark:from-red-400/15 dark:to-orange-500/15 transform rotate-6 rounded-lg animate-pulse" style={{ animationDelay: '4s', animationDuration: '7s' }}></div>
        
        {/* Smaller elements representing workers/activity */}
        <div className="absolute bottom-32 left-16 w-8 h-8 bg-blue-500/30 dark:bg-blue-400/20 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
        <div className="absolute bottom-36 left-32 w-6 h-6 bg-blue-600/30 dark:bg-blue-500/20 rounded-full animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-28 left-48 w-7 h-7 bg-blue-400/30 dark:bg-blue-300/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
        
        {/* Flowing elements representing water/movement */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-300/20 via-cyan-300/15 to-transparent dark:from-blue-400/15 dark:via-cyan-400/10"></div>
        
        {/* Sun-like radial element */}
        <div className="absolute top-16 right-20 w-24 h-24 bg-gradient-to-r from-yellow-400/40 to-orange-400/40 dark:from-yellow-500/30 dark:to-orange-500/30 rounded-full animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        
        {/* Additional textural elements */}
        <div className="absolute top-1/3 left-1/4 w-20 h-16 bg-gradient-to-br from-orange-400/15 to-red-400/15 dark:from-orange-500/10 dark:to-red-500/10 transform rotate-45 rounded-lg animate-pulse" style={{ animationDelay: '3s', animationDuration: '9s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-16 h-20 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 dark:from-yellow-500/15 dark:to-orange-500/15 transform -rotate-12 rounded-lg animate-pulse" style={{ animationDelay: '5s', animationDuration: '6s' }}></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-6">
          <Header />
          
          {/* App Description */}
          <div className="text-center mb-8 px-4">
            <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200 font-medium max-w-4xl mx-auto leading-relaxed bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-gray-700/20">
              First Signal is an app that helps builders, founders, and deep thinkers make better decisions by showing what's real, not what's comfortable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
            <div className="lg:col-span-3">
              {groqApiKey ? (
                <CognitionMatrix groqApiKey={groqApiKey} />
              ) : (
                <div className="flex items-center justify-center h-64 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/30 dark:border-gray-700/30 shadow-lg">
                  <div className="text-center">
                    <div className="text-gray-700 dark:text-gray-200 mb-2">Loading Groq Integration...</div>
                    <div className="animate-pulse w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded mx-auto"></div>
                  </div>
                </div>
              )}
            </div>
            <div className="lg:col-span-1">
              <ModuleGrid />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
