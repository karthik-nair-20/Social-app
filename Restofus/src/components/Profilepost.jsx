import Axios from "axios"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Loading from "./Loading"
import { motion } from "framer-motion"
import { Image } from "lucide-react"
import { dateFormatted } from "@/lib/utils"


export default function Profilepost() {

  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const { username } = useParams()

  useEffect(() => {
    // cleanup
    const ourRequest = Axios.CancelToken.source()

    async function fetchData() {
      const response = await Axios.get(`profile/${username}/posts`, { cancelToken: ourRequest.token })
      if (response) {
        setLoading(false)
        setPosts(response.data)
      }
    }
    fetchData()
    return () => {
      ourRequest.cancel()
    }
  }, [posts])


  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    )
  }

  function displayPosts() {
    return posts.map((post) => {
      const formattedDateDisplay = dateFormatted(post.createdDate);
      return <Link
        to={`/post/${post._id}`}
        key={post._id}
        className="flex items-center p-4 border border-white rounded-lg shadow-md"
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
            {formattedDateDisplay}
          </span>
        </div>
      </Link>
    })
  }

  return (
    <div className="space-y-2">
      {displayPosts()}
      {/* 0 post */}
      {posts.length === 0 &&
        (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-xl max-w-md mx-auto mt-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
              >
                <Image className="w-24 h-24 text-blue-400 mb-6" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-4 text-center">Your Posts List is Empty</h2>
              <p className="text-gray-300 text-center mb-6">
                Start building your network by creating post.
              </p>
            </motion.div>
          </>
        )
      }
    </div>

  )
}