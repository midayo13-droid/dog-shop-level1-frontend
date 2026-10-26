"use client";

import Link from "next/link";
import { useFetch } from "@/lib/api";
import { formatDate, formatPrice } from "@/lib/format";
import { Section, State } from "@/components/ui";

export default function StaffHome() {
  const { data, error, loading, reload } = useFetch<any>("/summary");
  return (
    <>
      <div className="hero">
        <div>
          <h1>오늘도 좋은 하루 되세요 🐾</h1>
          <p>새 손님이 오면 아래 버튼으로 바로 등록해 주세요.</p>
        </div>
        <Link href="/register" className="btn primary big">
          + 신규 등록하기
        </Link>
      </div>

      <State loading={loading} error={error} onRetry={reload}>
        {data && (
          <div className="grid">
            <Section title="강아지 목록" href="/dogs">
              {data.dogs.length === 0 ? (
                <p className="empty">등록된 강아지가 없어요.</p>
              ) : (
                <ul className="list">
                  {data.dogs.map((d: any) => (
                    <li key={d.id}>
                      <Link href={`/dogs/${d.id}`} className="row">
                        <div className="title">{d.name}</div>
                        <div className="meta">
                          {d.breed} · {d.gender} · {d.age}살 · 보호자 {d.guardian_name}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Section>

            <Section title="최근 미용 기록" href="/records">
              {data.records.length === 0 ? (
                <p className="empty">미용 기록이 아직 없어요.</p>
              ) : (
                <ul className="list">
                  {data.records.map((r: any) => (
                    <li key={r.id}>
                      <Link href={`/records/${r.id}`} className="row">
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

            <Section title="공지사항" href="/notices">
              {data.notices.length === 0 ? (
                <p className="empty">공지사항이 없어요.</p>
              ) : (
                <ul className="list">
                  {data.notices.map((n: any) => (
                    <li key={n.id}>
                      <Link href={`/notices/${n.id}`} className="row">
                        <div className="title">{n.title}</div>
                        <div className="meta">{formatDate(n.created_at)}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Section>

            <Section title="이벤트" href="/events">
              {data.events.length === 0 ? (
                <p className="empty">이벤트가 없어요.</p>
              ) : (
                <ul className="list">
                  {data.events.map((e: any) => (
                    <li key={e.id}>
                      <Link href={`/events/${e.id}`} className="row">
                        <div className="title">
                          {e.title} {e.ongoing && <span className="badge green">진행 중</span>}
                        </div>
                        <div className="meta">
                          {formatDate(e.start_date)} ~ {formatDate(e.end_date)}
                        </div>
                      </Link>
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
