
interface ScoreBoardProps {
  playerScore: number;
  botScore: number;
}

export default function ScoreBoard({ playerScore, botScore }: ScoreBoardProps) {
  return (
    <div className='flex justify-between w-full items-center'>
      <div className="flex items-center space-x-1 sm:space-x-2">
        <span className="text-lg sm:text-xl md:text-2xl font-bold">Player: {playerScore}</span>
      </div>

      <div className="flex items-center space-x-1 sm:space-x-2">
        <span className="text-lg sm:text-xl md:text-2xl font-bold">Bot: {botScore}</span>
      </div>
    </div>
  );
}