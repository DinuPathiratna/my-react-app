import { useState } from "react";

function Assignment_26() {
    const [menu, setMenu] = useState({
        show: false, 
        x: 0, y: 0,
    });
    const [color, setColor] = useState("#D2E8DD");

    function rightClick(event) {
        event.preventDefault();

        setMenu({
            show: true,
            x: event.nativeEvent.offsetX,
            y: event.nativeEvent.offsetY,
        });
    }

    return (
        <div style={{ padding: "30px" }}>
            <div onContextMenu={rightClick} onClick={() => setMenu({ ...menu, show: false })}
                style={{
                    width: "300px",
                    height: "300px",
                    backgroundColor: color,
                    border: "1px solid black",
                    position: "relative",
                }}>
                {menu.show && (
                    <div style={{
                        position: "absolute",
                        left: menu.x,
                        top: menu.y,
                        backgroundColor: "white",
                        border: "1px solid black",
                        borderRadius: "5px",
                    }}>
                        <div onClick={() => {
                            setColor("#518DE8");
                            setMenu({ ...menu, show: false });
                        }}
                            style={{ padding: "10px", cursor: "pointer" }}>
                            Blue
                        </div>

                        <div onClick={() => {
                            setColor("#61DC61");
                            setMenu({ ...menu, show: false });
                        }}
                            style={{ padding: "10px", cursor: "pointer" }}>
                            Green
                        </div>

                        <div onClick={() => {
                            setColor("#e4547f");
                            setMenu({ ...menu, show: false });
                        }}
                            style={{ padding: "10px", cursor: "pointer" }}>
                            Pink
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}

export default Assignment_26;