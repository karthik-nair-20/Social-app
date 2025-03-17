import Axios from "axios"
import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import { useRecoilValue } from "recoil"
import { userAtom } from "@/store/atom"
import Loading from "./Loading"
import { FilePenLine, Trash2 } from "lucide-react"
import { dateFormatted } from "@/lib/utils"

export default function ViewSinglePost() {

  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState()
  const { id } = useParams()
  const navigate = useNavigate()
  const user = useRecoilValue(userAtom)


  useEffect(() => {

    const ourRequest = Axios.CancelToken.source()

    async function fetchPostById() {
      try {
        const response = await Axios.get(`post/${id}`, { cancelToken: ourRequest.token })
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
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    )
  }

  async function handleDelete() {
    const ourRequest = Axios.CancelToken.source()
    try {
      const response = await Axios.delete(`post/${id}`, { data: { token: user?.token } }, { cancelToken: ourRequest.token })

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
    <>
      {
        post && (
          <div className="container h-[60vh] mx-auto px-6 py-8 text-white border border-white rounded-lg shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-3xl font-semibold mb-2 break-words">{post.title}</h2>
              <div className="flex space-x-4">
                <Link to={`/post/${post._id}/edit`} className="text-primary text-blue-300 hover:text-blue-400" title="Edit">
                  <FilePenLine />
                </Link>
                <button className="text-red-600 hover:text-red-700" title="Delete" onClick={handleDelete}>
                  <Trash2 />
                </button>
              </div>
            </div>

            <div className="flex items-center mb-6">
              <a href="#" className="mr-3">
                <img className="w-10 h-10 rounded-full" src={post.author.avatar} alt="Author avatar" />
              </a>
              <div className="text-sm">
                <p className="text-gray-300">Posted by <a href="#" className="font-medium capitalize text-blue-500">{post.author.username}</a></p>
                <p className="text-gray-300">{dateFormatted(post.createdDate)}</p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <ReactMarkdown children={post.body} />
            </div>
          </div>
        )
      }
    </>
  )
}