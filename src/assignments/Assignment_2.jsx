import { useState } from "react";

export default function Assignment_2() {

  const [operation, setOperation] = useState("addition");
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState("");

  function calculate() {

    const number1 = Number(num1);
    const number2 = Number(num2);

    if (operation === "addition") {
      setResult(number1 + number2);
    }

    if (operation === "subtraction") {
      setResult(number1 - number2);
    }

    if (operation === "multiplication") {
      setResult(number1 * number2);
    }

    if (operation === "division") {
      setResult(number1 / number2);
    }
  }

  return (
    <div>

      <h1>Calculator</h1>

      <select
        value={operation}
        onChange={(e) => setOperation(e.target.value)}
      >
        <option value="addition">Addition</option>
        <option value="subtraction">Subtraction</option>
        <option value="multiplication">Multiplication</option>
        <option value="division">Division</option>
      </select>

      <br /><br />

      <input
        type="number"
        placeholder="First number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Second number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />

      <br /><br />

      {num1 !== "" && num2 !== "" && (
        <>
          <button onClick={calculate}>
            Calculate
          </button>

          <h2>Result: {result}</h2>
        </>
      )}

    </div>
  );
}