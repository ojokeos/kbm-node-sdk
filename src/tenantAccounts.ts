// tenantAccountsClient.ts
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

export class TenantAccountsClient {
    constructor(private readonly http: HttpClient) { }

    // GET routes
    exists(tenantId: string): Promise<KBMResult<boolean>> {
        return this.http.request(`/api/v1/tenant_accounts/${tenantId}/exists`, { method: "GET" });
    }

    show(tenantId: string) {
        return this.http.request(`/api/v1/tenant_accounts/${tenantId}`, { method: "GET" });
    }

    wallet(tenantId: string) {
        return this.http.request(`/api/v1/tenant_accounts/${tenantId}/wallet`, { method: "GET" });
    }

    subscriptions(tenantId: string) {
        return this.http.request(`/api/v1/tenant_accounts/${tenantId}/subscriptions`, { method: "GET" });
    }

    subscription(tenantId: string, subscriptionId: string) {
        return this.http.request(
            `/api/v1/tenant_accounts/${tenantId}/subscriptions/${subscriptionId}`,
            { method: "GET" }
        );
    }

    // PUT/POST routes
    updateWallet(tenantId: string, payload: WalletUpdateInput) {
        return this.http.request(
            `/api/v1/tenant_accounts/${tenantId}/wallet`,
            { method: "PUT", body: JSON.stringify(payload) }
        );
    }

    updateSubscription(tenantId: string, subscriptionId: string, payload: SubscriptionUpdateInput) {
        return this.http.request(
            `/api/v1/tenant_accounts/${tenantId}/subscriptions/${subscriptionId}`,
            { method: "PUT", body: JSON.stringify(payload) }
        );
    }

    updatePlan(tenantId: string, subscriptionId: string, payload: Record<string, unknown>) {
        return this.http.request(
            `/api/v1/tenant_accounts/${tenantId}/subscriptions/${subscriptionId}/plan`,
            { method: "PUT", body: JSON.stringify(payload) }
        );
    }

    updateEvent(tenantId: string, event: UpdateEventInput) {
        return this.http.request(
            `/api/v1/tenant_accounts/${tenantId}/events`,
            { method: "PUT", body: JSON.stringify({ event }) }
        );
    }

    validate(tenantId: string, payload: ValidateTenantInput = {}) {
        return this.http.request(
            `/api/v1/tenant_accounts/${tenantId}/validation`,
            { method: "POST", body: JSON.stringify(payload) }
        );
    }

    // DELETE route (matches Rails route)
    deleteSubscription(tenantId: string, subscriptionId: string) {
        return this.http.request(
            `/api/v1/tenants/${tenantId}/subscriptions/${subscriptionId}`,
            { method: "DELETE" }
        );
    }
}
