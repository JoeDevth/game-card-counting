"use client";
import { useGame } from "@/context/GameContext";
import Hand from "@/components/Hand";
import ScoreBoard from "@/components/ScoreBoard";
import Board from "@/components/Board";
import GameLog from "@/components/GameLog";
import Image from "next/image";

export default function GamePage() {
  const { playerHand, botHand, playerScore, botScore, gameLog, playCard, startGame, isGameOver, winner, currentCards } = useGame();

  return (
    <div className="p-6 min-h-screen  text-white">
      <h1 className="text-3xl font-bold text-center text-black">Card game</h1>

      {isGameOver ? (
        <div className="flex flex-col items-center justify-center mt-6 p-4 bg-yellow-400 text-gray-900 rounded-xl text-center shadow-lg w-[400px] h-[400px] mx-auto">
          <Image src="/image/trophy.png" height={100} width={100} alt="Trophy" />
          <h2 className="text-2xl font-bold">{winner}</h2>
        
          <button 
          onClick={startGame} 
          className="z-50 mt-4 p-3 bg-blue-800 text-white rounded-lg shadow-lg hover:bg-blue-600 transition shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
          play agiants
          </button>
        </div>
      ) : (
        <>
          {/* แสดงคะแนน */}
          <ScoreBoard playerScore={playerScore} botScore={botScore} />

             
          {/* ไพ่ของบอท */}
          <div className="flex justify-center mt-4 ">
             <Image src="/image/robot.png" height={100} width={100} alt="Bot" />
             </div>
          <h2 className="mt-2 text-xl font-semibold text-center text-black"> Bot cards</h2>
          <Hand hand={botHand} /> 
          
          {/* กองกลางไพ่ */}
          <Board playerCard={currentCards.player} botCard={currentCards.bot} />

          {/* ไพ่ของผู้เล่น */}
          <Hand hand={playerHand} onPlayCard={playCard} isPlayer /> 
          <h2 className="mt-6 text-xl font-semibold text-center text-black"> Your Card</h2>
          <div className="flex justify-center mt-4">
             <Image src="/image/user.png" height={90} width={90} alt="User" />
             </div>


          {/* บันทึกเกม */}
          <GameLog log={gameLog} />
        </>
      )}

    </div>
  );
}
