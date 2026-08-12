# Robot Intelligence

로봇·AI 정책·산업·기술 동향을 통합 제공하는 전략기획용 Intelligence Dashboard입니다.

현재 v0.1은 40건의 샘플 데이터를 기반으로 정책, 산업, 기술, R&D, 표준·인증 동향과 일간·주간·월간 리포트를 제공합니다. 외부 API, 데이터베이스, 크롤링, 로그인 기능은 포함하지 않습니다.

## 실행

```bash
npm install
npm run dev
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

> 화면에 표시되는 정책·시장·기술 정보는 서비스 구조 검증을 위한 샘플 데이터입니다.
