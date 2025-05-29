import React from 'react'
import Home from './pages/Home'
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import SignupForm from './components/SignupForm'
import Login from './components/Login';
import ChooseSubject from './pages/ChooseSubject';
import NavigationBar from './components/NavigationBar';
import About from './pages/About';
import QuizPage from './pages/QuizPage';
import MyLeaderboard from './pages/MyLeaderboard';
import Footer from './components/Footer';

const App = () => {
  return (
   <BrowserRouter>
   <NavigationBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
         <Route path="/login" element={<Login />} />
         <Route path="/subject" element={<ChooseSubject/>} />
         <Route path="/about" element={<About/>} />
         <Route path="/quiz/:subject" element={<QuizPage />} />
         <Route path="/leaderboard" element={<MyLeaderboard />} />

      </Routes>
      <br />
      <Footer/>
    </BrowserRouter>
  )
}

export default App