import Image from "next/image";
import Card from "./Card";
interface BoardProps {
  playerCard?: { rank: string; suit: string };
  botCard?: { rank: string; suit: string };
}

export default function Board({ playerCard, botCard }: BoardProps) {
  return (
    <div className="flex justify-center space-x-6 mt-6 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-bold mb-2"><Image src="/image/user.png" height={50} width={50} alt="User" className="mb-2" /></h2>
        {playerCard ? <Card rank={playerCard.rank} suit={playerCard.suit} /> : <div className="w-20 h-28 bg-gray-500 rounded-lg"></div>}
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-bold mb-2"><Image src="/image/robot.png" height={50} width={50} alt="Bot"  className="mb-2"/></h2>
        {botCard ? <Card rank={botCard.rank} suit={botCard.suit} /> : <div className="w-20 h-28 bg-gray-500 rounded-lg"></div>}
      </div>
    </div>
  );
}
