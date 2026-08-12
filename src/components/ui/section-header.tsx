import Link from "next/link";

export function SectionHeader({
  eyebrow,
  title,
  description,
  href,
  linkLabel = "전체 보기",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="section-header">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {href && <Link href={href}>{linkLabel} <span aria-hidden="true">→</span></Link>}
    </div>
  );
}
