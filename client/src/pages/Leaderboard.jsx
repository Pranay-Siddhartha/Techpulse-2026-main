import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const pageTransition = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

function AnimatedCounter({ target, duration = 2 }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = target;
        const increment = end / (duration * 60);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 1000 / 60);
        return () => clearInterval(timer);
    }, [target, duration]);

    return <span>{count.toLocaleString()}</span>;
}

const rankStyles = {
    1: {
        bg: 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/10',
        border: 'border-yellow-500/40',
        glow: '0 0 15px rgba(234, 179, 8, 0.3)',
        badge: '🥇',
        color: 'text-yellow-400',
    },
    2: {
        bg: 'bg-gradient-to-r from-gray-300/10 to-gray-400/5',
        border: 'border-gray-400/30',
        glow: '0 0 10px rgba(156, 163, 175, 0.2)',
        badge: '🥈',
        color: 'text-gray-300',
    },
    3: {
        bg: 'bg-gradient-to-r from-amber-700/15 to-amber-800/5',
        border: 'border-amber-700/30',
        glow: '0 0 10px rgba(180, 83, 9, 0.2)',
        badge: '🥉',
        color: 'text-amber-600',
    },
};

export default function Leaderboard() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/leaderboard')
            .then(res => { setData(res.data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    return (
        <motion.div {...pageTransition} className="min-h-screen pt-28 pb-16 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">Leaderboard</span>
                    </h1>
                    <p className="text-white/40 max-w-lg mx-auto">The scoreboard of legends. Only the elite make it to the top.</p>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="w-12 h-12 border-2 border-neon-purple border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-white/30 font-heading text-sm tracking-wider">Loading scores...</p>
                    </div>
                ) : (
                    <>
                        {/* Top 3 Podium */}
                        <div className="grid grid-cols-3 gap-4 mb-12 max-w-lg mx-auto">
                            {[data[1], data[0], data[2]].filter(Boolean).map((entry, i) => {
                                const rank = [2, 1, 3][i];
                                const style = rankStyles[rank];
                                return (
                                    <motion.div
                                        key={entry.team}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + i * 0.15 }}
                                        className={`glass-card !rounded-xl p-4 text-center ${rank === 1 ? '-mt-4' : 'mt-4'}`}
                                        style={{ boxShadow: style.glow }}
                                    >
                                        <span className="text-3xl">{style.badge}</span>
                                        <p className={`font-heading text-sm font-bold mt-2 ${style.color}`}>{entry.team}</p>
                                        <p className="font-heading text-xl font-black text-white mt-1">
                                            <AnimatedCounter target={entry.score} />
                                        </p>
                                        <p className="text-[10px] text-white/30 font-heading tracking-wider mt-1">{entry.event}</p>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Full Table */}
                        <div className="glass-card overflow-hidden">
                            <div className="overflow-x-auto">
                                {/* Table Header */}
                                <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-neon-purple/20 bg-neon-purple/5 min-w-[500px]">
                                    <span className="col-span-1 font-heading text-[10px] tracking-widest text-neon-purple/60 uppercase">#</span>
                                    <span className="col-span-4 font-heading text-[10px] tracking-widest text-neon-purple/60 uppercase">Team</span>
                                    <span className="col-span-4 font-heading text-[10px] tracking-widest text-neon-purple/60 uppercase">Event</span>
                                    <span className="col-span-3 font-heading text-[10px] tracking-widest text-neon-purple/60 uppercase text-right">Score</span>
                                </div>

                                {/* Rows */}
                                {data.map((entry, i) => {
                                    const style = rankStyles[entry.rank];
                                    return (
                                        <motion.div
                                            key={entry.team}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + i * 0.05 }}
                                            className={`grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 items-center transition-all duration-300 hover:bg-neon-purple/5 min-w-[500px] ${style ? `${style.bg} !border-l-2 ${style.border}` : ''
                                                }`}
                                        >
                                            <span className={`col-span-1 font-heading text-sm font-bold ${style ? style.color : 'text-white/40'}`}>
                                                {style ? style.badge : entry.rank}
                                            </span>
                                            <span className="col-span-4 font-heading text-sm font-bold text-white">
                                                {entry.team}
                                            </span>
                                            <span className="col-span-4 text-xs text-white/40">
                                                {entry.event}
                                            </span>
                                            <span className="col-span-3 font-heading text-sm font-bold text-neon-blue text-right">
                                                <AnimatedCounter target={entry.score} duration={1.5} />
                                            </span>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    );
}
