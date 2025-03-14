import Image from "next/image";

interface GameLogProps {
    log: string[];
  }
  
  export default function GameLog({ log }: GameLogProps) {
    return (
      <div className="border p-3 h-40 overflow-auto bg-white text-gray-900 rounded-xl shadow-lg mt-6">

      <h2 className="text-xl font-semibold flex justify-center items-center space-x-2">
        <Image src="/image/save.png" height={20} width={20} alt="Save" />
        <span>Save Game</span>
      </h2>
        {log.map((entry, index) => (
          <p key={index}>{entry}</p>
        ))}
      </div>
    );
  }
  