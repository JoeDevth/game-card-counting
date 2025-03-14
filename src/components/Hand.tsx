import { useEffect, useState } from "react";
import Card from "./Card";

interface HandProps {
  hand: { rank: string; suit: string }[];
  onPlayCard?: (index: number) => void;
  isPlayer?: boolean;
}

export default function Hand({ hand, onPlayCard, isPlayer = false }: HandProps) {
  const [cards, setCards] = useState(hand);

  useEffect(() => {
    setCards(hand); // อัปเดตไพ่เมื่อ hand เปลี่ยนแปลง
  }, [hand]);

  // Calculate negative margin for card overlap based on screen size and number of cards
  const getCardOverlap = () => {
    const cardCount = hand.length;
    if (cardCount <= 3) return ""; // No overlap needed for 3 or fewer cards
    
    // Less negative margin (less overlap) as number of cards increases
    if (cardCount >= 8) return "-mx-4 sm:-mx-3 md:-mx-2 lg:-mx-1";
    if (cardCount >= 6) return "-mx-3 sm:-mx-2 md:-mx-1 lg:mx-0";
    return "-mx-2 sm:-mx-1 md:mx-0 lg:mx-1"; // 4-5 cards
  };

  return (
    <div className={`flex justify-center flex-wrap mt-2 sm:mt-3 ${getCardOverlap()}`}>
      {cards.map((card, index) => (
        <div 
          key={index} 
          onClick={() => isPlayer && onPlayCard?.(index)} 
          className={`
            cursor-${isPlayer ? "pointer" : "default"}
            transform transition-transform duration-200
            ${isPlayer ? "hover:-translate-y-2" : ""}
            ${getCardOverlap()}
          `}
        >
          <Card 
            rank={isPlayer ? card.rank : "?"} 
            suit={isPlayer ? card.suit : "?"} 
            isFaceDown={!isPlayer} 
          />
        </div>
      ))}
      {cards.length === 0 && (
        <div className="text-gray-500 italic text-sm sm:text-base">ไม่มีไพ่ในมือ</div>
      )}
    </div>
  );
}