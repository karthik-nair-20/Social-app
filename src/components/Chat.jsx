import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { chatStateAtom, userAtom } from '@/store/atom'
import { Link } from 'react-router-dom'
import { io } from "socket.io-client";
const socket = io("http://localhost:8080")

export default function Chat() {

  const [chatState, setChatState] = useRecoilState(chatStateAtom)
  const appState = useRecoilValue(userAtom)
  const [messages, setMessages] = useState({
    fieldValue: '',
    chatMessages: [],
  })
  const chatField = useRef(null)

  useEffect(() => {
    const handleIncomingMessage = (message) => {
      setMessages((prev) => ({
        ...prev,
        chatMessages: [...prev.chatMessages, message]
      }));
    };
    socket.on("chatFromServer", handleIncomingMessage)
    return () => {
      socket.off("chatFromServer", handleIncomingMessage);
    };

  }, [])

  useEffect(() => {
    if (messages.chatMessages.length && !chatState.isChatOpen) {
      setChatState((prev) => ({
        ...prev,
        unreadChatCount: prev.unreadChatCount + 1,
      }))
    }
  }, [messages.chatMessages])

  useEffect(() => {
    if (chatState.isChatOpen) {
      setChatState(prev => ({
        ...prev,
        unreadChatCount: 0
      }))
    }
  }, [chatState.isChatOpen])

  function handleFieldChange(e) {
    const value = e.target.value;
    setMessages((prev) => ({
      ...prev,
      fieldValue: value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    // Send message to chat server
    socket.emit("chatFromBrowser", { message: messages.fieldValue, token: appState.token })
    setMessages((draft) => ({
      ...draft,
      chatMessages: [...draft.chatMessages, { message: draft.fieldValue, username: appState.username }],
      fieldValue: ''
    })
    )
  }

  return (
    <>
      {chatState && chatState.isChatOpen && (
        <div className="fixed bottom-0 right-0 w-full md:w-96 h-96 bg-white border-t md:border-l shadow-lg flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Chat Support</h2>
          </div>
          <ScrollArea className="flex-grow p-4">
            {messages.chatMessages.length > 0 ? (
              messages.chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.username === appState.username ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div className={`flex items-end ${message.username === appState.username ? 'flex-row-reverse' : 'flex-row'}`}>
                    <Avatar className="w-8 h-8">
                      {/* <AvatarImage src={message.username === appState.username ? message.avatar : "B"} /> */}
                      <AvatarFallback>{message.username === appState.username ? 'U' : 'B'}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`max-w-xs mx-2 p-3 rounded-lg ${message.username === appState.username
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-mute'
                        }`}
                    >
                      {message.message}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No messages yet</p>
            )}
          </ScrollArea>
          <div className="p-4 border-t">
            <form
              onSubmit={handleSubmit}
              className="flex items-center space-x-2"
            >
              <Input
                type="text"
                placeholder="Type your message..."
                value={messages.fieldValue}
                onChange={handleFieldChange}
                className="flex-grow"
                ref={chatField}
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </div>
        </div>
      )
      }
    </>
  )
}