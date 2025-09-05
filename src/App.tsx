import "./style.css";
import { useState, useEffect, useRef } from "react";

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
  const inputRef = useRef<HTMLInputElement>(null);

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

  const loadProgress = () => {
    const saved = localStorage.getItem("multiplicationGameProgress");
    if (saved) {
      const savedProgress = JSON.parse(saved);
      setProgress(savedProgress);
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
        if (completedTables === 10) {
          setCurrentView("complete");
        } else {
          setCurrentView("home");
        }
      } else {
        setCurrentQuestion(currentQuestion + 1);
        setUserAnswer("");
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    }
  };

  const resetGame = () => {
    localStorage.removeItem("multiplicationGameProgress");
    setProgress({});
    setCurrentView("home");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      checkAnswer();
    }
  };

  if (currentView === "complete") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold text-green-600 mb-8">
            ¡Has ganado todos los animalitos, felicidades!
          </h1>
          <div className="text-6xl mb-8">
            {Object.values(animals).join(" ")}
          </div>
          <button
            onClick={resetGame}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg"
          >
            Reiniciar el juego
          </button>
        </div>
      </div>
    );
  }

  if (currentView === "table") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <h1 className="text-3xl font-bold text-center mb-8 text-purple-800">
            Tabla del {currentTable}
          </h1>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl mb-6 text-gray-800">
              ¿Cuánto es {currentTable} × {currentQuestion}?
            </h2>

            <input
              ref={inputRef}
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              className="border-1 border-gray-300 rounded-lg px-4 py-2 text-xl text-center w-32 mb-6"
              placeholder="?"
              autoFocus
            />

            <div className="flex justify-center gap-4">
              <button
                onClick={checkAnswer}
                disabled={!userAnswer}
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg"
              >
                Responder
              </button>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setCurrentView("home")}
              className="mt-6 text-purple-600 hover:text-purple-800 no-underline"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-100 p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-orange-800">
          Gana todos los animalitos
        </h1>

        {/* si tenemos todos los animalitos, mostrar el unicornio */}
        {Object.keys(progress).length === 10 && (
          <div className="text-center p-4 bg-gradient-to-b from-blue-100 to-green-100 my-12 rounded-lg shadow-lg">
            <div className="text-3xl font-bold mb-8 text-purple-700">
              Felicidades, has ganado al unicornio 😀
            </div>
            <div className="text-8xl mb-8">🦄</div>
            <button
              onClick={resetGame}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg text-lg"
            >
              Reiniciar el juego
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 justify-items-center">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((tableNumber) => (
            <button
              key={tableNumber}
              onClick={() => startTable(tableNumber)}
              className="bg-white hover:bg-gray-50 rounded-lg p-4 shadow-md transition-all hover:shadow-lg border-1 hover:border-orange-300"
            >
              <div className="text-lg font-semibold mb-2">
                Tabla del {tableNumber}
              </div>
              <div className="text-3xl">
                {progress[tableNumber]
                  ? animals[tableNumber as keyof typeof animals] || "🦄"
                  : "❓"}
              </div>
            </button>
          ))}
        </div>

        {Object.keys(progress).length > 0 && (
          <div className="text-center">
            <button
              onClick={resetGame}
              className="bg-red-200 hover:bg-red-300 text-red-950 font-bold py-2 px-4 rounded-lg"
            >
              Volver a comenzar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
