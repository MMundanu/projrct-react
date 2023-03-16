import React from 'react'
import { Button } from 'react-bootstrap'

export const Task = ({name, description, dateExpire, priority}) => {
  return (
    <div className='w-100 p-2 d-flex flex-wrap justify-content-between mx-2 my-2 border border-1 rounded align-items-center ' >
        <div>
            <p className='fs-5' >{name}</p>
            <p className='fs-6'>{description}</p>
            <p className='fs-5'>{dateExpire.split('T')[0]} </p>
            <p className='fs-6'>{priority}</p>
        </div>
        <div>
            <Button className='bg-success mx-1' >
                Editar
            </Button>
            {
                false ? (
                    <Button className='bg-info'>
                        Completa
                    </Button>
                ):(
                    <Button className='bg-info' >
                        Incompleta 
                    </Button>
                )
            }
            <Button className='bg-danger mx-1'>
                Eliminar 
            </Button>
        </div>
    </div>
  )
}
