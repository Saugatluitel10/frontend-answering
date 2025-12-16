import { X, Clock } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface HistoryItem {
  company: string;
  dashboard: string;
  timestamp: string;
  status: 'Completed';
}

export function HistoryModal({ isOpen, onClose }: HistoryModalProps) {
  if (!isOpen) return null;

  const historyItems: HistoryItem[] = [
    {
      company: 'Abnormal Security',
      dashboard: 'Style Discovery',
      timestamp: '2 hours ago',
      status: 'Completed'
    },
    {
      company: 'Abnormal Security',
      dashboard: 'Response Generator',
      timestamp: '5 hours ago',
      status: 'Completed'
    },
    {
      company: 'TechCorp Inc.',
      dashboard: 'Deep Dive Analysis',
      timestamp: 'Yesterday',
      status: 'Completed'
    },
    {
      company: 'SecureNet',
      dashboard: 'Predictive Insights',
      timestamp: '2 days ago',
      status: 'Completed'
    },
    {
      company: 'Abnormal Security',
      dashboard: 'AI Coaching',
      timestamp: '3 days ago',
      status: 'Completed'
    }
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Side Panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex items-start justify-between mb-1">
            <h2 className="text-lg">Analysis History</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <p className="text-gray-500 text-sm">
            View your recent AI capability analyses and workflows
          </p>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(100vh-110px)] px-6 py-6">
          <div className="space-y-3">
            {historyItems.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="mb-0.5 text-gray-900">{item.company}</div>
                    <div className="text-sm text-gray-500">{item.dashboard}</div>
                  </div>
                  <span className="text-sm text-green-600">
                    {item.status}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{item.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
