export class ProductSummary {
    priceInPence: string;
    name: string;
    description: string;
    uuid: string;
}

export class ProductEditor {
    priceInPence: string;
    name: string;
    description: string;
    uuid: string;
}

export class ProductQueryRequest {
    ownerUserUuid: string;
    creatorUserUuid: string;
}
