import { useState, useEffect } from 'react';
import type { FeedPanelConfig } from './types';
import { createDefaultFeedConfig } from './types';
import { FeedPanel } from './FeedPanel';
import { useRuneFeedContext } from '../RuneFeedContext';
import './CustomFeeds.css';

const STORAGE_KEY = 'runefeed-custom-feeds';

function loadPanels(): FeedPanelConfig[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch { /* fall through */ }
  return [createDefaultFeedConfig()];
}

export function CustomFeedsPage() {
  const { connected, cycle, clients } = useRuneFeedContext();
  const [panels, setPanels] = useState<FeedPanelConfig[]>(loadPanels);

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(panels));
  }, [panels]);

  const updatePanel = (id: string, config: FeedPanelConfig) => {
    setPanels(prev => prev.map(p => p.id === id ? config : p));
  };

  const removePanel = (id: string) => {
    setPanels(prev => prev.filter(p => p.id !== id));
  };

  const addPanel = () => {
    setPanels(prev => [...prev, createDefaultFeedConfig()]);
  };

  return (
    <div className="feeds-page">
      <header className="feeds-header">
        <h1>Custom Feeds</h1>
        <p>Build your own filtered feeds. All filtering runs in your browser, one shared connection to the server.</p>
        <div className="status-bar">
          <span className={`status-dot ${connected ? 'live' : 'offline'}`} />
          <span>{connected ? 'LIVE' : 'OFFLINE'}</span>
          {connected && (
            <>
              <span className="separator">|</span>
              <span>Cycle #{cycle}</span>
              <span className="separator">|</span>
              <span>{clients} connected</span>
            </>
          )}
        </div>
      </header>

      <div className="feeds-grid">
        {panels.map(panel => (
          <FeedPanel
            key={panel.id}
            config={panel}
            onChange={config => updatePanel(panel.id, config)}
            onRemove={() => removePanel(panel.id)}
            canRemove={panels.length > 1}
          />
        ))}

        <button className="feed-add-btn" onClick={addPanel}>
          <span className="feed-add-icon">+</span>
          <span>Add Feed</span>
        </button>
      </div>
    </div>
  );
}
