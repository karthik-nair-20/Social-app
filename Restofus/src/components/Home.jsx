import Axios from "axios"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { userAtom } from "@/store/atom"
import Post from "./Post"
import Loading from "./Loading"
import { ScrollArea } from "@/components/ui/scroll-area"

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
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    )
  }

  return (
    <>
      {feed.length > 0 && (
        <>
          <div className="bg-dark p-6 rounded-lg shadow-lg">
            <h2 className="text-center mb-6  text-blue-custom text-3xl font-extrabold tracking-tight">
              The Latest From Those You Follow
            </h2>

            <ScrollArea className="pr-4 h-[60vh] scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-600 scrollbar-track-gray-300">
              <div className="space-y-6">
                {feed.map((post) => (
                  <div
                    key={post._id}
                    className="bg-slate-900 rounded-lg shadow-md"
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
          <div className="container max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-custom mb-4">
              Hello <strong className="text-blue-custom">{user.username}</strong>, your feed is empty.
            </h2>
            <p className="text-lg text-white leading-relaxed">
              Your feed displays the latest posts from the people you follow. If you don't have any friends to follow that's okay; you can use the Search feature in the top menu bar to find content written by people with similar interests and then follow them.
            </p>
          </div>
        </div>
      )}
    </>
  )
}