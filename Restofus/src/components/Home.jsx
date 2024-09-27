import Axios from "axios"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { userAtom } from "@/store/atom"
import Post from "./Post"

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
    return "loading..."
  }

  return (
    <>
      {feed.length > 0 && (
        <>
        <h2 className="text-center mb-4">The Latest From Those You Follow</h2>
        <div className="list-group">
          {feed.map(post => {
            return <Post post={post} key={post._id} />
          })}
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