import { Link } from "react-router-dom"
import { Alert } from "../components/Alert";
import { useForm } from "../hooks/useForm"
import { useState } from "react";
import { clientAxios } from "../config/clientAxios";

const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

export const Register = () => {

    const [alert, setAlert] = useState({});

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
            
            const {data} = await clientAxios.post('/auth/register',{
                name,
                email,
                password
            });

            console.log(data);


        } catch (error) {
            console.log(error);
        }
        
    }

    const handleShowAlert = (msg) => {
        setAlert({
            msg
        });
        setTimeout(() => {
            setAlert({})
        }, 2000)
    }

  return (
    <div>        
    <h1>Crea tu cuenta</h1>
    {
        alert.msg && <Alert {...alert} />
    }

    <form action="" onSubmit={handleSubmit} noValidate>

    <div>
            <label htmlFor="name">Nombre</label>
            <input 
            type="text"
            id="name"
            name="name"
            placeholder="Ingrese su nombre"
            autoComplete="off"
            value={name}
            onChange={handleInputChange}
            />
        </div>

        <div>
            <label htmlFor="email">Correo Electronico</label>
            <input 
            type="email"
            id="email"
            name="email"
            placeholder="Ingrese su email"
            value={email}
            onChange={handleInputChange}
            />
        </div>
        <div>
            <label htmlFor="passwors">Contraseña</label>
            <input 
            type="password"
            id="password"
            name="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={handleInputChange}
            />
        </div>
        <div>
            <label htmlFor="passwors2">Confirme su Contraseña</label>
            <input 
            type="password"
            id="password2"
            name="password2"
            placeholder="Ingrese su contraseña"
            value={password2}
            onChange={handleInputChange}
            />
        </div>
            <button type="submit" >
                Crear cuenta
            </button>
        
    </form>
    <nav>
        <Link to={'/'}>
            ¿Estas registrado? Inicia session
        </Link>
    </nav>
    </div>
  )
}
