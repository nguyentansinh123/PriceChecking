import './App.css'
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import ForgotPassword from './pages/FPPage/ForgotPassword';
import OtpPage from './pages/OtpPage/OtpPage';

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/otp' element={<OtpPage/>}/>
      </Routes>
    </>
  )
}

export default App
