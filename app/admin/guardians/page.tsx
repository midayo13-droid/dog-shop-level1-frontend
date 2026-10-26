"use client";

import Link from "next/link";
import { useState } from "react";
import { api, useFetch } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { Alert, confirmDelete, PageHead, SearchBar, State } from "@/components/ui";

export default function AdminGuardiansPage() {
  const [q, setQ] = useState("");
  const { data, error, loading, reload } = useFetch<any[]>(`/guardians?q=${encodeURIComponent(q)}`);
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  async function remove(g: any) {
    if (!confirmDelete(`"${g.name}" 고객을 삭제할까요?\n삭제하면 되돌릴 수 없어요.`)) return;
    try {
      await api(`/guardians/${g.id}`, { method: "DELETE" });
      setMessage({ kind: "ok", text: "삭제했어요." });
      reload();
    } catch (e: any) {
      // 강아지가 남아 있으면 서버가 쉬운 말로 이유를 알려 줘요.
      setMessage({ kind: "error", text: e.message });
    }
  }

  return (
    <>
      <PageHead title="고객 목록" sub="이름이나 휴대폰 번호로 찾을 수 있어요.">
        <Link href="/admin/guardians/new" className="btn admin">
          + 고객 등록
        </Link>
      </PageHead>
      {message && <Alert kind={message.kind}>{message.text}</Alert>}
      <SearchBar placeholder="이름 · 휴대폰 번호 검색" onSearch={setQ} />
      <section className="card">
        <State loading={loading} error={error} empty={data?.length === 0} emptyText="찾은 고객이 없어요." onRetry={reload}>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>휴대폰</th>
                  <th>이메일</th>
                  <th>강아지</th>
                  <th>등록일</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((g) => (
                  <tr key={g.id}>
                    <td>
                      <Link className="link" href={`/admin/guardians/${g.id}`}>
                        {g.name}
                      </Link>
                    </td>
                    <td>{g.phone}</td>
                    <td>{g.email}</td>
                    <td>{g.dog_count}마리</td>
                    <td>{formatDate(g.created_at)}</td>
                    <td>
                      <div className="actions">
                        <Link className="btn small" href={`/admin/guardians/${g.id}/edit`}>
                          수정
                        </Link>
                        <button className="btn small danger" onClick={() => remove(g)}>
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </State>
      </section>
    </>
  );
}
