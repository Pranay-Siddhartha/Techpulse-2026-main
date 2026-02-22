'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
    const pathname = usePathname();

    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50 glass-card border-neon-purple/30">
            <div className="w-full flex items-center justify-between" style={{ padding: '0.5rem 1rem' }}>
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center neon-glow-purple">
                        <span className="text-white font-bold text-sm font-heading">TP</span>
                    </div>
                    <span className="font-heading text-lg font-bold tracking-wider">
                        <span className="text-neon-purple neon-text-purple">Code</span>
                        <span className="text-neon-blue neon-text-blue">hub</span>
                    </span>
                </Link>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-9">
                    {navLinks.map(link => (
                        <Link
                            key={link.path}
                            href={link.path}
                            className={`relative font-heading text-xs tracking-widest uppercase transition-all duration-300
                ${pathname === link.path
                                    ? 'text-neon-blue neon-text-blue'
                                    : 'text-white/60 hover:text-neon-purple'}`}
                        >
                            {link.label}
                            {pathname === link.path && (
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
                                    href={link.path}
                                    onClick={() => setOpen(false)}
                                    className={`font-heading text-sm tracking-widest uppercase transition-colors
                    ${pathname === link.path
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
