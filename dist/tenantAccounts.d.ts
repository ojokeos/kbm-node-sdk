import { HttpClient, KBMResult } from "./http.js";
export interface UpdateEventInput {
    transaction_id: string;
    external_subscription_id: string;
    code: string;
    properties: Record<string, any>;
}
export interface WalletUpdateInput {
    balance?: number;
    credit?: number;
}
export interface SubscriptionUpdateInput {
    plan?: string;
    status?: string;
}
export interface ValidateTenantInput {
    [key: string]: any;
}
export declare class TenantAccountsClient {
    private readonly http;
    constructor(http: HttpClient);
    exists(tenantId: string): Promise<KBMResult<boolean>>;
    show(tenantId: string): Promise<KBMResult<unknown>>;
    wallet(tenantId: string): Promise<KBMResult<unknown>>;
    subscriptions(tenantId: string): Promise<KBMResult<unknown>>;
    subscription(tenantId: string, subscriptionId: string): Promise<KBMResult<unknown>>;
    updateWallet(tenantId: string, payload: WalletUpdateInput): Promise<KBMResult<unknown>>;
    updateSubscription(tenantId: string, subscriptionId: string, payload: SubscriptionUpdateInput): Promise<KBMResult<unknown>>;
    updatePlan(tenantId: string, subscriptionId: string, payload: Record<string, unknown>): Promise<KBMResult<unknown>>;
    updateEvent(tenantId: string, event: UpdateEventInput): Promise<KBMResult<unknown>>;
    validate(tenantId: string, payload?: ValidateTenantInput): Promise<KBMResult<unknown>>;
    deleteSubscription(tenantId: string, subscriptionId: string): Promise<KBMResult<unknown>>;
}
