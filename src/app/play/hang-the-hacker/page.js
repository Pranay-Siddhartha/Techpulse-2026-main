'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// --- Game Data ---
const GAME_DATA = [
    {
        round: 1,
        title: "Level 1: Basic Infiltration",
        description: "Target relies on predictable patterns. Names, dates, and common words.",
        passwords: [
            { word: "QWERTY", clue: "The most basic keyboard walk." },
            { word: "JOHN1990", clue: "A common name and birth year combination.", isAlphanumeric: true },
            { word: "PASSWORD", clue: "The most notoriously bad choice." },
            { word: "SUNSHINE", clue: "A happy, common dictionary word." }
        ]
    },
    {
        round: 2,
        title: "Level 2: Moderate Security",
        description: "Target has read some guidelines. Combining words, numbers, and basic symbols.",
        passwords: [
            { word: "ADMIN123", clue: "Default credentials for a lazy administrator.", isAlphanumeric: true },
            { word: "H@CKER99", clue: "Thinks they are l33t, uses basic symbol substitution.", isAlphanumeric: true },
            { word: "P@SSW0RD", clue: "Symbol substitution for vowels.", isAlphanumeric: true },
            { word: "M0NKEY!", clue: "A common animal, leetspeak, and an exclamation mark.", isAlphanumeric: true }
        ]
    },
    {
        round: 3,
        title: "Level 3: Advanced Encryption",
        description: "Stronger passwords, but still vulnerable if you understand the pattern.",
        passwords: [
            { word: "R00T!@#", clue: "Superuser account with basic special character sequence.", isAlphanumeric: true },
            { word: "S3CUR1TY*", clue: "Replacing vowels with numbers, ending with a star.", isAlphanumeric: true },
            { word: "C0MPL3X??", clue: "Self-proclaimed complexity.", isAlphanumeric: true },
            { word: "W1NT3R24$", clue: "Season + Year + Currency Symbol pattern.", isAlphanumeric: true }
        ]
    }
];

const MAX_HEALTH = 6;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
const NUMBERS = "0123456789".split('');
const SYMBOLS = "!@#$%^&*?".split('');

