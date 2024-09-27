import { Link } from "react-router-dom"
import { loggedIn, searchBtn } from "@/store/atom"
import { useSetRecoilState } from "recoil"

export default function HeaderLoggedIn() {

  const setSearch = useSetRecoilState(searchBtn)
  const setSignin = useSetRecoilState(loggedIn)

  function handleLogout() {
    setSignin(false)
    localStorage.removeItem("AppToken")
    localStorage.removeItem("username")
    console.log("this is logout")
  }

  function handleSearch() {
    setSearch(true)
  }

  return (
    <div className="flex flex-row items-center space-x-4 my-3">
      <Link href="#" className="text-white" onClick={handleSearch}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </Link>
      <span className="relative text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
        </svg>
        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
      </span>
      <Link to={`/profile/${localStorage.getItem("username")}`} className="flex-shrink-0">
        <img
          className="w-8 h-8 rounded-full"
          src="https://gravatar.com/avatar/placeholder?s=128"
          alt="User Avatar"
        />
      </Link>
      <Link to="/create-post" className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600">
        Create Post
      </Link>
      <button
        className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
        onClick={handleLogout}
      >
        Sign Out
      </button>
    </div>
  )
}