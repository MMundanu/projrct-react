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
    <div className="d-flex flex-wrap" >
        {
            auth._id? (
            <div className="w-100" >
              <Header />
              <div className="d-flex flex-wrap h-100">
                <div className="w-25" >
                <SideBar />
                </div>
                <main className="w-75">
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
