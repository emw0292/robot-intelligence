import { categoryLabels } from "@/data/trends";
import type { Country, Importance, TrendCategory } from "@/types";

export function CategoryBadge({ category }: { category: TrendCategory }) {
  return <span className={`badge category-${category}`}>{categoryLabels[category]}</span>;
}

export function CountryBadge({ country }: { country: Country }) {
  return <span className="badge badge-country">{country}</span>;
}

export function ImportanceBadge({ importance }: { importance: Importance }) {
  return (
    <span className={`badge importance-${importance.toLowerCase()}`}>
      중요도 {importance}
    </span>
  );
}
