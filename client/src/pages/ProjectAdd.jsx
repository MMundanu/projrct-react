import React from 'react'
import { Alert } from '../components/Alert'
import { ProjectForm } from '../components/projectForm'

export const ProjectAdd = () => {

  

  return (
    <div>


       <h1>Crear Proyecto</h1>

       
       {
            alert.msg && <Alert {...alert}/>
        }

        <ProjectForm />

       
     </div>
  )
}
