export declare class KBMError extends Error {
    readonly status: number;
    readonly payload?: unknown;
    constructor(message: string, status: number, payload?: unknown);
}
