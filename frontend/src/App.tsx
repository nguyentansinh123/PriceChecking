import './App.css'
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
