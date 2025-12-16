import { 
  Brain, 
  FileText, 
  BookOpen, 
  Cpu, 
  BarChart3, 
  Crosshair, 
  List, 
  Library, 
  Lightbulb,
  ChevronLeft 
} from 'lucide-react';

export function Sidebar() {
  const menuItems = [
    { icon: Brain, label: 'Response Intelligence System', active: true },
    { icon: FileText, label: 'Questionnaire Concierge', active: false },
    { icon: BookOpen, label: 'Knowledge Library', active: false },
    { icon: Cpu, label: 'SecurityPal Copilot', active: false },
    { icon: BarChart3, label: 'Altitude Reports', active: false },
    { icon: Crosshair, label: 'Mission Control', active: false },
    { icon: List, label: 'Questionnaires', active: false },
    { icon: Library, label: 'Generate Library Entries', active: false },
    { icon: Lightbulb, label: 'Suggestions', active: false },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <nav className="space-y-1 p-4 flex-1 overflow-y-auto">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              item.active
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            <span className="text-left">{item.label}</span>
          </button>
        ))}
      </nav>
      
      {/* Collapse button */}
      <div className="bg-black flex items-center justify-center py-3">
        <button
          className="text-white hover:text-gray-300 transition-colors"
          aria-label="Collapse sidebar"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
}
