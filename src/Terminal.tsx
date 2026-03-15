// Terminal.tsx — Embedded terminal window component.
//
// Renders a black terminal-style box with colored text lines,
// mimicking what you'd see running `runefeed watch` in a real terminal.
//
// In React, a "component" is a function that returns JSX (HTML-like syntax).
// Props are the inputs — like function parameters but for UI components.

import { useEffect, useRef } from 'react';
import type { Alert, Prediction } from './types';

// ── Formatting helpers (mirrors shared/format.ts logic) ──

function formatGp(value: number | null): string {
  if (value === null) return '? gp';
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)}B gp`;
  if (abs >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M gp`;
  if (abs >= 100_000) return `${(value / 1_000).toFixed(1)}K gp`;
  return `${value.toLocaleString()} gp`;
}

function formatVol(value: number): string {
  return value.toLocaleString();
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
}

function formatSpread(value: number): string {
  const sign = value >= 0 ? '+' : '';
  const abs = Math.abs(value);
  if (abs >= 1_000_000) return `${sign}${(value / 1_000_000).toFixed(2)}M gp`;
  if (abs >= 100_000) return `${sign}${(value / 1_000).toFixed(1)}K gp`;
  return `${sign}${value.toLocaleString()} gp`;
}

// ── Color mapping — CSS classes for each type ──

const ALERT_COLORS: Record<string, string> = {
  'SELL-OFF': 'text-red',
  'BUY-IN': 'text-green',
  'SURGE': 'text-yellow',
};

const PREDICTION_COLORS: Record<string, string> = {
  'MOMENTUM': 'text-green',
  'BUY-WINDOW': 'text-cyan',
  'COOLING': 'text-magenta',
  'STABLE': 'text-dim',
};

// ── Alert line renderer ──

function AlertLine({ alert }: { alert: Alert }) {
  const time = formatTime(alert.timestamp);
  const colorClass = ALERT_COLORS[alert.type] ?? 'text-dim';
  const avgVol = alert.spikeScore > 0 ? Math.round(alert.volume / alert.spikeScore) : 0;
  const tag = alert.resource ? 'RES' : alert.members ? 'MEM' : 'F2P';

  return (
    <div className="terminal-line">
      <span className="text-dim">[{time}]</span>
      {' '}
      <span className="text-dim">[{alert.timeframe.padEnd(3)}]</span>
      {' '}
      <span className={`text-bold ${colorClass}`}>{alert.type.padEnd(8)}</span>
      {'  '}
      <span className="text-bold">{alert.itemName.padEnd(22)}</span>
      {' | '}
      Vol: <span className="text-bold">{formatVol(alert.volume)}</span>
      {' '}
      <span className={colorClass}>({alert.spikeScore.toFixed(1)}x</span>
      {' '}
      <span className="text-dim">avg {formatVol(avgVol)})</span>
      {' | '}
      Sell: <span className="text-bold">{formatGp(alert.sellPrice)}</span>
      {' | '}
      Buy: <span className="text-bold">{formatGp(alert.buyPrice)}</span>
      {'  '}
      <span className={alert.resource ? 'text-yellow' : 'text-dim'}>[{tag}]</span>
    </div>
  );
}

// ── Prediction line renderer ──

function PredictionLine({ prediction }: { prediction: Prediction }) {
  const time = formatTime(prediction.timestamp);
  const colorClass = PREDICTION_COLORS[prediction.type] ?? 'text-dim';
  const changeSign = prediction.priceChangePercent >= 0 ? '+' : '';
  const tag = prediction.resource ? 'RES' : prediction.members ? 'MEM' : 'F2P';

  let actionStr: string;
  switch (prediction.type) {
    case 'MOMENTUM':
      actionStr = prediction.estimatedFlip !== null
        ? `Flip: ${formatSpread(prediction.estimatedFlip)}/ea`
        : 'Rising';
      break;
    case 'BUY-WINDOW':
      actionStr = prediction.buyPrice !== null ? `Buy: ${formatGp(prediction.buyPrice)}` : 'Buy dip';
      break;
    case 'COOLING':
      actionStr = prediction.estimatedFlip !== null
        ? `Sell (${formatSpread(prediction.estimatedFlip)}/ea)`
        : 'Sell signal';
      break;
    case 'STABLE':
      actionStr = prediction.sellPrice !== null && prediction.buyPrice !== null
        ? `Sell: ${formatGp(prediction.sellPrice)} | Buy: ${formatGp(prediction.buyPrice)}`
        : 'No movement';
      break;
    default:
      actionStr = '';
  }

  return (
    <div className="terminal-line">
      <span className="text-dim">[{time}]</span>
      {' '}
      <span className={`text-bold ${colorClass}`}>{prediction.type.padEnd(10)}</span>
      {' '}
      <span className="text-bold">{prediction.itemName.padEnd(22)}</span>
      {' | '}
      <span className={colorClass}>{changeSign}{prediction.priceChangePercent}%</span>
      {' '}
      ({formatGp(prediction.avgPrice)} &rarr; {formatGp(prediction.currentPrice)})
      {' | '}
      Vol: <span className="text-bold">{formatVol(prediction.currentVolume)}</span>
      {' '}
      (<span className="text-bold">{prediction.volumeRatio}x</span>
      {' '}
      <span className="text-dim">avg {formatVol(prediction.avgVolume)})</span>
      {' | '}
      <span className={colorClass}>{actionStr}</span>
      {'  '}
      <span className={prediction.resource ? 'text-yellow' : 'text-dim'}>[{tag}]</span>
    </div>
  );
}

// ── Terminal window component ──

interface TerminalProps {
  title: string;
  children: React.ReactNode;
  connected: boolean;
  cycle: number;
}

export function TerminalWindow({ title, children, connected, cycle }: TerminalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new content appears
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [children]);

  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <span className="terminal-title">{title}</span>
        <span className={`terminal-status ${connected ? 'connected' : 'disconnected'}`}>
          {connected ? `Cycle #${cycle}` : 'Disconnected'}
        </span>
      </div>
      <div className="terminal-body" ref={scrollRef}>
        {children}
      </div>
    </div>
  );
}

// ── Exported feed components ──

export function AlertFeed({ alerts, connected, cycle }: { alerts: Alert[]; connected: boolean; cycle: number }) {
  return (
    <TerminalWindow title="runefeed watch" connected={connected} cycle={cycle}>
      {alerts.length === 0 ? (
        <div className="terminal-line text-dim">Waiting for alerts...</div>
      ) : (
        alerts.map((alert, i) => <AlertLine key={`${alert.itemId}-${alert.timestamp}-${i}`} alert={alert} />)
      )}
    </TerminalWindow>
  );
}

export function PredictionFeed({ predictions, connected, cycle }: { predictions: Prediction[]; connected: boolean; cycle: number }) {
  return (
    <TerminalWindow title="runefeed watch --view predictions" connected={connected} cycle={cycle}>
      {predictions.length === 0 ? (
        <div className="terminal-line text-dim">Waiting for predictions...</div>
      ) : (
        predictions.map((pred, i) => <PredictionLine key={`${pred.itemId}-${pred.timestamp}-${i}`} prediction={pred} />)
      )}
    </TerminalWindow>
  );
}
