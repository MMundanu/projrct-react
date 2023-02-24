import React from 'react'
import { Link } from 'react-router-dom'

export const ProjectPreview = () => {
  return (
    <div>
        <p>
            Nombre del proyecto
            <span>
                {' | CLIENTE'}
            </span>
        </p>
        <Link
        to={'/projects/1'}
        >
            Ver proyecto
        </Link>
    </div>
  )
}
