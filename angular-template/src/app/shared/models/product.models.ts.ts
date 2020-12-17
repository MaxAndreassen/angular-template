export class ProductSummary {
    priceInPounds: number;
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
    marketingMedia: any[] = [];
    coverImage: any;
    assetZip: any;
}

export class ProductQueryRequest {
    ownerUserUuid: string;
    creatorUserUuid: string;
    searchTerm: string;
}
