export class ProductSummary {
    priceInPounds: string;
    name: string;
    description: string;
    uuid: string;
}

export class ProductEditor {
    priceInPounds: string;
    name: string;
    description: string;
    uuid: string;
    userUuid: string;
}

export class ProductQueryRequest {
    ownerUserUuid: string;
    creatorUserUuid: string;
    searchTerm: string;
}
