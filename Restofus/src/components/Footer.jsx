import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-dark py-4 text-white border-t border-t-gray-700">
      <div className="container mx-auto flex justify-center space-x-4 text-blue-custom">
        <Link to="/" className="text-primary hover:underline">Home</Link>
        <Link to="/about-us" className="text-primary hover:underline">About Us</Link>
        <Link to="/terms" className="text-primary hover:underline">Terms</Link>
      </div>
    </footer>
  )
}