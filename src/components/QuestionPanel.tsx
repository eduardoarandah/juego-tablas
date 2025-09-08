import { useRef, useEffect, useState } from "react";

interface QuestionPanelProps {
  tableToPlay: number;
  onWin: () => void;
  onBackToHome: () => void;
}

export function QuestionPanel({
  tableToPlay,
  onWin,
  onBackToHome,
}: QuestionPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [randomMultiplier, setRandomMultiplier] = useState<number>(1);

  // Función para generar un número aleatorio entre 1 y 10 que no haya sido respondido
  const generateRandomQuestion = (answered: number[]): number => {
    const available = Array.from({ length: 10 }, (_, i) => i + 1).filter(
      (num) => !answered.includes(num),
    );
    if (available.length === 0) return 1;
    return available[Math.floor(Math.random() * available.length)];
  };

  // Inicializar el componente con la primera pregunta aleatoria
  useEffect(() => {
    setCurrentQuestion(1);
    setUserAnswer("");
    setAnsweredQuestions([]);
    const firstRandom = generateRandomQuestion([]);
    setRandomMultiplier(firstRandom);
  }, [tableToPlay]);

  // Enfocar el input cuando cambie la pregunta
  useEffect(() => {
    inputRef.current?.focus();
  }, [currentQuestion]);

  const checkAnswer = () => {
    const correctAnswer = tableToPlay * randomMultiplier;
    if (parseInt(userAnswer) === correctAnswer) {
      const newAnswered = [...answeredQuestions, randomMultiplier];
      setAnsweredQuestions(newAnswered);

      if (newAnswered.length === 10) {
        // Todas las 10 preguntas han sido respondidas correctamente
        onWin();
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Título de la tabla actual */}
        <h1 className="text-3xl font-bold text-center mb-8 text-purple-800">
          Tabla del {tableToPlay}
        </h1>

        {/* Tarjeta principal con la pregunta */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {/* Pregunta de multiplicación con número aleatorio */}
          <h2 className="text-2xl mb-6 text-gray-800">
            ¿Cuánto es {tableToPlay} × {randomMultiplier}?
          </h2>

          {/* Input para la respuesta del usuario */}
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

          {/* Botón para enviar respuesta */}
          <div className="flex justify-center gap-4">
            <button
              onClick={checkAnswer}
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
