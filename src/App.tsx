import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AlertFeed, PredictionFeed, HighProfitFeed } from './Terminal';
import { RuneFeedProvider, useRuneFeedContext } from './RuneFeedContext';
import HowItWorks from './HowItWorks';
import Docs from './Docs';
import { CustomFeedsPage } from './feeds/CustomFeedsPage';
import { PopOutFeedPage } from './feeds/PopOutFeedPage';
import './App.css';

function HomePage() {
  const { alerts, predictions, connected, cycle, clients, nextPollIn } = useRuneFeedContext();

  return (
    <>
      {/* ── Hero ── */}
      <header className="hero">
        <h1 className="logo">
          <span className="logo-ge">Rune</span>Feed<span className="logo-cc">.cc</span>
        </h1>
        <p className="tagline">
          Real-time Grand Exchange volume feed for Old School RuneScape.
        </p>
        <p className="subtitle">
          Detect massive sell-offs, buy-ins, and price surges as they happen.
          <br />
          Filter by item, price, type, and more. All from your terminal.
        </p>
        <div className="status-bar">
          <span className={`status-dot ${connected ? 'live' : 'offline'}`} />
          <span>{connected ? 'LIVE' : 'OFFLINE'}</span>
          {connected && (
            <>
              <span className="separator">|</span>
              <span>Cycle #{cycle}</span>
              <span className="separator">|</span>
              <span>{clients} connected</span>
            </>
          )}
        </div>
      </header>

      {/* ── Live Alerts ── */}
      <section className="feed-section">
        <div className="section-header">
          <h2>Volume Spike Alerts</h2>
          <p className="section-desc">
            Items with 10x+ their normal trading volume. Updated every 5 minutes.
          </p>
        </div>
        <AlertFeed alerts={alerts} connected={connected} cycle={cycle} nextPollIn={nextPollIn} />
      </section>

      {/* ── Live Predictions ── */}
      <section className="feed-section">
        <div className="section-header">
          <h2>Prediction Feed</h2>
          <p className="section-desc">
            Investment signals based on price momentum, buy windows, and cooling trends.
          </p>
        </div>
        <PredictionFeed predictions={predictions} connected={connected} cycle={cycle} nextPollIn={nextPollIn} />
      </section>

      {/* ── High Profit Predictions ── */}
      <section className="feed-section">
        <div className="section-header">
          <h2>High Profit Flips</h2>
          <p className="section-desc">
            Predictions with 100+ gp/ea estimated profit after tax. The money-makers.
          </p>
        </div>
        <HighProfitFeed predictions={predictions} connected={connected} cycle={cycle} nextPollIn={nextPollIn} />
      </section>

      {/* ── Install ── */}
      <section className="install-section">
        <h2>Get Started</h2>
        <p>Install the CLI client and connect to the live feed:</p>
        <div className="code-block">
          <code><span className="text-dim">$</span> npm install -g runefeed</code>
        </div>
        <div className="code-block">
          <code><span className="text-dim">$</span> runefeed watch</code>
        </div>
        <p className="install-note">
          Filter what you want, how you want. The server sends everything, you control the feed.
        </p>

        <div className="flags-grid">
          <div className="flag">
            <code>--view predictions</code>
            <span>Investment signals</span>
          </div>
          <div className="flag">
            <code>--track "Dragon bones, Air rune"</code>
            <span>Track specific items</span>
          </div>
          <div className="flag">
            <code>--min-profit 200</code>
            <span>Filter by flip profit</span>
          </div>
          <div className="flag">
            <code>--resources</code>
            <span>Skilling items only</span>
          </div>
          <div className="flag">
            <code>--compact</code>
            <span>Minimal output</span>
          </div>
          <div className="flag">
            <code>--f2p</code>
            <span>Free-to-play only</span>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <p>
          RuneFeed is open source. Data from the{' '}
          <a href="https://oldschool.runescape.wiki/w/RuneScape:Real-time_Prices" target="_blank" rel="noopener">
            OSRS Wiki Real-Time Prices API
          </a>.
        </p>
      </footer>
    </>
  );
}

function App() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isPopout = location.pathname.includes('/popout');

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <RuneFeedProvider>
      {!isPopout && (
        <nav className="navbar">
          <div className="navbar-inner">
            <Link to="/" className="navbar-brand">
              <span className="logo-ge">Rune</span>Feed<span className="logo-cc">.cc</span>
            </Link>
            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
            <div className={`navbar-links ${menuOpen ? 'navbar-links--open' : ''}`}>
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                Home
              </Link>
              <Link to="/feeds" className={`nav-link ${location.pathname === '/feeds' ? 'active' : ''}`}>
                Custom Feeds
              </Link>
              <Link to="/how-it-works" className={`nav-link ${location.pathname === '/how-it-works' ? 'active' : ''}`}>
                How It Works
              </Link>
              <Link to="/docs" className={`nav-link ${location.pathname === '/docs' ? 'active' : ''}`}>
                Docs
              </Link>
              <a href="https://discord.com/" target="_blank" rel="noopener" className="nav-link nav-link-external">
                Support
              </a>
            </div>
          </div>
        </nav>
      )}
      <div className={isPopout ? '' : 'page'}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/feeds" element={<CustomFeedsPage />} />
          <Route path="/feeds/popout/:panelId" element={<PopOutFeedPage />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
      </div>
    </RuneFeedProvider>
  );
}

export default App;
