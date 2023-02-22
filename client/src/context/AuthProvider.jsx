import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { clientAxios } from '../config/clientAxios';

const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true); 


    useEffect(() => {
     
      const authUser = async () => {
        const token = sessionStorage.getItem('token')
        if(!token){
          setLoading(false)
          return null
        }

        const config = {
          headers: {
            "Content-Type" : "application/json",
            Authorization : token
          }
        }
        try {

          const {data} = await clientAxios.get('/users/profile', config)

          //console.log(data);

          setAuth(data.user)

          setLoading(false)
          
        } catch (error) {
          console.log(error);
          sessionStorage.removeItem('token')
          setAuth({})
          setLoading(false)
        } 
      }
      authUser()

    });

  return (
    <AuthContext.Provider
    value={{
        auth,
        setAuth,
        loading
    }}
    >

        {children}

    </AuthContext.Provider>
  )
}

export default AuthContext
