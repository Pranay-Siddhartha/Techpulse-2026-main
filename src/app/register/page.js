'use client';

import { motion } from 'framer-motion';

const pageTransition = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export default function Register() {
    return (
        <motion.div {...pageTransition} className="min-h-screen" style={{ paddingTop: '6rem', paddingBottom: '4rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
            <div className="max-w-5xl" style={{ margin: '0 auto' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold" style={{ marginBottom: '1rem', textAlign: 'center' }}>
                        <span className="bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">Register</span>
                    </h1>
                    <p className="text-white/40" style={{ marginBottom: '1rem', textAlign: 'center', maxWidth: '32rem', margin: '0 auto 1rem auto' }}>Secure your spot — register and pay via KonfHub.</p>
                </div>

                {/* KonfHub Button */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="glass-card neon-glow-purple"
                        style={{ padding: '3rem 4rem', textAlign: 'center', borderBottom: '2px solid rgba(168, 85, 247, 0.3)' }}
                    >
                        <motion.span
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            style={{ fontSize: '4rem', display: 'block', marginBottom: '1.5rem' }}
                        >
                            🎟️
                        </motion.span>
                        <h2 className="font-heading font-bold neon-text-blue" style={{ fontSize: '1.5rem', color: '#00f0ff', marginBottom: '0.75rem' }}>
                            Ready to Join?
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', margin: '0 0 2rem 0' }}>
                            Click below to register and complete your payment on KonfHub.
                        </p>
                        <a
                            href="https://konfhub.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="neon-btn"
                            style={{ padding: '1rem 3rem', fontSize: '0.9rem', letterSpacing: '0.15em', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            ⚡ Register on KonfHub
                        </a>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
