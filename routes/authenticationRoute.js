import express from 'express';

const Router = express.Router();

Router.post('/', (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    const token = Buffer.from(username).toString('base64');
    res.json({ token });
})


export default Router;
