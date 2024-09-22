import { useState } from "react"
import Axios from "axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSetRecoilState, useRecoilValue } from "recoil"
import { userAtom } from "@/store/atom"

export default function HeaderLoggedOut({setLoggedin}) {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const setUserState = useSetRecoilState(userAtom)

  async function handleSubmit() {
    try {
      const response = await Axios.post("http://localhost:8080/login", {
        username,
        password
      })
      if(response.data)
      {
        setLoggedin(true)
        setUserState({
          token: response.data.token,
          username: response.data.username
        })
        localStorage.setItem("AppToken",response.data.token)
        localStorage.setItem("username",response.data.username)
      }
      else {
        console.log("Login failed: Invalid credentials");
      }
    }
    catch (e) {
      console.log("login failed")
    }
  }
  return (
          <div className="flex space-x-2">
            <Input type="text" placeholder="Username" className="w-40" onChange={(e) => setUsername(e.target.value)} />
            <Input type="password" placeholder="Password" className="w-40" onChange={(e) => setPassword(e.target.value)} />
            <Button variant="secondary" onClick={handleSubmit} >Sign In</Button>
          </div>
  )
}