"use client";

import { useParams } from "next/navigation";
import { GuardianEditView } from "@/components/edit-views";

export default function AdminGuardianEditPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  return <GuardianEditView guardianId={id} backHref={`/admin/guardians/${id}`} />;
}
