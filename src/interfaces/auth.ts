export interface ILoginParams {
  identifier: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  provider: string;
}

export interface AuthResponse {
  user: User;
  jwt: string;
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface ForgotRequest {
  email: string;
}

export interface ResetRequest {
  code: string;
  password: string;
  passwordConfirmation: string;
}
