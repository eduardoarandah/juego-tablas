interface GameCompleteViewProps {
  wins: number;
  prizes: string[];
  playAgainClick: () => void;
}

export default function GameCompleteView({ wins, prizes, playAgainClick }: GameCompleteViewProps) {
  const currentPrize = wins > 0 && wins <= prizes.length ? prizes[wins - 1] : "🦄";
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-8">
          ¡Felicidades! has ganado a:
        </h1>
        <div className="text-8xl mb-8">
          {currentPrize}
        </div>
        <button
          onClick={playAgainClick}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg"
        >
          Volver a jugar
        </button>
      </div>
    </div>
  );
}
