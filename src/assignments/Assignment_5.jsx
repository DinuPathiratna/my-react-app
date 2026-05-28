import { useState } from "react";

export default function Assignment_5() {

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

  function sortAscending() {

    const sorted = [...numbers].sort((a, b) => a - b);

    setNumbers(sorted);
  }

  function sortDescending() {

    const sorted = [...numbers].sort((a, b) => b - a);

    setNumbers(sorted);
  }

  function moveUp(index) {

    if (index === 0) return;

    const updated = [...numbers];

    [updated[index], updated[index - 1]] =
    [updated[index - 1], updated[index]];

    setNumbers(updated);
  }

  function moveDown(index) {

    if (index === numbers.length - 1) return;

    const updated = [...numbers];

    [updated[index], updated[index + 1]] =
    [updated[index + 1], updated[index]];

    setNumbers(updated);
  }

  return (
    <div>

      <button onClick={sortAscending}>
        Sort Ascending
      </button>

      <button onClick={sortDescending}>
        Sort Descending
      </button>

      <ul>
        {numbers.map((num, index) => (
          <li key={index}>

            {num}

            <button
              onClick={() => moveUp(index)}
              disabled={index === 0}
            >
              Move Up
            </button>

            <button
              onClick={() => moveDown(index)}
              disabled={index === numbers.length - 1}
            >
              Move Down
            </button>

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