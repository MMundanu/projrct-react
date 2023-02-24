import React from 'react'
import { Link } from 'react-router-dom'

export const SideBar = () => {
  return (
    <aside>
        <p>
           Hola:  {/* {auth.name} */}
        </p>
        <Link
        to={'/create-project'}
        >
            Nuevo Proyecto
        </Link>
    </aside>
  )
}
