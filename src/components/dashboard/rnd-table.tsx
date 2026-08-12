import { rndNotices } from "@/data/rnd";
import { ImportanceBadge } from "@/components/ui/badges";

export function RNDTable({ limit }: { limit?: number }) {
  const rows = limit ? rndNotices.slice(0, limit) : rndNotices;
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
    </div>
  );
}
