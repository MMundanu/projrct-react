import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { Collaborator } from '../components/Collaborator'
import { Task } from '../components/Task'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import useProjects from '../hooks/useProjects'
import { Alert } from '../components/Alert'
//import {} from '@fortawesome/free-solid-svg-icons'


export const Project = () => {

  const {id} = useParams()

  const {loading, alert, getProject, project} = useProjects() 

  const {name, description, dateExpire, client} = project;

  useEffect (() => {
    getProject(id)  
  }, [id]);

  if(alert.msg) return <Alert {...alert}/>

  return (
    <>
    {
      loading ? (
        <p>cargando...</p>
      ) : (
      <>
      <div>
      <h1>{name}</h1>
      <h2>{client}</h2>
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
    
    </>
  )
}
