import { useEffect, useState } from "react";

function NumberIncrement({ value, duration }) {
    const [text, setText] = useState(0);

    useEffect(() => {
        const interval = 20;
        const increase = value / (duration / interval);

        const timer = setInterval(() => {
            setText((current) => {
                if (current + increase >= value) {
                    clearInterval(timer);
                    return value;
                }

                return current + increase;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [value, duration]);

    return <>{text.toLocaleString()}</>;
}

export default function Assignment_24() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                fontSize: "40px"}}>
            <div>
                <NumberIncrement value={500000} duration={2000} />
                </div>
            <div>
                <NumberIncrement value={500} duration={2000} />
            </div>
            <div>
                <NumberIncrement value={125470} duration={2000} />
            </div>
            <div>
                <NumberIncrement value={75747} duration={2000} />
            </div>
        </div>
    );
}