// import './App.css'
import { Navbar } from './Navbar'
import { Hero } from './Hero'
import { Works } from './Works'
import { Features } from './Features'
// import { Price } from './Price'
import { Testimonial } from './Testimonial'
import { Footer } from './Footer'

function NewHomePage() {

  return (
    <div className='text-neutral-300 text-sm antialiased'>
      {/* <Navbar /> */}
      <Hero />
      <Works />
      <Features />
      {/* <Price /> */}
      <Testimonial />
      <Footer />
    </div>
  )
}

export default NewHomePage
