import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { AuthLayouts } from './layouts/AuthLayouts'
import { ConfirmAccount } from './pages/ConfirmAccount'
import { ForgetPassword } from './pages/ForgetPassword'
import { Login } from './pages/Login'
import { RecoverPassword } from './pages/RecoverPassword'
import { Register } from './pages/Register'

function App() {


  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  )
}

export default App