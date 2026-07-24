import React, { useState } from 'react';

export default function Assignment_31() {

  const [isPlaying, setIsPlaying] = useState(false);
  const totalBars = 36;
  const svgWidth = 358;
  const svgHeight = 29;
  const barWidth = 4;
  const spacing = 9.6;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '20px',
      padding: '10px 20px',
      width: 'fit-content',
      borderRadius: '50px',
      backgroundColor: '#ffffff',
    }}>

      <style>{`
        @keyframes soundWaveWaveform {
          0%, 100% {
            transform: scaleY(0.3); 
          }
          50% {
            transform: scaleY(var(--peak-scale, 0.9));  
          }
        }
        
        .wave-bar-element {
          transform-origin: center;
          transition: transform 0.2s steps(2, end);
        }

        .wave-bar-active {
          animation: soundWaveWaveform 0.8s steps(4, end) infinite;
        }
      `}</style>

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        aria-label={isPlaying ? "Pause animation" : "Start animation"}
        style={{
          width: '18px',
          height: '17px',
          padding: '1px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#3D3D3D',
          backgroundColor: 'transparent',
          border: 'none',
          transition: 'background-color 0.2s ease, transform 0.1s ease',
        }}>
        {isPlaying ? (

          /*pause icon*/
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
         ) : (

          /*play icon*/
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}

      </button>

      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg" 
      >
        {Array.from({ length: totalBars }).map((_, index) => {

          const randomFactor = Math.abs(Math.sin(index * 12 + 78) * 43758.5453) % 1;
          const randomPeakFactor = Math.abs(Math.sin(index * 45 + 12) * 25) % 1;
          
          const baselineHeight = 16;

          const xPosition = index * spacing + 2;
          const yPosition = (svgHeight - baselineHeight) / 2;

          const uniqueDelay = `${(randomFactor * -1.5).toFixed(2)}s`;

          const customPeakScale = 0.4 + randomPeakFactor * 1.1;

          return (
            <rect
              key={index}
              x={xPosition}
              y={yPosition}
              width={barWidth}
              height={baselineHeight}
              rx={barWidth / 2}
              fill="#4f4f4f"
              className={`wave-bar-element ${isPlaying ? 'wave-bar-active' : ''}`}
              
              style={{
                animationDelay: uniqueDelay,
                transform: isPlaying ? undefined : 'scaleY(0.3)',
                '--peak-scale': customPeakScale
              }}/>
          );
        })}
      </svg>
    </div>
  );
}
