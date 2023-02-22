import { useState } from "react"
import { Link } from "react-router-dom"
import { Alert } from "../components/Alert"
import { clientAxios } from "../config/clientAxios"
import useAuth from "../hooks/useAuth"
import {useForm} from '../hooks/useForm'

export const Login = () => {

    const [alert, setAlert] = useState({})
    const {setAuth} = useAuth();


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

            
            
        } catch (error) {
            console.log(error);
            handleShowAlert(error.response?.data.msg)
        }
    }


  return (
    <div>
        <h1>Inicia session</h1>

        {
            alert.msg && <Alert {...alert}/>
        }

        <form 
        onSubmit={handleSubmit}
        >

            <div>
                <label htmlFor="email">Correo Electronico</label>
                <input 
                type="email"
                id="email"
                placeholder="Ingrese su email"
                name="email"
                value={email}
                onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="passwors">Password</label>
                <input 
                type="password"
                id="password"
                placeholder="Ingrese su contraseña"
                name="password"
                value={password}
                onChange={handleInputChange}
                />
                <button type="submit">
                    Iniciar session
                </button>
            </div>
        </form>
        <nav>
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
