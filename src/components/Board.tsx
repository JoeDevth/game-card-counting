import Image from "next/image";
import Card from "./Card";

interface BoardProps {
  playerCard?: { rank: string; suit: string };
  botCard?: { rank: string; suit: string };
}

export default function Board({ playerCard, botCard }: BoardProps) {
  return (
    <div className="flex flex-row justify-between items-center space-x-6 p-6 bg-gray-800 text-black rounded-lg shadow-lg w-[700px] h-[400px] mt-2 justify-center mx-auto">
      {/* บอร์ดไพ่ตรงกลาง */}
      <div className="flex flex-col items-center justify-center space-y-6 w-full relative">
        {/* บอทเล่นไพ่ */}
        <div className="flex flex-col items-center">
          {botCard ? <Card rank={botCard.rank} suit={botCard.suit} /> : <div className="w-20 h-28 bg-gray-500 rounded-lg"></div>}
        </div>

        {/* ผู้เล่นเล่นไพ่ */}
        <div className="flex flex-col items-center">
          {playerCard ? <Card rank={playerCard.rank} suit={playerCard.suit} /> : <div className="w-20 h-28 bg-gray-500 rounded-lg"></div>}
        </div>
      </div>
    </div>
  );
}
