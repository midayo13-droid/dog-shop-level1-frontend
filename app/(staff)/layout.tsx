import { Header } from "@/components/ui";

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header
        items={[
          { href: "/", label: "홈", exact: true },
          { href: "/dogs", label: "강아지" },
          { href: "/records", label: "미용 기록" },
          { href: "/notices", label: "공지사항" },
          { href: "/events", label: "이벤트" },
        ]}
      />
      <main className="container">{children}</main>
    </>
  );
}
