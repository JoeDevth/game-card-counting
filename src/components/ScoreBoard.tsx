import Image from 'next/image';

interface ScoreBoardProps {
    playerScore: number;
    botScore: number;
  }
  
  export default function ScoreBoard({ playerScore, botScore }: ScoreBoardProps) {
    return (
    <div className="flex justify-center space-x-6 mt-6 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
  
  <div className='flex justify-between w-full'>
    <div className="flex items-center space-x-2">
      <Image src="/image/user.png" height={50} width={50} alt="User" />
      <h1 className="text-2xl font-bold">{playerScore}</h1> 
    </div>

    <div className="flex items-center space-x-2 row-reverse">
      <Image src="/image/robot.png" height={50} width={50} alt="Bot" />
      <h1 className="text-2xl font-bold gird-reverse">{botScore}</h1> 
    </div>
    </div>
</div>

    );
  }
  