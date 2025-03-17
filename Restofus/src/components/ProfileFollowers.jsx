import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { UserPlus } from "lucide-react"
import Loading from "./Loading";

export default function ProfileFollowers() {

  const { username } = useParams();
  const [loading, setLoading] = useState(true)
  const [followers, setFollowers] = useState([])


  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()
    async function fetchData() {
      try {
        const response = await Axios.get(`/profile/${username}/followers`, { cancelToken: ourRequest.token })
        console.log(response.data)
        setFollowers(response.data)
        setLoading(false)
      } catch (e) {
        console.log("there was a problem.")
      }
    }
    fetchData()
    return () => ourRequest.cancel()
  }, [username, followers])

  if (loading) {
    return (
      <div className="flex justify-center items-center">
      <Loading />
      </div>
    )
  }

  return (
    <>
      {followers.length > 0 &&
        followers.map((follower, index) => {
          return (
            <Link key={index} to={`/profile/${follower.username}`} className="flex items-center mb-2 p-4 border border-white rounded-lg">
              <img className="w-10 h-10 rounded-full mr-4 border-2 border-gray-200 dark:border-gray-700" src={follower.avatar} /> 
              <strong className="text-base text-white block">
              {follower.username}
              </strong>
            </Link>
          )
        })
      }
      {followers.length === 0 &&
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
              <h2 className="text-3xl font-bold text-white mb-4 text-center">Your Followers List is Empty</h2>
              <p className="text-gray-300 text-center mb-6">
                Start building your network by creating Posts for people and communities.
              </p>
              {/* <Button
                variant="outline"
                size="lg"
                className="group relative overflow-hidden bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
              >
                <span className="relative z-10">Discover People to Follow</span>
                <span className="absolute inset-0 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Button> */}
            </motion.div>
          </>
        )
      }
    </>
  )
}