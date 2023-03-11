import React from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Alert } from '../components/Alert';
import { ProjectForm } from '../components/projectForm';
import useProjects from '../hooks/useProjects';
import Swal from 'sweetalert2';

export const ProjectEdit = () => {

  const {deleteProject} = useProjects()

  const {id} = useParams()

  const handleDelete = () =>{
    Swal.fire({
      title: 'Estas seguro de eliminar el proyecto?',
      showCancelButton: true,
      confirmButtonColor: 'red',
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if(result.isConfirmed){
        deleteProject(id)
      }
    })
  }

  return (
    <div>
     <h1>Editar projecto</h1>

     <Button onClick={handleDelete} >Eliminar</Button>


     {
            alert.msg && <Alert {...alert}/>
        }

<ProjectForm />

    </div>
  )
}
