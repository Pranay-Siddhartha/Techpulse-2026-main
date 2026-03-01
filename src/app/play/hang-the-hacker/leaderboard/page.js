'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const pageTransition = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export default function HangTheHackerLeaderboard() {
    const [scores, setScores] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchScores() {
            try {
                const res = await fetch('/api/hang-the-hacker/leaderboard');
                if (res.ok) {
                    const data = await res.json();
                    setScores(data);
                }
            } catch (err) {
                console.error("Failed to load scores:", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchScores();

        // Polling every 10 seconds for live updates
        const interval = setInterval(fetchScores, 10000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 relative flex flex-col items-center">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/5 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-neon-blue/5 blur-[150px] rounded-full mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
            </div>

            <motion.div {...pageTransition} className="w-full max-w-5xl relative z-10">
                <div className="text-center mb-12">
                    <div className="text-6xl mb-4 flex justify-center glitch-text" data-text="🏆">🏆</div>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">
                        Top Hackers
                    </h1>
                    <p className="text-neon-purple/80 font-heading tracking-widest text-sm uppercase">
                        Hang the Hacker - Official Leaderboard
                    </p>
                </div>

                <div className="glass-card p-6 md:p-10 border-neon-blue/40 neon-glow-blue overflow-hidden">
                    {isLoading ? (
                        <div className="py-20 text-center text-neon-blue/60 font-mono animate-pulse">
                            Establishing secure connection to database...
                        </div>
                    ) : scores.length === 0 ? (
                        <div className="py-20 text-center text-white/50 font-heading tracking-widest uppercase">
                            No records found. The system is clean.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10 text-white/40 font-heading tracking-widest text-xs uppercase">
                                        <th className="py-4 px-4">Rank</th>
                                        <th className="py-4 px-4">Alias</th>
                                        <th className="py-4 px-4 text-center">Final Score</th>
                                        <th className="py-4 px-4 text-center hidden sm:table-cell">Time</th>
                                        <th className="py-4 px-4 text-center hidden md:table-cell">Accuracy</th>
                                        <th className="py-4 px-4 text-center hidden lg:table-cell">Hints</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {scores.map((score, index) => (
                                        <motion.tr
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className={`border-b border-white/5 hover:bg-white/5 transition-colors
                                                ${index === 0 ? 'bg-yellow-500/10' : ''}
                                                ${index === 1 ? 'bg-gray-400/10' : ''}
                                                ${index === 2 ? 'bg-amber-700/10' : ''}
                                            `}
                                        >
                                            <td className="py-4 px-4 font-mono">
                                                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold
                                                    ${index === 0 ? 'bg-yellow-500 text-black' :
                                                        index === 1 ? 'bg-gray-400 text-black' :
                                                            index === 2 ? 'bg-amber-700 text-white' : 'text-white/50'}`}
                                                >
                                                    {index + 1}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 font-bold text-lg text-white font-mono tracking-wider">
                                                {score.playerName}
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                <span className="font-heading text-xl text-neon-blue font-bold shadow-neon-blue/50 drop-shadow-lg">
                                                    {score.score}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-center font-mono text-white/70 hidden sm:table-cell">
                                                {formatTime(score.timeTaken)}
                                            </td>
                                            <td className="py-4 px-4 text-center font-mono text-neon-purple/80 hidden md:table-cell">
                                                {score.accuracy}%
                                            </td>
                                            <td className="py-4 px-4 text-center font-mono text-yellow-500/80 hidden lg:table-cell">
                                                {score.hintsUsed}
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div className="mt-12 text-center flex gap-6 justify-center">
                    <Link href="/play/hang-the-hacker" className="neon-btn font-heading">
                        Play Game
                    </Link>
                    <Link href="/events" className="py-3 px-8 rounded-lg font-heading tracking-widest text-sm border border-white/20 text-white hover:bg-white/5 transition-all uppercase">
                        Return to Events
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
