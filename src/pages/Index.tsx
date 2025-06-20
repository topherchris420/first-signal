
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 relative overflow-hidden">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-20 w-32 h-32 bg-pink-200/30 rotate-45 rounded-lg"></div>
        <div className="absolute top-40 left-10 w-24 h-24 bg-purple-200/20 rotate-12 rounded-lg"></div>
        <div className="absolute bottom-32 right-40 w-40 h-40 bg-pink-300/20 -rotate-12 rounded-lg"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-blue-200/30 rotate-45 rounded-lg"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-pink-400/20 rotate-45 rounded-lg"></div>
        <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-purple-300/20 -rotate-45 rounded-lg"></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-6">
          <Header />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
            <div className="lg:col-span-3">
              {groqApiKey ? (
                <CognitionMatrix groqApiKey={groqApiKey} />
              ) : (
                <div className="flex items-center justify-center h-64 bg-white/80 backdrop-blur-sm rounded-xl border border-pink-200/50 shadow-lg">
                  <div className="text-center">
                    <div className="text-gray-600 mb-2">Loading Groq Integration...</div>
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
