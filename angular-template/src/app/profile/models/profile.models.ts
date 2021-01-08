export class UserEditor {
    uuid: string;
    firstName: string;
    lastName: string;
    username: string;
    profileUrl: string;
    existingProfileUuid: string;
    profileImage: any;
    isAdmin: boolean;
    isEmailVerified: boolean;
}

export class SilentAccountResponse {
    uuid: string;
    email: string;
    alreadyOwnsProduct: boolean;
}

export class SilentAccountRequest {
    email: string;
    relatedProductUuid: string;
}
