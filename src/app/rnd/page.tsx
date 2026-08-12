import type { Metadata } from "next";
import { PageIntro, TopicLinks } from "@/components/pages/intelligence-page";
import { RNDTable } from "@/components/dashboard/rnd-table";
import { IntelligenceCollection } from "@/components/pages/intelligence-page";
import { getTrendsByCategory } from "@/data/trends";

export const metadata: Metadata = { title: "R&D · 사업공고" };

export default function RNDPage() {
  return <div className="shell page-shell"><PageIntro eyebrow="R&D OPPORTUNITY" title="R&D · 사업공고" description="정부 R&D, 과제공고, 조달, 실증사업의 일정과 전략적 연계 가능성을 확인합니다." stats={[{ label: "접수·예정", value: "8건" }, { label: "D-14 이내", value: "5건" }]} /><TopicLinks items={["전체", "정부 R&D", "사업공고", "과제공고", "조달", "실증사업"]} /><section className="section-block"><RNDTable /></section><IntelligenceCollection title="R&D 정책 및 프로그램 동향" description="국내외 연구개발 프로그램의 방향 변화를 함께 제공합니다." trends={getTrendsByCategory("rnd")} category="rnd" /></div>;
}
