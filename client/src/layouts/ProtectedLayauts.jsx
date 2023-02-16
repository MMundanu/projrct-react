import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"

export const ProtectedLayauts = () => {

    const {auth, loading} = useAuth()

    {
        if(loading){
           return (
                <p>Cargando...</p>
            )
        }
    }

  return (
    <div>
        {
            auth._id? (<main>
                <Outlet/>
             </main>)
             :
             (
                <Navigate to='/'/>
             )
        }
        
    </div>
  )
}
