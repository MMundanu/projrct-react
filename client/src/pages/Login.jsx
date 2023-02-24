import { Button, Form } from "react-bootstrap"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Alert } from "../components/Alert"
import { clientAxios } from "../config/clientAxios"
import useAuth from "../hooks/useAuth"
import {useForm} from '../hooks/useForm'

export const Login = () => {

    const [alert, setAlert] = useState({})
    const {setAuth} = useAuth();
    const navigate = useNavigate();


    const handleShowAlert = (msg, time = true) => {
        setAlert({
            msg
        });
        if(time){
            setTimeout(() => {
                setAlert({})
            }, 3000)
        }
        reset()
    }

   

    const {formValues, handleInputChange, reset} = useForm({
        email : '',
        password  : ''
    })

    const {email, password} = formValues

    const handleSubmit = async (e) => {
        e.preventDefault()
        if([email, password].includes("")){
            handleShowAlert('Todos los campos son obligatorios')
            return null
        };
        try {
            const {data} = await clientAxios.post('/auth/login',{
                email,
                password
            })
            //console.log(data);


            setAuth(data.user);

            sessionStorage.setItem('token', data.token);

            navigate('/projects')
            
        } catch (error) {
            console.log(error);
            handleShowAlert(error.response?.data.msg)
        }
    }


  return (
    <div className="m-auto py-3 d-flex flex-column text-center border rounded w-50"  >
        
        <h1>Inicia session</h1>

        {
            alert.msg && <Alert {...alert}/>
        }

        <Form onSubmit={handleSubmit} className='m-auto mb-3'>
      <Form.Group className="mb-3" >
        <Form.Label htmlFor="email" >Correo Electronico</Form.Label>
        <Form.Control 
       type="email"
       id="email"
       placeholder="Ingrese su email"
       name="email"
       value={email}
       onChange={handleInputChange} 
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="password" >Password</Form.Label>
        <Form.Control 
          type="password"
          id="password"
          placeholder="Ingrese su contraseña"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Iniciar sesion
      </Button>
    </Form>
        <nav className="d-flex flex-column" >
            <Link to={'/register'}>
                ¿No teiens unas cuenta? Registrate
            </Link>
            <Link to={'/forget-password'}>
                Olvide mi contraseña
            </Link>
        </nav>
    </div>
  )
}
