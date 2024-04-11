import { useState, useEffect } from 'react';

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const [ping, setPing] = useState<Date | number>(0);

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8000');

    newSocket.onopen = () => {
      console.log('Connected to server');
      setSocket(newSocket);
    };

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      sendPing();
    }, 1000);

    return () => clearInterval(timer);
  }, [socket]);

  const sendPing = () => {
    console.log('Sending ping...');
    console.log(socket);
    if (!socket) return;
    console.log('Send');

    const startTime = Date.now();
    socket.send('ping');

    socket.onmessage = (event) => {
      if (event.data === 'pong') {
        const rtt = Date.now() - startTime;
        setPing(rtt);
      }
    };
  };

  return (
    <main>
      <h1>Ping Meter</h1>
      <p
        className={`ping ${
          Number(ping) < 100 && Number(ping) > 0
            ? 'green'
            : Number(ping) === 0
            ? 'gray'
            : 'red'
        }`}
      >
        <span className="value">{ping.toString() || 2}</span> ms
      </p>
    </main>
  );
}

export default App;
