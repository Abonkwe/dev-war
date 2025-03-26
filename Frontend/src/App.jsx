import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import CreateProfile from './components/CreateProfile'

function App() {


  return (
    <Router>
      <Routes>
        <Route path='/profile' element={<CreateProfile/>}/>
      </Routes>
    </Router>
  )
}

export default App
