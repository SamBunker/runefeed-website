function Docs() {
  return (
    <div className="docs">
      <header className="docs-header">
        <h1>Documentation</h1>
        <p>
          Everything you need to know about RuneFeed. How to install, configure, and use the CLI client.
        </p>
      </header>

      {/* ── Installation ── */}
      <section className="docs-section">
        <h2>Installation</h2>
        <p>RuneFeed requires <strong>Node.js 18+</strong>. Install globally via npm:</p>
        <pre className="docs-code">$ npm install -g runefeed</pre>
        <p>This gives you the <code>runefeed</code> command globally.</p>
      </section>

      {/* ── Quick Start ── */}
      <section className="docs-section">
        <h2>Quick Start</h2>
        <pre className="docs-code">$ runefeed watch</pre>
        <p>
          On first run, you'll be prompted to choose a server:
        </p>
        <pre className="docs-code">{`  1)  RuneFeed Public Feed  (feed.runefeed.cc)
  2)  Local Server          (localhost:3900)
  3)  Custom Server         (enter host & port)`}</pre>
        <p>
          Your choice is saved to <code>~/.runefeed/config.json</code> so you only configure once.
          Run <code>runefeed setup</code> to change it later, or <code>runefeed logout</code> to reset.
        </p>
      </section>

      {/* ── Views ── */}
      <section className="docs-section">
        <h2>Views</h2>

        <h3>Alerts (default)</h3>
        <p>
          Volume spike alerts triggered when an item trades at <strong>10x+</strong> its normal volume.
        </p>
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

        <h3>Predictions</h3>
        <pre className="docs-code">$ runefeed watch --view predictions</pre>
        <p>Investment signals based on price momentum and volume acceleration.</p>
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

      {/* ── Flags ── */}
      <section className="docs-section">
        <h2>Flags</h2>
        <p>All filtering is client-side. The server sends everything, you control what you see.</p>
        <div className="docs-table">
          <div className="docs-table-row docs-table-header">
            <span>Flag</span>
            <span>Description</span>
          </div>
          <div className="docs-table-row">
            <code>--view predictions</code>
            <span>Switch to prediction feed</span>
          </div>
          <div className="docs-table-row">
            <code>--track "Dragon bones, Air rune"</code>
            <span>Track specific items (comma-separated)</span>
          </div>
          <div className="docs-table-row">
            <code>--min-spike 15</code>
            <span>Only show spikes &gt;= 15x average</span>
          </div>
          <div className="docs-table-row">
            <code>--min-price 1000</code>
            <span>Only show items worth &gt;= 1,000 gp</span>
          </div>
          <div className="docs-table-row">
            <code>--min-profit 200</code>
            <span>Only show predictions with flip &gt;= 200 gp/ea</span>
          </div>
          <div className="docs-table-row">
            <code>--resources</code>
            <span>Only show resource/skilling items</span>
          </div>
          <div className="docs-table-row">
            <code>--hide-resources</code>
            <span>Hide resource/skilling items</span>
          </div>
          <div className="docs-table-row">
            <code>--f2p</code>
            <span>Free-to-play items only</span>
          </div>
          <div className="docs-table-row">
            <code>--compact</code>
            <span>Minimal output</span>
          </div>
          <div className="docs-table-row">
            <code>--no-tax</code>
            <span>Hide tax/spread columns</span>
          </div>
          <div className="docs-table-row">
            <code>--type sell-off</code>
            <span>Filter by alert type</span>
          </div>
          <div className="docs-table-row">
            <code>--tls</code>
            <span>Force encrypted connection</span>
          </div>
        </div>
      </section>

      {/* ── Examples ── */}
      <section className="docs-section">
        <h2>Examples</h2>
        <p>Flags can be combined freely:</p>
        <pre className="docs-code">{`$ runefeed watch --view predictions --min-profit 200 --resources
$ runefeed watch --track "Dragon bones, Yew logs" --compact
$ runefeed watch --f2p --min-spike 20`}</pre>
      </section>

      {/* ── Commands ── */}
      <section className="docs-section">
        <h2>Commands</h2>
        <div className="docs-table">
          <div className="docs-table-row docs-table-header">
            <span>Command</span>
            <span>Description</span>
          </div>
          <div className="docs-table-row">
            <code>runefeed watch</code>
            <span>Connect and stream live data</span>
          </div>
          <div className="docs-table-row">
            <code>runefeed serve</code>
            <span>Run your own server (local mode)</span>
          </div>
          <div className="docs-table-row">
            <code>runefeed config</code>
            <span>Show current server configuration</span>
          </div>
          <div className="docs-table-row">
            <code>runefeed setup</code>
            <span>Re-run the server setup prompt</span>
          </div>
          <div className="docs-table-row">
            <code>runefeed logout</code>
            <span>Clear saved server config</span>
          </div>
        </div>
      </section>

      {/* ── Self-Hosting ── */}
      <section className="docs-section">
        <h2>Self-Hosting</h2>
        <p>Want to run your own server? Clone the repo and go:</p>
        <pre className="docs-code">{`$ git clone https://github.com/SamBunker/runefeed.git
$ cd runefeed
$ npm install
$ npm run build
$ runefeed serve`}</pre>
        <p>
          Edit <code>config/default.json</code> to tune detection thresholds, polling intervals, and security limits.
          The server polls the OSRS Wiki API directly — no RuneFeed account or API key needed.
        </p>
      </section>

      {/* ── GE Tax ── */}
      <section className="docs-section">
        <h2>GE Tax</h2>
        <p>
          RuneFeed factors in the Grand Exchange tax when calculating flip profits.
          The GE tax is <strong>2%</strong> on sells, capped at <strong>5,000,000 gp</strong> per item.
          All profit estimates in the prediction feed are after-tax.
        </p>
      </section>

      {/* ── Data Source ── */}
      <section className="docs-section">
        <h2>Data Source</h2>
        <p>
          All market data comes from the{' '}
          <a href="https://oldschool.runescape.wiki/w/RuneScape:Real-time_Prices" target="_blank" rel="noopener">
            OSRS Wiki Real-Time Prices API
          </a>.
          RuneFeed polls <code>/5m</code> every 5 minutes and <code>/latest</code> every 60 seconds.
          This API is free, public, and maintained by the OSRS Wiki team.
        </p>
        <p>
          RuneFeed does not scrape, reverse-engineer, or interact with any Jagex services directly.
          We only use the community-maintained Wiki API.
        </p>
      </section>

      {/* ── Feedback ── */}
      <section className="docs-section">
        <h2>Suggestions &amp; Feedback</h2>
        <p>
          Got any suggestions or features for RuneFeed? We'd love to hear them.
          Open an issue on GitHub or reach out on Discord.
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

export default Docs;
