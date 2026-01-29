// http.ts
import { performance } from "perf_hooks";

export interface KBMResult<T> {
    success: boolean;
    data?: T;
    error?: string;
    status: number;
    details?: any;
    latencyMs?: number;
}

export class HttpClient {
    constructor(
        public baseUrl: string,
        public apiKey: string,
        private timeoutMs = 5000
    ) { }

    async request<T>(path: string, options: RequestInit = {}): Promise<KBMResult<T>> {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

        const url = `${this.baseUrl.replace(/\/$/, "")}${path}`;
        const start = performance.now();

        try {
            const res = await fetch(url, {
                ...options,
                signal: controller.signal,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`,
                    ...(options.headers || {}),
                },
            });

            const body = await res.json().catch(() => null);
            const latencyMs = Math.round(performance.now() - start);

            if (!res.ok) {
                return {
                    success: false,
                    status: res.status,
                    error: body?.error || body?.message || `Request failed with status ${res.status}`,
                    details: body,
                    latencyMs,
                };
            }

            return {
                success: true,
                data: body as T,
                status: res.status,
                latencyMs,
            };
        } catch (err: any) {
            const latencyMs = Math.round(performance.now() - start);
            return {
                success: false,
                status: 0,
                error: err?.name === "AbortError" ? "Request timed out" : err?.message || "Network error",
                details: err,
                latencyMs,
            };
        } finally {
            clearTimeout(timeout);
        }
    }
}
