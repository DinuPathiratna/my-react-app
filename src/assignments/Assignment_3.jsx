import { useState } from "react";

export default function Assignment_3() {

  const [number, setNumber] = useState("");
  const [numbers, setNumbers] = useState([]);

  function addNumber() {

    const newNumber = Number(number);

    setNumbers([...numbers, newNumber]);

    setNumber("");
  }

  let total = 0;

  for (let i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }

  let average = 0;

  if (numbers.length > 0) {
    average = total / numbers.length;
  }

  return (
    <div>

      <h2>Total: {total}</h2>

      <h2>Average: {average}</h2>

      <ul>
        {numbers.map((num, index) => (
          <li key={index}>
            {num}
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