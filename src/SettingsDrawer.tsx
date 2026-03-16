import { useState } from 'react';
import { useSound, SOUND_OPTIONS } from './SoundContext';
import { useTimeFormat } from './TimeFormatContext';

export function SettingsDrawer() {
  const [open, setOpen] = useState(false);
  const { settings, setEnabled, setSoundId, setVolume, playSound } = useSound();
  const { timeFormat, toggleTimeFormat } = useTimeFormat();

  return (
    <>
      {/* Backdrop for mobile */}
      {open && <div className="sd-backdrop" onClick={() => setOpen(false)} />}

      <div className={`sd-drawer ${open ? 'sd-drawer--open' : ''}`}>
        {/* Toggle button */}
        <button
          className="sd-toggle"
          onClick={() => setOpen(!open)}
          title="Settings"
        >
          <img src="/wrench.webp" alt="Settings" className="sd-toggle-icon" />
        </button>

        {/* Drawer content */}
        <div className="sd-content">
          <div className="sd-section">
            <div className="sd-section-header">Time Format</div>
            <div className="sd-row">
              <span className="sd-label">Clock</span>
              <button className="sd-chip" onClick={toggleTimeFormat}>
                {timeFormat === '24h' ? '24H' : 'AM/PM'}
              </button>
            </div>
          </div>

          <div className="sd-divider" />

          <div className="sd-section">
            <div className="sd-section-header">
              <span>Notifications</span>
              <button
                className={`sd-chip ${settings.enabled ? 'sd-chip--on' : ''}`}
                onClick={() => setEnabled(!settings.enabled)}
              >
                {settings.enabled ? 'ON' : 'OFF'}
              </button>
            </div>

            <div className="sd-label">Sound</div>
            <div className="sd-sound-list">
              {SOUND_OPTIONS.map(option => (
                <button
                  key={option.id}
                  className={`sd-sound-option ${settings.soundId === option.id ? 'selected' : ''}`}
                  onClick={() => setSoundId(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <button className="sd-preview-btn" onClick={playSound}>
              {'\u25B6'} Preview
            </button>

            <div className="sd-label">Volume</div>
            <div className="sd-volume-row">
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={settings.volume}
                onChange={e => setVolume(Number(e.target.value))}
                className="sd-volume-slider"
              />
              <span className="sd-volume-value">{Math.round(settings.volume * 100)}%</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
