import {clearSessionStorage, getSessionStorage, setLoggedInUser, setSessionStorage} from "@/utils/helpers";

export const baseUrl = "https://travels-endpoint.vercel.app";

export interface AuthUser{
    _id: string;
    name: string;
    email: string;
};

interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
        user: AuthUser;
    };
};


interface  UserRes {
    _id: string
    name: string
    email:string
    createdAt:string
    updatedAt:string
}


interface CurrentUserResponse  {
    success: boolean;
    data: UserRes;
};

export interface SignUpParams {
    name: string;
    email: string;
    password: string;
}

export const login = async (email: string, password: string) => {
    const response = await fetch(`${baseUrl}/api/v1/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });


    const result = (await response.json()) as AuthResponse;

    if (!response.ok || !result.success || !result.data?.token) {
        throw new Error(result.message || "Login failed");
    }

    setSessionStorage(result.data.token);
    setLoggedInUser(result.data.user)
    return result;
};

export const signUp = async (name: string, email: string, password: string):Promise<AuthResponse> => {
    const response = await fetch(`${baseUrl}/api/v1/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
    });

    const result = (await response.json()) as AuthResponse;

    if (!response.ok || !result.success || !result.data?.token) {
        throw new Error(result.message || "Sign up failed");
    }

    setSessionStorage(result.data.token);
    setLoggedInUser(result.data.user)
    return result;
};

export const getSingleUser = async (id: string) => {
    const token = getSessionStorage();

    if (!token) {
        return null;
    }

    const response = await fetch(`${baseUrl}/api/v1/users/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 401) {
        clearSessionStorage();
        return null;
    }

    const result = (await response.json()) as CurrentUserResponse;

    if (!response.ok || !result.success) {
        return null;
    }

    return result.data  ?? null;
};

export const logout = async () => {
    const response = await fetch(`${baseUrl}/api/v1/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    let result: { success?: boolean; message?: string } | null = null;

    try {
        result = (await response.json()) as { success?: boolean; message?: string };
    } catch {
        result = null;
    }

    if (!response.ok || result?.success === false) {
        throw new Error(result?.message || "Logout failed");
    }

    clearSessionStorage();
    return result;
}
