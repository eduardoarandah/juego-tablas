interface TableButtonProps {
  tableNumber: number;
  isCompleted: boolean;
  animal: string;
  onStartTable: (tableNumber: number) => void;
}

export default function TableButton({ tableNumber, isCompleted, animal, onStartTable }: TableButtonProps) {
  return (
    <button
      onClick={() => onStartTable(tableNumber)}
      className="bg-white hover:bg-gray-50 rounded-lg p-4 shadow-md transition-all hover:shadow-lg border-1 hover:border-orange-300"
    >
      <div className="text-lg font-semibold mb-2">
        Tabla del {tableNumber}
      </div>
      <div className="text-3xl">
        {isCompleted ? animal : "❓"}
      </div>
    </button>
  );
}