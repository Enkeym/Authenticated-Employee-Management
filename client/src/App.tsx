import { Routes, Route } from 'react-router-dom'
import { Paths } from './path'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Employees from './pages/employees/Employees'
import AddEmployees from './pages/employees/AddEmployees'
import Status from './pages/status/Status'
import Employee from './pages/employee/Employee'
import EditEmployees from './pages/employees/EditEmployees'

function App() {
  return (
    <>
      <Routes>
        <Route path={Paths.home} element={<Employees />} />
        <Route path={Paths.login} element={<Login />} />
        <Route path={Paths.register} element={<Register />} />
        <Route path={Paths.employeeAdd} element={<AddEmployees />} />
        <Route path={`${Paths.status}/:status`} element={<Status />} />
        <Route path={`${Paths.employee}/:id`} element={<Employee />} />
        <Route path={`${Paths.employeeEdit}/:id`} element={<EditEmployees />} />
      </Routes>
    </>
  )
}

export default App
