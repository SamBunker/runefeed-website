import { useState } from 'react';
import './HowItWorks.css';

interface Step {
  id: number;
  icon: string;
  title: string;
  description: string;
  richContent?: boolean;
}

const steps: Step[] = [
  {
    id: 1,
    icon: '🏛️',
    title: 'The Grand Exchange',
    description: '',
    richContent: true,
  },
  {
    id: 2,
    icon: '👁️',
    title: 'The Watcher',
    description:
      'RuneFeed polls the Wiki API every 5 minutes for volume data and every 60 seconds for latest prices. It builds a rolling 60-minute window of trade history, compares current activity against the average, and classifies what\'s happening: volume spikes, price momentum, dip opportunities, and cooling trends.',
  },
  {
    id: 3,
    icon: '📡',
    title: 'The Broadcast',
    description:
      'Everything RuneFeed detects is pushed out over WebSocket the moment it\'s ready. No refreshing, no polling on your end. Connect once and the data streams to you continuously.',
  },
  {
    id: 4,
    icon: '⚔️',
    title: 'Your Feed',
    description:
      'You control what you see. Track specific items, set minimum profit or spike thresholds, filter by F2P or members, focus on resources. Use the website with custom feed panels, or run it locally as a CLI. Same live data from the same server, your way.',
  },
];

function HowItWorks() {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const reveal = (id: number) => {
    if (!revealed.has(id)) {
      setRevealed((prev) => new Set(prev).add(id));
    }
  };

  const allRevealed = revealed.size === steps.length;

  return (
    <div className="hiw">
      <header className="hiw-hero">
        <img src="/ge-logo.png" alt="Grand Exchange" className="page-header-icon" />
        <h1 className="page-title">How It Works</h1>
        <p className="hiw-hero-sub">
          From the Grand Exchange to your screen in four steps.
        </p>
        <div className="hiw-quest-status">
          <span className={`hiw-quest-dot ${allRevealed ? 'complete' : ''}`} />
          <span>{revealed.size} / {steps.length} revealed</span>
        </div>
      </header>

      <div className="hiw-steps">
        {steps.map((step, index) => {
          const isRevealed = revealed.has(step.id);

          return (
            <div key={step.id} className="hiw-step-wrapper">
              {index > 0 && (
                <div className={`hiw-connector ${isRevealed ? 'lit' : ''}`} />
              )}

              <div
                className={`hiw-step ${isRevealed ? 'revealed' : ''}`}
                onClick={() => reveal(step.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && reveal(step.id)}
              >
                <div className="hiw-step-header">
                  <div className="hiw-step-number">
                    {isRevealed ? (
                      <span className="hiw-check">{'\u2714'}</span>
                    ) : (
                      <span>{step.id}</span>
                    )}
                  </div>
                  <div className="hiw-step-icon">{step.icon}</div>
                  <h3 className="hiw-step-title">{step.title}</h3>
                  {!isRevealed && (
                    <div className="hiw-step-chevron">{'\u25BC'}</div>
                  )}
                </div>

                <div className={`hiw-step-body ${isRevealed ? 'visible' : ''}`}>
                  {step.richContent ? (
                    <div className="hiw-step-rich">
                      <p>
                        The{' '}
                        <a href="https://oldschool.runescape.wiki/w/RuneScape:Real-time_Prices" target="_blank" rel="noopener">
                          OSRS Wiki
                        </a>
                        {' '}partnered with RuneLite to capture real-time Grand Exchange data. Every buy and sell price, trade volume, and timestamp is recorded through the RuneLite client plugin and exposed through three endpoints:
                      </p>
                      <div className="hiw-endpoints">
                        <span className="hiw-endpoint"><code>/latest</code> live prices</span>
                        <span className="hiw-endpoint"><code>/5m</code> 5-minute averages</span>
                        <span className="hiw-endpoint"><code>/1h</code> hourly averages</span>
                      </div>
                    </div>
                  ) : (
                    <p>{step.description}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {allRevealed && (
        <div className="hiw-finale">
          <img src="/wom_character.png" alt="Wise Old Man" className="hiw-finale-img" />
          <p>Now go make some gp.</p>
        </div>
      )}
    </div>
  );
}

export default HowItWorks;
