import { atom } from "recoil";

export type UserType = {
    userId: string | null,
    userEmail: string,
    userName: string,
}

export const userState = atom<UserType>({
    key: 'userState',
    default: {
        userId: null,
        userEmail: '',
        userName: ''
    }
})