export class ProductVersionSummary {
    priceInPounds: number;
    name: string;
    description: string;
    uuid: string;
    creatorUserUuid: string;
    version: number;
    status: number;
    statusName: string;
}

export class ProductSummary {
    priceInPounds: number;
    name: string;
    description: string;
    uuid: string;
    creatorUserUuid: string;
    version: number;
    status: number;
    statusName: string;
    versionUuid: string;
}


export class ProductFileSummary {
    uuid: string;
    type: number;
    url: string;
    format: string;
}

export class ProductVersionEditor {
    priceInPounds: string;
    name: string;
    description: string;
    uuid: string;
    creatorUserUuid: string;
    marketingMedia: any[] = [];
    existingMarketingMediaUuids: string[] = [];
    coverImage: any;
    existingCoverImageUuid: string;
    assetZip: any;
    existingAssetZipUuid: string;
    version: number;
    status: number;
    statusName: string;
}

export class ProductOwnership {
    ownsProduct: boolean;
}

export class ProductQueryRequest {
    ownerUserUuid?: string;
    creatorUserUuid?: string;
    searchTerm?: string;
    page?: number;
    status?: number;
}

export class ProductFileQueryRequest {
    productUuid: string;
}
