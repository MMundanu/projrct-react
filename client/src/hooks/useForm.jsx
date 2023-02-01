import React from 'react'
import React, {useState} from 'react';


export const useForm = (initialState = {}) => {
  
const [formValues, setformValues] = useState(initialState); 

const handleImputChange = ({ target }) => {
    setformValues({
        ...formValues,
        [target.name] : target.value
    })
}

const reset = () => {
    setformValues(initialState)
}

    return (
        formValues,
        setformValues,
        handleImputChange
  )
}
