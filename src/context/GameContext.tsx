"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { createDeck, shuffleDeck, dealCards, Card } from "../utils/deck";

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
    currentCards: { player?: Card; bot?: Card };
};

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
    const [playerHand, setPlayerHand] = useState<Card[]>([]);
    const [botHand, setBotHand] = useState<Card[]>([]);
    const [remainingDeck, setRemainingDeck] = useState<Card[]>([]);
    const [playerScore, setPlayerScore] = useState(0);
    const [botScore, setBotScore] = useState(0);
    const [gameLog, setGameLog] = useState<string[]>([]);
    const [currentCards, setCurrentCards] = useState<{ player?: Card; bot?: Card }>({});

    // 🎯 ฟังก์ชันเริ่มเกม
    function startGame() {
        const deck = shuffleDeck(createDeck());
        const { playerHand, botHand, remainingDeck } = dealCards(deck);

        setPlayerHand(playerHand);
        setBotHand(botHand);
        setRemainingDeck(remainingDeck);
        setPlayerScore(0);
        setBotScore(0);
        setGameLog(["Game Start!"]);
        setCurrentCards({ player: undefined, bot: undefined }); // ล้างไพ่กลางกระดาน
    }

    // 🎯 ฟังก์ชันเล่นไพ่ 1 รอบ
    function playCard(cardIndex: number) {
        if (playerHand.length === 0 || botHand.length === 0) return;

        const playerCard = playerHand[cardIndex];
        const botCard = botHand[0];

        // อัปเดตไพ่กลางกระดาน
        setCurrentCards({ player: playerCard, bot: botCard });

        const newPlayerHand = [...playerHand];
        newPlayerHand.splice(cardIndex, 1);

        const newBotHand = [...botHand];
        newBotHand.splice(0, 1);

        const newGameLog = [...gameLog];
        newGameLog.push(`You play your card: ${playerCard.rank} of ${playerCard.suit}`);
        newGameLog.push(`Bot plays: ${botCard.rank} of ${botCard.suit}`);

        let newPlayerScore = playerScore;
        let newBotScore = botScore;

        // เช็คผลแพ้ชนะ
        if (playerCard.value > botCard.value) {
            newPlayerScore += 1;
            newGameLog.push("You win this round!");
        } else if (playerCard.value < botCard.value) {
            newBotScore += 1;
            newGameLog.push("Bot wins this round!");
        } else {
            newGameLog.push("It's a draw! 🔄");

            // ถ้าเสมอและยังมีไพ่ในกอง จั่วไพ่ใหม่
            if (remainingDeck.length >= 2) {
                newPlayerHand.push(remainingDeck[0]);
                newBotHand.push(remainingDeck[1]);
                setRemainingDeck(remainingDeck.slice(2));
            }
        }

        setPlayerHand(newPlayerHand);
        setBotHand(newBotHand);
        setPlayerScore(newPlayerScore);
        setBotScore(newBotScore);
        setGameLog(newGameLog);
    }

    // เช็คว่าเกมจบหรือยัง
    const isGameOver = playerHand.length === 0 || botHand.length === 0 || remainingDeck.length === 0;
    const winner =
        playerScore > botScore ? "You Win!" :
        playerScore < botScore ? "Bot Win!" :
        "Draw!";

    return (
        <GameContext.Provider value={{ playerHand, botHand, remainingDeck, playerScore, botScore, gameLog, playCard, startGame, isGameOver, winner, currentCards }}>
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGame ต้องใช้ภายใน GameProvider");
    }
    return context;
}
