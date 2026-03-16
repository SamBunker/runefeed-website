import { createContext, useContext } from 'react';
import { useRuneFeed, type RuneFeedState } from './useRuneFeed';

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3900';

const defaultState: RuneFeedState = {
  alerts: [],
  predictions: [],
  connected: false,
  cycle: 0,
  clients: 0,
  nextPollIn: 0,
};

const RuneFeedContext = createContext<RuneFeedState>(defaultState);

export function RuneFeedProvider({ children }: { children: React.ReactNode }) {
  const state = useRuneFeed(WS_URL);
  return (
    <RuneFeedContext.Provider value={state}>
      {children}
    </RuneFeedContext.Provider>
  );
}

export function useRuneFeedContext(): RuneFeedState {
  return useContext(RuneFeedContext);
}
