
function Support() {
  return (
    <div className="docs">
      <header className="docs-header">
        <img src="/support.webp" alt="Support" className="page-header-icon" />
        <h1 className="page-title">Support</h1>
        <p>
          Common questions, signal types, and how to get in touch.
        </p>
      </header>

      {/* ── Alert Types ── */}
      <section className="docs-section">
        <h2>Alert Types</h2>
        <p>Volume spike alerts triggered when an item trades well above its normal volume.</p>
        <div className="docs-list">
          <div className="docs-list-item">
            <span className="docs-label text-red">SELL-OFF</span>
            <span>70%+ of volume is instant-sells</span>
          </div>
          <div className="docs-list-item">
            <span className="docs-label text-green">BUY-IN</span>
            <span>70%+ of volume is instant-buys</span>
          </div>
          <div className="docs-list-item">
            <span className="docs-label text-yellow">SURGE</span>
            <span>High volume, mixed buy/sell direction</span>
          </div>
        </div>
      </section>

      {/* ── Prediction Types ── */}
      <section className="docs-section">
        <h2>Prediction Types</h2>
        <p>Investment signals based on price momentum and volume patterns.</p>
        <div className="docs-list">
          <div className="docs-list-item">
            <span className="docs-label text-green">MOMENTUM</span>
            <span>Price up 3%+ with 2x+ volume</span>
          </div>
          <div className="docs-list-item">
            <span className="docs-label text-cyan">BUY-WINDOW</span>
            <span>Price down 5%+ from average (potential dip buy)</span>
          </div>
          <div className="docs-list-item">
            <span className="docs-label text-magenta">COOLING</span>
            <span>Was spiking, now decelerating (sell signal)</span>
          </div>
          <div className="docs-list-item">
            <span className="docs-label text-dim">STABLE</span>
            <span>No movement (only shown for tracked items)</span>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="docs-section">
        <h2>FAQ</h2>

        <h3>Where does the data come from?</h3>
        <p>
          All market data comes from the{' '}
          <a href="https://oldschool.runescape.wiki/w/RuneScape:Real-time_Prices" target="_blank" rel="noopener">
            OSRS Wiki Real-Time Prices API
          </a>.
          The Wiki partnered with RuneLite to collect live Grand Exchange prices and volumes directly from the game client.
          RuneFeed does not scrape or interact with any Jagex services directly.
        </p>

        <h3>Do I need to install anything?</h3>
        <p>
          No. The website shows live data with no setup required. If you prefer a terminal, RuneFeed also has a{' '}
          <a href="/cli">CLI client</a> you can install via npm.
        </p>

        <h3>Is RuneFeed free?</h3>
        <p>
          Yes. RuneFeed is free and open source under the MIT license.
        </p>

        <h3>Can I self-host my own server?</h3>
        <p>
          Yes. Check the <a href="/cli">CLI page</a> for self-hosting instructions, or see the{' '}
          <a href="https://github.com/SamBunker/runefeed" target="_blank" rel="noopener">GitHub repo</a>.
        </p>
      </section>

      {/* ── Suggestions & Feedback ── */}
      <section className="docs-section">
        <h2>Suggestions &amp; Feedback</h2>
        <p>
          Got ideas or found a bug? Open an issue on GitHub or reach out on Discord.
        </p>
        <div className="docs-links">
          <a href="https://github.com/SamBunker/runefeed/issues" target="_blank" rel="noopener">
            Open an Issue
          </a>
          <a href="https://discord.com/" target="_blank" rel="noopener">
            Join the Discord
          </a>
        </div>
      </section>

      {/* ── Open Source ── */}
      <section className="docs-section">
        <h2>Open Source</h2>
        <p>
          RuneFeed is fully open source under the MIT license.
          The server, CLI client, and this website are all public on GitHub.
        </p>
        <div className="docs-links">
          <a href="https://github.com/SamBunker/runefeed" target="_blank" rel="noopener">
            Server + CLI (GitHub)
          </a>
          <a href="https://github.com/SamBunker/runefeed-website" target="_blank" rel="noopener">
            Website (GitHub)
          </a>
          <a href="https://www.npmjs.com/package/runefeed" target="_blank" rel="noopener">
            runefeed on npm
          </a>
        </div>
      </section>
    </div>
  );
}

export default Support;
