import { useEffect, useState, useRef } from "react";

export const WSListener = <T = any>(room: string, wsUrl: string) => {
  // raw WebSocket съобщение
  const [socketMessage, setSocketMessage] = useState<string>('');

  // парснат обект от типа T
  const [socketObject, setSocketObject] = useState<T | null>(null);

  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`${wsUrl}/api/ws/${room}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log(`Connected to room: ${room}`);
    };

    ws.onmessage = (event) => {
      try {
        setSocketMessage(event.data);
       // console.log(event.data)
        setSocketObject(JSON.parse(event.data) as T);
      } catch {
        console.error("Invalid message:", event.data);
      }
    };

    ws.onclose = () => console.log(`Disconnected from room: ${room}`);
    ws.onerror = (err) => console.error("WebSocket error:", err);

    return () => ws.close();
  }, [room, wsUrl]);

  return { socketMessage, socketObject };
}
