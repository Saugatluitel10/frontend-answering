import { BarChart3 } from 'lucide-react';

export function AnalysisStatus() {
  return (
    <div className="relative bg-gradient-to-br from-white/80 to-blue-50/50 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-xl p-6 mb-6">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl"></div>
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-100 p-2 rounded-lg">
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl">Analysis Status</h2>
        </div>
        
        <div className="flex items-start justify-between gap-8">
          {/* Left Side - Main Metrics */}
          <div className="space-y-2">
            <p className="text-gray-700">
              Processed <span className="font-semibold">1420</span> responses.
            </p>
            
            <p className="text-gray-700">
              Average length: <span className="font-semibold">11 words</span>.
            </p>
            
            <p className="text-gray-700">
              Dominant opening: <span className="font-semibold">Direct</span>
            </p>
          </div>
          
          {/* Right Side - Opening Breakdown */}
          <div className="flex-1 max-w-md">
            <p className="text-gray-700 mb-2">Openings:</p>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="text-blue-600">
                Direct: <span className="font-semibold">77.1%</span>
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-purple-600">
                Contextual: <span className="font-semibold">8.3%</span>
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-green-600">
                Affirmative: <span className="font-semibold">0%</span>
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-orange-600">
                Other: <span className="font-semibold">14.6%</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
