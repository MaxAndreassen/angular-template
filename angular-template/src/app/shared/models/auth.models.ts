export class AuthenticationRequest {
    email: string;
    password: string;
}

export class SignUpRequest {
    password: string;
    passwordConfirm: string;
    username: string;
    email: string;
}

export interface SignUpLinkCheckResult {
    valid: boolean;
    email: string;
}

export class Email {
    email: string;
}

export class Username {
    username: string;
}

export class PasswordReset {
    newPassword: string;
    newPasswordConfirm: string;
    attemptUuid: string;
}

export class User {
    email: string;
    username: string;
    uuid: string;
}

export class AuthenticatedUser {
    username: string;
    email: string;
    uuid: string;
}

export class Role {
    guid: string;
    id: number;
    name: string;
    tag: string;
}

export class SecurityContext {
    authenticated = false;
    user: AuthenticatedUser;
}

export interface IAuthenticationResponse {
    token: string;
    email: string;
    username: string;
    uuid: string;
  }
