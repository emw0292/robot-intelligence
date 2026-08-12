export function SearchBar({ defaultValue = "" }: { defaultValue?: string }) {
  return (
    <form className="search-bar" action="/trends" role="search">
      <label htmlFor="global-search" className="sr-only">정책, 기업, 기술 통합 검색</label>
      <span className="search-symbol" aria-hidden="true">⌕</span>
      <input
        id="global-search"
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder="정책, 기업, 기술, 국가, 기관, 키워드 검색"
      />
      <button type="submit">검색</button>
    </form>
  );
}
