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
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [progress, setProgress] = useState<GameProgress>({});
  const [wins, setWins] = useState<number>(0);
  // Array para almacenar las preguntas ya respondidas correctamente
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  // Número aleatorio actual para la pregunta (1-10)
  const [randomMultiplier, setRandomMultiplier] = useState<number>(1);

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

  // Función para generar un número aleatorio entre 1 y 10 que no haya sido respondido
  const generateRandomQuestion = (answered: number[]): number => {
    const available = Array.from({ length: 10 }, (_, i) => i + 1).filter(
      (num) => !answered.includes(num),
    );
    if (available.length === 0) return 1;
    return available[Math.floor(Math.random() * available.length)];
  };

  // Iniciar una tabla de multiplicar específica
  const startTable = (tableNumber: number) => {
    setCurrentTable(tableNumber);
    setCurrentQuestion(1);
    setUserAnswer("");
    // Reiniciar preguntas respondidas y generar primera pregunta aleatoria
    setAnsweredQuestions([]);
    const firstRandom = generateRandomQuestion([]);
    setRandomMultiplier(firstRandom);
    setCurrentView("table");
  };

  const checkAnswer = () => {
    // Calcular la respuesta correcta usando el multiplicador aleatorio
    const correctAnswer = currentTable * randomMultiplier;
    if (parseInt(userAnswer) === correctAnswer) {
      // Agregar la pregunta respondida al array de respondidas
      const newAnswered = [...answeredQuestions, randomMultiplier];
      setAnsweredQuestions(newAnswered);

      if (newAnswered.length === 10) {
        // Todas las 10 preguntas han sido respondidas correctamente
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
          localStorage.removeItem("progress");
          setProgress({});
          // mostrar pantalla de victoria
          setCurrentView("complete");
        } else {
          setCurrentView("home");
        }
      } else {
        // Generar siguiente pregunta aleatoria y continuar
        setCurrentQuestion(currentQuestion + 1);
        const nextRandom = generateRandomQuestion(newAnswered);
        setRandomMultiplier(nextRandom);
        setUserAnswer("");
      }
    }
  };

  // Manejar la tecla Enter para enviar respuesta
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      checkAnswer();
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
        currentTable={currentTable}
        currentQuestion={currentQuestion}
        randomMultiplier={randomMultiplier}
        userAnswer={userAnswer}
        onAnswerChange={setUserAnswer}
        onCheckAnswer={checkAnswer}
        onBackToHome={() => setCurrentView("home")}
        onKeyPress={handleKeyPress}
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
