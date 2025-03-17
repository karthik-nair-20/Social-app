import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { UserPlus } from "lucide-react"
import Loading from "./Loading";


export default function ProfileFollowing() {

  const { username } = useParams();
  const [loading, setLoading] = useState(true)
  const [following, setFollowing] = useState([])


  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()
    async function fetchData() {
      try {
        const response = await Axios.get(`/profile/${username}/following`, { cancelToken: ourRequest.token })
        console.log(response.data)
        setFollowing(response.data)
        setLoading(false)
      } catch (e) {
        console.log("there was a problem.")
      }
    }
    fetchData()
    return () => ourRequest.cancel()
  }, [username, following])

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    )
  }

  return (
    <>
      {following.length > 0 &&
        following.map((follow, index) => {
          return (
            <Link key={index} to={`/profile/${follow.username}`} className="flex items-center mb-2 p-4 border border-white rounded-lg shadow-md">
              <img className="w-10 h-10 rounded-full mr-4 border-2 border-gray-200 dark:border-gray-700" src={follow.avatar} />
              <strong className="text-base text-white block">
              {follow.username}
              </strong>
            </Link>
          )
        })
      }

      {following.length === 0 && 
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
              <UserPlus className="w-24 h-24 text-blue-400 mb-6" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Your Followings List is Empty</h2>
            <p className="text-gray-300 text-center mb-6">
              Start building your network by following interesting people and communities.
            </p>
          </motion.div>
        </>
        )
      }
    </>
  )
}