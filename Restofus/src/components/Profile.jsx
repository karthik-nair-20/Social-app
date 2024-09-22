import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Axios from "axios"
import Profilepost from "./Profilepost"
import { useRecoilState, useRecoilValue } from "recoil"
import { profileDataAtom, userAtom } from "@/store/atom"
export default function Profile() {


  const { username } = useParams()
  const user = useRecoilValue(userAtom)
  const [profileData, setProfileData] = useRecoilState(profileDataAtom)

  useEffect(() => {
    // cleanup
    const ourRequest = Axios.CancelToken.source()
    async function fetchData() {
      try {
        const response = await Axios.post(`http://localhost:8080/profile/${username}`, { token: user?.token }, { cancelToken: ourRequest.token })
        if (response) {
          setProfileData(response.data)
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
  }, [])

  return (
    <>
      <h2 className="flex items-center my-6">
        <img
          className="w-12 h-12 rounded-full mr-4 border-2 border-gray-200 dark:border-gray-700"
          src={profileData.profileAvatar}
          alt={`${profileData.profileUsername}'s avatar`}
        />
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-xl text-white capitalize">
            {profileData.profileUsername}
          </span>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition duration-200">
            Follow <i className="fas fa-user-plus ml-2"></i>
          </button>
        </div>
      </h2>
      <div className="flex space-x-4 border-b mb-4">
        <a href="#" className="pb-2 text-blue-600 font-semibold border-b-2 border-blue-600">
          Posts {profileData.counts.postCount}
        </a>
        <a href="#" className="pb-2 text-gray-600 hover:text-blue-600 transition">
          Followers {profileData.counts.followerCount}
        </a>
        <a href="#" className="pb-2 text-gray-600 hover:text-blue-600 transition">
          Following {profileData.counts.followingCount}
        </a>
      </div>
      <Profilepost />
    </>
  )
}