interface CompanySelectorProps {
  selectedFile: File | null;
  onFileUpload: (file: File | null) => void;
  onDecodeStyle: () => void;
}

export function CompanySelector({ selectedFile, onFileUpload, onDecodeStyle }: CompanySelectorProps) {
  return (
    <div className="flex items-center gap-4 text-sm">
      <div className="flex items-center gap-2">
        <span className="text-gray-600">Company:</span>
        <span>Acme Corporation</span>
      </div>
      <div className="w-px h-4 bg-gray-300"></div>
      <div className="flex items-center gap-2">
        <span className="text-gray-600">Product:</span>
        <span className="text-gray-500">All Products</span>
      </div>
    </div>
  );
}
