'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const pageTransition = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const categories = ['All', 'Technical', 'Non-Technical', 'Gaming', 'Workshops'];

const events = [
    { id: 1, title: 'Hang the Hacker', category: 'Technical', emoji: '🔒', date: 'March 11, 2026', time: '10:00 AM - 11:00 PM', venue: 'Lab 102', team: 'Individual', prize: '₹110', description: 'Simulates real-world password guessing attacks using a fun hangman-style game.' },
    { id: 2, title: 'Cyber Security Quiz', category: 'Technical', emoji: '🤖', date: 'March 11, 2026', time: '11:00 AM - 12:00 PM', venue: 'Lab 102', team: 'Individual', prize: '₹110', description: 'A fast-paced quiz covering real-world cyber security topics, focusing on general awareness and fundamental knowledge.' },
    { id: 3, title: 'See it - Name it', category: 'Technical', emoji: '🤔', date: 'March 11, 2026', time: '1:10 PM - 2:10 PM', venue: 'Lab 102', team: 'Individual', prize: '₹110', description: 'Participants will be shown logos without names and must identify them correctly and quickly.' },
    { id: 4, title: 'Need for Speed', category: 'Technical', emoji: '⚡', date: 'March 11, 2026', time: '2:10 AM - 3:10 PM', venue: 'Lab 102', team: 'Individual', prize: '₹110', description: 'Participants are given a passage to type within a fixed time limit.' },
    { id: 5, title: 'IPL Mock Auction', category: 'Non-Technical', emoji: '🏏', date: 'March 11, 2026', time: '3:10 AM - 4:10 PM', venue: 'Lab 102', team: '4 Members', prize: '₹110', description: 'Simulates an IPL-style auction, focusing purely on decision-making, resource allocation, and strategic optimization' }
];

function EventModal({ event, onClose }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-card !border-neon-purple/40 max-w-xl w-full max-h-[85vh] overflow-y-auto neon-glow-purple"
                style={{ padding: '2.5rem' }}
            >
                <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <span className="text-5xl">{event.emoji}</span>
                        <div>
                            <h2 className="font-heading text-2xl font-bold text-neon-blue neon-text-blue">{event.title}</h2>
                            <span className="text-sm font-heading tracking-widest uppercase text-neon-purple/70">{event.category}</span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/40 hover:text-neon-purple transition-colors text-3xl leading-none"
                    >
                        ✕
                    </button>
                </div>

                <p className="text-white/60 text-base leading-relaxed mb-8">{event.description}</p>

                <div className="grid grid-cols-2 gap-5 mb-8">
                    {[
                        { label: 'Date', value: event.date },
                        { label: 'Time', value: event.time },
                        { label: 'Venue', value: event.venue },
                        { label: 'Team', value: event.team },
                    ].map((item, i) => (
                        <div key={i} className="bg-dark-bg/60 rounded-lg p-4 border border-neon-purple/10">
                            <p className="text-xs font-heading tracking-wider text-neon-blue/60 mb-2">{item.label}</p>
                            <p className="text-base text-white/80 font-medium">{item.value}</p>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between" style={{ marginTop: '2rem' }}>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-heading tracking-wider text-neon-purple/60">Prize:</span>
                        <span className="font-heading text-xl font-bold text-neon-purple neon-text-purple">{event.prize}</span>
                    </div>
                    <Link href="/register" className="neon-btn !py-2.5 !px-8 !text-sm">Register</Link>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Events() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedEvent, setSelectedEvent] = useState(null);

    const filtered = activeCategory === 'All' ? events : events.filter(e => e.category === activeCategory);

    return (
        <motion.div {...pageTransition} className="min-h-screen" style={{ paddingTop: '6rem', paddingBottom: '4rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
            <div className="max-w-7xl" style={{ margin: '0 auto' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold" style={{ marginBottom: '1rem', textAlign: 'center' }}>
                        <span className="bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">Events</span>
                    </h1>
                    <p className="text-white/40" style={{ marginBottom: '1rem', textAlign: 'center', maxWidth: '32rem', margin: '0 auto 1rem auto' }}>Pick your battlefield and prove your skills.</p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-3" style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`font-heading tracking-widest uppercase rounded-full border transition-all duration-300
                ${activeCategory === cat
                                    ? 'bg-neon-purple/20 border-neon-purple text-neon-purple neon-glow-purple'
                                    : 'bg-transparent border-white/10 text-white/40 hover:border-neon-blue/40 hover:text-neon-blue'}`}
                            style={{ padding: '0.625rem 1.5rem', fontSize: '0.75rem', letterSpacing: '0.1em' }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Event Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '1rem', marginBottom: '2rem', justifyItems: 'center' }}>
                    <AnimatePresence mode="popLayout">
                        {filtered.map((event) => (
                            <motion.div
                                key={event.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => setSelectedEvent(event)}
                                className="glass-card cursor-pointer group hover:!border-neon-blue/50 transition-all duration-300 w-full h-full"
                                style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', borderBottom: '2px solid rgba(168, 85, 247, 0.3)' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                    <span className="text-2xl group-hover:scale-110 transition-transform" style={{ flexShrink: 0 }}>{event.emoji}</span>
                                    <div>
                                        <h3 className="font-heading font-bold text-white group-hover:text-neon-blue transition-colors" style={{ fontSize: '0.875rem', margin: 0 }}>{event.title}</h3>
                                        <span className="font-heading" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(168, 85, 247, 0.6)' }}>{event.category}</span>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '0.75rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                    <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>📅 {event.date} • {event.time}</p>
                                    <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>📍 {event.venue}</p>
                                    <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>👥 {event.team}</p>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                    <span className="font-heading font-bold text-neon-purple" style={{ fontSize: '0.875rem' }}>{event.prize}</span>
                                    <span className="font-heading group-hover:text-neon-blue transition-colors" style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'rgba(0, 240, 255, 0.5)' }}>
                                        View Details →
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
            </AnimatePresence>
        </motion.div>
    );
}
