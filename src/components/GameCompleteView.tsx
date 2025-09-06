interface GameCompleteViewProps {
  animals: { [key: number]: string };
  onResetGame: () => void;
}

export default function GameCompleteView({ animals, onResetGame }: GameCompleteViewProps) {
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
          onClick={onResetGame}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg"
        >
          Reiniciar el juego
        </button>
      </div>
    </div>
  );
}