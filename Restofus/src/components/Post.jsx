import { Link, useNavigate } from "react-router-dom"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { HeartIcon, MessageCircleIcon, ShareIcon } from "lucide-react"

export default function Post({ post }) {
  const date = new Date(post.createdDate)
  const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  const navigate = useNavigate()
  return (
    <>
      <Card className="overflow-hidden bg-slate-900 text-blue-custom rounded-lg shadow-md border-none">
        <CardHeader className="flex flex-row items-center">
          <Avatar className="w-12 h-12 border rounded-full shadow-md">
            <AvatarImage src={post.author.avatar} alt={post.author.username} />
            <AvatarFallback>{post.author.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="pl-2">
            <h2 className="text-lg font-bold bg-clip-text text-transparent bg-cute-gradient">
              {post.author.username}
            </h2>
            <p className="text-sm text-gray-400">{dateFormatted}</p>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <h2 className="p-4 text-xl font-semibold text-white">{post.title}</h2>
          <p className="w-full p-4 text-gray-300">{post.body}</p>
        </CardContent>
      </Card>
    </>
  )
}