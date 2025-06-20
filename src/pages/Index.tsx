
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 dark:from-gray-900 dark:to-purple-900 relative overflow-hidden transition-colors duration-500">
      {/* Animated Geometric Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating animated shapes */}
        <div className="absolute top-10 right-20 w-32 h-32 bg-pink-200/30 dark:bg-pink-400/20 rotate-45 rounded-lg animate-pulse" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
        <div className="absolute top-40 left-10 w-24 h-24 bg-purple-200/20 dark:bg-purple-300/20 rotate-12 rounded-lg animate-bounce" style={{ animationDelay: '1s', animationDuration: '6s' }}></div>
        <div className="absolute bottom-32 right-40 w-40 h-40 bg-pink-300/20 dark:bg-pink-500/20 -rotate-12 rounded-lg animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-blue-200/30 dark:bg-blue-400/20 rotate-45 rounded-lg animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '7s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-pink-400/20 dark:bg-pink-300/20 rotate-45 rounded-lg animate-pulse" style={{ animationDelay: '3s', animationDuration: '4.5s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-purple-300/20 dark:bg-purple-400/20 -rotate-45 rounded-lg animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '6.5s' }}></div>
        
        {/* Additional animated geometric elements */}
        <div className="absolute top-1/4 left-1/2 w-12 h-12 bg-gradient-to-r from-pink-300/30 to-purple-300/30 dark:from-pink-400/20 dark:to-purple-400/20 rotate-45 rounded-lg animate-spin" style={{ animationDuration: '12s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-36 h-36 bg-gradient-to-br from-blue-200/20 to-pink-200/20 dark:from-blue-300/15 dark:to-pink-300/15 rotate-12 rounded-lg animate-pulse" style={{ animationDelay: '2.5s', animationDuration: '8s' }}></div>
        <div className="absolute top-3/4 left-1/4 w-14 h-14 bg-gradient-to-r from-purple-200/30 to-blue-200/30 dark:from-purple-300/20 dark:to-blue-300/20 -rotate-12 rounded-lg animate-bounce" style={{ animationDelay: '4s', animationDuration: '5.5s' }}></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-6">
          <Header />
          
          {/* App Description */}
          <div className="text-center mb-8 px-4">
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium max-w-4xl mx-auto leading-relaxed">
              First Signal is an app that helps builders, founders, and deep thinkers make better decisions by showing what's real, not what's comfortable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
            <div className="lg:col-span-3">
              {groqApiKey ? (
                <CognitionMatrix groqApiKey={groqApiKey} />
              ) : (
                <div className="flex items-center justify-center h-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-pink-200/50 dark:border-purple-500/30 shadow-lg">
                  <div className="text-center">
                    <div className="text-gray-600 dark:text-gray-300 mb-2">Loading Groq Integration...</div>
                    <div className="animate-pulse w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded mx-auto"></div>
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
