import HeaderLoggedOut from "./HeaderLoggedOut"
import HeaderLoggedIn from "./HeaderLoggedIn"
import { useRecoilState } from 'recoil';
import { loggedIn } from "@/store/atom";
import { useNavigate } from "react-router-dom";

export default function Header() {

  const[loggedin,setLoggedin] = useRecoilState(loggedIn)
  const navigate = useNavigate()

  function handleClick() {
    navigate('/')
  }

  return (
    <header className="bg-dark p-4 text-blue-custom border-b border-b-gray-700">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold" onClick={handleClick}>MyApp</h1>
          <div className="flex space-x-2">
          {loggedin ? <HeaderLoggedIn setLoggedin={setLoggedin} /> : <HeaderLoggedOut setLoggedin={setLoggedin} />}
          </div>
        </div>
      </header>
  )
}