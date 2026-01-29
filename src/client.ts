import { HttpClient } from "./http.js";
import { TenantAccountsClient } from "./tenantAccounts.js";

interface KBMClientOptions {
    baseUrl: string;
    apiKey: string;
    timeoutMs?: number;
}

export class KBMClient {
    public readonly tenantAccounts: TenantAccountsClient;

    constructor(options: KBMClientOptions) {
        const http = new HttpClient(
            options.baseUrl,
            options.apiKey,
            options.timeoutMs
        );

        this.tenantAccounts = new TenantAccountsClient(http);
    }
}
