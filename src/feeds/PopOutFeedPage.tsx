import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import type { FeedPanelConfig } from './types';
import { createDefaultFeedConfig } from './types';
import { filterAlerts, filterPredictions } from './filterFeed';
import { AlertLine, PredictionLine, WaitingMessage } from '../Terminal';
import { useRuneFeedContext } from '../RuneFeedContext';
import './CustomFeeds.css';

export function PopOutFeedPage() {
  const { panelId } = useParams<{ panelId: string }>();
  const { alerts, predictions, connected, cycle, nextPollIn } = useRuneFeedContext();

  const [config, setConfig] = useState<FeedPanelConfig>(() => {
    if (panelId) {
      const saved = localStorage.getItem(`runefeed-popout-${panelId}`);
      if (saved) {
        try { return JSON.parse(saved); } catch { /* fall through */ }
      }
    }
    return createDefaultFeedConfig();
  });

  // Listen for config changes from the parent window
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === `runefeed-popout-${panelId}` && e.newValue) {
        try { setConfig(JSON.parse(e.newValue)); } catch { /* ignore */ }
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [panelId]);

  const filteredAlerts = useMemo(
    () => (config.viewType === 'predictions' ? [] : filterAlerts(alerts, config)),
    [alerts, config]
  );

  const filteredPredictions = useMemo(
    () => (config.viewType === 'alerts' ? [] : filterPredictions(predictions, config)),
    [predictions, config]
  );

  const showAlerts = config.viewType === 'alerts' || config.viewType === 'both';
  const showPredictions = config.viewType === 'predictions' || config.viewType === 'both';
  const hasData = filteredAlerts.length > 0 || filteredPredictions.length > 0;

  return (
    <div className="popout-page">
      <div className="popout-header">
        <span className="popout-title">{config.name}</span>
        <span className={`popout-status ${connected ? 'connected' : 'disconnected'}`}>
          {connected ? `LIVE | Cycle #${cycle}` : 'CONNECTING...'}
        </span>
      </div>
      <div className="popout-body">
        {!hasData ? (
          <WaitingMessage connected={connected} nextPollIn={nextPollIn} label="data" />
        ) : (
          <>
            {showAlerts && filteredAlerts.map((alert, i) => (
              <AlertLine key={`a-${alert.itemId}-${alert.timestamp}-${i}`} alert={alert} />
            ))}
            {showPredictions && filteredPredictions.map((pred, i) => (
              <PredictionLine key={`p-${pred.itemId}-${pred.timestamp}-${i}`} prediction={pred} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
