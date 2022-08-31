import React from 'react'


const types = { 
  email: {
    regex: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    message: 'Preencha um email válido',
  },
  password: {
    regex: /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}$/,
    message: 'A senha prescisa ter 1 caracter maíusculo, 1 minúsculo e 1 digito. Com no mínimo 8 caracteres.'
  },
  Number: {
    regex: /^\d+$/,
    message: 'Utilize números apenas.',
  }
};


const useForm = (type) => {
   const [value, setValue] = React.useState('');
   const [error, setError] = React.useState(null);

   function validate(value) { 
     if(type === false) return true;
     if(value.length === 0) {
        setError('Preencha um valor.')
        return false;
     } else if(types[type] && !types[type].regex.test(value)) {
        setError(types[type].message);
        return false;
     } else {
        setError(null);
        return true;
     }
   }

   function onChange({target}) {
    if(error) validate(target.value);
    setValue(target.value);
   }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
}

export default useForm;
