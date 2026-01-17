import { motion } from "framer-motion"
import { MessageSquare, Users, Globe, ArrowRight } from "lucide-react"
import { Button } from "./ui/button"

export default function Landing() {
  return (
    <>
      <main className="flex-1 container mx-auto grid p-4 md:p-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Welcome to Bluewave
              </span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-400 max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              A platform where you can freely share your thoughts across the world.
            </motion.p>
          </div>

          <motion.div
            className="grid gap-6 max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-blue-500/10 text-blue-500">
                <MessageSquare size={20} />
              </div>
              <div>
                <h3 className="font-medium text-white">Share Your Voice</h3>
                <p className="text-sm text-gray-400">Express yourself freely and connect with like-minded people</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-indigo-500/10 text-indigo-500">
                <Users size={20} />
              </div>
              <div>
                <h3 className="font-medium text-white">Build Communities</h3>
                <p className="text-sm text-gray-400">Create and join groups based on your interests and passions</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-purple-500/10 text-purple-500">
                <Globe size={20} />
              </div>
              <div>
                <h3 className="font-medium text-white">Discover Content</h3>
                <p className="text-sm text-gray-400">Explore trending topics and discover new perspectives</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.7 }}>
            <Button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Join thousands of users
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>

      </main>

    </>
  )
}



