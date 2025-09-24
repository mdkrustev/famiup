import { useEffect, useState, useRef, useCallback } from "react";

export const WSListener = <T = any>(room: string | null, wsUrl: string) => {
  // raw WebSocket съобщение
  const [socketMessage, setSocketMessage] = useState<string>('');

  // парснат обект от типа T
  const [socketObject, setSocketObject] = useState<T | null>(null);

  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (room) {
      const ws = new WebSocket(`${wsUrl}/api/ws/${room}`);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log(`Connected to room: ${room}`);
      };

      ws.onmessage = (event) => {
        try {
          setSocketMessage(event.data);
          setSocketObject(JSON.parse(event.data) as T);
        } catch {
          console.error("Invalid message:", event.data);
        }
      };

      ws.onclose = () => console.log(`Disconnected from room: ${room}`);
      ws.onerror = (err) => console.error("WebSocket error:", err);
      return () => ws.close();
    }
  }, [room, wsUrl]);

  // Функция за пращане на съобщение
  const sendMessage = useCallback((message: string | object) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const data = typeof message === "string" ? message : JSON.stringify(message);
      wsRef.current.send(data);
    } else {
      console.error("WebSocket is not open. Cannot send message.");
    }
  }, []);

  return { socketMessage, socketObject, sendMessage };
};