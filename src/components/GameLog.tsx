import Image from "next/image";

interface GameLogProps {
  log: string[];
}

export default function GameLog({ log }: GameLogProps) {
  return (
    <div className="border border-gray-300 p-2 sm:p-3 h-32 sm:h-36 md:h-40 
                  overflow-auto bg-gray-100 text-gray-900 rounded-lg sm:rounded-xl md:rounded-2xl 
                  shadow-lg mt-4 sm:mt-5 md:mt-6 mx-auto max-w-[90%] sm:max-w-[85%] md:max-w-[80%]">
      <h2 className="text-base sm:text-lg md:text-xl font-semibold flex justify-center items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
        <Image 
          src="/image/save.png" 
          height={20} 
          width={20}
          className="h-[16px] w-[16px] sm:h-[18px] sm:w-[18px] md:h-[20px] md:w-[20px]" 
          alt="Save" 
        />
        <span>Game Log</span>
      </h2>
      <div className="text-sm sm:text-base">
        {log.length === 0 ? (
          <p className="text-gray-500 text-center italic">No game actions yet</p>
        ) : (
          log.map((entry, index) => (
            <p key={index} className="mb-1 last:mb-0">{entry}</p>
          ))
        )}
      </div>
    </div>
  );
}