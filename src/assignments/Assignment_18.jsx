import { useState, useEffect } from "react";

function Assignment_18() {
  const [colors, setColors] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setColors((oldColors) => {

        if (gameOver) return oldColors;

        let newColors = [...oldColors];
        let random = Math.random();

        if (random < 0.5) {
          newColors.unshift("blue");
        } else {
          newColors.unshift("red");
        }
        if (newColors.length > 6) {
          setGameOver(true);
        }

        return newColors;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameOver]);

  const clickColor = (color) => {
    if (gameOver) return;

    if (colors.length === 0) return;

    let lastColor = colors[colors.length - 1];

    if (lastColor === color) {
      let newColors = [...colors];
      newColors.pop();

      setColors(newColors);
      setScore(score + 1);
    } else {
      setGameOver(true);
    }
  };

  if (gameOver) {
    return (
      <div>
        <h1>Game Over</h1>
        <h2>Score: {score}</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>Score: {score}</h2>

      <div style={{ display: "flex", gap: "5px", marginBottom: "20px" }}>
        {colors.map((color, index) => (
          <div
            key={index}
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: color,
              border: "1px solid black",
            }}
          ></div>
        ))}
      </div>

      <button
        onClick={() => clickColor("red")}
        style={{
          backgroundColor: "red",
          color: "white",
          marginRight: "10px",
        }}
      >
        Red
      </button>

      <button
        onClick={() => clickColor("blue")}
        style={{
          backgroundColor: "blue",
          color: "white",
        }}
      >
        Blue
      </button>
    </div>
  );
}

export default Assignment_18;