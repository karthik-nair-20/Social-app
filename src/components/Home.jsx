import Axios from "axios"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { userAtom } from "@/store/atom"
import Post from "./Post"
import Loading from "./Loading"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"
import { UserPlus } from "lucide-react"

export default function Home() {
  const [feed, setFeed] = useState([])
  const [loading, setLoading] = useState(true)
  const user = useRecoilValue(userAtom)


  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()
    async function fetchData() {
      try {
        const response = await Axios.post('/getHomeFeed', { token: user.token }, { cancelToken: ourRequest.token })
        console.log(response.data)
        setFeed(response.data)
        setLoading(false)
      } catch (e) {
        console.log("There was a problem")
      }
    }
    fetchData()
    return () => ourRequest.cancel()
  }, [])

  if (loading) {
    return (
      <div className="h-[60vh] flex justify-center items-center">
        <Loading />
      </div>
    )
  }

  return (
    <>
      {feed.length > 0 && (
        <>
          <div className="bg-dark p-6 rounded-lg shadow-lg">
            <h2 className="text-center mb-6  text-white text-3xl font-extrabold tracking-tight">
              The Latest From Those You Follow
            </h2>

            <ScrollArea className="pr-4 h-[60vh] scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-600 scrollbar-track-gray-300">
              <div className="space-y-6">
                {feed.map((post) => (
                  <div
                    key={post._id}
                    className="rounded-lg shadow-md border border-white"
                  >
                    <Post post={post} />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </>
      )}

      {feed.length == 0 && (
        <div className="flex items-center justify-center p-4">
          <div className="container max-w-2xl mx-auto text-center font-light">
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center p-8 shadow-xl max-w-md mx-auto mt-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <UserPlus className="w-24 h-24 text-blue-400 mb-6" />
                  </motion.div>
                  <h2 className="text-3xl text-white mb-4 text-center"><span className="text-blue-400 capitalize">{user.username}</span>, Your followings List is Empty</h2>
                  <p className="text-gray-300 font-thin text-center mb-6">
                    Start building your network by following interesting people and communities.
                  </p>
                </motion.div>
              </>
          </div>
        </div>
      )}
    </>
  )
}