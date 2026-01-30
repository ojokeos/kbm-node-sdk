export class TenantAccountsClient {
    http;
    constructor(http) {
        this.http = http;
    }
    // GET routes
    exists(tenantId) {
        return this.http.request(`/api/v1/tenant_accounts/${tenantId}/exists`, { method: "GET" });
    }
    show(tenantId) {
        return this.http.request(`/api/v1/tenant_accounts/${tenantId}`, { method: "GET" });
    }
    wallet(tenantId) {
        return this.http.request(`/api/v1/tenant_accounts/${tenantId}/wallet`, { method: "GET" });
    }
    subscriptions(tenantId) {
        return this.http.request(`/api/v1/tenant_accounts/${tenantId}/subscriptions`, { method: "GET" });
    }
    subscription(tenantId, subscriptionId) {
        return this.http.request(`/api/v1/tenant_accounts/${tenantId}/subscriptions/${subscriptionId}`, { method: "GET" });
    }
    // PUT/POST routes
    updateWallet(tenantId, payload) {
        return this.http.request(`/api/v1/tenant_accounts/${tenantId}/wallet`, { method: "PUT", body: JSON.stringify(payload) });
    }
    updateSubscription(tenantId, subscriptionId, payload) {
        return this.http.request(`/api/v1/tenant_accounts/${tenantId}/subscriptions/${subscriptionId}`, { method: "PUT", body: JSON.stringify(payload) });
    }
    updatePlan(tenantId, subscriptionId, payload) {
        return this.http.request(`/api/v1/tenant_accounts/${tenantId}/subscriptions/${subscriptionId}/plan`, { method: "PUT", body: JSON.stringify(payload) });
    }
    updateEvent(tenantId, event) {
        return this.http.request(`/api/v1/tenant_accounts/${tenantId}/events`, { method: "PUT", body: JSON.stringify({ event }) });
    }
    validate(tenantId, payload = {}) {
        return this.http.request(`/api/v1/tenant_accounts/${tenantId}/validation`, { method: "POST", body: JSON.stringify(payload) });
    }
    // DELETE route (matches Rails route)
    deleteSubscription(tenantId, subscriptionId) {
        return this.http.request(`/api/v1/tenants/${tenantId}/subscriptions/${subscriptionId}`, { method: "DELETE" });
    }
}
