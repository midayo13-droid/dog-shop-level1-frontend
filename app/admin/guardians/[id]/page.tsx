"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { api, useFetch } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { DogForm, emptyDog } from "@/components/forms";
import { Alert, confirmDelete, PageHead, State } from "@/components/ui";

export default function AdminGuardianDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const router = useRouter();
  const { data, error, loading, reload } = useFetch<any>(`/guardians/${id}`);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  async function removeGuardian() {
    if (!confirmDelete(`"${data.name}" 고객을 삭제할까요?\n삭제하면 되돌릴 수 없어요.`)) return;
    try {
      await api(`/guardians/${id}`, { method: "DELETE" });
      router.push("/admin/guardians");
    } catch (e: any) {
      setMessage({ kind: "error", text: e.message });
    }
  }

  async function removeDog(dog: any) {
    if (
      !confirmDelete(
        `"${dog.name}" 강아지를 삭제할까요?\n이 강아지의 주의사항과 미용 기록도 함께 삭제되고, 되돌릴 수 없어요.`,
      )
    )
      return;
    try {
      await api(`/dogs/${dog.id}`, { method: "DELETE" });
      setMessage({ kind: "ok", text: "삭제했어요." });
      reload();
    } catch (e: any) {
      setMessage({ kind: "error", text: e.message });
    }
  }

  return (
    <>
      <PageHead title={data ? `${data.name} 고객` : "고객 상세"}>
        <Link href="/admin/guardians" className="btn">
          ← 목록으로
        </Link>
        {data && (
          <>
            <Link href={`/admin/guardians/${id}/edit`} className="btn">
              수정
            </Link>
            <button className="btn danger" onClick={removeGuardian}>
              삭제
            </button>
          </>
        )}
      </PageHead>
      {message && <Alert kind={message.kind}>{message.text}</Alert>}
      <State loading={loading} error={error} onRetry={reload}>
        {data && (
          <>
            <section className="card">
              <h2>고객(보호자) 정보</h2>
              <dl className="info">
                <dt>이름</dt>
                <dd>{data.name}</dd>
                <dt>휴대폰</dt>
                <dd>{data.phone}</dd>
                <dt>이메일</dt>
                <dd>{data.email}</dd>
                <dt>비상연락처</dt>
                <dd>{data.emergency_name ? `${data.emergency_name} ${data.emergency_phone ?? ""}` : "-"}</dd>
                <dt>하고 싶은 말</dt>
                <dd style={{ whiteSpace: "pre-wrap" }}>{data.message || "-"}</dd>
                <dt>등록일</dt>
                <dd>{formatDate(data.created_at)}</dd>
              </dl>
            </section>

            <section className="card">
              <div className="card-head">
                <h2>강아지 ({data.dogs.length}마리)</h2>
                {!adding && (
                  <button className="btn small admin" onClick={() => setAdding(true)}>
                    + 강아지 추가
                  </button>
                )}
              </div>
              {adding && (
                <div className="dog-block">
                  <h3>새 강아지</h3>
                  <DogForm
                    mode="add"
                    id={id}
                    initial={{ ...emptyDog }}
                    onCancel={() => setAdding(false)}
                    onDone={() => {
                      setAdding(false);
                      setMessage({ kind: "ok", text: "강아지를 추가했어요." });
                      reload();
                    }}
                  />
                </div>
              )}
              {data.dogs.length === 0 ? (
                <p className="empty">등록된 강아지가 없어요.</p>
              ) : (
                <ul className="list">
                  {data.dogs.map((d: any) => (
                    <li key={d.id}>
                      <div className="main">
                        <div className="title">
                          <Link className="link" href={`/dogs/${d.id}`}>
                            {d.name}
                          </Link>{" "}
                          <span className="badge">{d.breed}</span>
                        </div>
                        <div className="meta">
                          {d.gender} · {d.age}살 · {d.weight}kg · 생일 {formatDate(d.birthday)}
                        </div>
                      </div>
                      <div className="actions">
                        <Link className="btn small" href={`/admin/dogs/${d.id}/edit`}>
                          수정
                        </Link>
                        <button className="btn small danger" onClick={() => removeDog(d)}>
                          삭제
                        </button>
                      </div>
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
