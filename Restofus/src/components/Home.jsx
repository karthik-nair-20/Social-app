export default function Home() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="container max-w-2xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-custom mb-4">
          Hello <strong className="text-blue-custom">Karthik</strong>, your feed is empty.
        </h2>
        <p className="text-lg text-white leading-relaxed">
          Your feed displays the latest posts from the people you follow. If you don't have any friends to follow that's okay; you can use the Search feature in the top menu bar to find content written by people with similar interests and then follow them.
        </p>
      </div>
    </div>
  )
}