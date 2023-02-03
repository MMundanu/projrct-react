import React, {useState} from 'react';


export const useForm = (initialState = {}) => {
  
const [formValues, setformValues] = useState(initialState); 

const handleInputChange = ({ target }) => {
    setformValues({
        ...formValues,
        [target.name] : target.value
    })
}

const reset = () => {
    setformValues(initialState)
}

    return {
        formValues,
        setformValues,
        handleInputChange,
        reset
    }
}
