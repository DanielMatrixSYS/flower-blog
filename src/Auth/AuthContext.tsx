import { createContext } from "react";
import { User } from "firebase/auth";

export type UserProfile = {
    email: string;
    isSiteAdmin?: boolean;
};

export type AuthContextProps = {
    user: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
};

export const AuthContext = createContext<AuthContextProps | null>(null);
