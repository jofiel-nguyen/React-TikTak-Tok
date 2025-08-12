
export const Square = ({ value, onClick, isWinningSquare }) => {
  const baseClasses = "w-24 h-24 flex items-center justify-center text-5xl font-bold border-2 border-gray-400 rounded-lg cursor-pointer transition-all duration-200 ease-in-out";
  const winningClasses = isWinningSquare ? "bg-green-300 text-white" : "hover:bg-gray-100";

  return (
    <button
      className={`${baseClasses} ${winningClasses}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};
