import { Routes, Route } from 'react-router-dom'
import { Paths } from './path'
import Login from './pages/login/Login'
import Register from './pages/register/Register'

function App() {
  return (
    <>
      <Routes>
        <Route path={Paths.home} element={<div>Employee</div>} />
        <Route path={Paths.login} element={<Login />} />
        <Route path={Paths.register} element={<Register />} />
      </Routes>
    </>
  )
}

export default App
