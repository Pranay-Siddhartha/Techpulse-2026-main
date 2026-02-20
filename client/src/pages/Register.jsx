import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const pageTransition = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const eventOptions = [
    'Cyber Hackathon', 'Code Wars', 'CTF Challenge', 'Gaming Arena',
    'Robo Race', 'Tech Quiz', 'Meme Battle', 'UI/UX Workshop',
    'AI/ML Bootcamp', 'Treasure Hunt',
];

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', college: '', event: '' });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [message, setMessage] = useState('');

    const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = 'Name is required';
        if (!form.email.trim()) errs.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email format';
        if (!form.phone.trim()) errs.phone = 'Phone is required';
        else if (!/^\d{10}$/.test(form.phone)) errs.phone = 'Enter a valid 10-digit number';
        if (!form.college.trim()) errs.college = 'College is required';
        if (!form.event) errs.event = 'Please select an event';
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;

        setStatus('loading');
        try {
            const res = await axios.post('/api/register', form);
            setStatus('success');
            setMessage(res.data.message);
            setForm({ name: '', email: '', phone: '', college: '', event: '' });
        } catch (err) {
            setStatus('error');
            setMessage(err.response?.data?.error || 'Something went wrong');
        }
    };

    const inputClass = (field) =>
        `w-full px-4 py-3 bg-dark-bg/80 border rounded-lg font-body text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 transition-all duration-300 ${errors[field]
            ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/30'
            : 'border-neon-purple/20 focus:border-neon-blue focus:ring-neon-blue/30'
        }`;

    return (
        <motion.div {...pageTransition} className="min-h-screen pt-28 pb-16 px-6">
            <div className="max-w-xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">Register</span>
                    </h1>
                    <p className="text-white/40 max-w-md mx-auto">Plug into the grid. Secure your spot in the neon revolution.</p>
                </div>

                {/* Success State */}
                <AnimatePresence mode="wait">
                    {status === 'success' ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="glass-card p-12 text-center neon-glow-purple"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 border-2 border-neon-blue flex items-center justify-center neon-glow-blue"
                            >
                                <motion.span
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    className="text-5xl"
                                >
                                    ✓
                                </motion.span>
                            </motion.div>
                            <h2 className="font-heading text-2xl font-bold text-neon-blue neon-text-blue mb-3">Registration Complete!</h2>
                            <p className="text-white/50 mb-6">{message}</p>
                            <button
                                onClick={() => setStatus('idle')}
                                className="neon-btn !text-xs"
                            >
                                Register Another
                            </button>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onSubmit={handleSubmit}
                            className="glass-card p-8"
                        >
                            <div className="space-y-5">
                                {/* Name */}
                                <div>
                                    <label className="block text-xs font-heading tracking-wider text-neon-blue/60 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className={inputClass('name')}
                                    />
                                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-xs font-heading tracking-wider text-neon-blue/60 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className={inputClass('email')}
                                    />
                                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-xs font-heading tracking-wider text-neon-blue/60 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        placeholder="10-digit number"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        className={inputClass('phone')}
                                    />
                                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                                </div>

                                {/* College */}
                                <div>
                                    <label className="block text-xs font-heading tracking-wider text-neon-blue/60 mb-2">College / University</label>
                                    <input
                                        type="text"
                                        placeholder="Your institution"
                                        value={form.college}
                                        onChange={(e) => setForm({ ...form, college: e.target.value })}
                                        className={inputClass('college')}
                                    />
                                    {errors.college && <p className="text-red-400 text-xs mt-1">{errors.college}</p>}
                                </div>

                                {/* Event */}
                                <div>
                                    <label className="block text-xs font-heading tracking-wider text-neon-blue/60 mb-2">Select Event</label>
                                    <select
                                        value={form.event}
                                        onChange={(e) => setForm({ ...form, event: e.target.value })}
                                        className={`${inputClass('event')} appearance-none cursor-pointer`}
                                    >
                                        <option value="" className="bg-dark-bg">Choose an event...</option>
                                        {eventOptions.map(ev => (
                                            <option key={ev} value={ev} className="bg-dark-bg">{ev}</option>
                                        ))}
                                    </select>
                                    {errors.event && <p className="text-red-400 text-xs mt-1">{errors.event}</p>}
                                </div>
                            </div>

                            {/* Error message */}
                            {status === 'error' && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                                >
                                    {message}
                                </motion.p>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="neon-btn w-full mt-8 !py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-4 h-4 border-2 border-neon-blue border-t-transparent rounded-full animate-spin" />
                                        Processing...
                                    </span>
                                ) : (
                                    <span className="relative z-10">⚡ Register Now</span>
                                )}
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
