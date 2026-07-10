import { useRef, useState } from "react";

function Assignment_27() {
    const [image, setImage] = useState(null);
    const [scale, setScale] = useState(1);

    const canvasRef = useRef(null);

    function selectImage(event) {
        const file = event.target.files[0];

        if (!file) return;

        const img = new Image();

        img.onload = function () {
            setImage(img);
        };

        img.src = URL.createObjectURL(file);
    }

    function drawImage() {
        if (!image) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        const newWidth = image.width * scale;
        const newHeight = image.height * scale;

        canvas.width = newWidth;
        canvas.height = newHeight;

        context.drawImage(image, 0, 0, newWidth, newHeight);
    }

    function downloadImage() {
        const canvas = canvasRef.current;

        const dataURL = canvas.toDataURL("image/png");

        const a = document.createElement("a");
        a.href = dataURL;
        a.download = " ";
        a.click();
    }

    return (
        <div>

            <input type="file" accept="image/*" onChange={selectImage}/>

            <label>Scale Factor: </label>

            <input
                type="number"
                value={scale}
                step="0.1"
                min="0.1"
                onChange={(e) => setScale(Number(e.target.value))}/>

            <br /><br />

            <button onClick={drawImage}>
                Draw Image
            </button>

            <button onClick={downloadImage} style={{ marginLeft: "10px" }}> Download</button>

            <br /><br />

            <canvas ref={canvasRef} style={{
                    border: "1px solid black",
                    maxWidth: "100%"
                }}>

            </canvas>
        </div>
    );
}

export default Assignment_27;