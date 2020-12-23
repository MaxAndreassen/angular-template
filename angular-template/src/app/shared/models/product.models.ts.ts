export class ProductSummary {
    priceInPounds: number;
    name: string;
    description: string;
    uuid: string;
    creatorUserUuid: string;
}

export class ProductFileSummary {
    uuid: string;
    type: number;
    url: string;
    format: string;
}

export class ProductEditor {
    priceInPounds: string;
    name: string;
    description: string;
    uuid: string;
    userUuid: string;
    marketingMedia: any[] = [];
    existingMarketingMediaUuids: string[] = [];
    coverImage: any;
    existingCoverImageUuid: string;
    assetZip: any;
    existingAssetZipUuid: string;
}

export class ProductQueryRequest {
    ownerUserUuid?: string;
    creatorUserUuid?: string;
    searchTerm?: string;
    page?: number;
}

export class ProductFileQueryRequest {
    productUuid: string;
}
