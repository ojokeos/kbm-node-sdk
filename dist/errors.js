export class KBMError extends Error {
    status;
    payload;
    constructor(message, status, payload) {
        super(message);
        this.name = "KBMError";
        this.status = status;
        this.payload = payload;
    }
}
