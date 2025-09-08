import { useEffect, useState } from "react";

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
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [randomMultiplier, setRandomMultiplier] = useState<number>(1);
  const [answerOptions, setAnswerOptions] = useState<number[]>([]);
  const [hiddenOptions, setHiddenOptions] = useState<Set<number>>(new Set());

  // Obtener nivel de dificultad basado en wins guardados en localStorage
  const getDifficultyLevel = (): number => {
    const winsString = localStorage.getItem("wins");
    const wins = winsString ? parseInt(winsString) : 0;
    // Máximo 3 opciones incorrectas
    return Math.min(wins, 3);
  };

  // Generar número aleatorio entre 1 y 10 que no haya sido respondido
  const generateRandomQuestion = (answered: number[]): number => {
    const available = Array.from({ length: 10 }, (_, i) => i + 1).filter(
      (num) => !answered.includes(num),
    );
    if (available.length === 0) return 1;
    return available[Math.floor(Math.random() * available.length)];
  };

  // Generar opciones de respuesta basadas en la dificultad
  const generateAnswerOptions = (
    correctAnswer: number,
    difficulty: number,
  ): number[] => {
    const options = [correctAnswer]; // Siempre incluir la respuesta correcta

    // Generar opciones incorrectas según el nivel de dificultad
    const incorrectOptions = new Set<number>();

    while (incorrectOptions.size < difficulty) {
      // Generar respuestas incorrectas cercanas a la correcta para mayor desafío
      const offset = Math.floor(Math.random() * 20) - 10; // Entre -10 y +10
      const incorrectAnswer = correctAnswer + offset;

      // Asegurar que la respuesta incorrecta sea positiva y diferente de la correcta
      if (incorrectAnswer > 0 && incorrectAnswer !== correctAnswer) {
        incorrectOptions.add(incorrectAnswer);
      }
    }

    // Combinar respuestas correcta e incorrectas y mezclar
    const allOptions = [...options, ...Array.from(incorrectOptions)];
    return allOptions.sort(() => Math.random() - 0.5); // Mezclar aleatoriamente
  };

  // Inicializar componente con primera pregunta
  useEffect(() => {
    setCurrentQuestion(1);
    setAnsweredQuestions([]);
    setHiddenOptions(new Set());

    const firstRandom = generateRandomQuestion([]);
    setRandomMultiplier(firstRandom);

    const correctAnswer = tableToPlay * firstRandom;
    const difficulty = getDifficultyLevel();
    const options = generateAnswerOptions(correctAnswer, difficulty);
    setAnswerOptions(options);
  }, [tableToPlay]);

  // Manejar click en una opción de respuesta
  const handleAnswerClick = (selectedAnswer: number) => {
    const correctAnswer = tableToPlay * randomMultiplier;

    if (selectedAnswer === correctAnswer) {
      // Respuesta correcta - avanzar a la siguiente pregunta
      const newAnswered = [...answeredQuestions, randomMultiplier];
      setAnsweredQuestions(newAnswered);

      if (newAnswered.length === 10) {
        // Completadas las 10 preguntas
        onWin();
      } else {
        // Generar siguiente pregunta
        setCurrentQuestion(currentQuestion + 1);
        setHiddenOptions(new Set()); // Resetear opciones ocultas

        const nextRandom = generateRandomQuestion(newAnswered);
        setRandomMultiplier(nextRandom);

        const nextCorrectAnswer = tableToPlay * nextRandom;
        const difficulty = getDifficultyLevel();
        const nextOptions = generateAnswerOptions(
          nextCorrectAnswer,
          difficulty,
        );
        setAnswerOptions(nextOptions);
      }
    } else {
      // Respuesta incorrecta - ocultar este botón
      setHiddenOptions((prev) => new Set([...prev, selectedAnswer]));
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
          {/* Pregunta de multiplicación */}
          <h2 className="text-2xl mb-8 text-gray-800">
            ¿Cuánto es {tableToPlay} × {randomMultiplier}?
          </h2>

          {/* Botones de opciones múltiples */}
          <div
            className={`grid gap-4 max-w-md mx-auto ${answerOptions.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}
          >
            {answerOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswerClick(option)}
                className={`
                  py-3 px-6 text-xl font-bold rounded-lg transition-all duration-200 cursor-pointer
                  ${
                    hiddenOptions.has(option)
                      ? "invisible" // Invisible para evitar layout shift
                      : "bg-purple-500 hover:bg-purple-600 text-white hover:scale-105"
                  }
                `}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Botón para regresar al inicio */}
        <div className="text-center">
          <button
            onClick={onBackToHome}
            className="mt-6 text-purple-600 hover:text-purple-800 no-underline transition-colors cursor-pointer"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
