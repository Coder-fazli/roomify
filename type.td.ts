interface AuthState {
    isSignedIn: boolean;
    username: string | null;
    userId: string | null;
}

type AuthContext = {
    refreshAuth: () => Promise<boolean>;
    signOut: () => Promise<boolean>;
    signIn: () => Promise<boolean>;
}