import Homeguest from './components/Homeguest'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import About from './components/About';
import Term from './components/Term';
import Home from './components/Home';
import Createpost from './components/CreatePost';
import ViewSinglePost from './components/ViewSinglePost';
import Flashmessage from './components/Flashmessage';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { loggedIn } from './store/atom';
import Profile from './components/Profile';
import Editpost from './components/Editpost';
import Search from './components/Search';
import AppLayout from './components/AppLayout';
import { searchBtn } from './store/atom';

function App() {

  return (

    <RecoilRoot>
      <BrowserRouter>
        {/* <Flashmessage /> */}
        <AppLayout>
        {/* <SearchBtn /> */}
        <Routes>
          <Route path='/' element={<ConditionalHome />} />
          <Route path='/about-us' element={<About />} />
          <Route path='/create-post' element={<Createpost />} />
          <Route path='/post/:id' element={<ViewSinglePost />} />
          <Route path='/profile/:username/*' element={<Profile />} />
          <Route path='/terms' element={<Term />} />
          <Route path='/post/:id/edit' element={<Editpost />} />
          {/* CLEAN THE URL AS WELL */}
          <Route path='*' element={<Homeguest />} />
        </Routes>
        </AppLayout>
      </BrowserRouter>
    </RecoilRoot>
  )
}

function ConditionalHome() {
  const loggedin = useRecoilValue(loggedIn);
  return loggedin ? <Home /> : <Homeguest />
}

function SearchBtn() {
  const isSearchActive = useRecoilValue(searchBtn);
  return (
    <>
      {isSearchActive && <Search />}
    </>
  )
}

export default App