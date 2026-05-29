import { useState, useEffect } from "react"; 
import axios from 'axios';

export default function Assignment_7() {
    const [colors, setColors] = useState([]);

    useEffect(() => {
        axios.get(`https://apis.dnjs.lk/objects/colors.php`).then((res) => {setColors(res.data);}).catch((error) => {console.error("Error fetching data:", error);});
    } , []);

    return (
        <div>
             <ul>
                {colors.map((color, index) => (
                    <li key={index}>{color.name}</li>
                ))}
             </ul>
        </div>
    );
}
