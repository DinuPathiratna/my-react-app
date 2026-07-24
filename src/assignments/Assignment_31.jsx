import React, { useState } from 'react';

export default function Assignment_31() {

  const [isPlaying, setIsPlaying] = useState(false);
  const totalBars = 36;
  const svgWidth = 358;
  const svgHeight = 29;
  const barWidth = 3;
  const spacing = 10;

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
            transform: scaleY(0.12); 
          }
          50% {
            transform: scaleY(0.9);  
          }
        }
        
        .wave-bar-element {
          transform-origin: center;
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .wave-bar-active {
          animation: soundWaveWaveform 1.2s ease-in-out infinite;
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
        xmlns="http://w3.org"
      >
        {Array.from({ length: totalBars }).map((_, index) => {

          // taller bars near the middle
          const distanceFromCenter = Math.abs(index - totalBars / 2);
          const maxPossibleHeight = svgHeight - 4;
          const baselineHeight = Math.max(5, maxPossibleHeight - distanceFromCenter * 1.2);

          const xPosition = index * spacing + 4;
          const yPosition = (svgHeight - baselineHeight) / 2;

          // create wave effect by delaying each bar's animation slightly based on its index
          const uniqueDelay = `${(index * 0.05).toFixed(2)}s`;

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
                transform: isPlaying ? undefined : 'scaleY(0.12)'
              }}/>
          );
        })}
      </svg>
    </div>
  );
}
