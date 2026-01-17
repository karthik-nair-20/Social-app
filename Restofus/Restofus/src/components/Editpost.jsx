import Axios from "axios"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { AlertCircle, Send } from 'lucide-react'
import { useRecoilState, useRecoilValue } from "recoil"
import { userAtom } from "@/store/atom"
import { postAtom } from "@/store/atom"
import { postSendingCountAtom } from "@/store/atom"

export default function Editpost() {

  const [loading, setLoading] = useState(true)
  const [post, setPost] = useRecoilState(postAtom)
  const { title, body } = post;

  const { id } = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const user = useRecoilValue(userAtom)
  const [sendCount, setSendCount] = useRecoilState(postSendingCountAtom)

  const navigate = useNavigate()



  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()
    async function fetchPostById() {
      try {
        const response = await Axios.get(`post/${id}`, { cancelToken: ourRequest.token })
        if (response.data) {
          setLoading(false)
          setPost({
            title: response.data.title,
            body: response.data.body,
          });
          if (user.username !== response.data.author.username) {
            console.log("you dont have permisson to edit")
            // navigate to home with flashmsg
            navigate('/')
          }
        }
      } catch (e) {
        console.log("some error have occured in fetching the post data by id", e)
      }
    }
    fetchPostById()
    return () => ourRequest.cancel()
  }, [])


  useEffect(() => {
    if (sendCount > 0) {
      const ourRequest = Axios.CancelToken.source();
      async function savePost() {
        try {
          const response = await Axios.post(`post/${id}/edit`, {
            title: title,
            body: body,
            token: user.token
          }, { cancelToken: ourRequest.token })
          console.log("success")
        }
        catch (e) {
          console.log("error while makeing a post", e)
        }
      }
      savePost()
      return () => ourRequest.cancel();
    }
  }, [sendCount])

  if (loading) {
    return (
      <>loading...</>
    )
  }

  // Update the inputs
  function updatedInputs(e) {
    const { name, value } = e.target
    switch (name) {
      case "title":
        setPost((prev) => ({
          ...prev,
          title: value
        }))
        break;
      case "body":
        setPost((prev) => ({
          ...prev,
          body: value
        }))
        break;
      default:
        break;
    }
  }

  // run useEffect handle submit
  function handleSubmit(e) {
    e.preventDefault();
    setSendCount((prev) => prev + 1)
  }


  return (
    <div className="flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-screen max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Edit the Post</CardTitle>
            <CardDescription className="text-center">Update your thoughts with the world</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter your post title"
                  value={title}
                  className="w-full"
                  name="title"
                  onChange={updatedInputs}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Write your post content here..."
                  value={body}
                  name="body"
                  className="w-full min-h-[100px]"
                  onChange={updatedInputs}
                />
                <p className="text-sm text-muted-foreground text-right">
                  {/* {input.description.length}/500 characters */}
                </p>
              </div>
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm flex items-center gap-1"
                >
                  <AlertCircle size={16} />
                  {error}
                </motion.div>
              )}
            </form>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Submitting...
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Submit Post
                </motion.div>
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}