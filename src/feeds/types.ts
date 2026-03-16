export interface FeedPanelConfig {
  id: string;
  name: string;
  viewType: 'alerts' | 'predictions' | 'both';
  minProfit: number;
  minSpike: number;
  minPrice: number;
  trackedItems: string[];
  f2pOnly: boolean;
  resourceFilter: 'all' | 'only' | 'hide';
  alertTypeFilter: string | null;
  settingsOpen: boolean;
}

export function createDefaultFeedConfig(): FeedPanelConfig {
  return {
    id: crypto.randomUUID(),
    name: 'Custom Feed',
    viewType: 'both',
    minProfit: 0,
    minSpike: 0,
    minPrice: 0,
    trackedItems: [],
    f2pOnly: false,
    resourceFilter: 'all',
    alertTypeFilter: null,
    settingsOpen: true,
  };
}
