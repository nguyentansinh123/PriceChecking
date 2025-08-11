import './App.css'
import {Navigate, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import RegisterPage from './pages/Register/RegisterPage';
import ForgotPassword from './pages/FPPage/ForgotPassword';
import OtpPage from './pages/OtpPage/OtpPage';
import useAuthUser from './hooks/AuthHooks/useAuthUser';
import AccountPage from './pages/AccountPage/AccountPage';
import PersonalInfo from './pages/AccountPage/PersonalInfo';
import ProductListPage from './pages/ProductPage/ProductListPage';


function App() {

  const {isLoading, authUser} = useAuthUser()
  const isAuthenticated = Boolean(authUser?.user)  
  console.log(authUser?.user)
  console.log(isAuthenticated)

  return (
    <>
      <Routes>
        {/* <Route path="/" element={!isAuthenticated ? <LoginPage/>: <HomePage />} /> */}
        <Route path="/" element={<HomePage/>}/>

        <Route path="/account" element={<AccountPage/>} />
        <Route path="/products" element={<ProductListPage/>} />
        <Route path="/account/personal-info" element={<PersonalInfo/>} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage/>: <Navigate to={"/"}/>} />
        <Route path='/register' element={!isAuthenticated ? <RegisterPage/> : <Navigate to={"/"}/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/otp' element={<OtpPage/>}/>
      </Routes>
    </>
  )
}

export default App
