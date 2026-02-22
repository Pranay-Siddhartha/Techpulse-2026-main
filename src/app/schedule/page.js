'use client';

import { motion } from 'framer-motion';

const pageTransition = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const schedule = [
    {
        day: 'March 11, 2026',
        events: [
            { time: '10:00 AM - 11:00 AM', title: 'Strong Password Builder', venue: 'Lab 102', type: 'Technical', emoji: '🔒' },
            { time: '11:00 AM - 12:00 PM', title: 'Cyber Security Quiz', venue: 'Lab 102', type: 'Technical', emoji: '🤖' },
            { time: '1:10 PM - 2:10 PM', title: 'See it - Name it', venue: 'Lab 102', type: 'Technical', emoji: '🤔' },
            { time: '2:10 PM - 3:10 PM', title: 'Need for Speed', venue: 'Lab 102', type: 'Technical', emoji: '⚡' },
            { time: '3:10 PM - 4:10 PM', title: 'IPL Mock Auction', venue: 'Lab 102', type: 'Non-Technical', emoji: '🏏' },
        ],
    },
];

const typeColors = {
    Technical: { border: '1px solid rgba(0, 240, 255, 0.4)', color: '#00f0ff' },
    'Non-Technical': { border: '1px solid rgba(168, 85, 247, 0.4)', color: '#a855f7' },
};

export default function Schedule() {
    return (
        <motion.div {...pageTransition} className="min-h-screen" style={{ paddingTop: '6rem', paddingBottom: '4rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
            <div className="max-w-5xl" style={{ margin: '0 auto' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold" style={{ marginBottom: '1rem', textAlign: 'center' }}>
                        <span className="bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">Schedule</span>
                    </h1>
                    <p className="text-white/40" style={{ marginBottom: '1rem', textAlign: 'center', maxWidth: '32rem', margin: '0 auto 1rem auto' }}>Plan your journey through the events.</p>
                </div>

                {/* Timeline */}
                {schedule.map((day, dayIndex) => (
                    <div key={dayIndex} style={{ marginBottom: '3rem' }}>
                        {/* Day Header */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            style={{ marginBottom: '2rem' }}
                        >
                            <h2 className="font-heading text-xl md:text-2xl font-bold text-neon-purple neon-text-purple" style={{ margin: 0 }}>
                                {day.day}
                            </h2>
                            <div style={{ height: '2px', width: '8rem', background: 'linear-gradient(to right, #a855f7, transparent)', marginTop: '0.5rem', borderRadius: '9999px' }} />
                        </motion.div>

                        {/* Timeline Events */}
                        <div style={{ position: 'relative' }}>
                            {/* Vertical Line */}
                            <div style={{ position: 'absolute', left: '18px', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(to bottom, #a855f7, #00f0ff, transparent)' }} />

                            {day.events.map((event, eventIndex) => (
                                <motion.div
                                    key={eventIndex}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '-50px' }}
                                    transition={{ duration: 0.4, delay: eventIndex * 0.05 }}
                                    className="group"
                                    style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '1.5rem' }}
                                >
                                    {/* Timeline Dot */}
                                    <div className="group-hover:neon-glow-blue" style={{ position: 'relative', zIndex: 10, flexShrink: 0, width: '2.25rem', height: '2.25rem', borderRadius: '50%', backgroundColor: '#0a0a0f', border: '2px solid rgba(168, 85, 247, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
                                        <span style={{ fontSize: '0.875rem' }}>{event.emoji}</span>
                                    </div>

                                    {/* Card */}
                                    <div className="glass-card group-hover:!border-neon-blue/40 transition-all duration-300" style={{ flex: 1, borderRadius: '0.75rem', padding: '1rem' }}>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                            <span className="font-heading font-bold" style={{ fontSize: '0.75rem', letterSpacing: '0.05em', color: '#00f0ff' }}>{event.time}</span>
                                            <span className="font-heading" style={{
                                                fontSize: '0.625rem',
                                                letterSpacing: '0.1em',
                                                textTransform: 'uppercase',
                                                padding: '0.125rem 0.5rem',
                                                borderRadius: '9999px',
                                                border: (typeColors[event.type] || typeColors.Technical).border,
                                                color: (typeColors[event.type] || typeColors.Technical).color,
                                            }}>{event.type}</span>
                                        </div>
                                        <h3 className="font-heading font-bold text-white group-hover:text-neon-blue transition-colors" style={{ fontSize: '0.875rem', margin: 0 }}>
                                            {event.title}
                                        </h3>
                                        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.25rem', margin: '0.25rem 0 0 0' }}>📍 {event.venue}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
