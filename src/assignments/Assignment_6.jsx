import { useState } from "react";

export default function Assignment_6() {
    const [style, setStyle] = useState([]);
    const [name, setName] = useState("");
    const [value, setValue] = useState("");

    function addStyle() {
        if (name === "" || value === "") return;

        const newStyle = {
            name,
            value
        };

        setStyle([...style, newStyle]);

        setName("");
        setValue("");
    }

    function deleteItem(indexToDelete) {
        const filteredStyle = style.filter(
            (item, index) => index !== indexToDelete
        );

        setStyle(filteredStyle);
    }

    const cssObject = style.reduce(
        (obj, item) => ({
            ...obj,
            [item.name]: item.value
        }),
        {}
    );

    return (
        <div>

            <input
                type="text"
                placeholder="CSS Property"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="text"
                placeholder="Value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />

            <button onClick={addStyle}>Add</button>

            <ul>
                {style.map((item, index) => (
                    <li key={index}>
                        {item.name}: {item.value}

                        <button onClick={() => deleteItem(index)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            <div style={cssObject}>
                Hello World!
            </div>
        </div>
    );
}