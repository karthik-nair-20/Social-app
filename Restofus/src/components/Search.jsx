import { useState, useEffect, useCallback } from "react"
import Axios from "axios"
import { useDebounce } from "use-debounce";
import { toast } from 'sonner';
import { SearchIcon } from 'lucide-react';
import { ScrollArea } from "./ui/scroll-area";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

export default function Search() {
  const [state, setState] = useState({
    open: false,
    searchTerm: '',
    loading: false,
    posts: [],
  });
  const [debouncedText] = useDebounce(state.searchTerm, 300);
  const navigate = useNavigate();
  const fetchSearchResult = useCallback(async (term) => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const response = await Axios.post('search', { searchTerm: term })
      setState((prev) => ({ ...prev, posts: response.data, loading: false }))
    } catch (e) {
      toast.error('Something went wrong while searching for videos');
      setState((prev) => ({
        ...prev,
        searchTerm: '',
        loading: false,
      }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }))
    }
  }, [])

  useEffect(() => {
    if (debouncedText.trim().length > 2) {
      fetchSearchResult(debouncedText);
    } else {
      setState((prev) => ({
        ...prev,
        posts: [],
        loading: false,
      }));
    }
  }, [debouncedText, fetchSearchResult])

  function handleClick(id) {
    navigate(`/profile/${id}`)
  }
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setState((prev) => ({ ...prev, searchTerm: value }));
  };


  return (
    <>
      {state.loading == true && (
        <div className="mt-5">
          <Loading />
        </div>
      )}
      <div className="relative flex items-center">
        <SearchIcon
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          size={20}
        />
        <input
          type="text"
          placeholder="Search Anything"
          value={state.searchTerm}
          onChange={handleSearchChange}
          className="rounded-lg pl-10 pr-12 py-2 border border-gray-800 bg-gray-950 focus-visible:ring-gray-700 text-white"
          aria-label="Search"
        />
        {state.posts.length > 0 && (
          <div className="absolute top-16 left-0 w-ful bg-black border border-gray-700 rounded-lg shadow-lg z-50">
            <ScrollArea className="max-h-60">
              {state.posts.map((post) => (
                <div
                  key={post._id}
                  onClick={() => handleClick(post.author.username)}
                  className="flex items-center p-3 cursor-pointer hover:bg-gray-700 transition-colors"
                >
                  <img
                    className="w-8 h-8 rounded-full mr-3"
                    src={post.author.avatar}
                    alt={`${post.title} avatar`}
                  />
                  <div className="text-sm font-medium text-white">{post.title}</div>
                </div>
              ))}
            </ScrollArea>
          </div>
        )}
      </div>
    </>
  )
}