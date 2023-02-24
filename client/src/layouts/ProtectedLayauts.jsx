import { Navigate, Outlet } from "react-router-dom"
import { Header } from "../components/Header"
import { SideBar } from "../components/SideBar"
import useAuth from "../hooks/useAuth"

export const ProtectedLayauts = () => {

    const {auth, loading} = useAuth()

    
        if(loading){
           return <p>Cargando...</p> 
        }
    
  return (
    <div>
        {
            auth._id? (
            <div>
              <Header />
              <div>
                <SideBar />
                <main>
                <Outlet/>
                </main>
              </div>
            </div>
            )
             :
             (
                <Navigate to='/'/>
             )
        }
        
    </div>
  )
}
