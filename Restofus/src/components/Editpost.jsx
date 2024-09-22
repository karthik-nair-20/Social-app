import  Axios  from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { AlertCircle, Send } from 'lucide-react'
import { useRecoilValue } from "recoil"
import { userAtom } from "@/store/atom"

export default function Editpost() {

  const [loading, setLoading] = useState(true)
  const [input,setInput] = useState({
    title: '',
    description: ''
  })
  const {id} = useParams()
  const[isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const user = useRecoilValue(userAtom)


  useEffect(() => {

    const ourRequest = Axios.CancelToken.source()
    async function fetchPostById() {
      try {
        const response = await Axios.get(`http://localhost:8080/post/${id}`, {cancelToken: ourRequest.token})
        if(response)
        {
          setLoading(false)
          setInput({
            title: response.data.title,
            description: response.data.body
          });
        }
      }catch(e) {
        console.log("some error have occured in fetching the post data by id",e)
      }
    }
    fetchPostById()
    return () => {
      ourRequest.cancel()
    }
  },[id])

  if(loading)
  {
    return (
      <>loading...</>
    )
  }

  function updatedInputs(e) {
    const {name, value} = e.target
    switch(name) {
      case "title":
        setInput((prev) => ({
          ...prev,
          title: value
        }))       
        break;
      case "description":
        setInput((prev) => ({
          ...prev,
          description: value
        }))
        break;
      default:
        break;
    }
  }

  async function handleSubmit() {
    setIsSubmitting(false)
    try {
      const response = await Axios.post(`http://localhost:8080/post/${id}/edit`,{
        title:input.title,
        body: input.description,
        token: user?.token 
      })
      if(response.data == "Success")
        {
          console.log(response.data)
        }
        console.log("sucess")
    }
    catch(e) {
      console.log("error while makeing a post",e)
    }
    finally {
      setIsSubmitting(false);
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-4">
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
                value={input.title}
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
                value={input.description}
                name="description"
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