
export function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }

    // USING THE THE NODE BUFFER TO CONVERT TOKEN INTO PLAIN TEXT
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
        return res.status(401).json({ error: 'Invalid Authorization format' });
    }

    try {
        const username = Buffer.from(token, 'base64').toString('utf8');
        req.user = { username };
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}