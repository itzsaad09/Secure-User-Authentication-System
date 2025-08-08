import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx';
import NotFound from './components/notFound.jsx';
import OTPVerification from './components/OTPVerification..jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import ChangePassword from './components/ChangePassword.jsx';
import Dashboard from './pages/Dashboard.jsx';
import LandingPage from './pages/LandingPage.jsx';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  return (
    <>
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/register' element={<SignUp/>} />
        <Route path='/verify' element={<OTPVerification/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path='/change-password' element={<ChangePassword/>} />
        <Route path='/*' element={<NotFound/>} />
      </Routes>
    </div>
    </>
  )
}

export default App
