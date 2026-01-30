// http.ts
import { performance } from "perf_hooks";
export class HttpClient {
    baseUrl;
    apiKey;
    timeoutMs;
    constructor(baseUrl, apiKey, timeoutMs = 5000) {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
        this.timeoutMs = timeoutMs;
    }
    async request(path, options = {}) {
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
                data: body,
                status: res.status,
                latencyMs,
            };
        }
        catch (err) {
            const latencyMs = Math.round(performance.now() - start);
            return {
                success: false,
                status: 0,
                error: err?.name === "AbortError" ? "Request timed out" : err?.message || "Network error",
                details: err,
                latencyMs,
            };
        }
        finally {
            clearTimeout(timeout);
        }
    }
}
