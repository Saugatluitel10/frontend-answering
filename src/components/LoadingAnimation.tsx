export function LoadingAnimation() {
  return (
    <div className="flex items-center justify-center gap-3">
      {/* Dot 1 */}
      <div 
        className="w-4 h-4 rounded-full bg-[#015CE6]"
        style={{
          animation: 'dotPulse 1.4s ease-in-out infinite',
          animationDelay: '0s'
        }}
      />
      
      {/* Dot 2 */}
      <div 
        className="w-4 h-4 rounded-full bg-[#015CE6]"
        style={{
          animation: 'dotPulse 1.4s ease-in-out infinite',
          animationDelay: '0.2s'
        }}
      />
      
      {/* Dot 3 */}
      <div 
        className="w-4 h-4 rounded-full bg-[#015CE6]"
        style={{
          animation: 'dotPulse 1.4s ease-in-out infinite',
          animationDelay: '0.4s'
        }}
      />
      
      {/* Dot 4 */}
      <div 
        className="w-4 h-4 rounded-full bg-[#015CE6]"
        style={{
          animation: 'dotPulse 1.4s ease-in-out infinite',
          animationDelay: '0.6s'
        }}
      />
      
      <style>{`
        @keyframes dotPulse {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
