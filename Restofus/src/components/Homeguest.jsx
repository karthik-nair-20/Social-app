import Axios from "axios"
import {useState} from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Landing from "./Landing"


export default function Homeguest() {

  const[username, setUsername] = useState("")
  const[email,setEmail] = useState("")
  const[password, setPassword] = useState("")


  async function handleSubmit(e) {
    e.preventDefault()
    try {
     const response = await Axios.post("register",{
        username,
        email,
        password
      })
      if(response.data)
      {
        console.log(response.data)
      }
    }catch(e) {
      console.log("User login unsucessful")
    }
  }

  return (
    <div className="mx-8 my-2 flex flex-col md:flex-row gap-8 text-white pt-4">
        <div className="md:w-1/2">
          <div className="h-full">
            <Landing />
          </div>
        </div>

        <div className="md:w-1/2">
          <div className="text-card-foreground p-6 rounded-lg text-gray-300">
            <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="username">Username</Label>
                <Input id="username" type="text" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-600">Sign Up</Button>
            </form>
          </div>
        </div>
    </div>

  )
}