const leaderboard = [
    { rank: 1, team: 'CyberNova', score: 2850, event: 'Hackathon' },
    { rank: 2, team: 'NeonByte', score: 2630, event: 'Hackathon' },
    { rank: 3, team: 'PixelStorm', score: 2410, event: 'Code Wars' },
    { rank: 4, team: 'DataDrift', score: 2280, event: 'CTF Challenge' },
    { rank: 5, team: 'GlitchSquad', score: 2100, event: 'Code Wars' },
    { rank: 6, team: 'ZeroCool', score: 1980, event: 'Robo Race' },
    { rank: 7, team: 'PhantomCoders', score: 1870, event: 'Hackathon' },
    { rank: 8, team: 'QuantumLeap', score: 1750, event: 'CTF Challenge' },
    { rank: 9, team: 'BinaryBlaze', score: 1640, event: 'Gaming Arena' },
    { rank: 10, team: 'SynthWave', score: 1520, event: 'Code Wars' },
];

export async function GET() {
    return Response.json(leaderboard);
}
