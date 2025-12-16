import { X } from 'lucide-react';

interface StyleConsistencyProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StyleConsistency({ isOpen, onClose }: StyleConsistencyProps) {

  const categoryData = [
    {
      category: 'Organization - Policy',
      opening: 100,
      structure: 100,
      trust: 0,
      length: 100
    },
    {
      category: 'Logs - Overall Infrastructure',
      opening: 88.9,
      structure: 66.7,
      trust: 0,
      length: 0
    },
    {
      category: "Logs - Organization's Physical Access",
      opening: 100,
      structure: 0,
      trust: 0,
      length: 0
    },
    {
      category: "Data Deletion - Organization's Client Data",
      opening: 100,
      structure: null,
      trust: 0,
      length: 0
    },
    {
      category: "Vulnerability Management - Organization's Network",
      opening: 66.7,
      structure: 33.3,
      trust: 0,
      length: 0
    },
    {
      category: 'Organization - Incident Management',
      opening: 88.9,
      structure: 88.9,
      trust: 0,
      length: 62.5
    },
    {
      category: "Malware Control - Organization's Asset",
      opening: 100,
      structure: 0,
      trust: 0,
      length: 0
    },
    {
      category: 'Security - Organization Network',
      opening: 94.7,
      structure: 66.5,
      trust: 0,
      length: 0
    },
    {
      category: "Agreements - Organization's Third Party",
      opening: 100,
      structure: 100,
      trust: 0,
      length: 100
    },
    {
      category: 'Application - Software Development Security',
      opening: 66.7,
      structure: 66.7,
      trust: 0,
      length: 13.39
    },
    {
      category: 'Network - Application',
      opening: 100,
      structure: 100,
      trust: 0,
      length: 100
    },
    {
      category: 'Organization - Remote Access',
      opening: 66.7,
      structure: 66.7,
      trust: 0,
      length: 13.39
    }
  ];

  // Function to get color based on percentage using company blue palette
  const getColorClass = (value: number | null) => {
    if (value === null) return 'bg-gray-200 text-gray-600';
    if (value >= 0 && value < 10) return 'bg-[#E6F3FF] text-gray-800'; // Very pale blue
    if (value >= 10 && value < 40) return 'bg-[#B3DAFE] text-gray-800'; // Pale blue
    if (value >= 40 && value < 70) return 'bg-[#80B6F7] text-gray-800'; // Light blue
    if (value >= 70 && value < 90) return 'bg-[#3380ED] text-white'; // Medium blue
    if (value >= 90) return 'bg-[#015CE6] text-white'; // Dark blue - excellent
    return 'bg-gray-200 text-gray-600';
  };

  return (
    <>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 relative">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-1">Style Consistency Across Categories</h2>
                <p className="text-sm text-gray-600">Consistency percentage by security category and style dimension</p>
              </div>
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Color Legend - Fixed at top */}
            <div className="p-6 pb-4 border-b border-gray-200">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <span className="text-sm text-black font-semibold">Consistency %:</span>
                <div className="flex items-center gap-2">
                  <div className="bg-[#E6F3FF] border border-[#B3DAFE] px-3 py-1 rounded text-xs font-semibold text-gray-800">
                    0-10%
                  </div>
                  <div className="bg-[#B3DAFE] border border-[#80B6F7] px-3 py-1 rounded text-xs font-semibold text-gray-800">
                    10-40%
                  </div>
                  <div className="bg-[#80B6F7] border border-[#66A4F4] px-3 py-1 rounded text-xs font-semibold text-gray-800">
                    40-70%
                  </div>
                  <div className="bg-[#3380ED] border border-[#1A6EEA] px-3 py-1 rounded text-xs font-semibold text-white">
                    70-90%
                  </div>
                  <div className="bg-[#015CE6] border border-[#015CE6] px-3 py-1 rounded text-xs font-semibold text-white">
                    90-100%
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Content - Scrollable Table */}
            <div className="overflow-auto flex-1">
              <table className="w-full border-collapse">
                <thead className="sticky top-0 bg-white z-10 shadow-sm">
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left p-3 text-sm font-semibold text-gray-600 uppercase tracking-wide bg-white">Category</th>
                    <th className="text-center p-3 text-sm font-semibold text-gray-600 uppercase tracking-wide bg-white">Opening</th>
                    <th className="text-center p-3 text-sm font-semibold text-gray-600 uppercase tracking-wide bg-white">Structure</th>
                    <th className="text-center p-3 text-sm font-semibold text-gray-600 uppercase tracking-wide bg-white">Trust</th>
                    <th className="text-center p-3 text-sm font-semibold text-gray-600 uppercase tracking-wide bg-white">Length</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryData.map((row, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="p-3 text-sm text-gray-900">{row.category}</td>
                      <td className="p-3">
                        <div className={`rounded px-3 py-2 text-center text-sm font-semibold ${getColorClass(row.opening)}`}>
                          {row.opening !== null ? `${row.opening}%` : '-'}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className={`rounded px-3 py-2 text-center text-sm font-semibold ${getColorClass(row.structure)}`}>
                          {row.structure !== null ? `${row.structure}%` : 'No file chosen'}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className={`rounded px-3 py-2 text-center text-sm font-semibold ${getColorClass(row.trust)}`}>
                          {row.trust !== null ? `${row.trust}%` : '-'}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className={`rounded px-3 py-2 text-center text-sm font-semibold ${getColorClass(row.length)}`}>
                          {row.length !== null ? `${row.length}%` : '-'}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
