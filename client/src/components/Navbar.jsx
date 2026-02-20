import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/events', label: 'Events' },
    { path: '/schedule', label: 'Schedule' },
    { path: '/register', label: 'Register' },
    { path: '/leaderboard', label: 'Leaderboard' },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    return (
        <nav className="fixed top-0 left-0 w-full z-50 glass-card !rounded-none !border-t-0 !border-x-0 !border-b border-b-neon-purple/30">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center neon-glow-purple">
                        <span className="text-white font-bold text-sm font-heading">TP</span>
                    </div>
                    <span className="font-heading text-lg font-bold tracking-wider">
                        <span className="text-neon-purple neon-text-purple">Tech</span>
                        <span className="text-neon-blue neon-text-blue">Pulse</span>
                    </span>
                </Link>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map(link => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`relative font-heading text-xs tracking-widest uppercase transition-all duration-300
                ${location.pathname === link.path
                                    ? 'text-neon-blue neon-text-blue'
                                    : 'text-white/60 hover:text-neon-purple'}`}
                        >
                            {link.label}
                            {location.pathname === link.path && (
                                <motion.div
                                    layoutId="nav-indicator"
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    <motion.span
                        animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                        className="block w-6 h-0.5 bg-neon-purple rounded-full"
                    />
                    <motion.span
                        animate={open ? { opacity: 0 } : { opacity: 1 }}
                        className="block w-6 h-0.5 bg-neon-blue rounded-full"
                    />
                    <motion.span
                        animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                        className="block w-6 h-0.5 bg-neon-purple rounded-full"
                    />
                </button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden overflow-hidden glass-card !rounded-none !border-x-0 !border-t-0"
                    >
                        <div className="px-6 py-4 flex flex-col gap-4">
                            {navLinks.map(link => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setOpen(false)}
                                    className={`font-heading text-sm tracking-widest uppercase transition-colors
                    ${location.pathname === link.path
                                            ? 'text-neon-blue neon-text-blue'
                                            : 'text-white/60 hover:text-neon-purple'}`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
