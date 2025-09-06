import TableButton from "./TableButton";
import Footer from "./Footer";

interface GameProgress {
  [table: number]: boolean;
}

interface HomeViewProps {
  progress: GameProgress;
  animals: { [key: number]: string };
  onStartTable: (tableNumber: number) => void;
  onResetGame: () => void;
}

export default function HomeView({ progress, animals, onStartTable, onResetGame }: HomeViewProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-100 p-8">
      <div className="flex items-center  flex-col w-full h-full">
        <div className="max-w-2xl w-full">
          <h1 className="text-4xl font-bold text-center mb-8 text-orange-800">
            Gana todos los animalitos
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 justify-items-center">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((tableNumber) => (
              <TableButton
                key={tableNumber}
                tableNumber={tableNumber}
                isCompleted={progress[tableNumber]}
                animal={animals[tableNumber as keyof typeof animals] || "🦄"}
                onStartTable={onStartTable}
              />
            ))}
          </div>

          {Object.keys(progress).length > 0 && (
            <div className="text-center">
              <button
                onClick={onResetGame}
                className="bg-red-200 hover:bg-red-300 text-red-950 font-bold py-2 px-4 rounded-lg"
              >
                Volver a comenzar
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}