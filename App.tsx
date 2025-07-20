import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [auraCoords, setAuraCoords] = useState({ x: -200, y: -200 });
  const [guardrailOffset, setGuardrailOffset] = useState({ x: 0, y: 0 });
  const [coreOffset, setCoreOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Map viewport coordinates to the SVG's viewBox for the aura
      const svgX = (clientX / innerWidth) * 200;
      const svgY = (clientY / innerHeight) * 200;
      setAuraCoords({ x: svgX, y: svgY });

      const viewportCenterX = innerWidth / 2;
      const viewportCenterY = innerHeight / 2;
      const offsetX = clientX - viewportCenterX;
      const offsetY = clientY - viewportCenterY;

      // Guardrails move subtly - representing the stable conversational context
      const guardrailMoveFactor = 0.02;
      const guardrailMaxOffset = 10;
      const newGuardrailOffsetX = Math.max(-guardrailMaxOffset, Math.min(guardrailMaxOffset, offsetX * guardrailMoveFactor));
      const newGuardrailOffsetY = Math.max(-guardrailMaxOffset, Math.min(guardrailMaxOffset, offsetY * guardrailMoveFactor));
      setGuardrailOffset({ x: newGuardrailOffsetX, y: newGuardrailOffsetY });
      
      // Core moves much more - representing focused attention on the user's prompt
      const coreMoveFactor = 0.08;
      const coreMaxOffset = 40; // Kept within the "guardrail" boundary
      const newCoreOffsetX = Math.max(-coreMaxOffset, Math.min(coreMaxOffset, offsetX * coreMoveFactor));
      const newCoreOffsetY = Math.max(-coreMaxOffset, Math.min(coreMaxOffset, offsetY * coreMoveFactor));
      setCoreOffset({ x: newCoreOffsetX, y: newCoreOffsetY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-screen h-screen bg-slate-900 flex flex-col items-center justify-center overflow-hidden cursor-crosshair relative">
      <svg viewBox="0 0 200 200" className="absolute top-0 left-0 w-full h-full" aria-labelledby="svg-title" role="img">
        <title id="svg-title">Animated neural network that responds to mouse movement</title>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="focus-gradient">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#67e8f9" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* This group moves subtly, representing the stable context (guardrails) */}
        <g style={{ transform: `translate(${guardrailOffset.x}px, ${guardrailOffset.y}px)`, transition: 'transform 0.3s ease-out' }}>
          <g className="lines" transform="translate(100, 100)">
            <line x1="0" y1="0" x2="-70" y2="-70" />
            <line x1="0" y1="0" x2="0" y2="-80" />
            <line x1="0" y1="0" x2="70" y2="-70" />
            <line x1="0" y1="0" x2="80" y2="0" />
            <line x1="0" y1="0" x2="70" y2="70" />
            <line x1="0" y1="0" x2="0" y2="80" />
            <line x1="0" y1="0" x2="-70" y2="70" />
            <line x1="0" y1="0" x2="-80" y2="0" />
          </g>
          <g className="nodes" transform="translate(100, 100)">
            <circle cx="-70" cy="-70" r="5" />
            <circle cx="0" cy="-80" r="5" />
            <circle cx="70" cy="-70" r="5" />
            <circle cx="80" cy="0" r="5" />
            <circle cx="70" cy="70" r="5" />
            <circle cx="0" cy="80" r="5" />
            <circle cx="-70" cy="70" r="5" />
            <circle cx="-80" cy="0" r="5" />
          </g>
          
          {/* This group moves much more, representing focused attention */}
          <g style={{ transform: `translate(${coreOffset.x}px, ${coreOffset.y}px)`, transition: 'transform 0.2s ease-out' }}>
            <circle cx="100" cy="100" r="20" className="core" filter="url(#glow)" />
          </g>
        </g>
        
        <circle
          cx={auraCoords.x}
          cy={auraCoords.y}
          r="60"
          fill="url(#focus-gradient)"
          className="pointer-events-none"
        />
      </svg>
    </div>
  );
};

export default App;