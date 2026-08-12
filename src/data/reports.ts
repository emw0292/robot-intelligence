import type { ReportItem } from "@/types";

export const dailyReport: ReportItem[] = [
  { label: "예산", title: "피지컬 AI 실증 예산 집행계획 확정", description: "하반기 5개 권역 실증거점의 장비·데이터 구축 일정이 구체화됐다.", importance: "A", metric: "5개 권역" },
  { label: "공고", title: "AI 팩토리 로봇 실증사업 접수 시작", description: "수요기업과 로봇 공급기업의 컨소시엄 참여가 필수다.", importance: "A", metric: "D-12" },
  { label: "조달", title: "공공시설 순찰로봇 시범구매 수요 확대", description: "공항·역사·산업단지 운영기관이 신규 수요기관으로 참여했다.", importance: "A", metric: "14개 기관" },
  { label: "표준", title: "이동로봇 안전 요구사항 개정안 공개", description: "혼재 공간 속도제어와 정지거리 평가가 강화됐다.", importance: "B" },
  { label: "인증", title: "협동로봇 표준 셀 신속인증 시범운영", description: "반복 설치되는 셀의 인증 소요기간 단축이 기대된다.", importance: "B" },
  { label: "기사", title: "휴머노이드 공급망 가격 경쟁 심화", description: "핵심부품 양산 투자 확대가 원가 하락으로 이어지고 있다.", importance: "C" },
];

export const weeklyReport: ReportItem[] = [
  { label: "신규 사업", title: "로봇 핵심부품 스케일업 공동투자 출범", description: "양산 설비와 해외 인증을 연결하는 민관 금융 구조가 마련됐다.", importance: "A", metric: "+3개 사업" },
  { label: "실증 시작", title: "조선 용접·검사 이동로봇 현장 배치", description: "고위험 작업의 안전성과 품질 균일화를 동시에 검증한다.", importance: "A", metric: "4개 조선소" },
  { label: "장비 구매", title: "공공 연구시설 로봇 테스트베드 장비 발주", description: "촉각센서와 이동로봇 시험장비 수요가 집중됐다.", importance: "B", metric: "42억 원" },
  { label: "기관 협약", title: "한·EU 제조로봇 데이터 상호운용 협력", description: "데이터스페이스 기반의 공동 참조모델 개발에 착수했다.", importance: "B" },
  { label: "기업 투자", title: "휴머노이드 액추에이터 생산라인 증설", description: "수율 개선과 모듈 표준화를 위한 투자가 확대됐다.", importance: "A", metric: "+28% CAPA" },
  { label: "표준·인증", title: "로봇 SW 품질평가 공공실증 적용", description: "회복성과 상호운용성이 핵심 도입지표로 부상했다.", importance: "B" },
];

export const monthlyInsights = [
  { title: "정책", value: "12", unit: "건", change: "+20%", note: "피지컬 AI·로봇 보안 정책 집중" },
  { title: "시장", value: "8", unit: "개 신호", change: "+14%", note: "휴머노이드 양산·AMR 통합관제 부상" },
  { title: "기술", value: "15", unit: "건", change: "+25%", note: "VLA·촉각센서·Sim-to-Real 확대" },
  { title: "R&D", value: "21", unit: "개 공고", change: "+11%", note: "실증·공공조달 연계 사업 증가" },
];
