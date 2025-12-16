import { HelpCircle, Bell, User, History } from 'lucide-react';
import logoImage from 'figma:asset/7245a11f71ebe0ead26448b3b299b297f5ad980d.png';

interface HeaderProps {
  onHistoryClick: () => void;
}

export function Header({ onHistoryClick }: HeaderProps) {
  return (
    <header className="bg-black text-white px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src={logoImage} alt="SecurityPal AI" className="h-6" />
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={onHistoryClick}
          className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors"
        >
          <History className="w-4 h-4" />
          <span>History</span>
        </button>
        <button className="flex items-center gap-2 text-sm hover:text-gray-300">
          <HelpCircle className="w-4 h-4" />
          <span>Help</span>
        </button>
        <div className="relative">
          <Bell className="w-5 h-5 cursor-pointer hover:text-gray-300" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </div>
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer">
          <User className="w-5 h-5" />
        </div>
      </div>
    </header>
  );
}
