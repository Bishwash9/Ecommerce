
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginForm } from './Auth/LoginForm'
import Dashboard from './Pages/Dashboard'
import  { PublicRoute } from './Auth/PublicRoute'
import { RouteGuard } from './Guard/RouteGuard'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path='/' element={<LoginForm />}/>
          </Route>
          
          <Route element={<RouteGuard/>}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
