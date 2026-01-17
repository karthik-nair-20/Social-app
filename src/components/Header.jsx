import HeaderLoggedOut from "./HeaderLoggedOut"
import HeaderLoggedIn from "./HeaderLoggedIn"
import { useRecoilState } from 'recoil';
import { loggedIn } from "@/store/atom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Search from "./Search";

export default function Header() {

  const [signin,setSignin] = useRecoilState(loggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('AppToken');
    if (token) {
      setSignin(true);
    }
    else{
      setSignin(false);
    }
  },[setSignin])

  function handleClick() {
    navigate('/')
  }

  return (
    <header className="text-blue-600 border-b border-b-gray-700">
        <div className="container mx-auto my-4 flex justify-between items-center">
          <h1 className="text-2xl font-medium mx-2" onClick={handleClick}>Bluewave</h1>
          <div className="flex space-x-2">
          { signin && <Search />}
          {signin ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
          </div>
        </div>
      </header>
  )
}