export default function HangTheHackerGame() {
    // --- State ---
    const [gameState, setGameState] = useState('start'); // start, playing, round_won, round_lost, game_over, victory
    const [currentRound, setCurrentRound] = useState(1);
    const [targetPassword, setTargetPassword] = useState(null);
    const [guessedChars, setGuessedChars] = useState(new Set());
    const [health, setHealth] = useState(MAX_HEALTH);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [hintsUsed, setHintsUsed] = useState(0);
    const [totalGuesses, setTotalGuesses] = useState(0);
    const [correctGuessesCount, setCorrectGuessesCount] = useState(0);

    // --- Leaderboard State ---
    const [playerName, setPlayerName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // --- Timers ---
    useEffect(() => {
        let timer;
        if (gameState === 'playing') {
            timer = setInterval(() => {
                setTimeElapsed((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [gameState]);

    // --- Game Logic ---
    const startRound = useCallback((roundNum) => {
        const roundData = GAME_DATA[roundNum - 1];
        const randomPasswordContext = roundData.passwords[Math.floor(Math.random() * roundData.passwords.length)];

        setTargetPassword(randomPasswordContext);
        setGuessedChars(new Set());
        setHealth(MAX_HEALTH);
        setGameState('playing');
        setCurrentRound(roundNum);
    }, []);

    const handleGuess = useCallback((char) => {
        if (gameState !== 'playing' || guessedChars.has(char)) return;

        const newGuessedChars = new Set(guessedChars);
        newGuessedChars.add(char);
        setGuessedChars(newGuessedChars);
        setTotalGuesses((prev) => prev + 1);

        if (targetPassword.word.includes(char)) {
            // Correct guess
            setCorrectGuessesCount((prev) => prev + 1);

            // Check win condition
            const isWin = targetPassword.word.split('').every(c => newGuessedChars.has(c));
            if (isWin) {
                setTimeout(() => setGameState('round_won'), 500);
            }
        } else {
            // Incorrect guess
            const newHealth = health - 1;
            setHealth(newHealth);

            // Check lose condition
            if (newHealth <= 0) {
                setTimeout(() => setGameState('round_lost'), 500);
            }
        }
    }, [gameState, guessedChars, targetPassword, health]);

    const useHint = () => {
        if (gameState !== 'playing' || hintsUsed >= 2) return;
        setHintsUsed(prev => prev + 1);

        // Find an unguessed letter
        const unguessed = targetPassword.word.split('').filter(c => !guessedChars.has(c));
        if (unguessed.length > 0) {
            const randomChar = unguessed[Math.floor(Math.random() * unguessed.length)];
            handleGuess(randomChar);
        }
    };

    const nextRound = () => {
        if (currentRound < GAME_DATA.length) {
            startRound(currentRound + 1);
        } else {
            setGameState('victory');
        }
    };

    const renderKeyboardRow = (chars) => (
        <div className="flex flex-wrap justify-center" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
            {chars.map(char => {
                const isGuessed = guessedChars.has(char);
                const isCorrect = isGuessed && targetPassword?.word.includes(char);
                const isWrong = isGuessed && !targetPassword?.word.includes(char);

                let btnClass = "flex items-center justify-center font-heading text-lg font-bold rounded-md transition-all duration-300 border ";

                if (isCorrect) {
                    btnClass += "bg-neon-blue/20 border-neon-blue text-neon-blue neon-glow-blue shadow-[inset_0_0_10px_rgba(0,240,255,0.3)]";
                } else if (isWrong) {
                    btnClass += "bg-red-500/20 border-red-500/50 text-red-400 opacity-50";
                } else {
                    btnClass += "bg-dark-bg/80 border-white/20 text-white/80 hover:border-neon-purple/50 hover:text-white hover:bg-neon-purple/10 hover:-translate-y-1";
                }

                return (
                    <button
                        key={char}
                        onClick={() => handleGuess(char)}
                        disabled={isGuessed || gameState !== 'playing'}
                        className={btnClass}
                        style={{ width: '4rem', height: '4rem', fontSize: '1.25rem' }}
                    >
                        {char}
                    </button>
                );
            })}
        </div>
    );

    const calculateAccuracy = () => {
        if (totalGuesses === 0) return 0;
        return Math.round((correctGuessesCount / totalGuesses) * 100);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    // --- Screens ---

    const StartScreen = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-2xl mx-auto glass-card p-8 md:p-12 border-neon-purple/40 neon-glow-purple"
        >
            <div className="text-6xl mb-6 flex justify-center glitch-text" data-text="🔒">🔒</div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent uppercase tracking-wider">
                Hang the Hacker
            </h1>
            <p className="text-white/70 mb-8 leading-relaxed">
                Welcome, Operator. Your mission is to bypass security systems using pattern recognition.
                Guess the target's password before the firewall locks you out. You have 3 levels of increasing difficulty.
            </p>
            <button
                onClick={() => startRound(1)}
                className="neon-btn text-lg py-4 px-12 uppercase tracking-widest font-bold"
            >
                Initialize Hack
            </button>
        </motion.div>
    );

    const PlayingScreen = () => (
        <div className="max-w-4xl mx-auto w-full flex flex-col items-center" style={{ gap: '2rem', marginTop: '2rem', marginBottom: '4rem' }}>
            {/* Header info */}
            <div className="w-full flex justify-between items-center bg-dark-bg/60 rounded-xl border border-white/10 glass-effect" style={{ padding: '2rem 1.5rem', marginTop: '4.5rem' }}>
                <div className="flex items-center gap-4">
                    <div className="text-center">
                        <span className="text-xs uppercase tracking-widest text-neon-purple/60 font-heading" style={{ marginBottom: '5rem' }}>Connection Status</span>
                        <div className="flex gap-1 mt-1">
                            {Array.from({ length: MAX_HEALTH }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-3 w-8 rounded-sm transition-all duration-500 ${i < health ? 'bg-neon-blue shadow-[0_0_8px_rgba(0,240,255,0.6)]' : 'bg-red-500/20'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <h2 className="font-heading text-xl font-bold text-white tracking-widest">{GAME_DATA[currentRound - 1].title}</h2>
                    <span className="text-xs text-white/50">{GAME_DATA[currentRound - 1].description}</span>
                </div>

                <div className="text-right">
                    <span className="text-xs uppercase tracking-widest text-neon-blue/60 font-heading block">Time Elapsed</span>
                    <span className="font-mono text-xl font-bold text-white">{formatTime(timeElapsed)}</span>
                </div>
            </div>

            {/* Target Password Display */}
            <div className="flex flex-wrap justify-center glass-card border-white/5 w-full" style={{ padding: '1rem 2rem', gap: '2rem' }}>
                {targetPassword?.word.split('').map((char, index) => {
                    const isRevealed = guessedChars.has(char);
                    return (
                        <div
                            key={index}
                            className={`flex items-center justify-center border-b-4 rounded-md transition-all duration-300
                            ${isRevealed ? 'border-neon-purple bg-neon-purple/10 text-white' : 'border-white/20 bg-dark-bg/50 text-transparent'}`}
                            style={{ width: '4.5rem', height: '6rem', fontSize: '2.5rem' }}
                        >
                            <span className="font-mono text-3xl md:text-4xl font-bold">
                                {isRevealed ? char : '*'}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Context Clue */}
            <div className="w-full glass-card border-l-4 border-l-neon-blue bg-neon-blue/5" style={{ padding: '2rem', marginBottom: '3rem' }}>
                <p className="text-sm font-heading tracking-widest text-neon-blue/80 uppercase mb-2">Target Intel:</p>
                <p className="text-white/90 italic text-lg">"{targetPassword?.clue}"</p>
            </div>

            {/* Keyboard */}
            <div className="w-full max-w-4xl" style={{ marginTop: '2rem' }}>
                {renderKeyboardRow(ALPHABET.slice(0, 13))}
                {renderKeyboardRow(ALPHABET.slice(13))}
                {targetPassword?.isAlphanumeric && renderKeyboardRow(NUMBERS)}
                {targetPassword?.isAlphanumeric && currentRound > 1 && renderKeyboardRow(SYMBOLS)}
            </div>

            {/* Actions */}
            <div className="flex justify-center" style={{ marginTop: '3rem' }}>
                <button
                    onClick={useHint}
                    disabled={hintsUsed >= 2 || gameState !== 'playing'}
                    className={`rounded-lg font-heading tracking-widest text-sm border transition-all
                        ${hintsUsed < 2
                            ? 'border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10 hover:shadow-[0_0_15px_rgba(234,179,8,0.3)]'
                            : 'border-white/10 text-white/20 cursor-not-allowed'}`}
                    style={{ padding: '1.25rem 2.5rem', letterSpacing: '0.15em', fontSize: '1.1rem' }}
                >
                    Decrypt Hint ({2 - hintsUsed} left)
                </button>
            </div>
        </div>
    );

    const ResultModal = ({ isWin }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center max-w-lg mx-auto glass-card p-8 md:p-10 ${isWin ? 'border-neon-blue/50 neon-glow-blue' : 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)]'}`}
        >
            <div className="text-6xl mb-6">{isWin ? '🔓' : '☠️'}</div>
            <h2 className={`font-heading text-3xl font-bold mb-4 uppercase tracking-wider ${isWin ? 'text-neon-blue' : 'text-red-500'}`}>
                {isWin ? 'Access Granted' : 'System Lockout'}
            </h2>
            <p className="text-white/70 mb-6">
                {isWin
                    ? `You successfully infiltrated Level ${currentRound}.`
                    : `The firewall detected your intrusion. The target password was:`}
            </p>

            {!isWin && (
                <div className="font-mono text-2xl font-bold text-white bg-red-500/10 p-4 rounded-lg mb-8 border border-red-500/30">
                    {targetPassword?.word}
                </div>
            )}

            <div className="mt-8">
                {isWin ? (
                    <button onClick={nextRound} className="neon-btn w-full">
                        {currentRound < 3 ? 'Proceed to Next Level' : 'View Final Report'}
                    </button>
                ) : (
                    <div className="flex gap-4">
                        <button onClick={() => setGameState('start')} className="w-full py-4 rounded-lg font-heading tracking-widest text-sm border border-white/20 text-white hover:bg-white/5 transition-all">
                            Abort Mission
                        </button>
                        <button onClick={() => startRound(currentRound)} className="neon-btn w-full">
                            Retry Level
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );

    const VictoryScreen = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-3xl mx-auto w-full"
        >
            <div className="glass-card p-8 md:p-12 border-neon-purple/50 neon-glow-purple relative overflow-hidden">
                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <h1 className="font-heading text-4xl md:text-5xl font-bold text-center mb-2 text-white glitch-text" data-text="MISSION ACCOMPLISHED">
                    MISSION ACCOMPLISHED
                </h1>
                <p className="text-center text-neon-purple/80 font-heading tracking-widest text-sm mb-12 uppercase">
                    Evaluation Report Generated
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-12 relative z-10">
                    <div className="bg-dark-bg/60 border border-white/10 rounded-xl p-6 text-center shadow-inner hover:border-neon-blue/30 transition-all">
                        <span className="block text-4xl mb-3">⏱️</span>
                        <h3 className="text-xs font-heading font-bold text-white/50 uppercase tracking-widest mb-2">Time Taken</h3>
                        <p className="text-3xl font-mono text-white font-bold">{formatTime(timeElapsed)}</p>
                    </div>
                    <div className="bg-dark-bg/60 border border-white/10 rounded-xl p-6 text-center shadow-inner hover:border-neon-purple/30 transition-all">
                        <span className="block text-4xl mb-3">🎯</span>
                        <h3 className="text-xs font-heading font-bold text-white/50 uppercase tracking-widest mb-2">Accuracy</h3>
                        <p className="text-3xl font-mono text-neon-purple font-bold">{calculateAccuracy()}%</p>
                    </div>
                    <div className="bg-dark-bg/60 border border-white/10 rounded-xl p-6 text-center shadow-inner hover:border-yellow-500/30 transition-all">
                        <span className="block text-4xl mb-3">🔍</span>
                        <h3 className="text-xs font-heading font-bold text-white/50 uppercase tracking-widest mb-2">Hints Decrypted</h3>
                        <p className="text-3xl font-mono text-yellow-500 font-bold">{hintsUsed}</p>
                    </div>
                </div>

                <div className="bg-neon-blue/10 border border-neon-blue/30 rounded-xl p-6 mb-8 relative z-10">
                    <h3 className="font-heading font-bold text-neon-blue mb-4 flex items-center gap-2">
                        <span className="text-xl">🛡️</span> Security Analysis
                    </h3>
                    <p className="text-white/80 leading-relaxed text-sm">
                        You have successfully demonstrated pattern recognition capabilities. The passwords infiltrated were vulnerable due to common human habits: using dictionary words, personal information (dates), and predictable substitutions (P@ssword).
                    </p>
                    <p className="text-white/80 leading-relaxed text-sm mt-4 font-bold">
                        Outcome: Stronger passwords matter. Utilize passphrases and true randomization for better security.
                    </p>
                </div>

                {!submitSuccess ? (
                    <div className="bg-dark-bg/80 border border-neon-purple/50 rounded-xl p-6 mb-12 relative z-10 text-center">
                        <h3 className="font-heading font-bold text-neon-purple mb-4">Submit to Leaderboard</h3>
                        <p className="text-sm text-white/60 mb-4">Enter your Hacker Alias to record your score.</p>
                        <div className="flex max-w-sm mx-auto gap-2">
                            <input
                                type="text"
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                                placeholder="e.g. Neo, Trinity"
                                className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon-purple"
                                maxLength={15}
                            />
                            <button
                                onClick={async () => {
                                    if (!playerName.trim()) return;
                                    setIsSubmitting(true);
                                    try {
                                        await fetch('/api/hang-the-hacker/leaderboard', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({
                                                playerName,
                                                timeTaken: timeElapsed,
                                                hintsUsed,
                                                accuracy: calculateAccuracy()
                                            })
                                        });
                                        setSubmitSuccess(true);
                                    } catch (err) {
                                        console.error('Failed to submit score', err);
                                    }
                                    setIsSubmitting(false);
                                }}
                                disabled={isSubmitting || !playerName.trim()}
                                className="neon-btn !py-2 !px-6 whitespace-nowrap disabled:opacity-50"
                            >
                                {isSubmitting ? '...' : 'Submit'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="bg-green-500/10 border border-green-500/50 rounded-xl p-6 mb-12 relative z-10 text-center">
                        <span className="text-3xl block mb-2">✅</span>
                        <h3 className="font-heading font-bold text-green-400">Score Recorded Successfully!</h3>
                    </div>
                )}

                <div className="flex justify-center gap-6 relative z-10">
                    <button
                        onClick={() => {
                            setGameState('start');
                            setTimeElapsed(0);
                            setHintsUsed(0);
                            setTotalGuesses(0);
                            setCorrectGuessesCount(0);
                            setSubmitSuccess(false);
                            setPlayerName('');
                        }}
                        className="py-3 px-8 rounded-lg font-heading tracking-widest text-sm border border-white/20 text-white hover:bg-white/5 transition-all uppercase"
                    >
                        Play Again
                    </button>
                    <Link href="/play/hang-the-hacker/leaderboard" className="neon-btn inline-flex items-center justify-center !bg-neon-purple/20 !border-neon-purple !text-neon-purple neon-glow-purple">
                        View Leaderboard
                    </Link>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 relative flex flex-col items-center justify-center">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/5 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-neon-blue/5 blur-[150px] rounded-full mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
            </div>

            <AnimatePresence mode="wait">
                {gameState === 'start' && <StartScreen key="start" />}
                {gameState === 'playing' && <PlayingScreen key="playing" />}
                {gameState === 'round_won' && <ResultModal key="won" isWin={true} />}
                {gameState === 'round_lost' && <ResultModal key="lost" isWin={false} />}
                {gameState === 'victory' && <VictoryScreen key="victory" />}
            </AnimatePresence>
        </div>
    );
}
