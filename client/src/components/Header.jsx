import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <div className='d-flex m-auto justify-content-evenly py-3 header'   >
            <h2 >Project Manager</h2>
            <input  type="text" placeholder='Buscar projecto...' />
            <div className='d-flex justify-content-between w-25 align-items-center flex-wrap'>
                <Link
                to={'/projects'}
                
                >
                    Proyectos
                </Link>
                <button
                type='button'
                // onClick={}
                className='p-1'
                >
                    Cerrar sesión
                </button>
            </div>
    </div>
  )
}
