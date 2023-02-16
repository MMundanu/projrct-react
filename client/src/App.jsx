import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { AuthLayouts } from './layouts/AuthLayouts'
import { ProtectedLayauts } from './layouts/ProtectedLayauts'
import { ConfirmAccount } from './pages/ConfirmAccount'
import { ForgetPassword } from './pages/ForgetPassword'
import { Login } from './pages/Login'
import { Projetcs } from './pages/Projetcs'
import { RecoverPassword } from './pages/RecoverPassword'
import { Register } from './pages/Register'

function App() {


  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route
          path='/'
          element={<AuthLayouts/>}
        >
          <Route
            index
            element={<Login/>}
          />
           <Route
            path='register'
            element={<Register/>}
          />
           <Route
            path='forget-password'
            element={<ForgetPassword/>}
          />
           <Route
            path='recover-password/:token'
            element={<RecoverPassword/>}
          />
          <Route
            path='checked/:token'
            element={<ConfirmAccount/>}
          />
           <Route
            path='*'
            element={<h1>404 Not Found</h1>}
          />
        </Route>
        <Route
        path='/projects'
        element={<ProtectedLayauts/>}
        >
          <Route
          index
          element={<Projetcs/>}
          />

        </Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App