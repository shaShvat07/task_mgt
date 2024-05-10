import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Home from './Home/Home';
import PageNotFound from './PageNotFound/PageNotFound';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <BrowserRouter>
          <div>
            <Toaster
              position="top-right"
              reverseOrder={false}
            />
          </div>
        <Routes >
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<SignUp />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
