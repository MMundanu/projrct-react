import { Link } from "react-router-dom"

export const Login = () => {
  return (
    <div>
        <h1>Inicia session</h1>

        <form action="">

            <div>
                <label htmlFor="email">Correo Electronico</label>
                <input 
                type="email"
                id="email"
                placeholder="Ingrese su email"
                />
            </div>
            <div>
                <label htmlFor="passwors">Password</label>
                <input 
                type="password"
                id="password"
                placeholder="Ingrese su contraseña"
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
