import { Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import FormStore from './formStore'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/formStore" element={<FormStore />} />
    </Routes>
  )
}

export default App
