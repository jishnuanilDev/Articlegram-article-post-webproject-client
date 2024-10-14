import * as React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLoginPage from './pages/user/userLoginPage';
import UserSignUpPage from './pages/user/UserSignUpPage';
import UserHomePage from './pages/user/UserHomePage';
import UserListPage from './pages/user/UserListPage';
function App () {
  return (
    <>
  <Router>
    <Routes>
      <Route path='/sign-up' element={<UserSignUpPage/>}/>
      <Route path='/' element={ <UserLoginPage />}/>
      <Route path='/home' element={ <UserHomePage />}/>
      <Route path='/your-lists' element={ <UserListPage />}/>
    </Routes>
  </Router>
     
    </>
  )
}

export default App
