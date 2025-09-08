import { useRef, useEffect } from "react";

interface QuestionPanelProps {
  currentTable: number;
  currentQuestion: number;
  randomMultiplier: number; // Número aleatorio para la multiplicación
  userAnswer: string;
  onAnswerChange: (value: string) => void;
  onCheckAnswer: () => void;
  onBackToHome: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export function QuestionPanel({
  currentTable,
  currentQuestion,
  randomMultiplier,
  userAnswer,
  onAnswerChange,
  onCheckAnswer,
  onBackToHome,
  onKeyPress,
}: QuestionPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Enfocar el input cuando cambie la pregunta
  useEffect(() => {
    inputRef.current?.focus();
  }, [currentQuestion]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Título de la tabla actual */}
        <h1 className="text-3xl font-bold text-center mb-8 text-purple-800">
          Tabla del {currentTable}
        </h1>

        {/* Tarjeta principal con la pregunta */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {/* Pregunta de multiplicación con número aleatorio */}
          <h2 className="text-2xl mb-6 text-gray-800">
            ¿Cuánto es {currentTable} × {randomMultiplier}?
          </h2>

          {/* Input para la respuesta del usuario */}
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

          {/* Botón para enviar respuesta */}
          <div className="flex justify-center gap-4">
            <button
              onClick={onCheckAnswer}
              disabled={!userAnswer}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Responder
            </button>
          </div>
        </div>

        {/* Botón para regresar al inicio */}
        <div className="text-center">
          <button
            onClick={onBackToHome}
            className="mt-6 text-purple-600 hover:text-purple-800 no-underline transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
