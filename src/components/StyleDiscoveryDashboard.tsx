import { useState } from 'react';
import { UploadSection } from './UploadSection';
import { ResponseDNA, ResponseDNAAnalysis } from './ResponseDNA';
import { ResponseFormula } from './ResponseFormula';
import { ResponseMetrics } from './ResponseMetrics';
import { StyleConsistency } from './StyleConsistency';
import { LoadingAnimation } from './LoadingAnimation';

interface StyleDiscoveryDashboardProps {
  selectedFile: File | null;
  selectedCompany: string;
  selectedProduct: string;
  onFileUpload: (file: File | null) => void;
  onCompanyChange: (company: string) => void;
  onProductChange: (product: string) => void;
  onDecodeStyle: () => void;
  onReset: () => void;
  showAnalysis: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  isLoading: boolean;
}

type AnalysisTab = 'Communication Personality' | 'Response DNA Analysis' | 'Response Formula' | 'Style Consistency Across Categories';

export function StyleDiscoveryDashboard({ 
  selectedFile,
  selectedCompany,
  selectedProduct,
  onFileUpload,
  onCompanyChange,
  onProductChange,
  onDecodeStyle,
  onReset,
  showAnalysis,
  setIsModalOpen,
  isLoading
}: StyleDiscoveryDashboardProps) {
  const [activeTab, setActiveTab] = useState<AnalysisTab>('Communication Personality');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isStyleConsistencyOpen, setIsStyleConsistencyOpen] = useState(false);

  const tabs: AnalysisTab[] = [
    'Communication Personality',
    'Response DNA Analysis',
    'Response Formula',
    'Style Consistency Across Categories'
  ];

  const handleTabChange = (tab: AnalysisTab) => {
    if (tab === 'Style Consistency Across Categories') {
      setIsStyleConsistencyOpen(true);
      setIsModalOpen(true);
      setActiveTab(tab);
    } else if (tab !== activeTab) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveTab(tab);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Communication Personality':
        return <ResponseDNA />;
      case 'Response DNA Analysis':
        return <ResponseDNAAnalysis />;
      case 'Response Formula':
        return <ResponseFormula />;
      case 'Style Consistency Across Categories':
        return null; // Modal is shown instead
      default:
        return <ResponseDNA />;
    }
  };

  return (
    <div className="flex-1">
      <div className="text-center mb-6">
        <h1 className="text-2xl mb-2">Response Intelligence System</h1>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <UploadSection 
          selectedFile={selectedFile}
          selectedCompany={selectedCompany}
          selectedProduct={selectedProduct}
          onFileUpload={onFileUpload}
          onCompanyChange={onCompanyChange}
          onProductChange={onProductChange}
          onDecodeStyle={onDecodeStyle}
          onReset={onReset}
        />
      </div>

      {isLoading && (
        <div className="flex-1 flex items-center justify-center">
          <LoadingAnimation />
        </div>
      )}

      {showAnalysis && !isLoading && (
        <>
          {/* Single Card Container */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            {/* Metrics Grid */}
            <ResponseMetrics />
            
            {/* Analysis Tabs */}
            <div className="mt-6 mb-6">
              <div className="bg-gray-100 rounded-full p-1.5 flex gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`flex-1 px-6 py-2.5 rounded-full text-sm transition-all duration-300 whitespace-nowrap ${
                      activeTab === tab
                        ? 'bg-white text-gray-900 shadow-md'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content with Fade Animation */}
            {activeTab !== 'Style Consistency Across Categories' && (
              <div 
                className={`transition-all duration-300 ${
                  isTransitioning 
                    ? 'opacity-0 transform translate-y-2' 
                    : 'opacity-100 transform translate-y-0'
                }`}
              >
                {renderTabContent()}
              </div>
            )}
          </div>
          
          <StyleConsistency 
            isOpen={isStyleConsistencyOpen} 
            onClose={() => {
              setIsStyleConsistencyOpen(false);
              setIsModalOpen(false);
              setActiveTab('Communication Personality');
            }} 
          />
        </>
      )}
    </div>
  );
}