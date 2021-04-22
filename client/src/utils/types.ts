export interface UserData {
    isVerified?: boolean;
    _id?: string;
    token?: string;
    id?: string;
    name: string;
    email: string;
    date?: string;
}

export const UserBasic: UserData = {
    name: '',
    email: '',
}