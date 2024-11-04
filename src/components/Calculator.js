import React, { useState } from "react";

export const Calculator = () => {
  const [total, setTotal] = useState(0);
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");

  const sum = () => {
    setTotal(parseInt(num1) + parseInt(num2));
  };

  const multiply = () => {
    setTotal(num1 * num2);
  };

  const subtract = () => {
    setTotal(num1 - num2);
  }

  const reset = () => {
    setTotal(0);
    setNum1("");
    setNum2("");
  }

  return (
    <div className="container mb-4" style={{ backgroundColor: "lightgray", padding: "20px" }}>
      <h1 className="mb-4 bac">Total = {total}</h1>

      <div className="mb-3 blue">
        <label className="form-label">Number 1</label>
        <input
          type="number"
          className="form-control"
          id="num1"
          placeholder="Enter Number 1"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Number 2</label>
        <input
          type="number"
          className="form-control"
          id="num2"
          placeholder="Enter Number 2"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-center gap-2 mt-3">
        <button className="btn btn-primary" onClick={sum}>Add</button>
        <button className="btn btn-primary" onClick={multiply}>Multiply</button>
        <button className="btn btn-primary"onClick={subtract}>Subtract</button>
        <button className="btn btn-danger"onClick={reset}>Reset</button>
      </div>
    </div>
  );
};
