import React from 'react'
import { Link } from 'react-router-dom'
import { Task } from '../components/Task'

export const Project = () => {
  return (
    <>
    <div>
      <h1>Nombre del proyecto</h1>
      <Link
      to={'/projects/edit-project/1'}>
      <p>Editar</p>
      </Link>
    </div>
    <div>
      <p>Tareas del proyecto</p>
      <div>
        {/* dibujo */}
        <p>
          Nueva tarea
        </p>
      </div>
    </div>
    {
      [1,2].map(task => (
        <Task/>
      ))
    }

    
    </>
  )
}
