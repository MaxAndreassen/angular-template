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
}

export class Transfer {
    amount: number;
    createdAt: Date;
}
