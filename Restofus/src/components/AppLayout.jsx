import Footer from "./Footer";
import Header from "./Header";
import { useLocation } from 'react-router-dom';

export default function AppLayout({children}) {
    const location = useLocation();
    const isHomePath = location.pathname === '/';

    return (
      <div className="w-full flex flex-col min-h-screen bg-dark">
        {!isHomePath && <Header />}
        <main className="flex-1 flex flex-col px-3">
          {children}
        </main>
        {!isHomePath && <Footer />}
      </div>
    )
}