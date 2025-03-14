import { motion } from "framer-motion";
import Image from "next/image";

interface CardProps {
  rank: string;
  suit: string;
  isFaceDown?: boolean;
  onClick?: () => void;
}

export default function Card({ rank, suit, isFaceDown = false, onClick }: CardProps) {
  // Map of rank to card image paths
  const rankIcons: { [key: string]: string } = {
    "a": "/image/cards/a.png",
    "2": "/image/cards/2.png",
    "3": "/image/cards/3.png",
    "4": "/image/cards/4.png",
    "5": "/image/cards/5.png",
    "6": "/image/cards/6.png",
    "7": "/image/cards/7.png", 
    "8": "/image/cards/8.png",
    "9": "/image/cards/9.png",
    "10": "/image/cards/10.png",
    "j": "/image/cards/j.png",
    "q": "/image/cards/q.png",
    "k": "/image/cards/k.png"  
  };
  
  return (
    <motion.div 
      className="relative w-16 h-24 sm:w-20 sm:h-28 rounded-lg shadow-lg border bg-white flex flex-col items-center justify-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      {isFaceDown ? (
        <Image 
          src="/image/cards/back.png" 
          alt="Back of Card" 
          width={60} 
          height={80} 
          className="w-[60px] h-[80px] sm:w-[60px] sm:h-[80px] pointer-events-none" 
          draggable="false"
        />
      ) : (
        <Image 
          src={rankIcons[rank.toLowerCase()] || "/image/cards/back.png"} 
          alt={`${rank} of ${suit}`} 
          width={60} 
          height={80} 
          className="w-[60px] h-[80px] sm:w-[60px] sm:h-[80px] pointer-events-none"
          draggable="false"
        />
      )}
    </motion.div>
  );
}