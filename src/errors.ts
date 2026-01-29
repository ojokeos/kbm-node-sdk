export class KBMError extends Error {
    public readonly status: number;
    public readonly payload?: unknown;

    constructor(message: string, status: number, payload?: unknown) {
        super(message);
        this.name = "KBMError";
        this.status = status;
        this.payload = payload;
    }
}
