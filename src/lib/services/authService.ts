import { AuthFormData } from "@/types/AuthFormTypes";
import axiosInstance from '../axios';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  username: string;
  email: string;
}

const updateAuthState = (data: AuthResponse) => {
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  localStorage.setItem("tokenExpiry", data.expiresAt);
  localStorage.setItem("username", data.username);
  localStorage.setItem("email", data.email);
};

export const loginUser = async (data: { Email: string; Password: string }): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>('/api/auth/login', data);
    const result = response.data;
    updateAuthState(result);
    return result;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Login failed');
  }
};

export const registerUser = async (data: AuthFormData): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>('/api/auth/register', data);
    const result = response.data;
    updateAuthState(result);
    return result;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Registration failed');
  }
};

export const refreshToken = async (): Promise<AuthResponse> => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await axiosInstance.post<AuthResponse>('/api/auth/refresh-token', { refreshToken });
    const result = response.data;
    updateAuthState(result);
    return result;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Token refresh failed');
  }
};

export const logoutUser = () => {
  // Clear all auth-related data from localStorage
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("tokenExpiry");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  const expiry = localStorage.getItem("tokenExpiry");
  if (!token || !expiry) return false;
  
  return new Date(expiry) > new Date();
};

export const getAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {})
  };
};
