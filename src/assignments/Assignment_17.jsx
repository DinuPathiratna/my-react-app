import { useState } from "react";

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return { r, g, b };
}

function rgbToHex(r, g, b) {
  const toHex = (c) => c.toString(16).padStart(2, "0").toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
//  clamp values to 255
function clamp255(value) {
  return Math.min(255, value);
}

export default function ColorMixer() {
  const [color1, setColor1] = useState("#388186");
  const [color2, setColor2] = useState("#c7c389");

  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const mixR = clamp255(rgb1.r + rgb2.r);
  const mixG = clamp255(rgb1.g + rgb2.g);
  const mixB = clamp255(rgb1.b + rgb2.b);

  const mixedHex = rgbToHex(mixR, mixG, mixB);

  return (
    <div style={{padding: "20px" }}>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div>
          <p>Color 1</p>
          <input type="color" value={color1}onChange={(e) => setColor1(e.target.value)}/>
          <p>{color1}</p>
          <p>RGB: {rgb1.r}, {rgb1.g}, {rgb1.b}</p>
        </div>

        <div>
          <p>Color 2</p>
          <input
            type="color"
            value={color2}
            onChange={(e) => setColor2(e.target.value)}
          />
          <p>{color2}</p>
          <p>
            RGB: {rgb2.r}, {rgb2.g}, {rgb2.b}
          </p>
        </div>
      </div>

      {/* Output color */}
      <div
        style={{
          width: "200px",
          height: "100px",
          backgroundColor: mixedHex,
          border: "2px solid #000",
          marginBottom: "10px",
        }}
      />
      {/* Display mixed color values */}
      <p>Mixed RGB: {mixR}, {mixG}, {mixB}</p>
      <p>Mixed HEX: {mixedHex}</p>

      <div
        style={{
          width: "100%",
          height: "80px",
          background: `linear-gradient(to right, ${color1}, ${mixedHex}, ${color2})`,
          border: "2px solid #000",
          marginTop: "20px",
        }}
      />
    </div>
  );
}