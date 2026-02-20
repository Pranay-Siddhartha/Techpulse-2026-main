import { motion } from 'framer-motion';

const pageTransition = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const schedule = [
    {
        day: 'Day 1 — March 15, 2026',
        events: [
            { time: '8:00 AM', title: 'Registration & Check-in', venue: 'Main Gate', type: 'General', emoji: '📝' },
            { time: '9:00 AM', title: 'Opening Ceremony', venue: 'Auditorium', type: 'General', emoji: '🎤' },
            { time: '9:30 AM', title: 'Cyber Hackathon Begins', venue: 'Main Arena', type: 'Technical', emoji: '💻' },
            { time: '10:00 AM', title: 'Code Wars', venue: 'Lab 201', type: 'Technical', emoji: '⚔️' },
            { time: '11:00 AM', title: 'Tech Quiz', venue: 'Seminar Hall', type: 'Non-Technical', emoji: '🧠' },
            { time: '1:00 PM', title: 'Lunch Break', venue: 'Food Court', type: 'General', emoji: '🍜' },
            { time: '2:00 PM', title: 'CTF Challenge', venue: 'Lab 301', type: 'Technical', emoji: '🔐' },
            { time: '2:00 PM', title: 'UI/UX Workshop', venue: 'Lab 101', type: 'Workshop', emoji: '🎨' },
            { time: '6:00 PM', title: 'Day 1 Wrap-up & Networking', venue: 'Cafeteria', type: 'General', emoji: '🤝' },
            { time: '9:00 PM', title: 'Hackathon Ends & Judging', venue: 'Main Arena', type: 'Technical', emoji: '🏆' },
        ],
    },
    {
        day: 'Day 2 — March 16, 2026',
        events: [
            { time: '9:00 AM', title: 'AI/ML Bootcamp', venue: 'Lab 102', type: 'Workshop', emoji: '🧪' },
            { time: '10:00 AM', title: 'Gaming Arena — Valorant', venue: 'Auditorium', type: 'Gaming', emoji: '🎮' },
            { time: '10:00 AM', title: 'Treasure Hunt', venue: 'Campus Wide', type: 'Non-Technical', emoji: '🗺️' },
            { time: '11:00 AM', title: 'Robo Race', venue: 'Ground Floor', type: 'Technical', emoji: '🤖' },
            { time: '1:00 PM', title: 'Lunch Break', venue: 'Food Court', type: 'General', emoji: '🍜' },
            { time: '2:00 PM', title: 'Meme Battle', venue: 'Seminar Hall', type: 'Non-Technical', emoji: '😂' },
            { time: '3:00 PM', title: 'Gaming Arena — CS2 Finals', venue: 'Auditorium', type: 'Gaming', emoji: '🎯' },
            { time: '5:00 PM', title: 'Prize Distribution', venue: 'Auditorium', type: 'General', emoji: '🏆' },
            { time: '6:00 PM', title: 'Closing Ceremony', venue: 'Auditorium', type: 'General', emoji: '🎆' },
        ],
    },
];

const typeColors = {
    Technical: 'border-neon-blue text-neon-blue',
    'Non-Technical': 'border-neon-purple text-neon-purple',
    Gaming: 'border-green-400 text-green-400',
    Workshop: 'border-yellow-400 text-yellow-400',
    General: 'border-white/30 text-white/50',
};

export default function Schedule() {
    return (
        <motion.div {...pageTransition} className="min-h-screen pt-28 pb-16 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">Schedule</span>
                    </h1>
                    <p className="text-white/40 max-w-lg mx-auto">Two days of neon-fueled action. Plan your journey through the grid.</p>
                </div>

                {/* Timeline */}
                {schedule.map((day, dayIndex) => (
                    <div key={dayIndex} className="mb-16">
                        {/* Day Header */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="mb-8"
                        >
                            <h2 className="font-heading text-xl md:text-2xl font-bold text-neon-purple neon-text-purple">
                                {day.day}
                            </h2>
                            <div className="h-0.5 w-32 bg-gradient-to-r from-neon-purple to-transparent mt-2 rounded-full" />
                        </motion.div>

                        {/* Timeline Events */}
                        <div className="relative">
                            {/* Vertical Line */}
                            <div className="absolute left-[18px] top-0 bottom-0 w-px bg-gradient-to-b from-neon-purple via-neon-blue to-transparent" />

                            {day.events.map((event, eventIndex) => (
                                <motion.div
                                    key={eventIndex}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '-50px' }}
                                    transition={{ duration: 0.4, delay: eventIndex * 0.05 }}
                                    className="relative flex items-start gap-6 mb-6 group"
                                >
                                    {/* Timeline Dot */}
                                    <div className="relative z-10 flex-shrink-0 w-9 h-9 rounded-full bg-dark-bg border-2 border-neon-purple/40 flex items-center justify-center group-hover:border-neon-blue group-hover:neon-glow-blue transition-all duration-300">
                                        <span className="text-sm">{event.emoji}</span>
                                    </div>

                                    {/* Card */}
                                    <div className="flex-1 glass-card !rounded-xl p-4 group-hover:!border-neon-blue/40 transition-all duration-300">
                                        <div className="flex flex-wrap items-center gap-3 mb-2">
                                            <span className="font-heading text-xs tracking-wider text-neon-blue font-bold">{event.time}</span>
                                            <span className={`text-[10px] font-heading tracking-widest uppercase px-2 py-0.5 rounded-full border ${typeColors[event.type] || typeColors.General}`}>
                                                {event.type}
                                            </span>
                                        </div>
                                        <h3 className="font-heading text-sm font-bold text-white group-hover:text-neon-blue transition-colors">
                                            {event.title}
                                        </h3>
                                        <p className="text-xs text-white/30 mt-1">📍 {event.venue}</p>
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
