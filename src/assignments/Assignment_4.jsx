import { useState } from "react";

export default function Assignment_4() {

  const [number, setNumber] = useState("");
  const [numbers, setNumbers] = useState([]);

  function addNumber() {

    const newNumber = Number(number);

    setNumbers([...numbers, newNumber]);

    setNumber("");
  }

  function deleteItem(indexToDelete) {

    const filteredNumbers = numbers.filter(
      (item, index) => index !== indexToDelete
    );

    setNumbers(filteredNumbers);
  }

  return (
    <div>

      <ul>
        {numbers.map((num, index) => (
          <li key={index}>

            {num}

            <button onClick={() => deleteItem(index)}>
              Delete
            </button>

          </li>
        ))}
      </ul>

      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter number"
      />

      <button onClick={addNumber}>
        Add
      </button>

    </div>
  );
}