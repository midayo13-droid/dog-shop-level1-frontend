"use client";

import { useParams } from "next/navigation";
import { RecordEditView } from "@/components/record-views";

export default function AdminRecordEditPage() {
  const params = useParams<{ id: string }>();
  return <RecordEditView recordId={Number(params.id)} />;
}
