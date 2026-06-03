import { useState } from "react";

function Assignment_8() {
  const [search, setSearch] = useState("");
  const [colors, setColors] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`https://apis.dnjs.lk/objects/colors.php?search=${search}`);
    const data = await response.json();setColors(data);};

  return (
    <div>
      <h2>Color Search</h2>

      <input
        type="text"
        placeholder="Search color"
        value={search}
        onChange={(e) => setSearch(e.target.value)}/>

      <button onClick={handleSearch}>Search</button>

      <ul>
        {colors.map((color, index) => (
          <li key={index}>
            {color.name} - {color.code}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Assignment_8;