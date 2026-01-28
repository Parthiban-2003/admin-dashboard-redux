import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import FormStore from './formsInformations/FormsStore';
import FormsControl from './formsInformations/FormsControl';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/formStore" element={<FormStore />} />
      <Route path="/formsControl" element={<FormsControl />} />
      <Route path="/formsControl/:id" element={<FormsControl />} />
    </Routes>
  )
}
export default App
