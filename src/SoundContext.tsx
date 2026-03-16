import { createContext, useContext, useState, useRef, useCallback, type ReactNode } from 'react';

export interface SoundOption {
  id: string;
  label: string;
  file: string;
}

export const SOUND_OPTIONS: SoundOption[] = [
  { id: 'bell', label: 'Bell Ringing', file: '/Bell_ringing.wav.ogg' },
  { id: 'coins', label: 'Coins', file: '/Coins.wav.ogg' },
  { id: 'axe', label: 'Equip Axe', file: '/Equip_axe.wav.mp3' },
  { id: 'smoke', label: 'Smoke Puff', file: '/Smoke_puff.wav.ogg' },
  { id: 'staff', label: 'Staff Attack', file: '/Staff_attack_(stab).wav.ogg' },
  { id: 'teleblock', label: 'Tele Block', file: '/Tele_Block_cast.wav.ogg' },
  { id: 'unique', label: 'Unique Drop', file: '/Unique_drop_sound_effect.ogg' },
];

interface SoundSettings {
  enabled: boolean;
  soundId: string;
  volume: number;
}

interface SoundContextValue {
  settings: SoundSettings;
  setEnabled: (enabled: boolean) => void;
  setSoundId: (id: string) => void;
  setVolume: (volume: number) => void;
  playSound: () => void;
  playNotification: () => void;
}

const defaultSettings: SoundSettings = {
  enabled: false,
  soundId: 'coins',
  volume: 0.5,
};

function loadSettings(): SoundSettings {
  try {
    const saved = localStorage.getItem('runefeed-sound');
    if (saved) return { ...defaultSettings, ...JSON.parse(saved) };
  } catch { /* ignore */ }
  return defaultSettings;
}

function saveSettings(settings: SoundSettings) {
  localStorage.setItem('runefeed-sound', JSON.stringify(settings));
}

const SoundContext = createContext<SoundContextValue>({
  settings: defaultSettings,
  setEnabled: () => {},
  setSoundId: () => {},
  setVolume: () => {},
  playSound: () => {},
  playNotification: () => {},
});

export function SoundProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SoundSettings>(loadSettings);
  // Pre-load an Audio element so the browser associates it with user interaction.
  // We reuse this element for notifications to avoid autoplay restrictions.
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  const update = (partial: Partial<SoundSettings>) => {
    setSettings(prev => {
      const next = { ...prev, ...partial };
      saveSettings(next);
      return next;
    });
  };

  const playSound = useCallback(() => {
    const s = settingsRef.current;
    const option = SOUND_OPTIONS.find(o => o.id === s.soundId);
    if (!option) return;
    const audio = audioRef.current;
    audio.pause();
    audio.src = option.file;
    audio.volume = s.volume;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }, []);

  const playNotification = useCallback(() => {
    if (!settingsRef.current.enabled) return;
    playSound();
  }, [playSound]);

  return (
    <SoundContext.Provider value={{
      settings,
      setEnabled: (enabled) => update({ enabled }),
      setSoundId: (soundId) => update({ soundId }),
      setVolume: (volume) => update({ volume }),
      playSound,
      playNotification,
    }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}
