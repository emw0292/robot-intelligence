# Robot Intelligence

로봇·AI 정책·산업·기술 동향을 통합 제공하는 전략기획용 Intelligence Dashboard입니다.

정책, 산업, 기술, R&D, 표준·인증 동향과 일간·주간·월간 리포트를 제공합니다. `/trends`와 `/trends/[id]`는 Supabase의 `public.trends` 테이블에서 공개 데이터를 조회합니다.

## 실행

```bash
npm install
npm run dev
```

`.env.example`을 참고해 `.env.local`에 다음 값을 설정해야 합니다.

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

개발 서버는 [http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

## 검증

```bash
npm run lint
npm run build
```

## 주요 구조

```text
src/
  app/          # App Router 페이지 및 라우트
  components/   # 공통 레이아웃, 카드, 필터, 대시보드 UI
  data/         # 샘플 동향, 리포트, R&D, 전략 신호
  types/        # 공통 TypeScript 타입
```

## 주요 라우트

- `/` — 통합 Intelligence Dashboard
- `/trends` — 검색·국가·분야·중요도 필터가 있는 전체 동향
- `/policy`, `/industry`, `/technology`, `/rnd`, `/standards`
- `/reports/daily`, `/reports/weekly`, `/reports/monthly`
- `/trends/[id]` — 동향 상세 분석

> 홈과 기타 분류·리포트 화면의 일부 정보는 서비스 구조 검증을 위한 샘플 데이터입니다.
