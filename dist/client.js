import { HttpClient } from "./http.js";
import { TenantAccountsClient } from "./tenantAccounts.js";
export class KBMClient {
    tenantAccounts;
    constructor(options) {
        const http = new HttpClient(options.baseUrl, options.apiKey, options.timeoutMs);
        this.tenantAccounts = new TenantAccountsClient(http);
    }
}
