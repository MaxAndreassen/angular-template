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
