interface PrizesListProps {
  wins: number;
  prizes: string[];
}

export default function PrizesList({ wins, prizes }: PrizesListProps) {
  if (wins === 0) return null;

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
          <div key={i} className="text-center">
            {prize}
          </div>
        ))}
      </div>
    </div>
  );
}
