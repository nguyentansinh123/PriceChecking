import './App.css'
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
<<<<<<< HEAD
import HomePage from './pages/LoginPage/HomePage';
=======
import RegisterPage from './pages/Register/RegisterPage';
import ForgotPassword from './pages/FPPage/ForgotPassword';
import OtpPage from './pages/OtpPage/OtpPage';
>>>>>>> cfd89ade7862144eccec15a24e38ee689d29ad37

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/otp' element={<OtpPage/>}/>
      </Routes>
    </>
  )
}

export default App
