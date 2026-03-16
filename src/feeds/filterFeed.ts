import type { Alert, Prediction } from '../types';
import type { FeedPanelConfig } from './types';

export function filterAlerts(alerts: Alert[], config: FeedPanelConfig): Alert[] {
  const trackSet = config.trackedItems.length > 0
    ? new Set(config.trackedItems.map(s => s.toLowerCase()))
    : null;

  return alerts.filter(alert => {
    if (config.f2pOnly && alert.members) return false;
    if (config.minSpike > 0 && alert.spikeScore < config.minSpike) return false;
    if (config.alertTypeFilter && alert.type !== config.alertTypeFilter) return false;
    if (config.minPrice > 0) {
      const price = alert.sellPrice ?? alert.buyPrice ?? 0;
      if (price < config.minPrice) return false;
    }
    if (trackSet && !trackSet.has(alert.itemName.toLowerCase())) return false;
    if (config.resourceFilter === 'only' && !alert.resource) return false;
    if (config.resourceFilter === 'hide' && alert.resource) return false;
    return true;
  });
}

export function filterPredictions(predictions: Prediction[], config: FeedPanelConfig): Prediction[] {
  const trackSet = config.trackedItems.length > 0
    ? new Set(config.trackedItems.map(s => s.toLowerCase()))
    : null;

  return predictions.filter(pred => {
    if (config.f2pOnly && pred.members) return false;
    if (config.minProfit > 0) {
      if (pred.estimatedFlip === null || pred.estimatedFlip < config.minProfit) return false;
    }
    if (config.minPrice > 0 && pred.currentPrice < config.minPrice) return false;
    if (trackSet && !trackSet.has(pred.itemName.toLowerCase())) return false;
    if (config.resourceFilter === 'only' && !pred.resource) return false;
    if (config.resourceFilter === 'hide' && pred.resource) return false;
    return true;
  });
}
