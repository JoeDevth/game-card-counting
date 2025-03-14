"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { createDeck, shuffleDeck, dealCards, Card } from "../utils/deck";

// Define types
type CurrentCards = {
  player?: Card;
  bot?: Card;
};

type GameContextType = {
  playerHand: Card[];
  botHand: Card[];
  remainingDeck: Card[];
  playerScore: number;
  botScore: number;
  gameLog: string[];
  playCard: (cardIndex: number) => void;
  startGame: () => void;
  isGameOver: boolean;
  winner: string;
  currentCards: CurrentCards;
  screenSize: string; // Added for responsive handling
};

// Create context with null initial value
const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  // State management
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [botHand, setBotHand] = useState<Card[]>([]);
  const [remainingDeck, setRemainingDeck] = useState<Card[]>([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [gameLog, setGameLog] = useState<string[]>([]);
  const [currentCards, setCurrentCards] = useState<CurrentCards>({});
  const [screenSize, setScreenSize] = useState<string>("md");

  // Handle responsive sizing
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize("xs");
      } else if (width < 768) {
        setScreenSize("sm");
      } else if (width < 1024) {
        setScreenSize("md");
      } else {
        setScreenSize("lg");
      }
    };

    // Set initial screen size
    handleResize();
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Start game function
  const startGame = () => {
    const deck = shuffleDeck(createDeck());
    const { playerHand, botHand, remainingDeck } = dealCards(deck);

    setPlayerHand(playerHand);
    setBotHand(botHand);
    setRemainingDeck(remainingDeck);
    setPlayerScore(0);
    setBotScore(0);
    setGameLog(["Game Start!"]);
    setCurrentCards({}); // Clear board cards
  };

  // Initialize game on first load
  useEffect(() => {
    if (playerHand.length === 0 && botHand.length === 0) {
      startGame();
    }
  }, []);

  // Play card function
  const playCard = (cardIndex: number) => {
    if (playerHand.length === 0 || botHand.length === 0) return;

    const playerCard = playerHand[cardIndex];
    const botCard = botHand[0];

    // Update board cards
    setCurrentCards({ player: playerCard, bot: botCard });

    // Create new hands (immutable updates)
    const newPlayerHand = playerHand.filter((_, index) => index !== cardIndex);
    const newBotHand = botHand.slice(1);

    // Update game log
    const newGameLog = [
      ...gameLog,
      `You play: ${playerCard.rank}`,
      `Bot plays: ${botCard.rank}`
    ];

    let newPlayerScore = playerScore;
    let newBotScore = botScore;

    // Check round winner
    if (playerCard.value > botCard.value) {
      newPlayerScore += 1;
      newGameLog.push("You win this round! 🎉");
    } else if (playerCard.value < botCard.value) {
      newBotScore += 1;
      newGameLog.push("Bot wins this round! 🤖");
    } else {
      newGameLog.push("It's a draw! 🔄");

      // Draw new cards on draw if deck has cards
      if (remainingDeck.length >= 2) {
        const [playerNewCard, botNewCard, ...restDeck] = remainingDeck;
        newPlayerHand.push(playerNewCard);
        newBotHand.push(botNewCard);
        setRemainingDeck(restDeck);
        newGameLog.push("Each player draws a new card.");
      }
    }

    // Update state
    setPlayerHand(newPlayerHand);
    setBotHand(newBotHand);
    setPlayerScore(newPlayerScore);
    setBotScore(newBotScore);
    setGameLog(newGameLog);
  };

  // Game state computations
  const isGameOver = playerHand.length === 0 || botHand.length === 0 || remainingDeck.length === 0;
  
  // Determine winner
  const getWinner = () => {
    if (!isGameOver) return "";
    if (playerScore > botScore) return "You Win!";
    if (playerScore < botScore) return "Bot Win!";
    return "Draw!";
  };
  
  const winner = getWinner();

  const contextValue = {
    playerHand,
    botHand,
    remainingDeck,
    playerScore,
    botScore,
    gameLog,
    playCard,
    startGame,
    isGameOver,
    winner,
    currentCards,
    screenSize
  };

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}