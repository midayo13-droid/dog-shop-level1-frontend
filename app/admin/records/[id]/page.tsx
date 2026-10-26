"use client";

import { useParams } from "next/navigation";
import { RecordDetailView } from "@/components/record-views";

export default function AdminRecordDetailPage() {
  const params = useParams<{ id: string }>();
  return <RecordDetailView recordId={Number(params.id)} admin />;
}
