import { atom } from "recoil"

export const loggedIn = atom({
  key: 'loggedIn',
  default: Boolean(localStorage.getItem('AppToken')),
});

export const searchBtn = atom({
  key: 'searchBtn',
  default: false,
})

// i think i can use selector to make searchbtn false depending on conditons

export const userAtom = atom({
  key: 'userAtom',
  default: {
    token: localStorage.getItem('AppToken') || null,
    email:'',
    username:localStorage.getItem('username') || '',
  }
})

export const profileDataAtom = atom({
  key: 'profileDataAtom',
  default: {
    followActionLoading: false,
    startFollowingRequestCount: 0,
    stopFollowingRequestCount: 0,
    profileData: {
      profileUsername: "loading...",
      profileAvatar: "https://gravatar.com/avatar/placeholder?s=128",
      isFollowing: false,
      counts: { postCount: 0, followerCount: 0, followingCount: 0}
    }
  }
});

//Edit post for now
export const postAtom = atom({
  key: 'postAtom',
  default: {
    title: '',
    body: '',
  }
})

export const postSendingCountAtom = atom({
  key: 'postSendingCount',
  default: 0,
});

export const chatStateAtom = atom({
  key: 'chatStateAtom',
  default: {
    isChatOpen: false,
    unreadChatCount: 0,
  }
})