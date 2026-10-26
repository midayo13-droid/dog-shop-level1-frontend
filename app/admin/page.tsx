"use client";

import Link from "next/link";
import { useFetch } from "@/lib/api";
import { formatDate, formatPrice } from "@/lib/format";
import { Section, State } from "@/components/ui";

export default function AdminHome() {
  const { data, error, loading, reload } = useFetch<any>("/summary");
  return (
    <>
      <div className="hero admin-hero">
        <div>
          <h1>사장님 관리 화면</h1>
          <p>고객, 미용 기록, 관리사, 공지사항, 이벤트를 관리해요.</p>
        </div>
        <Link href="/admin/guardians/new" className="btn admin big">
          + 고객 등록
        </Link>
      </div>

      <State loading={loading} error={error} onRetry={reload}>
        {data && (
          <div className="grid">
            <Section title="고객 목록" href="/admin/guardians">
              {data.guardians.length === 0 ? (
                <p className="empty">등록된 고객이 없어요.</p>
              ) : (
                <ul className="list">
                  {data.guardians.map((g: any) => (
                    <li key={g.id}>
                      <Link href={`/admin/guardians/${g.id}`} className="row">
                        <div className="title">{g.name}</div>
                        <div className="meta">
                          {g.phone} · 강아지 {g.dog_count}마리
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Section>

            <Section title="최근 미용 기록" href="/admin/records">
              {data.records.length === 0 ? (
                <p className="empty">미용 기록이 아직 없어요.</p>
              ) : (
                <ul className="list">
                  {data.records.map((r: any) => (
                    <li key={r.id}>
                      <Link href={`/admin/records/${r.id}`} className="row">
                        <div className="title">
                          {r.dog_name} · {r.style}
                        </div>
                        <div className="meta">
                          {formatDate(r.groomed_at)} · {r.groomer_name} · {formatPrice(r.price)}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Section>

            <Section title="관리사 목록" href="/admin/groomers">
              {data.groomers.length === 0 ? (
                <p className="empty">등록된 관리사가 없어요.</p>
              ) : (
                <ul className="list">
                  {data.groomers.map((g: any) => (
                    <li key={g.id}>
                      <div className="title">{g.name}</div>
                      <span className={`badge ${g.status === "근무중" ? "green" : "gray"}`}>{g.status}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Section>

            <Section title="공지사항" href="/admin/notices">
              {data.notices.length === 0 ? (
                <p className="empty">공지사항이 없어요.</p>
              ) : (
                <ul className="list">
                  {data.notices.map((n: any) => (
                    <li key={n.id}>
                      <div className="title">{n.title}</div>
                      <div className="meta">{formatDate(n.created_at)}</div>
                    </li>
                  ))}
                </ul>
              )}
            </Section>

            <Section title="이벤트" href="/admin/events">
              {data.events.length === 0 ? (
                <p className="empty">이벤트가 없어요.</p>
              ) : (
                <ul className="list">
                  {data.events.map((e: any) => (
                    <li key={e.id}>
                      <div className="title">
                        {e.title} {e.ongoing && <span className="badge green">진행 중</span>}
                      </div>
                      <div className="meta">
                        {formatDate(e.start_date)} ~ {formatDate(e.end_date)}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Section>
          </div>
        )}
      </State>
    </>
  );
}
