import Link from "next/link";
import type { Trend } from "@/types";
import { CountryBadge, ImportanceBadge } from "@/components/ui/badges";

export function TrendListItem({ trend, compact = false }: { trend: Trend; compact?: boolean }) {
  return (
    <article className={`trend-list-item ${compact ? "compact" : ""}`}>
      <div className="list-badges">
        <CountryBadge country={trend.country} />
        <ImportanceBadge importance={trend.importance} />
      </div>
      <div className="list-main">
        <h3><Link href={`/trends/${trend.id}`}>{trend.title}</Link></h3>
        {!compact && <p>{trend.summary}</p>}
      </div>
      <time>{trend.publishedAt}</time>
    </article>
  );
}
