import React, { useEffect, useRef } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useForm } from '../hooks/useForm'
import useProjects from '../hooks/useProjects'

export const ProjectForm = () => {

    const {alert, showAlert, storeProject, project } = useProjects()
  
    const {id} = useParams();

    const inputName = useRef(null)
    const inputDescription = useRef(null)
    const inputDateExpire= useRef(null)
    const InputClient = useRef(null)
  
    useEffect(() => {
      if(id){
      inputName.current.value = project.name;
      inputDescription.current.value = project.description;
      inputDateExpire.current.value = project.dateExpire.split('T')[0];
      InputClient.current.value = project.client;

      setFormValues({ 
        name : project.name,
        description : project.description,
        dateExpire : project.dateExpire.split('T')[0],
        client : project.client})
      }
    }, []);
  
    const {formValues, handleInputChange, reset, setFormValues} = useForm({
      name : '',
      description : '',
      dateExpire : '',
      client: ''
    })
  
    let {name, description, dateExpire, client} = formValues
  
    
  
    const handleSubmit = (e) =>{
      e.preventDefault()
      if([name, description, dateExpire, client].includes("")){
        showAlert('Todos los campos son obligatorios')
        return null
    };


    storeProject({
      id : id ? id : null,
      name,
      description,
      dateExpire,
      client
    })
  
    }
  
    return (
      <div>
        <Form onSubmit={handleSubmit} >
        <Form.Group className="mb-3" >
          <Form.Label htmlFor='name' >Nombre del proyecto</Form.Label>
          <Form.Control type="text" name='name' value={name} onChange={handleInputChange} placeholder="Ingrese un nombre" ref={inputName} />
        </Form.Group>
  
        <Form.Group className="mb-3" >
          <Form.Label htmlFor='description' >Descripcion</Form.Label>
          <Form.Control type="text" name='description' as='textarea' value={description} onChange={handleInputChange} placeholder="Ingrese una descripcion" ref={inputDescription} />
        </Form.Group>
  
        <Form.Group className="mb-3" >
          <Form.Label>Fecha</Form.Label>
          <input type="date" name="dateExpire" value={dateExpire} onChange={handleInputChange} id="" ref={inputDateExpire} />
        </Form.Group>
  
        
  
        <Form.Group className="mb-3" >
          <Form.Label htmlFor='client' >Nombre del cliente</Form.Label>
          <Form.Control type="text" name='client' value={client} onChange={handleInputChange} placeholder="Ingrese un nombre" ref={InputClient} />
        </Form.Group>
  
        <Button variant="primary" type="submit">
          

          {id ? 'Actualizar cambios' : 'Guardar proyecto'}
        </Button>
      </Form>
      </div>
    )
  }
  
