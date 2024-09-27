import Axios from "axios"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

export default function Profilepost() {

  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const { username } = useParams()


  useEffect(() => {
    // cleanup
    const ourRequest = Axios.CancelToken.source()

    async function fetchData() {
      const response = await Axios.get(`profile/${username}/posts`,{cancelToken: ourRequest.token})
      if (response) {
        setLoading(false)
        setPosts(response.data)
      }
    }
    fetchData()
    return () => {
      ourRequest.cancel()
    }
  }, [])


  if (loading) {
    return "abellla...."
  }

  function displayPosts() {
    return posts.map((post) => {
      const date = new Date(post.createdDate)
      const dateFormatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} `
      return <Link
      to={`/post/${post._id}`}
      key={post._id}
      className="flex items-center p-4 bg-gray-900 rounded-lg shadow-md"
    >
      <img
        className="w-10 h-10 rounded-full mr-4 border-2 border-gray-200 dark:border-gray-700"
        src={post.author.avatar}
        alt="Author avatar"
      />
      <div className="flex-1">
        <strong className="text-base text-white block">
          {post.title}
        </strong>
        <span className="text-white text-sm">
          on {dateFormatted}
        </span>
      </div>
    </Link>    
    })
  }

  return (
    <div className="space-y-2">
      {displayPosts()}
    </div>
  )
}