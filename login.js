// You have to verify whether the user has successfully completed the authentication process
fetch(`https://auth.itinerary.eu.org/api/auth/verifyToken?privateCode=${privateCode}`, { method: 'GET' })
    .then((response) => response.json())
    .then((data) => {
        // The `data` object sent by Scratch Auth will contain notably a `valid` property and a `username` property
        // If `valid` is `true`, the user has successfully completed authentication process
        if (data.valid === true) {
            // The client should store this in a session cookie
            res.status(200).json({ sessionId: sessionId });
        } else {
            // Respond to the client with an error
            res.status(403).tabase.collection('sessions').insertOne({ sessionId: sessionId, username: data.username });
            // Resjson({ error: 'Authentication failed' });
        }
    });