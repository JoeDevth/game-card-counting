import Image from 'next/image';

interface ScoreBoardProps {
    playerScore: number;
    botScore: number;
  }
  
  export default function ScoreBoard({ playerScore, botScore }: ScoreBoardProps) {
    return (
    <div className="flex justify-between space-x-6 mt-6 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
  
  <div className='flex justify-between w-full'>
    <div className="flex items-center space-x-2">
      <span className="text-2xl font-bold">Player: {playerScore}</span>
    </div>

    <div className="flex items-center space-x-2 row-reverse">
      <span className="text-2xl font-bold">Bot: {botScore}</span>
    </div>
    </div>
</div>

    );
  }
  