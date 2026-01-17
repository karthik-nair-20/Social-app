import { useState } from "react"
import Axios from "axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSetRecoilState } from "recoil"
import { loggedIn, userAtom } from "@/store/atom"

export default function HeaderLoggedOut() {
  // use form and combine username and pwd into single useState.
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const setUserState = useSetRecoilState(userAtom)
  const setSignin = useSetRecoilState(loggedIn)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await Axios.post("login", {
        username,
        password
      })
      if(response.data)
      {
        setSignin(true)
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
      console.log("There was a problem.")
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