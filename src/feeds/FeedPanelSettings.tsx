import type { Alert, Prediction } from '../types';
import type { FeedPanelConfig } from './types';
import { ItemSearch } from './ItemSearch';

interface Props {
  config: FeedPanelConfig;
  onChange: (config: FeedPanelConfig) => void;
  alerts: Alert[];
  predictions: Prediction[];
}

export function FeedPanelSettings({ config, onChange, alerts, predictions }: Props) {
  const update = (partial: Partial<FeedPanelConfig>) => {
    onChange({ ...config, ...partial });
  };

  return (
    <div className="feed-settings">
      <div className="feed-settings-row">
        <label>Name</label>
        <input
          type="text"
          value={config.name}
          onChange={e => update({ name: e.target.value })}
          maxLength={30}
        />
      </div>

      <div className="feed-settings-row">
        <label>View</label>
        <div className="feed-settings-segmented">
          {(['alerts', 'predictions', 'both'] as const).map(v => (
            <button
              key={v}
              className={config.viewType === v ? 'active' : ''}
              onClick={() => update({ viewType: v })}
            >
              {v === 'both' ? 'Both' : v === 'alerts' ? 'Alerts' : 'Predictions'}
            </button>
          ))}
        </div>
      </div>

      {(config.viewType === 'predictions' || config.viewType === 'both') && (
        <div className="feed-settings-row">
          <label>Min Profit</label>
          <input
            type="number"
            min={0}
            value={config.minProfit || ''}
            placeholder="0"
            onChange={e => update({ minProfit: Number(e.target.value) || 0 })}
          />
        </div>
      )}

      {(config.viewType === 'alerts' || config.viewType === 'both') && (
        <>
          <div className="feed-settings-row">
            <label>Min Spike</label>
            <input
              type="number"
              min={0}
              value={config.minSpike || ''}
              placeholder="0"
              onChange={e => update({ minSpike: Number(e.target.value) || 0 })}
            />
          </div>

          <div className="feed-settings-row">
            <label>Alert Type</label>
            <select
              value={config.alertTypeFilter ?? ''}
              onChange={e => update({ alertTypeFilter: e.target.value || null })}
            >
              <option value="">All</option>
              <option value="SELL-OFF">SELL-OFF</option>
              <option value="BUY-IN">BUY-IN</option>
              <option value="SURGE">SURGE</option>
            </select>
          </div>
        </>
      )}

      <div className="feed-settings-row">
        <label>Min Price</label>
        <input
          type="number"
          min={0}
          value={config.minPrice || ''}
          placeholder="0"
          onChange={e => update({ minPrice: Number(e.target.value) || 0 })}
        />
      </div>

      <div className="feed-settings-row">
        <label>F2P Only</label>
        <button
          className={`feed-toggle ${config.f2pOnly ? 'active' : ''}`}
          onClick={() => update({ f2pOnly: !config.f2pOnly })}
        >
          {config.f2pOnly ? 'ON' : 'OFF'}
        </button>
      </div>

      <div className="feed-settings-row">
        <label>Resources</label>
        <div className="feed-settings-segmented">
          {(['all', 'only', 'hide'] as const).map(v => (
            <button
              key={v}
              className={config.resourceFilter === v ? 'active' : ''}
              onClick={() => update({ resourceFilter: v })}
            >
              {v === 'all' ? 'All' : v === 'only' ? 'Only' : 'Hide'}
            </button>
          ))}
        </div>
      </div>

      <div className="feed-settings-row">
        <label>Text Size</label>
        <div className="feed-settings-font-size">
          <button
            onClick={() => update({ fontSize: Math.max(8, (config.fontSize ?? 12) - 1) })}
          >
            {'\u2212'}
          </button>
          <span>{config.fontSize ?? 12}px</span>
          <button
            onClick={() => update({ fontSize: Math.min(20, (config.fontSize ?? 12) + 1) })}
          >
            +
          </button>
        </div>
      </div>

      <div className="feed-settings-row feed-settings-row-full">
        <label>Track Items</label>
        <ItemSearch
          alerts={alerts}
          predictions={predictions}
          selected={config.trackedItems}
          onAdd={item => update({ trackedItems: [...config.trackedItems, item.toLowerCase()] })}
          onRemove={item => update({ trackedItems: config.trackedItems.filter(t => t !== item.toLowerCase()) })}
        />
      </div>
    </div>
  );
}
