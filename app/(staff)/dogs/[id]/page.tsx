"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { api, useFetch } from "@/lib/api";
import { formatDate, formatDateTime, formatPrice } from "@/lib/format";
import { NoteForm } from "@/components/forms";
import { Alert, confirmDelete, PageHead, State } from "@/components/ui";

export default function DogDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { data, error, loading, reload } = useFetch<any>(`/dogs/${id}`);
  const [problem, setProblem] = useState<string | null>(null);

  async function removeNote(noteId: number) {
    if (!confirmDelete("이 주의사항을 삭제할까요?\n삭제하면 되돌릴 수 없어요.")) return;
    setProblem(null);
    try {
      await api(`/notes/${noteId}`, { method: "DELETE" });
      reload();
    } catch (e: any) {
      setProblem(e.message);
    }
  }

  return (
    <>
      <PageHead title={data ? `${data.name} 상세` : "강아지 상세"}>
        <Link href="/dogs" className="btn">
          ← 목록으로
        </Link>
      </PageHead>
      {problem && <Alert kind="error">{problem}</Alert>}
      <State loading={loading} error={error} onRetry={reload}>
        {data && (
          <>
            <div className="grid">
              <section className="card">
                <div className="card-head">
                  <h2>강아지 정보</h2>
                  <Link href={`/dogs/${id}/edit`} className="btn small">
                    강아지 정보 수정
                  </Link>
                </div>
                <dl className="info">
                  <dt>이름</dt>
                  <dd>{data.name}</dd>
                  <dt>견종</dt>
                  <dd>{data.breed}</dd>
                  <dt>성별</dt>
                  <dd>{data.gender}</dd>
                  <dt>나이</dt>
                  <dd>{data.age}살</dd>
                  <dt>몸무게</dt>
                  <dd>{data.weight}kg</dd>
                  <dt>생일</dt>
                  <dd>{formatDate(data.birthday)}</dd>
                </dl>
              </section>

              <section className="card">
                <div className="card-head">
                  <h2>고객(보호자) 정보</h2>
                  <Link href={`/guardians/${data.guardian.id}/edit`} className="btn small">
                    고객 정보 수정
                  </Link>
                </div>
                <dl className="info">
                  <dt>이름</dt>
                  <dd>{data.guardian.name}</dd>
                  <dt>휴대폰</dt>
                  <dd>{data.guardian.phone}</dd>
                  <dt>이메일</dt>
                  <dd>{data.guardian.email}</dd>
                  <dt>비상연락처</dt>
                  <dd>
                    {data.guardian.emergency_name
                      ? `${data.guardian.emergency_name} ${data.guardian.emergency_phone ?? ""}`
                      : "-"}
                  </dd>
                  <dt>하고 싶은 말</dt>
                  <dd style={{ whiteSpace: "pre-wrap" }}>{data.guardian.message || "-"}</dd>
                </dl>
              </section>
            </div>

            <section className="card">
              <h2>주의사항 (날짜별)</h2>
              {data.notes.length === 0 ? (
                <p className="empty">등록된 주의사항이 없어요.</p>
              ) : (
                <ul className="timeline">
                  {data.notes.map((n: any) => (
                    <li key={n.id}>
                      <div>
                        <div className="when">{formatDateTime(n.created_at)}</div>
                        <div style={{ whiteSpace: "pre-wrap" }}>{n.content}</div>
                      </div>
                      <button className="btn small danger" onClick={() => removeNote(n.id)}>
                        삭제
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <NoteForm dogId={id} onDone={reload} />
            </section>

            <section className="card">
              <div className="card-head">
                <h2>미용 기록</h2>
                <Link href={`/records/new?dog_id=${id}`} className="btn small primary">
                  + 미용 기록 등록
                </Link>
              </div>
              {data.records.length === 0 ? (
                <p className="empty">미용 기록이 아직 없어요.</p>
              ) : (
                <ul className="list">
                  {data.records.map((r: any) => (
                    <li key={r.id}>
                      <Link href={`/records/${r.id}`} className="row">
                        <div className="title">
                          {formatDate(r.groomed_at)} · {r.style}
                        </div>
                        <div className="meta">
                          {r.groomer_name} · {formatPrice(r.price)}
                          {r.has_photo ? " · 사진 있음" : ""}
                          {r.memo ? ` · ${r.memo}` : ""}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </State>
    </>
  );
}
