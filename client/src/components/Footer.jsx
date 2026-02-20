

export default function Footer() {
    return (
        <footer className="relative mt-16 bg-dark-bg/90 backdrop-blur-lg">
            {/* Glowing top divider */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-4/5"
                style={{
                    background: 'linear-gradient(90deg, transparent, #a855f7, #00f0ff, #a855f7, transparent)',
                    boxShadow: '0 0 15px rgba(168, 85, 247, 0.4), 0 0 30px rgba(0, 240, 255, 0.2)',
                }}
            />

            <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-12 md:gap-16 mb-12">
                    {/* Brand */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h3 className="font-heading text-2xl font-bold mb-4">
                            <span className="text-neon-purple neon-text-purple">Tech</span>
                            <span className="text-neon-blue neon-text-blue">Pulse</span>
                        </h3>
                        <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                            The ultimate cyberpunk tech fest. Where innovation meets the neon underground.
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h4 className="font-heading text-xs tracking-widest uppercase text-neon-blue mb-5">Contact</h4>
                        <div className="flex flex-col gap-3 text-white/40 text-sm">
                            <span>📧 hello@techpulse.dev</span>
                            <span>📍 Cyber Campus, Sector 7</span>
                            <span>📱 +91 9876543210</span>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-5">
                    <p className="text-white/25 text-xs font-heading tracking-wider">
                        © 2026 TechPulse — All Rights Reserved
                    </p>
                    <div className="flex gap-6">
                        {['Twitter', 'Discord', 'GitHub', 'Instagram'].map(s => (
                            <a
                                key={s}
                                href="#"
                                className="text-white/25 text-xs hover:text-neon-blue transition-colors duration-300 font-heading tracking-wider uppercase"
                            >
                                {s}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}