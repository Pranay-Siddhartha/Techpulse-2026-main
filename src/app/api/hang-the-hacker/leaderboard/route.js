// Mock Database (In-Memory Array)
// Note: Normally, this would be a real database like PostgreSQL, MongoDB, or Supabase.
// Using global object prevents the array from wiping on hot-reloads in development.
global.hangTheHackerScores = global.hangTheHackerScores || [
    { playerName: "0xAcid", score: 950, timeTaken: 82, accuracy: 100, hintsUsed: 0 },
    { playerName: "Cycada", score: 880, timeTaken: 110, accuracy: 95, hintsUsed: 0 },
    { playerName: "NullPtr", score: 820, timeTaken: 95, accuracy: 100, hintsUsed: 1 },
    { playerName: "Neo", score: 750, timeTaken: 140, accuracy: 85, hintsUsed: 0 },
    { playerName: "Trinity", score: 600, timeTaken: 180, accuracy: 90, hintsUsed: 2 },
];

export async function GET() {
    // Return scores sorted descending by Score
    const sortedScores = [...global.hangTheHackerScores].sort((a, b) => b.score - a.score);
    return Response.json(sortedScores);
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { playerName, timeTaken, hintsUsed, accuracy } = body;

        // Basic validation
        if (!playerName || typeof timeTaken !== 'number' || typeof hintsUsed !== 'number' || typeof accuracy !== 'number') {
            return Response.json({ error: 'Missing or invalid fields' }, { status: 400 });
        }

        // Calculate a competitive score based on the evaluation metrics
        // High accuracy is good. Low time is good. Low hints are good.
        // Base score: 1000
        // Penalty: -1 point per second taken
        // Penalty: -50 points per hint used
        // Bonus: (Accuracy * 5) points

        const calculatedScore = Math.max(0, 1000 - timeTaken - (hintsUsed * 50) + (accuracy * 5));

        const newEntry = {
            playerName: playerName.slice(0, 15), // ensure alias isn't too long
            score: Math.round(calculatedScore),
            timeTaken,
            hintsUsed,
            accuracy,
        };

        global.hangTheHackerScores.push(newEntry);

        return Response.json({ message: 'Score submitted successfully', entry: newEntry }, { status: 201 });
    } catch (error) {
        console.error("Error submitting score:", error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
