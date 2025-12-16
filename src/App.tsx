import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MainContent } from './components/MainContent';
import { HistoryModal } from './components/HistoryModal';

export type DashboardType = 
  | 'Style Discovery'
  | 'Category Deep Dive'
  | 'Generate Response'
  | 'Predictive Maintenance'
  | 'AI Coaching'
  | 'Executive Dashboard';

export default function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeDashboard, setActiveDashboard] = useState<DashboardType>('Style Discovery');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleFileUpload = (file: File | null) => {
    setSelectedFile(file);
    setShowAnalysis(false);
    setIsLoading(false);
  };

  const handleCompanyChange = (company: string) => {
    setSelectedCompany(company);
    setShowAnalysis(false);
    setIsLoading(false);
  };

  const handleProductChange = (product: string) => {
    setSelectedProduct(product);
    setShowAnalysis(false);
    setIsLoading(false);
  };

  const handleDecodeStyle = () => {
    if (selectedFile || (selectedCompany && selectedProduct)) {
      setIsLoading(true);
      setShowAnalysis(false);
      
      // Simulate processing time with loading animation
      setTimeout(() => {
        setIsLoading(false);
        setShowAnalysis(true);
      }, 2000); // 2 seconds loading time
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setSelectedCompany('');
    setSelectedProduct('');
    setShowAnalysis(false);
    setIsLoading(false);
    setActiveDashboard('Style Discovery');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header onHistoryClick={() => setIsHistoryOpen(true)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <MainContent 
          selectedFile={selectedFile}
          selectedCompany={selectedCompany}
          selectedProduct={selectedProduct}
          onFileUpload={handleFileUpload}
          onCompanyChange={handleCompanyChange}
          onProductChange={handleProductChange}
          onDecodeStyle={handleDecodeStyle}
          onReset={handleReset}
          showAnalysis={showAnalysis}
          activeDashboard={activeDashboard}
          onDashboardChange={setActiveDashboard}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          isLoading={isLoading}
        />
      </div>
      <HistoryModal 
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />
    </div>
  );
}