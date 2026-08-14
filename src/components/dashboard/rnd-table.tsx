import { rndNotices } from "@/data/rnd";
import { ImportanceBadge } from "@/components/ui/badges";
import type { RNDNotice } from "@/types";

export function RNDTable({ limit, notices = rndNotices }: { limit?: number; notices?: RNDNotice[] }) {
  const rows = limit ? notices.slice(0, limit) : notices;
  return (
    <div className="table-scroll">
      <table className="rnd-table">
        <thead><tr><th>중요도</th><th>기관</th><th>사업명</th><th>분야</th><th>마감일</th><th>상태</th></tr></thead>
        <tbody>
          {rows.map((notice) => (
            <tr key={notice.id}>
              <td><ImportanceBadge importance={notice.importance} /></td>
              <td>{notice.organization}</td>
              <td><strong>{notice.title}</strong><small>{notice.type}</small></td>
              <td>{notice.field}</td>
              <td><time>{notice.deadline}</time><strong className={notice.remainingDays <= 7 ? "deadline urgent" : "deadline"}>D-{notice.remainingDays}</strong></td>
              <td><span className={`status status-${notice.status}`}>{notice.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
      {!rows.length && <div className="empty-state compact-empty"><strong>해당 분류의 공고가 없습니다.</strong><p>다른 공고 유형을 선택해 주세요.</p></div>}
    </div>
  );
}
