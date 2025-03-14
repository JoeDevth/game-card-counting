import { useGame } from "@/context/GameContext";
import Card from "./Card";
import ScoreBoard from "./ScoreBoard";

interface CardType {
  rank: string;
  suit: string;
}

interface BoardProps {
  playerCard?: CardType;
  botCard?: CardType;
}

export default function Board({ playerCard, botCard }: BoardProps) {
  const { playerScore, botScore } = useGame();

  const EmptyCardPlaceholder = () => (
    <div className="w-16 h-24 sm:w-20 sm:h-28 bg-gray-500 rounded-lg"></div>
  );

  return (
    <div className="flex flex-col justify-between items-center space-y-6 sm:space-y-8 md:space-y-10 p-3 sm:p-4 md:p-6 
                  bg-gray-800 text-black rounded-xl sm:rounded-2xl shadow-lg 
                  w-full max-w-[320px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] 
                  h-[300px] sm:h-[350px] md:h-[400px] 
                  mt-2 mx-auto">
      {/* Score display */}
      <div className="w-full flex justify-between text-white text-sm sm:text-base md:text-lg">
        <ScoreBoard playerScore={playerScore} botScore={botScore} />
      </div>

      <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 md:space-y-12 w-full">
        {/* Bot's played card */}
        <div className="flex flex-col items-center">
          {botCard ? <Card rank={botCard.rank} suit={botCard.suit} /> : <EmptyCardPlaceholder />}
        </div>

        {/* Player's played card */}
        <div className="flex flex-col items-center">
          {playerCard ? <Card rank={playerCard.rank} suit={playerCard.suit} /> : <EmptyCardPlaceholder />}
        </div>
      </div>
    </div>
  );
}