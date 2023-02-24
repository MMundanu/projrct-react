import { Link } from "react-router-dom"
import { Alert } from "../components/Alert";
import { useForm } from "../hooks/useForm"
import { useState } from "react";
import { clientAxios } from "../config/clientAxios";
import Swal from 'sweetalert2'
import { Button, Form } from "react-bootstrap";

const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

export const Register = () => {

    const [alert, setAlert] = useState({});

    const [send, setSend] = useState(false);

    const {formValues, setformValues, handleInputChange, reset} = useForm({
        name: "",
        email : "",
        password : "",
        password2 : ""
      });
    
      const {name, email, password, password2} = formValues;
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        //console.log(formValues);
        if([name, email, password, password2].includes("")){
            handleShowAlert('Todos los campos son obligatorios')
            return null
        };
        if(!exRegEmail.test(email)){
            handleShowAlert('El email tiene un formato invalido')
            return null
        };

        if(password !== password2){
            handleShowAlert('Las contraseñas no coinciden')
            return null
        };
        try {

            setSend(true)
            
            const {data} = await clientAxios.post('/auth/register',{
                name,
                email,
                password
            });

            console.log(data);

            setSend(false)

            Swal.fire({
                icon: 'info',
                title: 'Gracias por registrarte',
                text: data.msg,
              });

              reset()

        } catch (error) {
            console.log(error);
            handleShowAlert(error.response?.data.msg)
            reset()
        }
        
    }

    const handleShowAlert = (msg) => {
        setAlert({
            msg
        });
        setTimeout(() => {
            setAlert({})
        }, 3000)
    }

  return (
    
    
    <div className="m-auto py-3 d-flex flex-column text-center border rounded w-50"  >
        
        <h1>Crea tu cuenta</h1>

        {
            alert.msg && <Alert {...alert}/>
        }

        <Form onSubmit={handleSubmit} className='m-auto mb-3'>

        <Form.Group className="mb-3" >
        <Form.Label htmlFor="name" >Nombre</Form.Label>
        <Form.Control 
       type="text"
       id="name"
       name="name"
       placeholder="Ingrese su nombre"
       autoComplete="off"
       value={name}
       onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label htmlFor="email" >Correo Electronico</Form.Label>
        <Form.Control 
        type="email"
        id="email"
        name="email"
        placeholder="Ingrese su email"
        value={email}
        onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="password" >Password</Form.Label>
        <Form.Control 
          type="password"
          id="password"
          name="password"
          placeholder="Ingrese su contraseña"
          value={password}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="password2" >Confirme su Contraseña</Form.Label>
        <Form.Control 
          type="password"
          id="password2"
          name="password2"
          placeholder="Ingrese su contraseña"
          value={password2}
          onChange={handleInputChange}
        />
      </Form.Group>
      
      <Button variant="primary"  
         type="submit"
         disabled={send}
        >
            Crear cuenta
      </Button>
    </Form>
    <nav>
        <Link to={'/'}>
            ¿Estas registrado? Inicia session
        </Link>
    </nav>
    </div>

  )
}
