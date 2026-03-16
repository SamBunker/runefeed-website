
function CLI() {
  return (
    <div className="docs">
      <header className="docs-header">
        <img src="/ultimate-strength.webp" alt="CLI" className="page-header-icon" />
        <h1 className="page-title">CLI</h1>
        <p>
          Run the feed locally in your terminal. Same data, full control over output.
        </p>
      </header>

      {/* ── Installation ── */}
      <section className="docs-section">
        <h2>Installation</h2>
        <p>Requires <strong>Node.js 18+</strong>. Install globally via npm:</p>
        <pre className="docs-code">$ npm install -g runefeed</pre>
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
          The server polls the OSRS Wiki API directly. No RuneFeed account or API key needed.
        </p>
      </section>
    </div>
  );
}

export default CLI;
