export class ProductVersionSummary {
    updatedAt: Date;
    priceInPounds: number;
    productUuid: string;
    name: string;
    description: string;
    uuid: string;
    creatorUserUuid: string;
    version: number;
    status: number;
    statusName: string;
    genre: string;
    category: string;
    genreUuid: string;
    categoryUuid: string;
    keyWords: string;
}

export class ProductSummary {
    priceInPounds: number;
    name: string;
    description: string;
    uuid: string;
    creatorUserUuid: string;
    creatorUserUsername: string;
    version: number;
    status: number;
    statusName: string;
    versionUuid: string;

    // local vars
    downloadFailed = false;
    downloadPercentage = 0;
    downloading = false;
}


export class ProductFileSummary {
    uuid: string;
    type: number;
    url: string;
    format: string;
}

export class ProductVersionEditor {
    priceInPounds: number;
    genreUuid: string;
    categoryUuid: string;
    keyWords: string;
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
    temporaryOwnerLinkUuid?: string;
    creatorUserUuid?: string;
    searchTerm?: string;
    page?: number;
    status?: number;
    minimumPrice?: number;
    maximumPrice?: number;
    genre?: string;
    category?: string;
    excludeUuid?: string;
}

export class ProductFileQueryRequest {
    productUuid: string;
}

export class ProductVersionSubmissionSummary {
    uuid: string;
    productVersionUuid: string;
    coverImageUrl: string;
    priceInPounds: number;
    name: string;
    creatorUserUuid: string;
    description: string;
}

export class ProductVersionSubmissionQueryParams {
    page: number;
    searchTerm?: string;
}

export class ProductVersionSubmissionEditor {
    uuid: string;
    productVersionUuid: string;
    reviewedByUserUuid: string;
    approved: boolean;
    reviewedAt: Date;
    rejectionComment: string;
}

export class AssetContent {
    fileName: string;
    fileSize: number;
    contents: AssetContent[] = [];

    // local var
    open = true;
    fileSizeFriendly: string;
}

export class AssetDownloadLink {
    uuid: string;
    transactionIdentifier: string;
}

export class ProductOwnerLink {
    uuid: string;
    createdAt: Date;
    expiresAt: Date;
    email: string;
}
