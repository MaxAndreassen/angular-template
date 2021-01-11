export class AccountLink {
    url: string;
}

export class Account {
    id: string;
    detailsSubmitted: boolean;
    chargesEnabled: boolean;
    payoutsEnabled: boolean;
}

export class PaymentIntentSecret {
    thirdPartyId: string;
    secretKey: string;
}

export class AccountBalance {
    balance: number;
    pendingBalance: number;
    currency: string;
}

export class Transfer {
    amount: number;
    createdAt: Date;
    id: string;
}

export class PayOut {
    amount: number;
    createdAt: Date;
    id: string;
}
