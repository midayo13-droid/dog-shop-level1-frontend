"use client";

import { useParams } from "next/navigation";
import { useFetch } from "@/lib/api";
import { DogEditView } from "@/components/edit-views";

export default function AdminDogEditPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { data } = useFetch<any>(`/dogs/${id}`);
  // 저장하면 그 강아지의 보호자(고객 상세) 화면으로 돌아가요.
  return <DogEditView dogId={id} backHref={data ? `/admin/guardians/${data.guardian_id}` : "/admin/guardians"} />;
}
