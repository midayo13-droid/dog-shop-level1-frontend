"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

/** 서버가 알려 준 오류. errors 에는 칸별 안내 문구가 들어 있어요. */
export class ApiError extends Error {
  status: number;
  errors: Record<string, string>;
  constructor(message: string, status = 0, errors: Record<string, string> = {}) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

export async function api<T = unknown>(
  path: string,
  options: { method?: string; body?: unknown } = {},
): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method: options.method ?? "GET",
      headers: options.body ? { "Content-Type": "application/json" } : undefined,
      body: options.body ? JSON.stringify(options.body) : undefined,
      cache: "no-store",
    });
  } catch {
    throw new ApiError("서버에 연결할 수 없어요. 인터넷 연결을 확인하고 잠시 뒤 다시 해 주세요.");
  }
  const text = await res.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }
  if (!res.ok) {
    const message =
      typeof data?.message === "string" ? data.message : "문제가 생겼어요. 잠시 뒤 다시 해 주세요.";
    throw new ApiError(message, res.status, data?.errors ?? {});
  }
  return data as T;
}

/** 화면을 열 때 서버에서 목록·상세를 가져와요. */
export function useFetch<T>(path: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);
  const hasData = useRef(false);

  useEffect(() => {
    if (path === null) return;
    let ignore = false;
    // 이미 받은 내용이 있으면 화면을 비우지 않고 조용히 새로 불러와요.
    if (!hasData.current) setLoading(true);
    api<T>(path)
      .then((result) => {
        if (!ignore) {
          hasData.current = true;
          setData(result);
          setError(null);
        }
      })
      .catch((e: ApiError) => {
        if (!ignore) setError(e.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [path, tick]);

  const reload = useCallback(() => setTick((n) => n + 1), []);
  return { data, error, loading, reload };
}
