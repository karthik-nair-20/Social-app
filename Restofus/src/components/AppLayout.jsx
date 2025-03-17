import Footer from "./Footer";
import Header from "./Header";

export default function AppLayout({children}) {
  return (
    <div className="w-full flex flex-col min-h-screen bg-dark">
      <Header />
      <main className="flex-1 flex flex-col px-3">
        {children}
      </main>
      <Footer />
    </div>
  )
}