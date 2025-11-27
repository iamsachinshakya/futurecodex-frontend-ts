// src/interfaces/user.interface.ts

export enum UserRole {
    USER = "user",
    EDITOR = "editor",
    AUTHOR = "author",
    ADMIN = "admin",
}

export enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive"
}

export interface IUserEntity {
    id: string;
    username: string;
    email: string;
    password: string;
    fullName: string;
    avatar: string | null;
    bio: string;
    role: UserRole;
    isVerified: boolean;
    socialLinks: ISocialLinks,
    followers: string[];
    following: string[];
    refreshToken: string | null;
    preferences: IUserPreferences
    status: UserStatus,
    createdAt: Date;
    updatedAt: Date;
    lastLogin: Date | null;
}

export interface IUserPreferences {
    emailNotifications: boolean;
    marketingUpdates: boolean;
    twoFactorAuth: boolean;
}

export interface ISocialLinks {
    twitter: string | null;
    linkedin: string | null;
    github: string | null;
    website: string | null;
}

export interface RegisterData {
    fullName: string;
    email: string;
    username: string;
    password: string;
    agreeToTerms: boolean
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface UsersQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
}

export interface IChangePassword {
    oldPassword: string,
    newPassword: string
}

export interface CreateUserData {
    username: string;
    fullName: string;
    email: string;
    status: UserStatus;
    role: UserRole;
    bio: string;
    password: string
}

export interface UpdateUserData {
    id: string;
    username: string;
    fullName: string;
    email: string;
    status: UserStatus;
    role: UserRole;
    bio: string;
    avatar: string | null;
}

/*
*  Type Guard
*/
export function isUpdateUserData(data: any): data is UpdateUserData {
    return (
        typeof data === "object" &&
        data !== null &&
        typeof data.id === "string"
    );
}

export function isCreateUserData(data: any): data is CreateUserData {
    return (
        typeof data === "object" &&
        data !== null &&
        data.id === undefined
    );
}
