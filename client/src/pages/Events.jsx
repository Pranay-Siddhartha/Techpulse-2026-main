import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const pageTransition = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const categories = ['All', 'Technical', 'Non-Technical', 'Gaming', 'Workshops'];

const events = [
    { id: 1, title: 'Cyber Hackathon', category: 'Technical', emoji: '💻', date: 'March 15, 2026', time: '9:00 AM - 9:00 PM', venue: 'Main Arena', team: '2-4 Members', prize: '₹15,000', description: 'A 12-hour coding marathon where teams build innovative solutions to real-world problems. Bring your laptop, your skills, and your wildest ideas. Top 3 teams win cash prizes and mentorship opportunities.' },
    { id: 2, title: 'Code Wars', category: 'Technical', emoji: '⚔️', date: 'March 15, 2026', time: '10:00 AM - 1:00 PM', venue: 'Lab 201', team: 'Individual', prize: '₹5,000', description: 'Competitive programming showdown. Solve algorithmic challenges across increasing difficulty levels. The fastest coder with the most accurate solutions takes the crown.' },
    { id: 3, title: 'CTF Challenge', category: 'Technical', emoji: '🔐', date: 'March 15, 2026', time: '2:00 PM - 6:00 PM', venue: 'Lab 301', team: '2-3 Members', prize: '₹8,000', description: 'Capture The Flag cybersecurity competition. Hack your way through web exploits, cryptography puzzles, reverse engineering, and forensics challenges.' },
    { id: 4, title: 'Gaming Arena', category: 'Gaming', emoji: '🎮', date: 'March 16, 2026', time: '10:00 AM - 6:00 PM', venue: 'Auditorium', team: '5 Members', prize: '₹10,000', description: 'Esports tournament featuring Valorant and CS2. Teams battle it out in an electrifying arena with live commentary and audience cheering.' },
    { id: 5, title: 'Robo Race', category: 'Technical', emoji: '🤖', date: 'March 16, 2026', time: '11:00 AM - 3:00 PM', venue: 'Ground Floor', team: '3-4 Members', prize: '₹7,000', description: 'Build and race autonomous robots through a neon-lit obstacle course. Speed, precision, and engineering excellence will determine the winner.' },
    { id: 6, title: 'Tech Quiz', category: 'Non-Technical', emoji: '🧠', date: 'March 15, 2026', time: '11:00 AM - 12:30 PM', venue: 'Seminar Hall', team: '2 Members', prize: '₹3,000', description: 'Test your knowledge across technology, science, pop culture, and current affairs. Multi-round quiz with buzzer rounds and rapid fire.' },
    { id: 7, title: 'Meme Battle', category: 'Non-Technical', emoji: '😂', date: 'March 16, 2026', time: '2:00 PM - 4:00 PM', venue: 'Seminar Hall', team: 'Individual', prize: '₹2,000', description: 'The funniest memer wins! Create tech-themed memes on the spot. Audience voting decides the ultimate meme lord.' },
    { id: 8, title: 'UI/UX Workshop', category: 'Workshops', emoji: '🎨', date: 'March 15, 2026', time: '2:00 PM - 5:00 PM', venue: 'Lab 101', team: 'Individual', prize: 'Certificate', description: 'Hands-on workshop on modern UI/UX design principles. Learn Figma, design systems, and create a cyberpunk-themed interface from scratch.' },
    { id: 9, title: 'AI/ML Bootcamp', category: 'Workshops', emoji: '🧪', date: 'March 16, 2026', time: '9:00 AM - 1:00 PM', venue: 'Lab 102', team: 'Individual', prize: 'Certificate', description: 'Deep dive into machine learning with hands-on projects. Build an image classifier and a chatbot in this intensive 4-hour bootcamp.' },
    { id: 10, title: 'Treasure Hunt', category: 'Non-Technical', emoji: '🗺️', date: 'March 16, 2026', time: '10:00 AM - 1:00 PM', venue: 'Campus Wide', team: '3-4 Members', prize: '₹4,000', description: 'A campus-wide digital treasure hunt with QR codes, ciphers, and AR clues. Solve puzzles, follow the neon trail, and find the hidden treasure.' },
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
                className="glass-card !border-neon-purple/40 p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto neon-glow-purple"
            >
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <span className="text-4xl">{event.emoji}</span>
                        <div>
                            <h2 className="font-heading text-xl font-bold text-neon-blue neon-text-blue">{event.title}</h2>
                            <span className="text-xs font-heading tracking-widest uppercase text-neon-purple/70">{event.category}</span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/40 hover:text-neon-purple transition-colors text-2xl leading-none"
                    >
                        ✕
                    </button>
                </div>

                <p className="text-white/60 text-sm leading-relaxed mb-6">{event.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                        { label: 'Date', value: event.date },
                        { label: 'Time', value: event.time },
                        { label: 'Venue', value: event.venue },
                        { label: 'Team', value: event.team },
                    ].map((item, i) => (
                        <div key={i} className="bg-dark-bg/60 rounded-lg p-3 border border-neon-purple/10">
                            <p className="text-xs font-heading tracking-wider text-neon-blue/60 mb-1">{item.label}</p>
                            <p className="text-sm text-white/80 font-medium">{item.value}</p>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-heading tracking-wider text-neon-purple/60">Prize:</span>
                        <span className="font-heading text-lg font-bold text-neon-purple neon-text-purple">{event.prize}</span>
                    </div>
                    <a href="/register" className="neon-btn !py-2 !px-6 !text-xs">Register</a>
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
        <motion.div {...pageTransition} className="min-h-screen pt-28 pb-16 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">Events</span>
                    </h1>
                    <p className="text-white/40 max-w-lg mx-auto">Dive into the neon grid. Pick your battlefield and prove your skills.</p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`font-heading text-xs tracking-widest uppercase px-5 py-2.5 rounded-full border transition-all duration-300
                ${activeCategory === cat
                                    ? 'bg-neon-purple/20 border-neon-purple text-neon-purple neon-glow-purple'
                                    : 'bg-transparent border-white/10 text-white/40 hover:border-neon-blue/40 hover:text-neon-blue'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Event Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                className="glass-card p-6 cursor-pointer group hover:!border-neon-blue/50 transition-all duration-300 flex flex-col h-full"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-3xl group-hover:scale-110 transition-transform flex-shrink-0">{event.emoji}</span>
                                    <div>
                                        <h3 className="font-heading text-sm font-bold text-white group-hover:text-neon-blue transition-colors">{event.title}</h3>
                                        <span className="text-xs text-neon-purple/60 font-heading tracking-wider uppercase">{event.category}</span>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-4 flex-1">
                                    <p className="text-xs text-white/40">📅 {event.date} • {event.time}</p>
                                    <p className="text-xs text-white/40">📍 {event.venue}</p>
                                    <p className="text-xs text-white/40">👥 {event.team}</p>
                                </div>

                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                    <span className="font-heading text-sm font-bold text-neon-purple">{event.prize}</span>
                                    <span className="text-xs text-neon-blue/50 font-heading tracking-wider group-hover:text-neon-blue transition-colors">
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
