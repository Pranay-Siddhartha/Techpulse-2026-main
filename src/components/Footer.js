'use client';

export default function Footer() {
    return (
        <footer style={{ position: 'relative', marginTop: '4rem', backgroundColor: 'rgba(10, 10, 15, 0.9)', backdropFilter: 'blur(16px)' }}>
            {/* Glowing top divider */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    height: '1px',
                    width: '80%',
                    background: 'linear-gradient(90deg, transparent, #a855f7, #00f0ff, #a855f7, transparent)',
                    boxShadow: '0 0 15px rgba(168, 85, 247, 0.4), 0 0 30px rgba(0, 240, 255, 0.2)',
                }}
            />

            <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '3rem 1.5rem 2rem' }}>
                {/* Main Content — centered row */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '4rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    {/* Brand */}
                    <div style={{ textAlign: 'center' }}>
                        <h3 className="font-heading font-bold" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                            <span style={{ color: '#a855f7' }}>Code</span>
                            <span style={{ color: '#00f0ff' }}>hub</span>
                        </h3>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', lineHeight: '1.6', maxWidth: '16rem', margin: 0 }}>
                            DEPT OF CSE.
                        </p>
                    </div>

                    {/* Contact */}
                    <div style={{ textAlign: 'center' }}>
                        <h4 className="font-heading" style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#00f0ff', marginBottom: '0.75rem' }}>Contact</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>📧 csecodehub@gmail.com</span>
                            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>📍 JBIET, Hyderabad</span>
                            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>📱 +91 70322 45919</span>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '1.5rem' }}>
                    <p className="font-heading" style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.7rem', letterSpacing: '0.05em', margin: 0 }}>
                        © 2026 Codehub — All Rights Reserved
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        {['Twitter', 'Discord', 'GitHub', 'Instagram'].map(s => (
                            <a
                                key={s}
                                href="#"
                                className="font-heading"
                                style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', transition: 'color 0.3s' }}
                                onMouseEnter={(e) => e.target.style.color = '#00f0ff'}
                                onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.25)'}
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
