import { Orbitron, Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const orbitron = Orbitron({
    subsets: ['latin'],
    variable: '--font-heading',
    display: 'swap',
    weight: ['400', '500', '600', '700', '800', '900'],
});

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-body',
    display: 'swap',
    weight: ['300', '400', '500', '600', '700'],
});

export const metadata = {
    title: 'Codehub - TechPulse 2026',
    description:
        'TechPulse — The ultimate cyberpunk college tech fest. Code, compete, and create in a neon-drenched world of innovation.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${orbitron.variable} ${inter.variable}`}>
            <body>
                <div className="min-h-screen flex flex-col bg-dark-bg">
                    <div className="scanline-overlay" />
                    <Navbar />
                    <main className="flex-1">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
