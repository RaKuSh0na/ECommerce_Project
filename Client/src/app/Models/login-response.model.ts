// This interface matches the LoginResponseDto from your backend
export interface LoginResponse {
    userId: number;
    username: string;
    email: string;
    role: string;
    token: string;
}