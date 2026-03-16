import { useState } from 'react';
import { useSound, SOUND_OPTIONS } from './SoundContext';

export function SoundPanel() {
  const { settings, setEnabled, setSoundId, setVolume, playSound } = useSound();
  const [open, setOpen] = useState(false);

  return (
    <div className="sound-float">
      <button
        className={`sound-float-btn ${settings.enabled ? 'active' : ''}`}
        onClick={() => setOpen(!open)}
        title="Sound notifications"
      >
        {settings.enabled ? '\uD83D\uDD0A' : '\uD83D\uDD07'}
      </button>

      {open && (
        <div className="sound-panel">
          <div className="sound-panel-header">
            <span>Notification Sound</span>
            <button
              className={`sound-panel-toggle ${settings.enabled ? 'on' : ''}`}
              onClick={() => setEnabled(!settings.enabled)}
            >
              {settings.enabled ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="sound-panel-body">
            <label className="sound-panel-label">Sound</label>
            <div className="sound-list">
              {SOUND_OPTIONS.map(option => (
                <button
                  key={option.id}
                  className={`sound-option ${settings.soundId === option.id ? 'selected' : ''}`}
                  onClick={() => setSoundId(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <button className="sound-preview-btn" onClick={playSound}>
              {'\u25B6'} Preview
            </button>

            <label className="sound-panel-label">Volume</label>
            <div className="sound-volume-row">
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={settings.volume}
                onChange={e => setVolume(Number(e.target.value))}
                className="sound-volume-slider"
              />
              <span className="sound-volume-value">{Math.round(settings.volume * 100)}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
