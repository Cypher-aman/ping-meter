import express from 'express';
import { WebSocketServer } from 'ws';
const app = express();
app.get('/', (req, res) => {
    res.send('Hello World!');
});
const server = app.listen(8000, () => {
    console.log('Server started on port 8000');
});
const wss = new WebSocketServer({ server });
wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    ws.on('message', (data) => {
        if (data.toString() === 'ping') {
            console.log('Received ping');
            ws.send('pong');
        }
    });
    ws.send('Hello World!');
});
