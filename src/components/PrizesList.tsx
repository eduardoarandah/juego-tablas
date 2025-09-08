interface PrizesListProps {
  wins: number;
  prizes: string[];
}

export default function PrizesList({ wins, prizes }: PrizesListProps) {
  if (wins === 0) return null;

  const animations = [
    "wobble-1",
    "wobble-2",
    "wobble-3",
    "wobble-4",
    "wobble-5",
    "wobble-6",
  ];

  const wonPrizes = [];
  for (let i = 0; i < wins; i++) {
    if (i < prizes.length) {
      wonPrizes.push(prizes[i]);
    } else {
      wonPrizes.push("🦄");
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 max-w-xs mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4 text-orange-800">
        Premios:
      </h2>
      <div className="text-5xl flex flex-wrap justify-center gap-5">
        {wonPrizes.map((prize, i) => (
          <div
            key={i}
            className={`text-center prize-character ${animations[i % animations.length]}`}
          >
            {prize}
          </div>
        ))}
      </div>
    </div>
  );
}
