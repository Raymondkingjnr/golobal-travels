import {clearSessionStorage, getSessionStorage, setLoggedInUser, setSessionStorage} from "@/utils/helpers";

export const baseUrl = "https://travels-endpoint.vercel.app";

export interface AuthUser{
    _id: string;
    name: string;
    email: string;
    isVerified?: boolean;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
        user: AuthUser;
    };
}


interface  UserRes {
    _id: string
    name: string
    email:string
    createdAt:string
    updatedAt:string
    isVerified: boolean,
}


interface CurrentUserResponse  {
    success: boolean;
    data: UserRes;
}

export interface SignUpParams {
    name: string;
    email: string;
    password: string;
}

export const login = async (email: string, password: string) => {
    const response = await fetch(`${baseUrl}/api/v1/auth/login`, {
        method: "PUT",
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

    let result: { success?: boolean; message?: string } | null ;

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

export const verifyEmail = async ( email: string, token:string) => {
    const res = await fetch(`${baseUrl}/api/v1/auth/verify-email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, token}),
    });

    const result = (await res.json()) as { success: boolean; message: string };

    if (!res.ok || !result.success) {
        throw new Error(result.message);
    }

    return result;
}

export const resendVerificationToken = async (email: string) => {
    const res = await fetch(`${baseUrl}/api/v1/auth/resend-verification-token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email}),
    });

    const result = (await res.json()) as { success: boolean; message: string };

    if (!res.ok || !result.success) {
        throw new Error(result.message);
    }

    return result;
}

export const forgotPassword = async (email: string) => {
    const res = await fetch(`${baseUrl}/api/v1/auth/forgot-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email}),
    });

    const result = (await res.json()) as { success: boolean; message: string };

    if (!res.ok || !result.success) {
        throw new Error(result.message);
    }

    return result;
}

export const passwordReset = async ( email: string, token: string, password: string) => {
    const res = await fetch(`${baseUrl}/api/v1/auth/password-reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, token, password}),
    });

    const result = (await res.json()) as { success: boolean; message: string };

    if (!res.ok || !result.success) {
        throw new Error(result.message);
    }
    return result;
}

export const updatePassword = async (currentPassword: string, newPassword: string) => {
    const token = getSessionStorage();
    if (!token) {
        throw new Error("No session token found");
    }
    const res = await fetch(`${baseUrl}/api/v1/auth/update-password`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({currentPassword, newPassword}),
    });

    const result = (await res.json()) as { success: boolean; message: string };

    if (!res.ok || !result.success) {
        throw new Error(result.message);
    }
    return result;
}
