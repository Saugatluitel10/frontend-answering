import { Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';

interface UploadSectionProps {
  selectedFile: File | null;
  selectedCompany: string;
  selectedProduct: string;
  onFileUpload: (file: File | null) => void;
  onCompanyChange: (company: string) => void;
  onProductChange: (product: string) => void;
  onDecodeStyle: () => void;
  onReset?: () => void;
}

export function UploadSection({ selectedFile, selectedCompany, selectedProduct, onFileUpload, onCompanyChange, onProductChange, onDecodeStyle, onReset }: UploadSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith('.csv')) {
      onFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.name.endsWith('.csv')) {
      onFileUpload(file);
    }
  };

  const handleRemoveFile = () => {
    onFileUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCompanyChange(e.target.value);
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onProductChange(e.target.value);
  };

  const handleResetCompany = () => {
    if (onReset) {
      onReset();
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm mb-2">
            Company Context
          </label>
          <div className="flex gap-2">
            <select
              value={selectedCompany}
              onChange={(e) => onCompanyChange?.(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a company</option>
              <option value="acmecorp">AcmeCorp (16193 responses)</option>
              <option value="agilent">Agilent Technologies (661 responses)</option>
              <option value="airtable">Airtable (3047 responses)</option>
              <option value="alcatraz">Alcatraz Ai Inc (1282 responses)</option>
              <option value="algolia">Algolia (6851 responses)</option>
              <option value="amex">Amex GBT (10163 responses)</option>
              <option value="amino">Amino (1639 responses)</option>
              <option value="anaplan">Anaplan (1360 responses)</option>
              <option value="anomalo">Anomalo (1993 responses)</option>
              <option value="apiiro">Apiiro (3150 responses)</option>
              <option value="apm">APM (2296 responses)</option>
              <option value="apollo">Apollo (2933 responses)</option>
              <option value="appdirect">AppDirect (1338 responses)</option>
            </select>
            {onReset && selectedCompany && (
              <button
                onClick={handleResetCompany}
                className="px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                title="Reset company selection"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm mb-2">
            Product
          </label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
            value={selectedProduct}
            onChange={handleProductChange}
          >
            <option value="">Select a product</option>
            {selectedCompany === 'acmecorp' ? (
              <>
                <option value="acmecorp-main">AcmeCorp (4847 responses)</option>
                <option value="acmecorp-faq">AcmeCorp FAQ (49 responses)</option>
                <option value="acmecorp-product1">AcmeCorp Product 1 (2713 responses)</option>
                <option value="acmecorp-product2">AcmeCorp Product 2 (2919 responses)</option>
                <option value="acmecorp-product3">AcmeCorp Product 3 (5430 responses)</option>
                <option value="dummy-data">Dummy Data (100 responses)</option>
                <option value="zz-copilot">zz-copilot-demo (136 responses)</option>
              </>
            ) : (
              <>
                <option value="platform">Platform</option>
                <option value="api">API Service</option>
                <option value="mobile">Mobile App</option>
                <option value="enterprise">Enterprise Suite</option>
              </>
            )}
          </select>
        </div>
      </div>

      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm mb-2">
            Upload CSV (Questions/Answers)
          </label>
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center cursor-pointer hover:border-gray-400 transition-colors"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
            {selectedFile ? (
              <div className="flex items-center justify-center gap-2">
                <Upload className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">{selectedFile.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile();
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-gray-500">
                <Upload className="w-5 h-5" />
                <span className="text-sm">Choose file or drag and drop</span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={onDecodeStyle}
          disabled={!selectedFile && (!selectedCompany || !selectedProduct)}
          className={`px-8 py-3 rounded-lg transition-colors whitespace-nowrap ${
            selectedFile || (selectedCompany && selectedProduct)
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Decode Style
        </button>
      </div>
    </>
  );
}