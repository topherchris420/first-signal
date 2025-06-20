
import React from 'react';
import { Header } from '@/components/Header';
import { ModuleGrid } from '@/components/ModuleGrid';
import { FailureSandbox } from '@/components/FailureSandbox';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="container mx-auto px-4 py-6">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <FailureSandbox />
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
