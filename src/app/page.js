'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import DecryptedText from '@/components/DecryptedText';

const pageTransition = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

function FloatingParticle({ delay, left, size, duration, color }) {
    return (
        <div
            className="absolute rounded-full opacity-0 pointer-events-none"
            style={{
                left: `${left}%`,
                bottom: '-10px',
                width: size,
                height: size,
                background: color,
                boxShadow: `0 0 6px ${color}, 0 0 15px ${color}`,
                animation: `float-up ${duration}s ${delay}s linear infinite`,
            }}
        />
    );
}

export default function Landing() {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        setParticles(
            Array.from({ length: 20 }, (_, i) => ({
                id: i,
                delay: Math.random() * 5,
                left: Math.random() * 100,
                size: `${2 + Math.random() * 4}px`,
                duration: 8 + Math.random() * 6,
                color: i % 2 === 0 ? '#a855f7' : '#00f0ff',
            }))
        );
    }, []);

    return (
        <motion.div {...pageTransition} className="relative min-h-screen flex justify-center overflow-hidden">
            {/* Neon Grid Background */}
            <div className="neon-grid opacity-40" />

            {/* Radial gradient overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.15)_0%,_transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(0,240,255,0.1)_0%,_transparent_60%)]" />

            {/* Floating particles */}
            {particles.map(p => <FloatingParticle key={p.id} {...p} />)}

            {/* Hero Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full flex flex-col items-center gap-12" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                    <p className="font-heading text-xs tracking-[0.3em] uppercase text-neon-blue/70" style={{ margin: 0 }}>
                        CODEHUB PRESENTS
                    </p>
                    <div style={{ height: '1px', width: '4rem', background: 'linear-gradient(90deg, transparent, #00f0ff, transparent)', marginTop: '0.75rem' }} />
                </motion.div>

                {/* Title with glitch */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8, type: 'spring', stiffness: 100 }}
                    className="glitch font-heading text-6xl md:text-8xl font-black leading-tight"
                    data-text="TechPulse 2026"
                >
                    <span className="bg-gradient-to-r from-neon-purple via-white to-neon-blue bg-clip-text text-transparent">
                        TechPulse 2026
                    </span>
                </motion.h1>

                {/* Description */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="w-full flex justify-center"
                >
                    <div className="text-center max-w-2xl w-full text-white/50 text-lg leading-relaxed">
                        <DecryptedText
                            text="Experience a unique mix of technical and non-technical challenges designed to test your cybersecurity skills, problem-solving, and strategic thinking."
                            animateOn="auto"
                            revealDirection="center"
                            sequential={true}
                            speed={30}
                            maxIterations={20}
                            className="text-white"
                            parentClassName="inline-block"
                            encryptedClassName="text-neon-blue font-mono"
                        />
                    </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    <Link href="/register" className="neon-btn !bg-gradient-to-r !from-neon-purple/30 !to-neon-blue/20 !border-neon-purple">
                        <span className="relative z-10">⚡ Register Now</span>
                    </Link>
                    <Link href="/events" className="neon-btn !border-neon-blue/50">
                        <span className="relative z-10">🔮 View Events</span>
                    </Link>
                    <Link href="/schedule" className="neon-btn !border-white/20 !bg-white/5">
                        <span className="relative z-10">📅 Schedule</span>
                    </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3, duration: 0.6 }}
                    className="flex justify-center items-center gap-12"
                >
                    {[
                        { value: '5', label: 'Events' },
                        { value: '40+', label: 'Participants' },
                        { value: 'upto ₹2K', label: 'Prizes' },
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <p className="font-heading text-2xl md:text-3xl font-bold bg-gradient-to-b from-neon-purple to-neon-blue bg-clip-text text-transparent">
                                {stat.value}
                            </p>
                            <p className="text-white/30 text-xs font-heading tracking-wider mt-1">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dark-bg to-transparent" />
        </motion.div>
    );
}
