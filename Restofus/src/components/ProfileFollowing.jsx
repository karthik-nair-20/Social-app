import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"


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
  }, [username])

  if (loading) {
    return "loading..."
  }

  return (
    <>
      {following.length > 0 &&
        following.map((follower, index) => {
          return (
            <Link key={index} to={`/profile/${follower.username}`} className="list-group-item list-group-item-action">
              <img className="avatar-tiny" src={follower.avatar} /> {follower.username}
            </Link>
          )
        })}
    </>
  )
}