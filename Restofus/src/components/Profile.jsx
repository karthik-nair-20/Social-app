import { Routes, Route, useParams, NavLink } from "react-router-dom"
import { useEffect } from "react"
import Axios from "axios"
import Profilepost from "./Profilepost"
import { useRecoilState, useRecoilValue } from "recoil"
import { profileDataAtom, userAtom } from "@/store/atom"
import ProfileFollowers from "./ProfileFollowers"
import ProfileFollowing from "./ProfileFollowing"
export default function Profile() {


  const { username } = useParams()
  const user = useRecoilValue(userAtom)
  const [userProfileData, setUserProfileData] = useRecoilState(profileDataAtom)

  useEffect(() => {
    // cleanup
    const ourRequest = Axios.CancelToken.source()
    async function fetchData() {
      try {
        const response = await Axios.post(`profile/${username}`, { token: user.token }, { cancelToken: ourRequest.token })
        if (response.data) {
          setUserProfileData((prev) => ({
            ...prev,
            profileData: response.data
          }))
        }
      }
      catch (e) {
        if (Axios.isCancel(e)) {
          console.log("Request canceled", e.message);
        }
        else {
          console.log("there was a problem")
        }
      }
    }
    fetchData();
    return () => {
      ourRequest.cancel("Operation canceled by the user.")
    }
  }, [username])


  useEffect(() => {
    if (userProfileData.stopFollowingRequestCount) {
      setUserProfileData((prev) => ({ ...prev, followActionLoading: true }))
      const ourRequest = Axios.CancelToken.source()
      async function fetchData() {
        try {
          const response = await Axios.post(`removeFollow/${userProfileData.profileData.profileUsername}`, { token: user.token }, { cancelToken: ourRequest.token })
          setUserProfileData((prev) => ({
            ...prev,
            profileData: {
              ...prev.profileData,
              isFollowing: false,
              counts: {
                ...prev.profileData.counts,
                followerCount: prev.profileData.counts.followerCount - 1
              }
            },
            followActionLoading: false
          }))

        } catch (e) {
          console.log("There was a problem.")
        }
      }
      fetchData()
      return () => {
        ourRequest.cancel()
      }
    }

  }, [userProfileData.stopFollowingRequestCount])


  useEffect(() => {
    if (userProfileData.startFollowingRequestCount) {
      setUserProfileData((prev) => ({ ...prev, followActionLoading: true }))
      const ourRequest = Axios.CancelToken.source()
      async function fetchData() {
        try {
          const response = await Axios.post(`addFollow/${userProfileData.profileData.profileUsername}`, { token: user.token }, { cancelToken: ourRequest.token })
          setUserProfileData((prev) => ({
            ...prev,
            profileData: {
              ...prev.profileData,
              isFollowing: true,
              counts: {
                ...prev.profileData.counts,
                followerCount: prev.profileData.counts.followerCount + 1
              }
            },
            followActionLoading: false
          }))

        } catch (e) {
          console.log("There was a problem.")
        }
      }
      fetchData()
      return () => {
        ourRequest.cancel()
      }
    }

  }, [userProfileData.startFollowingRequestCount])

  function startFollowing() {
    setUserProfileData((prev) => ({
      ...prev,
      startFollowingRequestCount: prev.startFollowingRequestCount + 1
    }))
  }

  function stopFollowing() {
    setUserProfileData((prev) => ({
      ...prev,
      stopFollowingRequestCount: prev.stopFollowingRequestCount + 1
    }))
  }
  return (
    <>
      {userProfileData && userProfileData.profileData.counts && (
        <>
          <h2 className="flex items-center my-6">
            <img
              className="w-12 h-12 rounded-full mr-4 border-2 border-gray-700"
              src={userProfileData.profileData.profileAvatar}
              alt={`${userProfileData.profileData.profileUsername}'s avatar`}
            />
            <div className="flex items-center space-x-4">
              <span className="font-semibold text-xl text-white capitalize">
                {userProfileData.profileData.profileUsername}
              </span>
              <span className="text-gray-300 font-extralight">Edit</span>
              {userProfileData.profileData && !userProfileData.profileData.isFollowing && user.username != userProfileData.profileData.profileUsername &&
                userProfileData.profileData.profileUsername != "loading..." && (
                  <button onClick={startFollowing} disabled={userProfileData.followActionLoading} className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition duration-200">
                    Follow
                  </button>
                )}
              {userProfileData.profileData && userProfileData.profileData.isFollowing && user.username != userProfileData.profileData.profileUsername &&
                userProfileData.profileData.profileUsername != "loading..." && (
                  <button onClick={stopFollowing} disabled={userProfileData.followActionLoading} className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition duration-200">
                    Unfollow
                  </button>
                )}
            </div>
          </h2>
          <div className="flex space-x-4 border-b mb-4">
            <NavLink to="" end className={({ isActive }) =>
              isActive
                ? "pb-2 text-blue-600 font-semibold border-b-2 border-blue-600"
                : "pb-2 text-gray-300 hover:text-blue-600 transition"
            } >
              Posts {userProfileData?.profileData?.counts?.postCount}
            </NavLink>
            <NavLink to="followers" className={({ isActive }) =>
              isActive
                ? "pb-2 text-blue-600 font-semibold border-b-2 border-blue-600"
                : "pb-2 text-gray-300 hover:text-blue-600 transition"
            } >
              Followers {userProfileData?.profileData?.counts?.followerCount}
            </NavLink>
            <NavLink to="following" className={({ isActive }) =>
              isActive
                ? "pb-2 text-blue-600 font-semibold border-b-2 border-blue-600"
                : "pb-2 text-gray-300 hover:text-blue-600 transition"
            }>
              Following {userProfileData?.profileData?.counts?.followingCount}
            </NavLink>
          </div>
          {/* <Profilepost /> */}
          <Routes>
            <Route path='' element={<Profilepost />} />
            <Route path='followers' element={<ProfileFollowers />} />
            <Route path='following' element={<ProfileFollowing />} />
          </Routes>
        </>
      )}
    </>
  )

}