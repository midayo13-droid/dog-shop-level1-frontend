"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { RegisterForm } from "@/components/forms";
import { PageHead } from "@/components/ui";

export default function AdminGuardianNewPage() {
  const router = useRouter();
  return (
    <>
      <PageHead title="고객 등록" sub="고객(보호자) 한 분과 강아지를 함께 등록해요. * 표시는 꼭 적어 주세요.">
        <Link href="/admin/guardians" className="btn">
          ← 목록으로
        </Link>
      </PageHead>
      <RegisterForm
        onCancel={() => router.push("/admin/guardians")}
        onDone={(guardianId) => router.push(`/admin/guardians/${guardianId}`)}
      />
    </>
  );
}
