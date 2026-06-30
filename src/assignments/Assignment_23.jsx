import { useRef, useState } from "react";
import audioFile from "../assets/audio.mp3";

function Assignment_23() {
  const audioRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);

  const [bars, setBars] = useState(new Array(32).fill(20));

  function playAudio() {
    const audio = audioRef.current;

    if (!analyserRef.current) {
      const audioContext = new AudioContext();

      const source = audioContext.createMediaElementSource(audio);
      const analyser = audioContext.createAnalyser();

      analyser.fftSize = 64;

      source.connect(analyser);
      analyser.connect(audioContext.destination);

      analyserRef.current = analyser;
    }

    audio.play();

    const analyser = analyserRef.current;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function animate() {
      analyser.getByteFrequencyData(dataArray);

      setBars([...dataArray]);

      if (!audio.paused) {
        animationRef.current = requestAnimationFrame(animate);
      }
    }

    animate();
  }

  function stopAudio() {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    cancelAnimationFrame(animationRef.current);

    setBars(new Array(32).fill(20));
  }

  return (
    <div
      style={{
        background: "#333",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "700px",
          background: "#1b1b1b",
          borderRadius: "25px",
        }}
      >
        <div
          style={{
            height: "250px",
            display: "flex",
            alignItems: "flex-end",
            gap: "5px",
            padding: "20px",
          }}
        >
          {bars.map((value, index) => (
            <div
              key={index}
              style={{
                width: "12px",
                height: `${Math.max(value, 10)}px`,
                background: "#69ffaa",
                borderRadius: "10px",
                transition: "height .05s linear",
              }}
            />
          ))}
        </div>

        <div
          style={{
            background: "#faf8f8",
            padding: "15px",
            display: "flex",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          <button onClick={playAudio}>Play</button>
          <button onClick={stopAudio}>Stop</button>
        </div>

        <audio ref={audioRef} src={audioFile}></audio>
      </div>
    </div>
  );
}

export default Assignment_23;