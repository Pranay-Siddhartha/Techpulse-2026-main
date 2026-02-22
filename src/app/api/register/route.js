// In-memory store (shared across requests in dev; resets on server restart)
let registrations = [];

export async function POST(request) {
    const body = await request.json();
    const { name, email, phone, college, event } = body;

    if (!name || !email || !phone || !college || !event) {
        return Response.json({ error: 'All fields are required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return Response.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const duplicate = registrations.find(r => r.email === email && r.event === event);
    if (duplicate) {
        return Response.json({ error: 'Already registered for this event' }, { status: 409 });
    }

    const registration = {
        id: Date.now(),
        name,
        email,
        phone,
        college,
        event,
        registeredAt: new Date().toISOString(),
    };

    registrations.push(registration);
    return Response.json({ message: 'Registration successful', registration }, { status: 201 });
}
