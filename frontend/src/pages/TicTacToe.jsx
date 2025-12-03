import React, { useState, useEffect } from "react";
import "../styles/TicTacToe.css";
import { useNavigate } from "react-router-dom";

const TicTacToe = () => {
  const navigate = useNavigate();

  const emptyBoard = Array(9).fill("");
  const [board, setBoard] = useState(emptyBoard);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [winner, setWinner] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showOutro, setShowOutro] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const wins = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  const checkWinner = (b) => {
    for (let p of wins) {
      const [a, b1, c] = p;
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a];
    }
    return null;
  };

  const handleClick = (i) => {
    if (!playerTurn || board[i] !== "" || winner || showOutro) return;

    const newBoard = [...board];
    newBoard[i] = "X";
    setBoard(newBoard);
    setPlayerTurn(false);
  };

  useEffect(() => {
    const win = checkWinner(board);

    if (win) {
      setWinner(win);

      if (win === "X") {
        setShowConfetti(true);

        setTimeout(() => {
          setShowConfetti(false);
          setShowOutro(true);
        }, 2000);

        setTimeout(() => navigate("/customer"), 3800);
      }
      return;
    }

    if (!playerTurn && !winner) {
      let emptyCells = board
        .map((v, i) => (v === "" ? i : null))
        .filter((v) => v !== null);

      if (emptyCells.length === 0) return;

      let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

      setTimeout(() => {
        const newBoard = [...board];
        newBoard[randomCell] = "O";
        setBoard(newBoard);
        setPlayerTurn(true);
      }, 500);
    }
  }, [board, playerTurn, navigate, winner]);

  const restart = () => {
    setBoard(emptyBoard);
    setWinner("");
    setPlayerTurn(true);
    setShowConfetti(false);
    setShowOutro(false);
  };

  return (
    <div className="tic-page">
      {showIntro && (
        <div className="intro-screen">
          <h1 className="intro-text">WELCOME PLAYER</h1>
          <p className="intro-sub">Let The Battle Begin...</p>
        </div>
      )}

      {showConfetti && (
        <div className="confetti-container">
          {Array.from({ length: 70 }).map((_, i) => (
            <div key={i} className="confetti"></div>
          ))}
        </div>
      )}

      {showOutro && (
        <div className="outro-screen">
          <h1 className="outro-text">VICTORY</h1>
        </div>
      )}

      <h1 className="tic-title">Tic Tac Toe</h1>
      <p className="tic-sub">Win to enter Customer Dashboard 🎮</p>

      <div className={`board ${showOutro ? "disabled" : ""}`}>
        {board.map((cell, index) => (
          <div key={index} className="cell" onClick={() => handleClick(index)}>
            {cell}
          </div>
        ))}
      </div>

      {winner && (
        <p className="winner-text">
          {winner === "X" ? "🎉 YOU WIN!" : "😢 YOU LOST"}
        </p>
      )}

      <button className="restart-btn" onClick={restart}>Restart</button>
    </div>
  );
};

export default TicTacToe;
