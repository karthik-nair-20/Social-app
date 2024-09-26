import Axios from "axios"
import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import { useRecoilValue } from "recoil"
import { userAtom } from "@/store/atom"

export default function ViewSinglePost() {

  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState()
  const { id } = useParams()
  const navigate = useNavigate()
  const user = useRecoilValue(userAtom)

  useEffect(() => {

    // cleanup
    const ourRequest = Axios.CancelToken.source()

    async function fetchPostById() {
      try {
        const response = await Axios.get(`http://localhost:8080/post/${id}`, { cancelToken: ourRequest.token })
        if (response) {
          setLoading(false)
          setPost(response.data)
        }
      } catch (e) {
        console.log("some error have occured in fetching the post data by id", e)
      }
    }
    fetchPostById()
    return () => {
      ourRequest.cancel()
    }
  }, [id])

  if (loading) {
    return (
      <>loading...</>
    )
  }

  async function handleDelete() {
    const ourRequest = Axios.CancelToken.source()
    try {
      const response = await Axios.delete(`http://localhost:8080/post/${id}`, { data: { token: user?.token } }, { cancelToken: ourRequest.token })

      if (response.data == "Success") {
        navigate(`/profile/${post.author.username}`)
      }
    } catch (e) {
      console.log("the delete didnot happened", e)
    }
    return () => {
      ourRequest.cancel()
    }
    // flash msg
  }

  return (
    <div className="container mx-auto px-6 py-8 text-white bg-gray-900 rounded-lg shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-3xl font-semibold mb-2 break-words">{post.title}</h2>
        <div className="flex space-x-4">
          <Link to={`/post/${post._id}/edit`} className="text-primary hover:text-blue-400" title="Edit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </Link>
          <button className="text-red-600 hover:text-red-400" title="Delete" onClick={handleDelete}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex items-center mb-6">
        <a href="#" className="mr-3">
          <img className="w-10 h-10 rounded-full" src={post.author.avatar} alt="Author avatar" />
        </a>
        <div className="text-sm">
          <p className="text-gray-400">Posted by <a href="#" className="text-white font-medium">{post.author.username}</a></p>
          <p className="text-gray-500">on {new Date(post.date).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <ReactMarkdown children={post.body} />
      </div>
    </div>
  )
}