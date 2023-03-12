import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { Collaborator } from '../components/Collaborator'
import { Task } from '../components/Task'
import useProjects from '../hooks/useProjects'
import { Alert } from '../components/Alert'
import { ModalFormTask } from '../components/ModalFormTask'
//import {} from '@fortawesome/free-solid-svg-icons'


export const Project = () => {

  const {id} = useParams()

  const {loading, alert, getProject, project} = useProjects() 

  const {name, description, dateExpire, client, _id} = project;

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
      to={`/projects/edit-project/${_id}`}>
      <p>Editar</p>
      </Link>
    </div>
    
    <div>
      <p>Tareas del proyecto</p>
      <div>
      
        <p>
          <ModalFormTask />
        </p>
      </div>
    </div>
    {
      loading ? 
      <p>cargando...</p> 
      :
      project.tasks.length
      ?
      project.tasks.map((task, i) => <Task key={task + i} {...task} />)
      :
      <p>No hay proyectos agregados</p>
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
      [1,2].map((collaborator, i) => (
        <Collaborator key={collaborator + i} />
      ))
    }

    
      </>
      )
    }
    
    </>
  )
}
