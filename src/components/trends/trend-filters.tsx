import Link from "next/link";
import { countries } from "@/data/trends";

const categoryOptions = [
  ["", "전체"], ["policy", "정책"], ["industry", "산업"],
  ["technology", "기술"], ["rnd", "R&D"], ["standards", "표준·인증"],
];

export function TrendFilters({
  values,
}: {
  values: { q?: string; country?: string; category?: string; importance?: string; period?: string };
}) {
  return (
    <form className="filter-panel" action="/trends">
      <div className="filter-group filter-search">
        <label htmlFor="filter-q">통합검색</label>
        <input id="filter-q" type="search" name="q" defaultValue={values.q} placeholder="제목·요약·기관·국가·키워드" />
      </div>
      <div className="filter-group">
        <label htmlFor="filter-country">국가</label>
        <select id="filter-country" name="country" defaultValue={values.country ?? ""}>
          <option value="">전체</option>
          {countries.map((country) => <option key={country}>{country}</option>)}
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="filter-category">분야</label>
        <select id="filter-category" name="category" defaultValue={values.category ?? ""}>
          {categoryOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="filter-importance">중요도</label>
        <select id="filter-importance" name="importance" defaultValue={values.importance ?? ""}>
          <option value="">전체</option>
          <option value="A">A</option><option value="B">B</option><option value="C">C</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="filter-period">기간</label>
        <select id="filter-period" name="period" defaultValue={values.period ?? ""}>
          <option value="">전체 기간</option>
          <option value="7">최근 7일</option>
          <option value="30">최근 30일</option>
          <option value="90">최근 90일</option>
        </select>
      </div>
      <div className="filter-actions"><button type="submit">필터 적용</button><Link href="/trends">초기화</Link></div>
    </form>
  );
}
