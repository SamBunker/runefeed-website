const steps = [
  {
    number: 1,
    title: 'OSRS Wiki Real-Time Prices API',
    details: [
      'The OSRS Wiki provides a free API with real-time Grand Exchange prices.',
      'Endpoints: /latest (current prices), /5m (5-minute averages), /1h (hourly averages).',
      'Data includes buy/sell prices, volumes, and timestamps for every tradeable item.',
    ],
  },
  {
    number: 2,
    title: 'RuneFeed Server Polls the API',
    details: [
      'Every 5 minutes, the server fetches the latest /5m interval data.',
      'Every 60 seconds, it refreshes /latest for current prices.',
      'On startup, it backfills a rolling window (last 60 minutes of history).',
    ],
  },
  {
    number: 3,
    title: 'Rolling Window & Spike Detection',
    details: [
      'The server maintains a rolling window of the last 12 five-minute intervals.',
      'For each item, it compares current volume against the rolling average.',
      'If volume exceeds the threshold (default 10x average), it\u2019s flagged as a spike.',
      'Multi-timeframe detection: 5m, 10m, and 30m windows catch different patterns.',
      'Classification: SELL-OFF (>70% sells), BUY-IN (>70% buys), or SURGE (mixed).',
    ],
  },
  {
    number: 4,
    title: 'Prediction Engine',
    details: [
      'Compares current /5m prices against /1h averages.',
      'MOMENTUM: price up 3%+ with 2x+ volume (something is moving).',
      'BUY-WINDOW: price down 5%+ from average (potential dip buy).',
      'COOLING: was spiking but decelerating (sell signal).',
      'STABLE: no significant movement (only shown for tracked items).',
      'Includes GE tax calculations (2%, capped at 5M gp) in flip estimates.',
    ],
  },
  {
    number: 5,
    title: 'WebSocket Broadcast',
    details: [
      'Alerts and predictions are broadcast to all connected clients via WebSocket.',
      'Production: wss:// with TLS encryption, rate limiting, connection caps.',
      'Local: plain ws:// with relaxed security for personal use.',
      'Clients can subscribe to track specific items for STABLE predictions.',
    ],
  },
  {
    number: 6,
    title: 'CLI Client Receives & Filters',
    details: [
      'The runefeed watch command connects and streams data in real-time.',
      'All filtering is client-side: --f2p, --min-spike, --track, --min-profit, --resources.',
      'Two views: alerts (volume spikes) and predictions (investment signals).',
      'First-run setup saves your server choice to ~/.runefeed/config.json.',
    ],
  },
  {
    number: 7,
    title: 'Your Terminal',
    details: [
      'Color-coded output: red for sell-offs, green for buy-ins, yellow for surges.',
      'Shows volume, spike multiplier, average volume, prices, spreads, tax.',
      'Trending headline pins the hottest item at the top.',
      'Settings summary after each poll cycle so you know what you\u2019re filtering.',
    ],
  },
];

function HowItWorks() {
  return (
    <div className="how-it-works">
      <header className="hiw-header">
        <h1>How It Works</h1>
        <p>
          The RuneFeed pipeline, from raw API data to your terminal. Seven steps, top to bottom.
        </p>
      </header>

      <div className="timeline">
        {steps.map((step) => (
          <div className="timeline-step" key={step.number}>
            <div className="timeline-node">
              <span className="node-number">{step.number}</span>
            </div>
            <div className="timeline-card">
              <h3 className="timeline-title">{step.title}</h3>
              <ul className="timeline-details">
                {step.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <div className="timeline-end" />
      </div>
    </div>
  );
}

export default HowItWorks;
