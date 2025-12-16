import { useState, useRef, useEffect } from 'react';
import { ChevronRight, Compass, Layers, PenTool, LineChart, GraduationCap, PieChart, MoreHorizontal } from 'lucide-react';
import type { DashboardType } from '../App';

interface BottomNavigationProps {
  activeDashboard: DashboardType;
  onDashboardChange: (dashboard: DashboardType) => void;
}

export function BottomNavigation({ activeDashboard, onDashboardChange }: BottomNavigationProps) {
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Close menu on scroll
    const handleScroll = () => {
      setIsHovering(false);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const options: { label: DashboardType; icon: typeof Compass; displayName: string }[] = [
    { label: 'Style Discovery', icon: Compass, displayName: 'Style Discovery' },
    { label: 'Category Deep Dive', icon: Layers, displayName: 'Category Deep Dive' },
    { label: 'Generate Response', icon: PenTool, displayName: 'Response Generator' },
    { label: 'Predictive Maintenance', icon: LineChart, displayName: 'Predictive Insights' },
    { label: 'AI Coaching', icon: GraduationCap, displayName: 'AI Coaching' },
    { label: 'Executive Dashboard', icon: PieChart, displayName: 'Analytics' }
  ];

  const currentIndex = options.findIndex(opt => opt.label === activeDashboard);
  const nextDashboard = currentIndex < options.length - 1 ? options[currentIndex + 1] : options[0];

  // Calculate position for fan layout - vertical stack with slight curve
  const getIconPosition = (index: number, total: number) => {
    // Vertical spacing between items
    const verticalSpacing = 48;
    const baseY = index * verticalSpacing;
    
    // Horizontal offset for curve effect (items curve to the left as they go up)
    const curveAmount = 24;
    const maxCurve = (total - 1) / 2;
    const distanceFromCenter = Math.abs(index - maxCurve);
    const x = -(distanceFromCenter / maxCurve) * curveAmount;
    
    return { x, y: baseY };
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 z-50">
      <div className="flex items-center justify-between px-8">
        <div className="flex-1"></div>
        
        <div className="text-center text-sm">
          <button className="px-4 py-2 bg-black text-white rounded-lg text-sm">
            {activeDashboard}
          </button>
        </div>
        
        <div className="flex-1 flex items-center justify-end gap-1.5 shrink-0">
          <button 
            onClick={() => onDashboardChange(nextDashboard.label)}
            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span>{nextDashboard.displayName}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          
          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button 
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="View all pages"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {/* Fan Menu on Hover */}
            {isHovering && (
              <div 
                className="absolute bottom-full right-0 mb-2 pb-2"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="relative" style={{ width: '240px', height: '300px' }}>
                  {options.map((option, index) => {
                    const Icon = option.icon;
                    const isActive = activeDashboard === option.label;
                    const { x, y } = getIconPosition(index, options.length);
                    
                    return (
                      <button
                        key={option.label}
                        onClick={() => {
                          onDashboardChange(option.label);
                          setIsHovering(false);
                        }}
                        className="absolute group transition-all duration-200 hover:scale-105"
                        style={{
                          right: `${8 + x}px`,
                          bottom: `${y + 8}px`,
                        }}
                      >
                        <div className="flex items-center gap-2 bg-white rounded-lg px-2.5 py-1.5 shadow-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200">
                          {/* Icon */}
                          <div className={`
                            p-1.5 rounded-md transition-all duration-200
                            ${isActive 
                              ? 'bg-gray-100 text-gray-900' 
                              : 'bg-gray-50 text-gray-900'
                            }
                          `}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          
                          {/* Label */}
                          <span className={`
                            text-xs whitespace-nowrap transition-all duration-200
                            ${isActive ? 'text-blue-600' : 'text-gray-700'}
                          `}>
                            {option.displayName}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}