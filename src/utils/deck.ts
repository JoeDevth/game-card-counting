// 
//     suit: "hearts", // ดอกไพ่: hearts, diamonds, clubs, spades
//     rank: "K",      // ค่าไพ่: A, 2, 3, ..., Q, K
//     value: 13       // ค่าของไพ่ (K=13, Q=12, J=11, ..., A=1)
//   

export type Card = {
    suit: string;
    rank: string;
    value: number;
  };
  
  // ดอกไพ่ทั้งหมด
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  // ลำดับไพ่จากใหญ่ไปเล็ก
  const ranks = ["K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2", "A"];
  // กำหนดค่าของไพ่
  const rankValues: Record<string, number> = {
    K: 13, Q: 12, J: 11, "10": 10, "9": 9, "8": 8, "7": 7,
    "6": 6, "5": 5, "4": 4, "3": 3, "2": 2, A: 1
  };
  
  // ฟังก์ชันสร้างสำรับไพ่
  export function createDeck(): Card[] {
    const deck: Card[] = [];
    for (const suit of suits) {
      for (const rank of ranks) {
        deck.push({ suit, rank, value: rankValues[rank] });
      }
    }
    return deck;
  }
  
  // ฟังก์ชันสับไพ่แบบสุ่ม
  export function shuffleDeck(deck: Card[]): Card[] {
    return deck.sort(() => Math.random() - 0.5);
  }
  
  // ฟังก์ชันแจกไพ่ให้ผู้เล่นและบอท
  export function dealCards(deck: Card[]): { playerHand: Card[], botHand: Card[], remainingDeck: Card[] } {
    const playerHand = deck.slice(0, 7);
    const botHand = deck.slice(7, 14);
    const remainingDeck = deck.slice(14);
    return { playerHand, botHand, remainingDeck };
  }
  