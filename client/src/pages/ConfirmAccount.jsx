import {useEffect, useState} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Alert } from '../components/Alert';

import { clientAxios } from '../config/clientAxios';


export const ConfirmAccount = () => {

  const {token} = useParams();

  const navigate = useNavigate();

  const [alert, setAlert] = useState({});

  const handleShowAlert = (msg) => {
    setAlert({
      msg
    });

  };

  useEffect(() => {
   
    const confirmAccount = async () => {
      try {

        const {data} = await clientAxios.get(`/auth/checked?token=${token}`);

        Swal.fire({
          icon: 'info',
          title: 'Felicitaciones!',
          text: data.msg,
          confirmButtonText : "Iniciá sesión",
          allowOutsideClick : false
        }).then(result => {
          if(result.isConfirmed){
            navigate("/")
            console.log('redirect')
          }
        })        
      } catch (error) {
        console.error(error)
        handleShowAlert(error.response?.data.msg.message)
      }
    }

    confirmAccount();

  }, []);
  

  return (
    <>
       <h1 >
        Confirma tu cuenta
      </h1>
      <div >

      {
        
      alert.msg && (
        <>
        
        <Alert {...alert}/>
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
        </>
      )

      }
    
      </div>
        
    </>
  )
}