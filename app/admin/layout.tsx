import { Header } from "@/components/ui";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header
        admin
        items={[
          { href: "/admin", label: "관리 홈", exact: true },
          { href: "/admin/guardians", label: "고객" },
          { href: "/admin/records", label: "미용 기록" },
          { href: "/admin/groomers", label: "관리사" },
          { href: "/admin/notices", label: "공지사항" },
          { href: "/admin/events", label: "이벤트" },
        ]}
      />
      <main className="container">{children}</main>
    </>
  );
}
