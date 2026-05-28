import express from 'express';
import { createServer } from 'http';
import config from '../config.js';

const packageInfo = {
    name: config.botName || 'KING_MD',
    version: config.version || '1.0.0',
    description: config.description || 'WhatsApp Bot',
    author: config.author || 'WEND DEV'
};

const app = express();
const server = createServer(app);
const PORT = config.port || 5000;

app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/lib/pair.html");
});

app.get('/health', (req, res) => {
    const mem = process.memoryUsage();

    res.json({
        status: 'ok',
        uptime: Math.floor(process.uptime()),
        memory: {
            rss: `${Math.round(mem.rss / 1024 / 1024)}MB`,
            heapUsed: `${Math.round(mem.heapUsed / 1024 / 1024)}MB`,
            heapTotal: `${Math.round(mem.heapTotal / 1024 / 1024)}MB`
        },
        version: packageInfo.version,
        bot: packageInfo.name,
        timestamp: new Date().toISOString()
    });
});

app.get('/process', (req, res) => {
    const { send } = req.query;

    if (!send)
        return res.status(400).json({ error: 'Missing send query' });

    res.json({
        status: 'Received',
        data: send
    });
});

app.get('/chat', (req, res) => {
    const { message, to } = req.query;

    if (!message || !to)
        return res.status(400).json({
            error: 'Missing message or to query'
        });

    res.json({
        status: 200,
        info: 'Message received (integration not implemented)'
    });
});

export { app, server, PORT };