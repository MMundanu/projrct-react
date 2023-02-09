import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Alert } from "../components/Alert";
import { clientAxios } from "../config/clientAxios";

export const RecoverPassword = () => {

  const [alert, setAlert] = useState({});
  const [password, setPassword] = useState('')
  const [tokenChecked, setTokenChecked] = useState(false)

  const {token} = useParams();
  const navigate = useNavigate();





useEffect(() => {
  const checkToken = async () => {
    try {
      const {data} = await clientAxios.get(`/auth/reset-password/?token=${token}`);
      setTokenChecked(true)
      console.log(data.msg)
      
    } catch (error) {
      console.log(error);
      handleShowAlert(error.response?.data.message)
    }
  } 
  checkToken()
}, [])

const handleSubmit = async (e) => {
  e.preventDefault()
  if(!password){
    handleShowAlert('El password es requerido')
    return null
  }

  try {
    const {data} = await clientAxios.post(`/auth/reset-password?token=${token}`,{
      password
     })

       
     Swal.fire({
      icon: 'info',
      title: 'Contraseña reseteada',
      text: data.msg,
      confirmButtonText : "Iniciá sesión",
      allowOutsideClick : false
    }).then(result => {
      if(result.isConfirmed){
        navigate("/")
        console.log('redirect')
      }
    })
    setPassword('')
    
  } catch (error) {
    console.error(error)
    handleShowAlert(error.response?.data.msg.message)
    setPassword('')
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

{
  tokenChecked ?
  (
  <form 
  action=""
  onSubmit={handleSubmit}
  >

<div>
    <label htmlFor="password">Contraseña</label>
    <input 
    type="password"
    id="email"
    placeholder="Ingrese su nueva contraseña"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    />
</div>

    <button type="submit">
        Resetaer contraseña
    </button>

</form>
  ) : (
    <nav >
      <Link
        to={"/register"}
      >
        ¿No tenés una cuenta? Registrate
      </Link>
      <Link
        to={"/"}
      >
        ¿Estás registrado? Iniciá sesión
      </Link>
    </nav>
  )
}

    </div>
  )
}
