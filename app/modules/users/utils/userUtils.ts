import { CreateUserData, IUserEntity, UpdateUserData, UserRole, UserStatus } from "@/app/modules/users/types/IUserTypes"

export const getEmptyCreateUserData = (): CreateUserData => {
    const user: CreateUserData = {
        username: "",
        fullName: "",
        email: "",
        status: UserStatus.ACTIVE,
        role: UserRole.USER,
        bio: "",
        password: "",
    }
    return user;
}

export const getEmptyUpdateUserData = (): UpdateUserData => {
    const user: UpdateUserData = {
        username: "",
        fullName: "",
        email: "",
        status: UserStatus.ACTIVE,
        role: UserRole.USER,
        bio: "",
        id: "",
        avatar: null
    }
    return user;
}

export const parsedUpdateUserData = (user: IUserEntity): UpdateUserData => {
    const newUser: UpdateUserData = {
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        status: user.status,
        role: user.role,
        bio: user.bio,
        id: user.id,
        avatar: user.avatar
    }
    return newUser;
}