import { useState } from "react";
import "./Assignment_30.css";

function Assignment_30() {
    const [open, setOpen] = useState(false);

    return (
        <button
            className="menu-button"
            onClick={() => setOpen(!open)}
        >
            <svg
                className={`menu-icon ${open ? "open" : ""}`}
                viewBox="0 0 100 100"
                width="80"
                height="80"
            >
                <line className="line top" x1="20" y1="30" x2="80" y2="30" />
                <line className="line middle" x1="20" y1="50" x2="80" y2="50" />
                <line className="line bottom" x1="20" y1="70" x2="80" y2="70" />
            </svg>
        </button>
    );
}

export default Assignment_30;