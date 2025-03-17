import Axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { AlertCircle, Send } from 'lucide-react'
import { useRecoilValue } from "recoil";
import { userAtom } from "@/store/atom";

export default function Createpost() {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const[isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const user = useRecoilValue(userAtom)



  async function handleSubmit(e) {
    e.preventDefault()
    setIsSubmitting(false)
    if (title.trim() === '' || description.trim() === '') {
      setError('Please fill in all fields')
      setIsSubmitting(false)
      return
    }
    if(!user?.token)
    {
      setError("Please login to post")
    }
    try {
      const response = await Axios.post("create-post", {
        title,
        body: description,
        token: user?.token,
      })
      navigate(`/post/${response.data}`)
    }
    catch (e) {
      console.log("error while makeing a post")
    }
    setTitle('')
    setDescription('')
    setIsSubmitting(false)
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
            <CardTitle className="text-2xl font-bold text-center">Create a New Post</CardTitle>
            <CardDescription className="text-center">Share your thoughts with the world</CardDescription>
          </CardHeader>  
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter your post title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Write your post content here..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full min-h-[100px]"
                />
                <p className="text-sm text-muted-foreground text-right">
                  {description.length}/500 characters
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