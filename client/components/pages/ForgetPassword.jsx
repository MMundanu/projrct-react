
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
    <link to={'/register'}>
            ¿No tienes cunta? Registrate
        </link>
        <link to={'/'}>
            ¿Estas registrado? Inicia session
        </link>
    </nav></div>
  )
}
