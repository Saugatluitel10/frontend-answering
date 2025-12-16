import { Sparkles } from 'lucide-react';

interface ComingSoonDashboardProps {
  title: string;
}

export function ComingSoonDashboard({ title }: ComingSoonDashboardProps) {
  // Special handling for Category Deep Dive
  if (title === 'Category Deep Dive') {
    return (
      <div className="max-w-6xl mx-auto flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl mb-2 font-bold">{title === 'Category Deep Dive' ? 'Category & Topic Analysis' : title}</h1>
          <p className="text-base text-gray-600 mb-6">
            AI-powered insights into your security questionnaire responses
          </p>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-6">
            <Sparkles className="w-10 h-10 text-blue-500" />
          </div>
          <p className="text-xl text-gray-500">Coming Soon...</p>
          <p className="text-sm text-gray-400 mt-2">
            This feature is currently under development
          </p>
        </div>
      </div>
    );
  }

  // Default coming soon layout for other dashboards
  return (
    <div className="max-w-6xl mx-auto flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-6">
          <Sparkles className="w-10 h-10 text-blue-500" />
        </div>
        <h1 className="text-3xl mb-4">{title}</h1>
        <p className="text-xl text-gray-500">Coming Soon...</p>
        <p className="text-sm text-gray-400 mt-2">
          This feature is currently under development
        </p>
      </div>
    </div>
  );
}
