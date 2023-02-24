import { useState } from "react"
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom"
import Swal from "sweetalert2";
import { Alert } from "../components/Alert";
import { clientAxios } from "../config/clientAxios";


export const ForgetPassword = () => {

    const [alert, setAlert] = useState({});
    const [email, setEmail] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!email){
            handleShowAlert('El email es requerido')
            return null
        }

        try {

            const {data} = await clientAxios.post('/auth/send-token',{
                email
            })
            
            Swal.fire({
                icon: 'info',
                title: 'Revisa tu casilla de email',
                text: data.msg,
                confirmButtonText : "Entendido",
                allowOutsideClick : false
              });
              
              setEmail('')

        } catch (error) {
            console.log(error)
            handleShowAlert(error.response?.data.msg.message)
            setEmail('')
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
        
    <h1>Recupera tu acceso</h1>

        {
            alert.msg && <Alert {...alert}/>
        }

        <Form onSubmit={handleSubmit} noValidate className='m-auto mb-3'>
      <Form.Group className="mb-3" >
        <Form.Label htmlFor="email" >Correo Electronico</Form.Label>
        <Form.Control 
      type="email"
      id="email"
      placeholder="Ingrese su email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
  
      <Button variant="primary" type="submit">
       Recuper contraseña
      </Button>
    </Form>
        <nav className="d-flex flex-column" >
           <Link to={'/register'}>
            ¿No tienes cunta? Registrate
           </Link>
           <Link to={'/'}>
          ¿Estas registrado? Inicia session
           </Link>
        </nav>
    </div>
  )
}
