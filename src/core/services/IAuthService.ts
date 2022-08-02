export interface IAuthorization {
    email: string,
    password: string, 
}

export interface IRegistration 
    extends IAuthorization {
    nick: string,
}

interface IUser {
    avatar: string,
    description: string,
    email: string,
    id: string,
    isActivated: boolean,
    nick: string,
    postsCount: number,
    subscribersCount: number,
    subscriptionsCount: number,
}

export interface AuthResponse {
    accessToken: string,
    refreshToken: string,
    user: IUser,
    message?: string,
    error?: any,
}