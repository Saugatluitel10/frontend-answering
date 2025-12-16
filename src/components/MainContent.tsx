import { StyleDiscoveryDashboard } from './StyleDiscoveryDashboard';
import { CategoryDeepDiveDashboard } from './CategoryDeepDiveDashboard';
import { GenerateResponseDashboard } from './GenerateResponseDashboard';
import { PredictiveMaintenanceDashboard } from './PredictiveMaintenanceDashboard';
import { AICoachingDashboard } from './AICoachingDashboard';
import { ExecutiveDashboard } from './ExecutiveDashboard';
import { ComingSoonDashboard } from './ComingSoonDashboard';
import { BottomNavigation } from './BottomNavigation';
import type { DashboardType } from '../App';

interface MainContentProps {
  selectedFile: File | null;
  selectedCompany: string;
  selectedProduct: string;
  onFileUpload: (file: File | null) => void;
  onCompanyChange: (company: string) => void;
  onProductChange: (product: string) => void;
  onDecodeStyle: () => void;
  onReset: () => void;
  showAnalysis: boolean;
  activeDashboard: DashboardType;
  onDashboardChange: (dashboard: DashboardType) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  isLoading: boolean;
}

export function MainContent({ 
  selectedFile,
  selectedCompany,
  selectedProduct,
  onFileUpload,
  onCompanyChange,
  onProductChange,
  onDecodeStyle,
  onReset,
  showAnalysis,
  activeDashboard,
  onDashboardChange,
  isModalOpen,
  setIsModalOpen,
  isLoading
}: MainContentProps) {
  const renderDashboard = () => {
    switch (activeDashboard) {
      case 'Style Discovery':
        return (
          <StyleDiscoveryDashboard
            selectedFile={selectedFile}
            selectedCompany={selectedCompany}
            selectedProduct={selectedProduct}
            onFileUpload={onFileUpload}
            onCompanyChange={onCompanyChange}
            onProductChange={onProductChange}
            onDecodeStyle={onDecodeStyle}
            onReset={onReset}
            showAnalysis={showAnalysis}
            setIsModalOpen={setIsModalOpen}
            isLoading={isLoading}
          />
        );
      case 'Category Deep Dive':
        return <CategoryDeepDiveDashboard setIsModalOpen={setIsModalOpen} />;
      case 'Generate Response':
        return <GenerateResponseDashboard setIsModalOpen={setIsModalOpen} />;
      case 'Predictive Maintenance':
        return <PredictiveMaintenanceDashboard />;
      case 'AI Coaching':
        return <AICoachingDashboard />;
      case 'Executive Dashboard':
        return <ExecutiveDashboard />;
      default:
        return <StyleDiscoveryDashboard
          selectedFile={selectedFile}
          selectedCompany={selectedCompany}
          selectedProduct={selectedProduct}
          onFileUpload={onFileUpload}
          onCompanyChange={onCompanyChange}
          onProductChange={onProductChange}
          onDecodeStyle={onDecodeStyle}
          onReset={onReset}
          showAnalysis={showAnalysis}
          setIsModalOpen={setIsModalOpen}
          isLoading={isLoading}
        />;
    }
  };

  return (
    <main className="flex-1 overflow-auto pl-6 pr-6 py-8 pb-24 flex flex-col">
      {renderDashboard()}
      
      {!isModalOpen && (
        <BottomNavigation 
          activeDashboard={activeDashboard}
          onDashboardChange={onDashboardChange}
        />
      )}
    </main>
  );
}