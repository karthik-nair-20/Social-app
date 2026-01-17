import { Link } from "react-router-dom"
import { chatStateAtom, loggedIn, searchBtn } from "@/store/atom"
import { useRecoilState, useSetRecoilState } from "recoil"

export default function HeaderLoggedIn() {

  const setSearch = useSetRecoilState(searchBtn)
  const setSignin = useSetRecoilState(loggedIn)
  const [appState, setAppState] = useRecoilState(chatStateAtom)


  function handleLogout() {
    setSignin(false)
    localStorage.removeItem("AppToken")
    localStorage.removeItem("username")
    console.log("this is logout")
  }

  function handleSearch() {
    setSearch(true)
  }

  function handleChat() {
    setAppState((prev) => ({
      ...prev,
      isChatOpen: !prev.isChatOpen
    }))
  }

  return (
    <div className="flex flex-row items-center justify-between space-x-4 my-3">
      {/* Notification Bell with Unread Count */}
      <span className="relative text-white hover:text-gray-300 p-3" onClick={handleChat} >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
        </svg>
        {/* Unread Message Count Badge */}
        {appState.unreadChatCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-red-600 text-white text-xs flex items-center justify-center rounded-full">
            {appState.unreadChatCount < 10 ? appState.unreadChatCount : "9+"}
          </span>
        )}
      </span>

      {/* User Profile Link */}
      <Link to={`/profile/${localStorage.getItem("username")}`} className="flex-shrink-0">
        <img
          className="w-8 h-8 rounded-full border border-gray-300"
          src="https://gravatar.com/avatar/placeholder?s=128"
          alt="User Avatar"
        />
      </Link>

      {/* Create Post Button */}
      <Link to="/create-post" className="px-3 py-1 bg-blue-900 text-white text-sm rounded hover:bg-blue-700 transition-colors">
        Create Post
      </Link>

      {/* Sign Out Button */}
      <button
        className="px-3 py-1 bg-gray-700 text-white text-sm rounded hover:bg-gray-600 transition-colors"
        onClick={handleLogout}
      >
        Sign Out
      </button>
    </div>

  )
}