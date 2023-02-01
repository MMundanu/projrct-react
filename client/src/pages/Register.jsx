import { Link, NavLink } from "react-router-dom"

export const Register = () => {
  return (
    <div>        
    <h1>Crea tu cuenta</h1>

    <form action="">

    <div>
            <label htmlFor="name">Nombre</label>
            <input 
            type="text"
            id="name"
            placeholder="Ingrese su nombre"
            autoComplete="off"
            />
        </div>

        <div>
            <label htmlFor="email">Correo Electronico</label>
            <input 
            type="email"
            id="email"
            placeholder="Ingrese su email"
            />
        </div>
        <div>
            <label htmlFor="passwors">Contraseña</label>
            <input 
            type="password"
            id="password"
            placeholder="Ingrese su contraseña"
            />
        </div>
        <div>
            <label htmlFor="passwors2">Confirme su Contraseña</label>
            <input 
            type="password"
            id="password2"
            placeholder="Ingrese su contraseña"
            />
        </div>
            <button type="submit">
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
