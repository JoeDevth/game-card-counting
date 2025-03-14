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
  return (
    <div className="flex justify-center space-x-2 mt-3">
      {hand.map((card, index) => (
        <div key={index} onClick={() => isPlayer && onPlayCard?.(index)} className="cursor-pointer">
          <Card rank={isPlayer ? card.rank : "?"} suit={isPlayer ? card.suit : "?"} isFaceDown={!isPlayer} />
        </div>
      ))}
    </div>
  );
}
