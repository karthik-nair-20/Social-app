import { useState, useEffect } from "react"
import Axios from "axios"
import { useDebounce } from "use-debounce";
import { useSetRecoilState } from "recoil";
import { searchBtn } from "@/store/atom";
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Link } from "react-router-dom";

export default function Search() {
  const [input, setInput] = useState('')
  const setSearchActive = useSetRecoilState(searchBtn)
  const [debouncedText] = useDebounce(input, 2000);
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchSearchResult() {
      try {
          const response = await Axios.post('search',{searchTerm: debouncedText})
          setPosts(response.data)
      }catch(e) {
        console.log("we have got a error")
      }
    }
    fetchSearchResult()
  },[debouncedText])

  function handleClick() {
    setSearchActive(false)
  }

  return (
    <div className="fixed inset-0 flex items-start justify-center pt-16 bg-gray-900 bg-opacity-50 backdrop-blur-sm z-50">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="relative flex items-center">
            <div className="grid place-items-center h-full text-gray-300 pr-2" onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            </div>
              <Input
                className="w-full pl-5 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                placeholder="Search something..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
          </div>
          {posts.length > 0 && (
            <ScrollArea className="h-72 mt-4">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  to={`/post/${post._id}`}
                  onClick={handleClick}
                  className="flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors"
                >
                  <img
                    className="w-8 h-8 rounded-full mr-3"
                    src={post.author.avatar}
                    alt={`${post.title} avatar`}
                  />
                  <div className="text-sm font-medium text-white">{post.title}</div>
                </Link>
              ))}
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>

  )
}