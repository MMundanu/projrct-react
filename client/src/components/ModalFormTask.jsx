import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from '../hooks/useForm';
import useProjects from "../hooks/useProjects";


export const ModalFormTask = () => {

    const { showModal, handleShowModal, storeTask, showAlertModal, showAlert } = useProjects();

    const {formValues, handleInputChange, reset} = useForm({
        name : "",
        description : "",
        dateExpire : "",
        priority: ''
       });
       const {name, description, dateExpire, priority} = formValues;
       

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);


    const handleClosed = () => {
        handleShowModal()
        showAlertModal("")
        }

        const handleSubmit = (e) => {
            e.preventDefault()
            
            if([name, description, priority, dateExpire].includes("")){
            showAlertModal("Todos los campos son obligatorios");
            return null
            }
           
            storeTask({
            name,
            description,
            dateExpire,
            priority
            })
            reset()
            }
           

    return (
        <>
            <Button variant="primary" onClick={handleClosed}>
               Nueva tarea
            </Button>

            <Modal show={showModal} onHide={handleClosed}>
                <Modal.Header closeButton>
                    <Modal.Title>Nueva tarea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} >
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor='name' >Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre de la tarea"
                                name='name'
                                value={name}
                                onChange={handleInputChange}
                                autoComplete="off"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                        >
                            <Form.Label htmlFor='description' >Descripcion</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Descripcion de la tarea'
                                name='description'
                                value={description}
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor='dateExpire' >Fecha de entrega</Form.Label>
                            <input
                                type='date'
                                name='dateExpire'
                                value={dateExpire}
                                onChange={handleInputChange}
                            >
                            </input>
                        </Form.Group>
                        <Form.Group className="mb-3">
              <Form.Label htmlFor="priority">Prioridad</Form.Label>
              <select name="priority" value={priority} onChange={handleInputChange}>
                <option value="" hidden defaultValue={true}>
                  Seleccione...
                </option>
                {['Baja', 'Media', 'Alta'].map((option, i) => (
                  <option key={option + i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Form.Group>
                           
                        <Button type='submit' variant="primary" >
                        Guardar tarea
                    </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}


