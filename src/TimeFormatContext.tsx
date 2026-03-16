import { createContext, useContext, useState, type ReactNode } from 'react';

type TimeFormat = '24h' | '12h';

interface TimeFormatContextValue {
  timeFormat: TimeFormat;
  toggleTimeFormat: () => void;
}

const TimeFormatContext = createContext<TimeFormatContextValue>({
  timeFormat: '24h',
  toggleTimeFormat: () => {},
});

export function TimeFormatProvider({ children }: { children: ReactNode }) {
  const [timeFormat, setTimeFormat] = useState<TimeFormat>(() => {
    try {
      const saved = localStorage.getItem('runefeed-time-format');
      if (saved === '12h') return '12h';
    } catch { /* ignore */ }
    return '24h';
  });

  const toggleTimeFormat = () => {
    setTimeFormat(prev => {
      const next = prev === '24h' ? '12h' : '24h';
      localStorage.setItem('runefeed-time-format', next);
      return next;
    });
  };

  return (
    <TimeFormatContext.Provider value={{ timeFormat, toggleTimeFormat }}>
      {children}
    </TimeFormatContext.Provider>
  );
}

export function useTimeFormat() {
  return useContext(TimeFormatContext);
}
