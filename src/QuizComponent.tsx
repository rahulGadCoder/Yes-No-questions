import React, { useState, useEffect } from "react";
import QUESTIONS from "./questions";
import "./QuizComponent.css";

const QuizComponent = () => {
    const [ans, setAns] = useState<Record<number, string>>({});
    const [score, setScore] = useState<number | null>(null);
    const [avgScore, setAvgScore] = useState<number | null>(null);
  
    useEffect(() => {
      const allScores = JSON.parse(localStorage.getItem("scores") || "[]");
      if (allScores.length > 0) {
        const total = allScores.reduce((acc: number, curr: number) => acc + curr, 0);
        setAvgScore(total / allScores.length);
      }
    }, []);
  
    const handleAns = (answer: string, questionId: number) => {
      setAns((prevAnswers) => ({ ...prevAnswers, [questionId]: answer }));
    };
  
    const calculateScore = () => {
        
      const yesCount = Object.values(ans).filter((answer) => answer === "Yes").length;
      const newScore = (yesCount / Object.keys(QUESTIONS).length) * 100;
  
      const previousScores = JSON.parse(localStorage.getItem("scores") || "[]");
      const updatedScores = [...previousScores, newScore];
      localStorage.setItem("scores", JSON.stringify(updatedScores));
  
      const total = updatedScores.reduce((acc: number, curr: number) => acc + curr, 0);
      setAvgScore(total / updatedScores.length);
      setScore(newScore);
      resetQuiz()
    };
  
    const resetQuiz = () => {
      setAns({});
      setScore(null);
    };
  
    return (
      <div className="container">
        <h1>Yes/No Quiz</h1>
        {Object.entries(QUESTIONS).map(([id, question]) => (
          <div className="question" key={id}>
            <p>{question}</p>
            <button
              className={ans[Number(id)] === "Yes" ? "active" : ""}
              onClick={() => handleAns("Yes", Number(id))}
            >
              Yes
            </button>
            <button
              className={ans[Number(id)] === "No" ? "active" : ""}
              onClick={() => handleAns("No", Number(id))}
            >
              No
            </button>
          </div>
        ))}
        <button className="submit" onClick={calculateScore}>Submit</button>
  
        {score !== null && (
          <div className="results">
            <h2>Your Score: {score.toFixed(2)}</h2>
          </div>
        )}
  
        {avgScore !== null && (
          <div className="results">
            <h2>Avg Score: {avgScore.toFixed(2)}</h2>
          </div>
        )}
  
        <button className="retry" onClick={resetQuiz}>Retry Quiz</button>
      </div>
    );
  };
  

export default QuizComponent;
