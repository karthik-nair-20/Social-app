import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"


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
  }, [username])

  if (loading) {
    return "loading..."
  }

  return (
    <>
      {followers.length > 0 &&
        followers.map((follower, index) => {
          return (
            <Link key={index} to={`/profile/${follower.username}`} className="list-group-item list-group-item-action">
              <img className="avatar-tiny" src={follower.avatar} /> {follower.username}
            </Link>
          )
        })}
    </>
  )
}