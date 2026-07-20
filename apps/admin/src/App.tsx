
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginForm } from './Features/Auth/LoginForm'
import Dashboard from './Pages/Dashboard'
import  { PublicRoute } from './Features/Auth/PublicRoute'
import { RouteGuard } from './Guard/RouteGuard'
import { DashboardLayout } from './Components/Layout/DashboardLayout'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path='/' element={<LoginForm />}/>
          </Route>
          
          <Route element={<DashboardLayout/>}>

          <Route element={<RouteGuard/>}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
          
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
