import { signals } from "@/data/signals";

const directionLabel = { up: "상승", steady: "유지", watch: "관찰" } as const;

export function StrategicSignals() {
  return (
    <div className="signal-list">
      {signals.map((signal, index) => (
        <article className="signal-row" key={signal.keyword}>
          <span className="signal-rank">0{index + 1}</span>
          <div className="signal-copy">
            <div>
              <h3>{signal.keyword}</h3>
              <span className={`signal-direction ${signal.direction}`}>
                {signal.direction === "up" ? "↑".repeat(signal.intensity) : "→"} {directionLabel[signal.direction]}
              </span>
            </div>
            <p>{signal.description}</p>
          </div>
          <div className="signal-meter" aria-label={`신호 강도 ${signal.intensity}단계`}>
            {[1, 2, 3].map((value) => <i key={value} className={value <= signal.intensity ? "active" : ""} />)}
          </div>
        </article>
      ))}
    </div>
  );
}
