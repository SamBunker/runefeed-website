import { useMemo } from 'react';
import type { FeedPanelConfig } from './types';
import { filterAlerts, filterPredictions } from './filterFeed';
import { FeedPanelSettings } from './FeedPanelSettings';
import { AlertLine, PredictionLine, WaitingMessage } from '../Terminal';
import { useRuneFeedContext } from '../RuneFeedContext';

interface Props {
  config: FeedPanelConfig;
  onChange: (config: FeedPanelConfig) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export function FeedPanel({ config, onChange, onRemove, canRemove }: Props) {
  const { alerts, predictions, connected, cycle, nextPollIn } = useRuneFeedContext();

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

  const handlePopOut = () => {
    // Save config to localStorage for the pop-out window to read
    localStorage.setItem(`runefeed-popout-${config.id}`, JSON.stringify(config));
    const width = 900;
    const height = 600;
    const left = window.screenX + 50;
    const top = window.screenY + 50;
    window.open(
      `/feeds/popout/${config.id}`,
      `runefeed-${config.id}`,
      `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,status=no`
    );
  };

  // Build the equivalent CLI command for the terminal title
  const buildTitle = () => {
    const parts = ['runefeed watch'];
    if (config.viewType === 'predictions') parts.push('--view predictions');
    if (config.minProfit > 0) parts.push(`--min-profit ${config.minProfit}`);
    if (config.minSpike > 0) parts.push(`--min-spike ${config.minSpike}`);
    if (config.minPrice > 0) parts.push(`--min-price ${config.minPrice}`);
    if (config.f2pOnly) parts.push('--f2p');
    if (config.resourceFilter === 'only') parts.push('--resources');
    if (config.resourceFilter === 'hide') parts.push('--hide-resources');
    if (config.alertTypeFilter) parts.push(`--type ${config.alertTypeFilter.toLowerCase()}`);
    if (config.trackedItems.length > 0) parts.push(`--track "${config.trackedItems.join(', ')}"`);
    return parts.join(' ');
  };

  return (
    <div className="feed-panel">
      <div className="feed-panel-header">
        <span className="feed-panel-name">{config.name}</span>
        <div className="feed-panel-actions">
          <button
            className="feed-panel-btn"
            onClick={() => onChange({ ...config, settingsOpen: !config.settingsOpen })}
            title="Settings"
          >
            {config.settingsOpen ? '\u2715' : '\u2699'}
          </button>
          <button className="feed-panel-btn" onClick={handlePopOut} title="Pop out">
            \u2197
          </button>
          {canRemove && (
            <button className="feed-panel-btn feed-panel-btn-remove" onClick={onRemove} title="Remove">
              \u2212
            </button>
          )}
        </div>
      </div>

      {config.settingsOpen && (
        <FeedPanelSettings
          config={config}
          onChange={onChange}
          alerts={alerts}
          predictions={predictions}
        />
      )}

      <div className="feed-panel-terminal">
        <div className="terminal">
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <span className="terminal-title">{buildTitle()}</span>
            <span className={`terminal-status ${connected ? 'connected' : 'disconnected'}`}>
              {connected ? `Cycle #${cycle}` : 'Disconnected'}
            </span>
          </div>
          <div className="terminal-body">
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
      </div>
    </div>
  );
}
