import { Outlet } from "react-router-dom"

export const AuthLayouts = () => {
  return (
    <div>
        <main>
            <div>
                <Outlet />
            </div>
        </main>
    </div>
  )
}
