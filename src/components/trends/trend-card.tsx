import Link from "next/link";
import type { Trend } from "@/types";
import { CategoryBadge, CountryBadge, ImportanceBadge } from "@/components/ui/badges";

export function TrendCard({ trend, featured = false }: { trend: Trend; featured?: boolean }) {
  return (
    <article className={`trend-card ${featured ? "featured" : ""}`}>
      <h3><Link href={`/trends/${trend.id}`}>{trend.title}</Link></h3>
      <div className="badge-row">
        <ImportanceBadge importance={trend.importance} />
        <CountryBadge country={trend.country} />
        <CategoryBadge category={trend.category} />
      </div>
      <div className="trend-byline">
        <span>{trend.organization}</span><time>{trend.publishedAt}</time>
      </div>
      <p className="trend-summary">{trend.summary}</p>
      <div className="keyword-row">
        {trend.keywords.slice(0, 3).map((keyword) => <span key={keyword}>#{keyword}</span>)}
      </div>
    </article>
  );
}
