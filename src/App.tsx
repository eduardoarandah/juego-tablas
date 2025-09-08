import "./style.css";
import { useState, useEffect } from "react";
import GameCompleteView from "./components/GameCompleteView";
import { QuestionPanel } from "./components/QuestionPanel";
import HomeView from "./components/HomeView";

interface GameProgress {
  [table: number]: boolean;
}

function App() {
  const [currentView, setCurrentView] = useState<"home" | "table" | "complete">(
    "home",
  );
  const [currentTable, setCurrentTable] = useState<number>(1);
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

  // Cargar progreso guardado desde localStorage
  const loadProgress = () => {
    const saved = localStorage.getItem("progress");
    if (saved) {
      const savedProgress = JSON.parse(saved);
      setProgress(savedProgress);
    }

    const savedWins = localStorage.getItem("wins");
    if (savedWins) {
      setWins(parseInt(savedWins));
    }
  };

  // Guardar progreso en localStorage
  const saveProgress = (newProgress: GameProgress) => {
    localStorage.setItem("progress", JSON.stringify(newProgress));
    setProgress(newProgress);
  };

  useEffect(() => {
    loadProgress();
  }, []);


  // Iniciar una tabla de multiplicar específica
  const startTable = (tableNumber: number) => {
    setCurrentTable(tableNumber);
    setCurrentView("table");
  };

  // Manejar la victoria de una tabla
  const handleTableWin = (tableNumber: number) => {
    const newProgress = { ...progress, [tableNumber]: true };
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
      localStorage.removeItem("progress");
      setProgress({});
      // mostrar pantalla de victoria
      setCurrentView("complete");
    } else {
      setCurrentView("home");
    }
  };


  // Renderizar pantalla de victoria completa
  if (currentView === "complete") {
    return (
      <GameCompleteView
        wins={wins}
        prizes={prizes}
        playAgainClick={() => setCurrentView("home")}
      />
    );
  }

  // Renderizar vista de tabla de multiplicar
  if (currentView === "table") {
    return (
      <QuestionPanel
        tableToPlay={currentTable}
        onWin={() => handleTableWin(currentTable)}
        onBackToHome={() => setCurrentView("home")}
      />
    );
  }

  // Renderizar vista principal (home)
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
