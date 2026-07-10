import { useRef, useState } from "react";

function Assignment_27() {

    const [image, setImage] = useState(null);
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [originalWidth, setOriginalWidth] = useState(0);
    const [originalHeight, setOriginalHeight] = useState(0);
    const canvasRef = useRef(null);

    function selectImage(event) {
        const file = event.target.files[0];

        if (!file) return;
        const img = new Image();

        img.onload = function () {
            setImage(img);

            setWidth(img.width);
            setHeight(img.height);

            setOriginalWidth(img.width);
            setOriginalHeight(img.height);
        };

        img.src = URL.createObjectURL(file);
    }

    function changeWidth(event) {
        const newWidth = Number(event.target.value);

        setWidth(newWidth);

        const newHeight = Math.round(
            (newWidth * originalHeight) / originalWidth);
        setHeight(newHeight);
    }

    function changeHeight(event) {
        const newHeight = Number(event.target.value);

        setHeight(newHeight);

        const newWidth = Math.round((newHeight * originalWidth) / originalHeight);
        setWidth(newWidth);
    }

    function drawImage() {
        if (!image) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        canvas.width = width;
        canvas.height = height;

        context.drawImage(image, 0, 0, width, height);
    }

    function downloadImage() {
        const canvas = canvasRef.current;

        const dataURL = canvas.toDataURL("image/png");

        const a = document.createElement("a");
        a.href = dataURL;
        a.download = "resized-image.png";
        a.click();
    }

    return (
        <div>

            <input type="file" accept="image/*" onChange={selectImage} />

            <label>Width: </label>

            <input type="number" value={width} onChange={changeWidth} />

            <br /><br />

            <label>Height: </label>

            <input type="number" value={height} onChange={changeHeight} />

            <br /><br />

            <button onClick={drawImage}> Draw Image </button>

            <button onClick={downloadImage} style={{ marginLeft: "10px" }}> Download </button>

            <br /><br />

            <canvas ref={canvasRef} 
            style={{
                border: "1px solid black",
                maxWidth: "100%"
            }}>                    
            </canvas>

        </div>
    );
}

export default Assignment_27;