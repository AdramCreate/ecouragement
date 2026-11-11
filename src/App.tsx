import { useState, type CSSProperties } from "react";
import { affirmations } from "./affirmations";
import "./App.css";

type BlipStyle = CSSProperties & {
  "--size": string;
  "--fall-duration": string;
  "--fall-delay": string;
};

export default function App() {
  const [revealedBlips, setRevealedBlips] = useState<Set<number>>(
    () => new Set(),
  );

  function revealBlip(index: number) {
    setRevealedBlips((current) => new Set(current).add(index));
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="wordmark" aria-label="eCouragement">
          <span className="wordmark-mark" aria-hidden="true">
            e
          </span>
          <span>Couragement</span>
        </div>
        <div className="header-note">
          <span className="status-dot" aria-hidden="true" />
          A little lift for your day
        </div>
      </header>

      <main className="main-content">
        <section className="intro" aria-labelledby="page-title">
          <p className="eyebrow">A MOMENT JUST FOR YOU</p>
          <h1 id="page-title">
            You’ve got this.
            <br />
            <span>Let it find you.</span>
          </h1>
          <p className="intro-copy">
            Let a little positivity drift your way.
            <br />
            Tap any blip to open it.
          </p>
        </section>

        <section className="blip-field" aria-label="Ecouragement blips">
          {affirmations.map((affirmation, index) => {
            const isRevealed = revealedBlips.has(index);
            const duration = 24 + (index % 8) * 2;
            const style: BlipStyle = {
              left: `${2 + ((index * 37) % 94)}%`,
              "--size": `${50 + (index % 4) * 7}px`,
              "--fall-duration": `${duration}s`,
              "--fall-delay": `${-((index * 11) % duration)}s`,
            };

            return (
              <button
                className={`blip${isRevealed ? " is-revealed" : ""}`}
                key={affirmation}
                type="button"
                style={style}
                aria-label={
                  isRevealed
                    ? `Ecouragement: ${affirmation}`
                    : "Reveal an ecouragement"
                }
                onClick={() => revealBlip(index)}
              >
                {!isRevealed ? (
                  <span className="blip-sparkle" aria-hidden="true">
                    ✦
                  </span>
                ) : (
                  <span className="blip-message" role="status">
                    {affirmation}
                  </span>
                )}
              </button>
            );
          })}
        </section>
      </main>

      <footer className="page-footer">
        <span aria-hidden="true">✦</span> Made of good thoughts
      </footer>
    </div>
  );
}
