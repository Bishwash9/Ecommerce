
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginForm } from './Auth/LoginForm'
import Dashboard from './Pages/Dashboard'
import  { PublicRoute } from './Auth/PublicRoute'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path='/' element={<LoginForm />}/>
          </Route>
          

          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
