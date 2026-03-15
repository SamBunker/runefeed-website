// Shared types — subset of the server's types.ts needed by the website.
// These must stay in sync with src/shared/types.ts.

export type AlertType = 'SELL-OFF' | 'BUY-IN' | 'SURGE';
export type PredictionType = 'MOMENTUM' | 'BUY-WINDOW' | 'COOLING' | 'STABLE';

export interface Alert {
  timestamp: string;
  type: AlertType;
  timeframe: string;
  itemId: number;
  itemName: string;
  members: boolean;
  volume: number;
  spikeScore: number;
  highVolume: number;
  lowVolume: number;
  sellPrice: number | null;
  buyPrice: number | null;
  tax: number | null;
  afterTaxSell: number | null;
  spread: number | null;
  resource: boolean;
}

export interface Prediction {
  timestamp: string;
  type: PredictionType;
  itemId: number;
  itemName: string;
  members: boolean;
  currentPrice: number;
  avgPrice: number;
  priceChangePercent: number;
  currentVolume: number;
  avgVolume: number;
  volumeRatio: number;
  buyPrice: number | null;
  sellPrice: number | null;
  tax: number | null;
  afterTaxSell: number | null;
  spread: number | null;
  estimatedFlip: number | null;
  resource: boolean;
}

export type WSMessage =
  | { type: 'alert'; data: Alert }
  | { type: 'prediction'; data: Prediction }
  | { type: 'poll-start'; cycle: number }
  | { type: 'poll-end'; cycle: number; alertCount: number }
  | { type: 'no-spikes'; cycle: number }
  | { type: 'status'; nextPollIn: number; clients: number }
  | { type: 'error'; message: string }
  | { type: 'headline'; data: unknown };
