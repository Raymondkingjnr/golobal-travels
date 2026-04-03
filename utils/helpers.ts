import { AuthUser } from "@/api/auth-api";

const SESSION_KEY = "travles_token";
const SESSION_DURATION = 60 * 60 * 1000;
const LOGIN_USER = "login_user";

let sessionTimeout:number | null = null;


export const setLoggedInUser = (data: Omit<AuthUser, ""> | null) => {
    if (typeof window === "undefined") {
        return;
    }

    if (data === null) {
        localStorage.removeItem(LOGIN_USER);
    } else {
        localStorage.setItem(LOGIN_USER, JSON.stringify(data));
    }

};

export const GetLoggedInUser = () => {
    if (typeof window === "undefined") {
        return null;
    }

    const userString = localStorage.getItem(LOGIN_USER);
    if (!userString) {
        return null;
    }

    try {
        return JSON.parse(userString) as AuthUser;
    } catch {
        localStorage.removeItem(LOGIN_USER);
        return null;
    }
};

type StoredSession = {
    token: string;
    expiresAt: number;
};

const isBrowser = () => typeof window !== "undefined";

const clearExistingTimeout = () => {
    if (sessionTimeout) {
        clearTimeout(sessionTimeout);
        sessionTimeout = null;
    }
};

export const clearSessionStorage = () => {
    clearExistingTimeout();

    if (!isBrowser()) {
        return;
    }

    window.sessionStorage.removeItem(SESSION_KEY);
    window.localStorage.removeItem(LOGIN_USER);
};

export const getSessionStorage = () => {
    if (!isBrowser()) {
        return null;
    }

    const session = window.sessionStorage.getItem(SESSION_KEY);
    if (!session) {
        return null;
    }

    try {
        const parsedSession = JSON.parse(session) as StoredSession;

        if (parsedSession.expiresAt <= Date.now()) {
            clearSessionStorage();
            return null;
        }

        return parsedSession.token;
    } catch {
        clearSessionStorage();
        return null;
    }
};

export const setSessionStorage = (token: string) => {
    if (!isBrowser()) {
        return;
    }

    const payload: StoredSession = {
        token,
        expiresAt: Date.now() + SESSION_DURATION,
    };

    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(payload));
};

export const watchSessionExpiry = (onExpire: () => void) => {
    clearExistingTimeout();

    if (!isBrowser()) {
        return;
    }

    const session = window.sessionStorage.getItem(SESSION_KEY);
    if (!session) {
        return;
    }

    try {
        const parsedSession = JSON.parse(session) as StoredSession;
        const timeLeft = parsedSession.expiresAt - Date.now();

        if (timeLeft <= 0) {
            clearSessionStorage();
            onExpire();
            return;
        }

        sessionTimeout = window.setTimeout(() => {
            clearSessionStorage();
            onExpire();
        }, timeLeft);
    } catch {
        clearSessionStorage();
        onExpire();
    }
};
