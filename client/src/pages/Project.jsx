import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Collaborator } from '../components/Collaborator'
import { Task } from '../components/Task'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
//import {} from '@fortawesome/free-solid-svg-icons'


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
      <FontAwesomeIcon icon="fa-duotone fa-plus" />
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

    <div>
      <p>Colaboradores</p>

      <Button>
        <p>
          Agregar colaborador
        </p>
      </Button>
    </div>

    {
      [1,2].map(collaborator => (
        <Collaborator />
      ))
    }

    
    </>
  )
}
