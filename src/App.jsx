import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [firstNumber, setFirstNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondNumber, setWaitingForSecondNumber] = useState(false);

  const inputNumber = (number) => {
    if (display === "Error") {
      setDisplay(number);
      return;
    }

    if (waitingForSecondNumber) {
      setDisplay(number);
      setWaitingForSecondNumber(false);
    } else {
      setDisplay(display === "0" ? number : display + number);
    }
  };

  const inputDecimal = () => {
    if (display === "Error") {
      setDisplay("0.");
      return;
    }

    if (waitingForSecondNumber) {
      setDisplay("0.");
      setWaitingForSecondNumber(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const calculate = (first, second, op) => {
    if (op === "+") return first + second;
    if (op === "-") return first - second;
    if (op === "×") return first * second;

    if (op === "÷") {
      if (second === 0) return "Error";
      return first / second;
    }

    return second;
  };

  const chooseOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (Number.isNaN(inputValue)) return;

    if (operator && waitingForSecondNumber) {
      setOperator(nextOperator);
      return;
    }

    if (firstNumber === null) {
      setFirstNumber(inputValue);
    } else if (operator) {
      const result = calculate(firstNumber, inputValue, operator);
      setDisplay(String(result));

      if (result === "Error") {
        setFirstNumber(null);
        setOperator(null);
        setWaitingForSecondNumber(false);
        return;
      }

      setFirstNumber(result);
    }

    setWaitingForSecondNumber(true);
    setOperator(nextOperator);
  };

  const equals = () => {
    if (operator === null || firstNumber === null) return;

    const secondNumber = parseFloat(display);
    const result = calculate(firstNumber, secondNumber, operator);

    setDisplay(String(result));
    setFirstNumber(null);
    setOperator(null);
    setWaitingForSecondNumber(false);
  };

  const clear = () => {
    setDisplay("0");
    setFirstNumber(null);
    setOperator(null);
    setWaitingForSecondNumber(false);
  };

  const deleteNumber = () => {
    if (display === "Error" || display.length === 1) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  return (
    <main className="page">
      <section className="calculator">
        <h1>React Calculator</h1>

        <div className="display">
          {display}
        </div>

        <div className="buttons">
          <button className="action" onClick={clear}>C</button>
          <button className="action" onClick={deleteNumber}>DEL</button>
          <button className="operator" onClick={() => chooseOperator("÷")}>÷</button>
          <button className="operator" onClick={() => chooseOperator("×")}>×</button>

          <button onClick={() => inputNumber("7")}>7</button>
          <button onClick={() => inputNumber("8")}>8</button>
          <button onClick={() => inputNumber("9")}>9</button>
          <button className="operator" onClick={() => chooseOperator("-")}>−</button>

          <button onClick={() => inputNumber("4")}>4</button>
          <button onClick={() => inputNumber("5")}>5</button>
          <button onClick={() => inputNumber("6")}>6</button>
          <button className="operator" onClick={() => chooseOperator("+")}>+</button>

          <button onClick={() => inputNumber("1")}>1</button>
          <button onClick={() => inputNumber("2")}>2</button>
          <button onClick={() => inputNumber("3")}>3</button>
          <button className="equals" onClick={equals}>=</button>

          <button className="zero" onClick={() => inputNumber("0")}>0</button>
          <button onClick={inputDecimal}>.</button>
        </div>
      </section>
    </main>
  );
}

export default App;
