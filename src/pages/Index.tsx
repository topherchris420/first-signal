
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
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="container mx-auto px-4 py-6">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
          <div className="lg:col-span-3">
            {groqApiKey ? (
              <CognitionMatrix groqApiKey={groqApiKey} />
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-900 rounded-lg border border-gray-800">
                <div className="text-center">
                  <div className="text-gray-400 mb-2">Loading Groq Integration...</div>
                  <div className="animate-pulse w-8 h-8 bg-blue-600 rounded mx-auto"></div>
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
  );
};

export default Index;
