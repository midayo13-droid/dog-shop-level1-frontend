"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** 위쪽 메뉴. 직원 화면과 관리 화면에서 같은 틀을 써요. */
export function Header({
  admin,
  items,
}: {
  admin?: boolean;
  items: { href: string; label: string; exact?: boolean }[];
}) {
  const pathname = usePathname();
  return (
    <header className={`header${admin ? " admin" : ""}`}>
      <div className="header-inner">
        <Link href={admin ? "/admin" : "/"} className="logo">
          🐶 몽실 미용실 {admin ? "· 관리" : ""}
        </Link>
        <nav className="nav">
          {items.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} className={active ? "active" : ""}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        {admin ? (
          <Link href="/" className="switch-link">
            직원 화면 &gt;
          </Link>
        ) : (
          <Link href="/admin" className="switch-link">
            사장님 화면 &gt;
          </Link>
        )}
      </div>
    </header>
  );
}

export function PageHead({
  title,
  sub,
  children,
}: {
  title: string;
  sub?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="page-head">
      <div>
        <h1>{title}</h1>
        {sub && <p className="sub">{sub}</p>}
      </div>
      {children && <div className="actions">{children}</div>}
    </div>
  );
}

/** 메인 화면의 목록 상자. "전체 보기" 바로가기가 붙어요. */
export function Section({
  title,
  href,
  children,
}: {
  title: string;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="card">
      <div className="card-head">
        <h2>{title}</h2>
        {href && (
          <Link href={href} className="link">
            전체 보기 ›
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

/** 불러오는 중 / 오류 / 비어 있음 을 한곳에서 보여 줘요. */
export function State({
  loading,
  error,
  empty,
  emptyText = "내용이 아직 없어요.",
  onRetry,
  children,
}: {
  loading: boolean;
  error: string | null;
  empty?: boolean;
  emptyText?: string;
  onRetry?: () => void;
  children: React.ReactNode;
}) {
  if (loading && !error) return <p className="empty">불러오는 중이에요...</p>;
  if (error)
    return (
      <div className="alert error">
        {error}{" "}
        {onRetry && (
          <button className="btn small" onClick={onRetry} type="button">
            다시 불러오기
          </button>
        )}
      </div>
    );
  if (empty) return <p className="empty">{emptyText}</p>;
  return <>{children}</>;
}

/** 검색칸: 입력을 멈추면 잠깐 뒤에 자동으로 찾아요. */
export function SearchBar({
  placeholder,
  onSearch,
}: {
  placeholder: string;
  onSearch: (q: string) => void;
}) {
  const [text, setText] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => onSearch(text.trim()), 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);
  return (
    <form
      className="searchbar"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(text.trim());
      }}
    >
      <input
        type="search"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        aria-label="검색"
      />
      {text && (
        <button type="button" className="btn" onClick={() => setText("")}>
          지우기
        </button>
      )}
    </form>
  );
}

/** 칸 하나: 이름표 + 입력 + 쉬운 말 안내 */
export function Field({
  label,
  required,
  error,
  hint,
  full,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`field${error ? " has-error" : ""}${full ? " full" : ""}`}>
      <label>
        {label}
        {required && <span className="req">*</span>}
      </label>
      {children}
      {hint && !error && <div className="hint">{hint}</div>}
      {error && <div className="error-text">⚠ {error}</div>}
    </div>
  );
}

export function Alert({ kind, children }: { kind: "error" | "ok"; children: React.ReactNode }) {
  return <div className={`alert ${kind}`}>{children}</div>;
}

/** 삭제 전에 알럿창으로 한 번 더 물어봐요. */
export function confirmDelete(message: string) {
  return window.confirm(message);
}
