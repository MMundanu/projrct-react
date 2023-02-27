import { Outlet } from "react-router-dom"

export const AuthLayouts = () => {
  return (
    <div className="h-100 d-flex justify-content-center align-items-center" >
        <main className="w-100" >
            <div>
                <Outlet />
            </div>
        </main>
    </div>
  )
}
