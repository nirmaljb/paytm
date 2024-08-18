import { atom } from "recoil";

const userInfo = atom({
    key: 'userInfoAtom',
    default: {},
})

const isUserLoggedIn = atom({
    key: 'isUserLoggedInAtom',
    default: false
})

export { userInfo, isUserLoggedIn};