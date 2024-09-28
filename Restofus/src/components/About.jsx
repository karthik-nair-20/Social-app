import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function About() {
  return (
    <div className="py-16 px-6 sm:px-8 lg:px-10 bg-dark">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-2xl font-serif text-blue-custom sm:text-6xl md:text-7xl">
            About My App
          </h1>
          <p className="mt-4 max-w-lg mx-auto text-xl text-white opacity-90 font-thin sm:text-2xl md:max-w-4xl">
          Welcome to Myapp, a vibrant social media platform. With our app, you can share ideas, connect with friends, discover new interests, and engage in meaningful conversations. 
          </p>
        </div>

        <ScrollArea className="pr-4 h-[60vh] scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-pink-300 scrollbar-track-purple-100 dark:scrollbar-track-gray-700">
          <Card className="overflow-hidden shadow-2xl rounded-3xl bg-white dark:bg-gray-800">
            <CardContent className="p-10">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="lead text-xl font-sans text-slate-900 dark:text-gray-300">
                Whether you’re a storyteller, a creator, or someone who simply wants to connect, [App Name] is the place for you. Join us today and discover a world of endless possibilities!
                </p>

                <Separator className="my-10" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 font-mono">
                  <div>
                    <h2 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Our Vision</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    At [App Name], we envision a connected world where everyone can express themselves freely, share their stories, and build meaningful relationships. We aspire to create a vibrant community that celebrates diversity, creativity, and collaboration.
                    </p>
                  </div>
                  <div>
                    <h2 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Our Mission</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    Our mission at [App Name] is to empower individuals to connect, communicate, and share their experiences in a safe and inclusive environment. We strive to provide innovative features that enhance user engagement and foster authentic interactions, making social media a positive force for everyone.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-white dark:bg-gray-800 text-xl font-semibold text-gray-900 dark:text-gray-100">
                      Our Values
                    </span>
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {['Integrity', 'Innovation', 'Collaboration'].map((value) => (
                    <div key={value} className="text-center">
                      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white mx-auto">
                        {value.charAt(0)}
                      </div>
                      <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">{value}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollArea>

        <div className="mt-16 text-center">
          <img
            className="mx-auto h-48 w-48 rounded-full shadow-lg border-4 border-pink-500"
            src="/placeholder.svg?height=192&width=192"
            alt="Team"
          />
          <h2 className="mt-6 text-3xl font-serif text-white">Meet the Team</h2>
          <p className="mt-4 text-lg text-white opacity-90">
            Passionate individuals working together to bring our vision to life.
          </p>
        </div>
      </div>
    </div>
  );
}