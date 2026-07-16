import { useState } from "react";
import "./Assignment_29.css";

function Assignment_29() {
    const [muted, setMuted] = useState(false);

    return (
        <button
            className={`volume-button ${muted ? "muted" : ""}`}
            onClick={() => setMuted(!muted)}
        >
            <svg
                className="volume-icon"
                viewBox="0 0 64 64"
                width="80"
                height="80"
            >

                <polygon
                    className="speaker"
                    points="10,24 22,24 34,14 34,50 22,40 10,40"
                />

                <path
                    className="wave wave1"
                    d="M42 24 Q50 32 42 40"
                />

                <path
                    className="wave wave2"
                    d="M48 18 Q60 32 48 46"
                />

                <line
                    className="slash"
                    x1="12"
                    y1="48"
                    x2="50"
                    y2="16"
                />

            </svg>
        </button>
    );
}

export default Assignment_29;