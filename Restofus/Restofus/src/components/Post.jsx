import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { dateFormatted } from "@/lib/utils"

export default function Post({ post }) {
  const formattedDateDisplay = dateFormatted(post.createdDate);
  const navigate = useNavigate()
  function handleClick() {
    navigate(`/post/${post._id}`)
  }
  return (
    <>
      <Card className="overflow-hidden border bg-dark rounded-lg ">
        <CardHeader className="flex flex-row items-center">
          <Avatar className="w-12 h-12 border rounded-full shadow-md">
            <AvatarImage src={post.author.avatar} alt="user avatar" />
            <AvatarFallback>{post.author.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="pl-2">
            <button 
            className="text-lg font-medium bg-clip-text text-transparent text-white capitalize"
            onClick={handleClick}
            >
              {post.author.username}
            </button>
            <p className="text-sm text-gray-400">{formattedDateDisplay}</p>
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