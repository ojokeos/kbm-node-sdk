import { TenantAccountsClient } from "./tenantAccounts.js";
interface KBMClientOptions {
    baseUrl: string;
    apiKey: string;
    timeoutMs?: number;
}
export declare class KBMClient {
    readonly tenantAccounts: TenantAccountsClient;
    constructor(options: KBMClientOptions);
}
export {};
