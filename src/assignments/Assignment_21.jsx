import { useState, useRef } from "react";

function Assignment_21() {
  const canvasRef = useRef();

  const [rgb, setRgb] = useState("");
  const [hex, setHex] = useState("");

  const uploadImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    const img = new Image();

    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  const pickColor = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const pixel = ctx.getImageData(x, y, 1, 1).data;

    const r = pixel[0];
    const g = pixel[1];
    const b = pixel[2];

    setRgb(`rgb(${r}, ${g}, ${b})`);

    const hexColor =
      "#" +
      r.toString(16).padStart(2, "0") +
      g.toString(16).padStart(2, "0") +
      b.toString(16).padStart(2, "0");

    setHex(hexColor.toUpperCase());
  };

  return (
    <div>
      <h2>Color Picker</h2>

      <input
        type="file"
        accept="image/*"
        onChange={uploadImage}
      />

      <br />
      <br />

      <canvas
        ref={canvasRef}
        onClick={pickColor}
        style={{
          border: "1px solid black",
          maxWidth: "100%",
          cursor: "crosshair"
        }}
      ></canvas>

      <h3>RGB: {rgb}</h3>
      <h3>HEX: {hex}</h3>

      <div
        style={{
          width: "100px",
          height: "100px",
          border: "1px solid black",
          backgroundColor: hex
        }}
      ></div>
    </div>
  );
}

export default Assignment_21;