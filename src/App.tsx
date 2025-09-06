import "./style.css";
import { useState, useEffect } from "react";
import GameCompleteView from "./components/GameCompleteView";
import TableGameView from "./components/TableGameView";
import HomeView from "./components/HomeView";

interface GameProgress {
  [table: number]: boolean;
}

function App() {
  const [currentView, setCurrentView] = useState<"home" | "table" | "complete">(
    "home",
  );
  const [currentTable, setCurrentTable] = useState<number>(1);
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [progress, setProgress] = useState<GameProgress>({});
  const [wins, setWins] = useState<number>(0);

  const animals = {
    1: "🐰",
    2: "🐶",
    3: "🐹",
    4: "🐼",
    5: "🐻",
    6: "🐨",
    7: "🐯",
    8: "🦁",
    9: "🐮",
    10: "🐷",
    11: "🦉",
    12: "🐸",
  };

  const prizes = [
    "🐶",
    "🐱",
    "🐹",
    "🐰",
    "🦁",
    "🐯",
    "🐻",
    "🐸",
    "🦊",
    "🐒",
    "🐔",
    "🐼",
    "🦧",
    "🦖",
    "🦒",
    "🐘",
    "🐳",
    "🦌",
    "🦭",
    "🦕",
    "🐙",
    "🐬",
    "🦀",
    "🐥",
    "🐢",
    "🦑",
    "🦈",
    "🪼",
    "🐲",
    "🦄",
  ];

  const loadProgress = () => {
    const saved = localStorage.getItem("multiplicationGameProgress");
    if (saved) {
      const savedProgress = JSON.parse(saved);
      setProgress(savedProgress);
    }

    const savedWins = localStorage.getItem("wins");
    if (savedWins) {
      setWins(parseInt(savedWins));
    }
  };

  const saveProgress = (newProgress: GameProgress) => {
    localStorage.setItem(
      "multiplicationGameProgress",
      JSON.stringify(newProgress),
    );
    setProgress(newProgress);
  };

  useEffect(() => {
    loadProgress();
  }, []);

  const startTable = (tableNumber: number) => {
    setCurrentTable(tableNumber);
    setCurrentQuestion(1);
    setUserAnswer("");
    setCurrentView("table");
  };

  const checkAnswer = () => {
    const correctAnswer = currentTable * currentQuestion;
    if (parseInt(userAnswer) === correctAnswer) {
      if (currentQuestion === 10) {
        const newProgress = { ...progress, [currentTable]: true };
        saveProgress(newProgress);
        const completedTables = Object.keys(newProgress).filter(
          (key) => newProgress[parseInt(key)],
        ).length;
        if (completedTables === 12) {
          const newWins = wins + 1;
          // guardar el nuevo numero de victorias
          setWins(newWins);
          localStorage.setItem("wins", newWins.toString());
          // quitar el progreso
          localStorage.removeItem("multiplicationGameProgress");
          setProgress({});
          // mostrar pantalla de victoria
          setCurrentView("complete");
        } else {
          setCurrentView("home");
        }
      } else {
        setCurrentQuestion(currentQuestion + 1);
        setUserAnswer("");
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      checkAnswer();
    }
  };

  if (currentView === "complete") {
    return (
      <GameCompleteView
        wins={wins}
        prizes={prizes}
        playAgainClick={() => setCurrentView("home")}
      />
    );
  }

  if (currentView === "table") {
    return (
      <TableGameView
        currentTable={currentTable}
        currentQuestion={currentQuestion}
        userAnswer={userAnswer}
        onAnswerChange={setUserAnswer}
        onCheckAnswer={checkAnswer}
        onBackToHome={() => setCurrentView("home")}
        onKeyPress={handleKeyPress}
      />
    );
  }

  return (
    <HomeView
      progress={progress}
      animals={animals}
      wins={wins}
      prizes={prizes}
      onStartTable={startTable}
    />
  );
}

export default App;
