import { Link } from "react-router-dom"

export const ForgetPassword = () => {
  return (
    <div>       
    <h1>Recupera tu acceso</h1>

    <form action="">

    

        <div>
            <label htmlFor="email">Correo Electronico</label>
            <input 
            type="email"
            id="email"
            placeholder="Ingrese su email"
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
