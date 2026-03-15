// useRuneFeed.ts — React hook that connects to the RuneFeed WebSocket server.
//
// This is a "custom hook" — a function that starts with "use" and can call
// other React hooks like useState and useEffect. It encapsulates the WebSocket
// connection logic so components can just call useRuneFeed() and get live data.

import { useState, useEffect, useRef, useCallback } from 'react';
import type { Alert, Prediction, WSMessage } from './types';

// How many lines to keep in each terminal feed
const MAX_LINES = 50;

export interface RuneFeedState {
  alerts: Alert[];
  predictions: Prediction[];
  connected: boolean;
  cycle: number;
  clients: number;
  nextPollIn: number; // ms until next poll cycle
}

export function useRuneFeed(wsUrl: string): RuneFeedState {
  const [state, setState] = useState<RuneFeedState>({
    alerts: [],
    predictions: [],
    connected: false,
    cycle: 0,
    clients: 0,
    nextPollIn: 0,
  });

  // useRef keeps a value that persists across renders without causing
  // re-renders when it changes. Perfect for the WebSocket instance.
  const wsRef = useRef<WebSocket | null>(null);
  const retryRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const connect = useCallback(() => {
    // Don't reconnect if already connected
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      setState(prev => ({ ...prev, connected: true }));
    };

    ws.onmessage = (event) => {
      try {
        const msg: WSMessage = JSON.parse(event.data);

        setState(prev => {
          switch (msg.type) {
            case 'alert':
              return {
                ...prev,
                alerts: [msg.data, ...prev.alerts].slice(0, MAX_LINES),
              };
            case 'prediction':
              return {
                ...prev,
                predictions: [msg.data, ...prev.predictions].slice(0, MAX_LINES),
              };
            case 'poll-start':
              return { ...prev, cycle: msg.cycle };
            case 'status':
              return { ...prev, clients: msg.clients, nextPollIn: msg.nextPollIn };
            default:
              return prev;
          }
        });
      } catch {
        // Malformed message
      }
    };

    ws.onclose = () => {
      setState(prev => ({ ...prev, connected: false }));
      // Auto-reconnect after 5 seconds
      retryRef.current = setTimeout(connect, 5000);
    };

    ws.onerror = () => {
      ws.close();
    };
  }, [wsUrl]);

  // useEffect runs side effects. The empty dependency array [] means
  // "run once on mount, clean up on unmount."
  useEffect(() => {
    connect();

    return () => {
      // Cleanup: close WebSocket and cancel retry when component unmounts
      if (retryRef.current) clearTimeout(retryRef.current);
      if (wsRef.current) wsRef.current.close();
    };
  }, [connect]);

  return state;
}
