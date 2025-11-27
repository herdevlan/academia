

// src/components/MathChallenge.jsx
import React, { useState, useEffect } from 'react';
import './MathChallenge.css';

export default function MathChallenge() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [op, setOp] = useState('+');
  const [guess, setGuess] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    generateChallenge();
  }, []);

  const generateChallenge = () => {
    const operations = ['+', '-', '×', '÷'];
    const n1 = Math.floor(Math.random() * 20) + 1;
    const n2 = Math.floor(Math.random() * 20) + 1;
    const o = operations[Math.floor(Math.random() * operations.length)];

    if (o === '÷') {
      setNum1(n1 * n2);
      setNum2(n2);
    } else {
      setNum1(n1);
      setNum2(n2);
    }
    setOp(o);
    setGuess('');
    setMsg('');
  };

  const check = () => {
    let correct;
    switch (op) {
      case '+': correct = num1 + num2; break;
      case '-': correct = num1 - num2; break;
      case '×': correct = num1 * num2; break;
      case '÷': correct = num1 / num2; break;
      default: correct = 0;
    }

    if (+guess === correct) {
      setMsg('¡Correcto!');
      setTimeout(generateChallenge, 1000);
    } else {
      setMsg('Intenta de nuevo...');
    }
  };

  return (
    <div className="col-12 col-lg-4 d-flex justify-content-center align-items-center p-4">
      <div className="card shadow-lg p-4 rounded-4 border-0 w-100 math-challenge">
        <h3 className="fw-bold mb-3 text-center">Desafío Matemático</h3>
        <p className="challenge-text">{num1} {op} {num2} = ?</p>
        <input
          type="number"
          className="form-control mb-2 text-center"
          value={guess}
          onChange={e => setGuess(e.target.value)}
        />
        <button className="btn btn-success w-100 mb-2" onClick={check}>Comprobar</button>
        {msg && <p className="feedback">{msg}</p>}
      </div>
    </div>
  );
}
