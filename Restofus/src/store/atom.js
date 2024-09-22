import { atom } from "recoil"

export const loggedIn = atom({
  key: 'loggedIn',
  default: false,
});

export const searchBtn = atom({
  key: 'searchBtn',
  default: false,
})

export const userAtom = atom({
  key: 'userAtom',
  default: {
    token: null,
    email:'',
    username: '',
  }
})

export const profileDataAtom = atom({
  key: 'profileDataAtom',
  default: {
    profileUsername: "...",
    profileAvatar: "https://gravatar.com/avatar/placeholder?s=128",
    isFollowing: false,
    counts: { postCount: 0, followerCount: 0, followingCount: 0 }
  }
});