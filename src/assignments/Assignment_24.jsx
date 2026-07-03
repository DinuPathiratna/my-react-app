import { useEffect, useState } from "react";

function NumberIncrement({ value }) {
    const [text, setText] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setText((current) => {
                if (current + 100 >= value) {
                    clearInterval(timer);
                    return value;
                }

                return current + 1;
            });
        }, 1);

        return () => clearInterval(timer);
    }, [value]);
    return <>{text.toLocaleString()}</>;

}

export default function Assignment_24() {
    return (
        <div style={{ display: "flex",
                     flexDirection: "column",
                     gap: "20px" ,
                     fontSize:"40px"}}>
            <div>
                <NumberIncrement value={500000} />
            </div>
            <div>
                <NumberIncrement value={500} />
            </div>
            <div>
                <NumberIncrement value={125476} />
            </div>
            <div>
                <NumberIncrement value={75747} />
            </div>
        </div>
    );
}