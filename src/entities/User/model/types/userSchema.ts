export interface User {
    id: string;
    username: string;
}

export interface UserSchema {
    authData?: User;
    isLoginModalOpen: boolean;
    isLoading: boolean;
    error?: string;
    _initialized: boolean;
}

// api

export interface FetchUserResponse {
    success: boolean;
    user: User;
}

//
