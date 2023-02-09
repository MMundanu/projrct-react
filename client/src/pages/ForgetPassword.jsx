import { useState } from "react"
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
    <div>       
    <h1>Recupera tu acceso</h1>
    {
        alert.msg && <Alert {...alert}/>
    }

    <form action="" 
    onSubmit={handleSubmit}
    noValidate
    >

    

        <div>
            <label htmlFor="email">Correo Electronico</label>
            <input 
            type="email"
            id="email"
            placeholder="Ingrese su email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        
            <button type="submit">
                Recuper contraseña
            </button>
        
    </form>
    <nav>
    <Link to={'/register'}>
            ¿No tienes cunta? Registrate
        </Link>
        <Link to={'/'}>
            ¿Estas registrado? Inicia session
        </Link>
    </nav></div>
  )
}
