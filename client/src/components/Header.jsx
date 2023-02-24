import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <div>
        <div>
            <h2>Project Manager</h2>
            <input type="text" placeholder='Buscar projecto...' />
            <div>
                <Link
                to={'/projects'}>
                    Proyectos
                </Link>
                <button
                type='button'
                // onClick={}
                >
                    Cerrar sesión
                </button>
            </div>
        </div>
    </div>
  )
}
