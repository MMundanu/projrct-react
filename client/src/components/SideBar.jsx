import React from 'react'
import { Link } from 'react-router-dom'

export const SideBar = () => {
  return (
    <aside className='d-flex flex-column text-bg-secondary h-100 p-2' >
        <p className='m-0' >
           Hola:  {/* {auth.name} */}
        </p>
        <Link
        to={'/projects/create-project'}
        >
            Nuevo Proyecto
        </Link>
    </aside>
  )
}
