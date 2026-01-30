export interface KBMResult<T> {
    success: boolean;
    data?: T;
    error?: string;
    status: number;
    details?: any;
    latencyMs?: number;
}
export declare class HttpClient {
    baseUrl: string;
    apiKey: string;
    private timeoutMs;
    constructor(baseUrl: string, apiKey: string, timeoutMs?: number);
    request<T>(path: string, options?: RequestInit): Promise<KBMResult<T>>;
}
