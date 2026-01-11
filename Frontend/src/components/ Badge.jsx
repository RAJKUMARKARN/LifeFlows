

export default function Badge() {
  return (
    <div className="flex flex-col items-center justify-center h-20 w-full border border-dashed rounded-lg bg-gray-50">
      <img
        src="/Emptybadge.png"
        alt="Empty badge"
        className="w-10 h-10 opacity-40"
      />
      <span className="text-xs text-gray-400 mt-1">Locked</span>
    </div>
  );
}




