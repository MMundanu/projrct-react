import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { Alert } from '../components/Alert'
import { useForm } from '../hooks/useForm'
import useProjects from '../hooks/useProjects'

export const ProjectAdd = () => {

  const {alert, showAlert, storeProject } = useProjects()

  const {formValues, handleInputChange, reset} = useForm({
    name : '',
    description : '',
    dateExpire : '',
    client: ''
  })

  const {name, description, dateExpire, client} = formValues


  const handleSubmit = (e) =>{
    e.preventDefault()
    if([name, description, dateExpire, client].includes("")){
      showAlert('Todos los campos son obligatorios')
      return null
  };

  storeProject({
    name,
    description,
    dateExpire,
    client
  })

  }

  return (
    <div>


       <h1>Crear Proyecto</h1>

       
       {
            alert.msg && <Alert {...alert}/>
        }

       
    <Form onSubmit={handleSubmit} >
      <Form.Group className="mb-3" >
        <Form.Label htmlFor='name' >Nombre del proyecto</Form.Label>
        <Form.Control type="text" name='name' value={name} onChange={handleInputChange} placeholder="Ingrese un nombre" />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label htmlFor='description' >Descripcion</Form.Label>
        <Form.Control type="text" name='description' as='textarea' value={description} onChange={handleInputChange} placeholder="Ingrese una descripcion" />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Fecha</Form.Label>
        <input type="date" name="dateExpire" value={dateExpire} onChange={handleInputChange} id="" />
      </Form.Group>

      

      <Form.Group className="mb-3" >
        <Form.Label htmlFor='client' >Nombre del cliente</Form.Label>
        <Form.Control type="text" name='client' value={client} onChange={handleInputChange} placeholder="Ingrese un nombre" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Guardar Proyecto 
      </Button>
    </Form>
    </div>
  )
}
