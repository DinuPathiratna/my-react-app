import { useState } from "react";

function Assignment_22() {
    const [image, setImage] = useState("");

    const [blur, setBlur] = useState(0);
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [grayscale, setGrayscale] = useState(0);
    const [hueRotate, setHueRotate] = useState(0);
    const [invert, setInvert] = useState(0);
    const [opacity, setOpacity] = useState(100);
    const [saturate, setSaturate] = useState(100);
    const [sepia, setSepia] = useState(0);

    function selectImage(event) {
        const file = event.target.files[0];

        if (file) {
            const url = URL.createObjectURL(file);
            setImage(url);
        }
    }

    function resetFilters() {
        setBlur(0);
        setBrightness(100);
        setContrast(100);
        setGrayscale(0);
        setHueRotate(0);
        setInvert(0);
        setOpacity(100);
        setSaturate(100);
        setSepia(0);
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Image Filter App</h2>

            <input
                type="file"
                accept="image/*"
                onChange={selectImage}
            />

            <br />
            <br />

            {image && (
                <img
                    src={image}
                    alt="Selected"
                    style={{
                        width: "500px",
                        maxWidth: "100%",
                        filter: `
                            blur(${blur}px)
                            brightness(${brightness}%)
                            contrast(${contrast}%)
                            grayscale(${grayscale}%)
                            hue-rotate(${hueRotate}deg)
                            invert(${invert}%)
                            opacity(${opacity}%)
                            saturate(${saturate}%)
                            sepia(${sepia}%)
                        `
                    }}
                />
            )}

            <br />
            <br />

            <div>
                <label>Blur: {blur}px</label><br />
                <input
                    type="range"
                    min="0"
                    max="20"
                    value={blur}
                    onChange={(e) => setBlur(e.target.value)}
                />

                <br /><br />

                <label>Brightness: {brightness}%</label><br />
                <input
                    type="range"
                    min="0"
                    max="200"
                    value={brightness}
                    onChange={(e) => setBrightness(e.target.value)}
                />

                <br /><br />

                <label>Contrast: {contrast}%</label><br />
                <input
                    type="range"
                    min="0"
                    max="200"
                    value={contrast}
                    onChange={(e) => setContrast(e.target.value)}
                />

                <br /><br />

                <label>Grayscale: {grayscale}%</label><br />
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={grayscale}
                    onChange={(e) => setGrayscale(e.target.value)}
                />

                <br /><br />

                <label>Hue Rotate: {hueRotate}°</label><br />
                <input
                    type="range"
                    min="0"
                    max="360"
                    value={hueRotate}
                    onChange={(e) => setHueRotate(e.target.value)}
                />

                <br /><br />

                <label>Invert: {invert}%</label><br />
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={invert}
                    onChange={(e) => setInvert(e.target.value)}
                />

                <br /><br />

                <label>Opacity: {opacity}%</label><br />
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={opacity}
                    onChange={(e) => setOpacity(e.target.value)}
                />

                <br /><br />

                <label>Saturate: {saturate}%</label><br />
                <input
                    type="range"
                    min="0"
                    max="200"
                    value={saturate}
                    onChange={(e) => setSaturate(e.target.value)}
                />

                <br /><br />

                <label>Sepia: {sepia}%</label><br />
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={sepia}
                    onChange={(e) => setSepia(e.target.value)}
                />

                <br /><br />

                <button onClick={resetFilters}>
                    Reset Filters
                </button>
            </div>
        </div>
    );
}

export default Assignment_22;