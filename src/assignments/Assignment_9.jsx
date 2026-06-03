import { useState } from "react";

function Assignment_9() {
  const [search, setSearch] = useState("");
  const [colors, setColors] = useState([]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);

  const handleSearch = async (selectedPage = 1) => {
    const response = await fetch(`https://apis.dnjs.lk/objects/colors.php?search=${search}&page=${selectedPage}&limit=${limit}`);
    const result = await response.json();

    setColors(result.data);
    setPage(result.page);
    setLimit(result.limit);
    setTotal(result.total);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <h2>Color Search With Pagination</h2>

      <input
        type="text"
        placeholder="Search color"
        value={search}
        onChange={(e) => setSearch(e.target.value)}/>

      <button onClick={() => handleSearch(1)}>Search</button>

      <ul>
        {colors.map((color, index) => (
          <li key={index}>
            {color.name} - {color.code}
          </li>
        ))}
      </ul>

      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => handleSearch(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Assignment_9;