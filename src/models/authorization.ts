export interface LoginRequest {
    email: string,
    password: string
}

export interface LoginResponse {
    email: number,
    id: string
    token: string
    userName: string
}

export interface Claim {
    claimType: string,
    claimValue: string
}