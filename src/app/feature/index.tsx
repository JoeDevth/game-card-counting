"use client";

import { useGame } from "@/context/GameContext";
import Hand from "@/components/Hand";
import Board from "@/components/Board";
import GameLog from "@/components/GameLog";
import Image from "next/image";

export default function GamePage() {
  const { 
    playerHand, 
    botHand, 
    gameLog, 
    playCard, 
    startGame, 
    isGameOver, 
    winner, 
    currentCards 
  } = useGame();
  
  const renderGameOverScreen = () => {
    let imageSrc = "/image/draw.png";
    if (winner === "Bot Win!") imageSrc = "/image/robot.png";
    if (winner === "You Win!") imageSrc = "/image/user.png";
    
    return (
      <div className="flex flex-col items-center justify-center mt-4 sm:mt-6 p-3 sm:p-4 
                    bg-yellow-400 text-gray-900 rounded-lg sm:rounded-xl text-center shadow-lg 
                    w-[280px] sm:w-[350px] md:w-[400px] 
                    h-[280px] sm:h-[350px] md:h-[400px] mx-auto">
        <Image 
          src={imageSrc} 
          height={80} 
          width={80}
          className="sm:h-[100px] sm:w-[100px]" 
          alt={winner === "Bot Win!" ? "Bot" : winner === "You Win!" ? "User" : "Draw"} 
        />
        <h2 className="text-xl sm:text-2xl font-bold mt-2 sm:mt-3">{winner}</h2>
        <button 
          onClick={startGame} 
          className="z-50 mt-3 sm:mt-4 p-2 sm:p-3 bg-blue-800 text-white rounded-lg shadow-lg 
                   hover:bg-blue-600 transition shadow-[0_0_0_3px_#000000_inset] 
                   px-4 sm:px-6 py-1 sm:py-2 bg-transparent border border-black 
                   dark:border-white dark:text-white text-black font-bold 
                   transform hover:-translate-y-1 transition duration-400">
          Play Again
        </button>
      </div>
    );
  };

  const renderGameplayScreen = () => (
    <>
      {/* Bot section */}
      <div className="flex flex-col items-center mt-2 sm:mt-4">
        <Image 
          src="/image/robot.png" 
          height={80} 
          width={80} 
          className="h-[60px] w-[60px] sm:h-[80px] sm:w-[80px] md:h-[100px] md:w-[100px]"
          alt="Bot" 
        />
        <h2 className="mt-1 sm:mt-2 text-lg sm:text-xl font-semibold text-black">Bot cards</h2>
        <Hand hand={botHand} />
      </div>
      
      {/* Board section */}
      <div className="relative flex justify-center items-center mt-2 sm:mt-4">
        <div className="absolute left-2 sm:left-6 md:left-10 rounded-lg">
          <Image 
            src="/image/cards/back.png" 
            height={70} 
            width={70} 
            className="h-[70px] w-[50px] sm:h-[90px] sm:w-[70px] md:h-[110px] md:w-[90px]"
            alt="Card" 
          />
        </div>
        <Board playerCard={currentCards.player} botCard={currentCards.bot} />
      </div>
      
      {/* Player section */}
      <div className="flex flex-col items-center">
        <Hand hand={playerHand} onPlayCard={playCard} isPlayer />
        <h2 className="mt-3 sm:mt-6 text-lg sm:text-xl font-semibold text-black">Your Card</h2>
        <div className="mt-2 sm:mt-4 mb-10 sm:mb-16 md:mb-28">
          <Image 
            src="/image/user.png" 
            height={70} 
            width={70} 
            className="h-[60px] w-[60px] sm:h-[70px] sm:w-[70px] md:h-[90px] md:w-[90px]"
            alt="User" 
          />
        </div>
      </div>
      
      {/* Game log */}
      <GameLog log={gameLog} />
    </>
  );

  return (
    <div className="p-3 sm:p-4 md:p-6 min-h-screen text-white">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-black">Card game</h1>
      {isGameOver ? renderGameOverScreen() : renderGameplayScreen()}
    </div>
  );
}