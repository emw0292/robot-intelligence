import Link from "next/link";
import type { Trend } from "@/types";
import { CategoryBadge, CountryBadge, ImportanceBadge } from "@/components/ui/badges";

export function BriefCard({ trend, primary = false }: { trend: Trend; primary?: boolean }) {
  return (
    <article className={`brief-card ${primary ? "primary" : ""}`}>
      <div className="badge-row">
        <ImportanceBadge importance={trend.importance} />
        <CountryBadge country={trend.country} />
        <CategoryBadge category={trend.category} />
      </div>
      <p className="brief-kicker">WEEKLY BRIEF {primary ? "01" : ""}</p>
      <h3><Link href={`/trends/${trend.id}`}>{trend.title}</Link></h3>
      <p>{trend.summary}</p>
      <div className="brief-footer">
        <time>{trend.publishedAt}</time>
        <span>{trend.keywords.slice(0, 2).join(" · ")}</span>
      </div>
    </article>
  );
}
