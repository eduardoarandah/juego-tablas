import { useRef, useEffect } from "react";

interface TableGameViewProps {
  currentTable: number;
  currentQuestion: number;
  userAnswer: string;
  onAnswerChange: (value: string) => void;
  onCheckAnswer: () => void;
  onBackToHome: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export default function TableGameView({
  currentTable,
  currentQuestion,
  userAnswer,
  onAnswerChange,
  onCheckAnswer,
  onBackToHome,
  onKeyPress,
}: TableGameViewProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentQuestion]);

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
            onChange={(e) => onAnswerChange(e.target.value)}
            onKeyPress={onKeyPress}
            className="border-1 border-gray-300 rounded-lg px-4 py-2 text-xl text-center w-32 mb-6"
            placeholder="?"
            autoFocus
          />

          <div className="flex justify-center gap-4">
            <button
              onClick={onCheckAnswer}
              disabled={!userAnswer}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              Responder
            </button>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onBackToHome}
            className="mt-6 text-purple-600 hover:text-purple-800 no-underline"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}