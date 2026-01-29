export type EventProperties = Record<string, unknown>;

export interface UpdateEventInput {
    transaction_id: string;
    external_subscription_id?: string;
    code: string;
    properties?: EventProperties;
}

export interface ValidateTenantInput {
    subscription_id?: string;
    event?: UpdateEventInput;
}

export interface WalletUpdateInput {
    amount: number;
    reason?: string;
}

export interface SubscriptionUpdateInput {
    status?: string;
    plan_code?: string;
}

export interface KBMResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
}

// types.ts
export type KBMSuccess<T> = {
    success: true;
    data: T;
};

export type KBMFailure = {
    success: false;
    status: number;
    error: string;
    details?: unknown;
};

export type KBMResult<T> = KBMSuccess<T> | KBMFailure;
