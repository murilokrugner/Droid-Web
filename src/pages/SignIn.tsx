import React, { useContext, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';

import styles from '../styles/pages/SignIn.module.css';
import { AuthContext } from '../context/AuthContext';

import ReactSelect from 'react-select';
import api from '../services/api';

const schema = Yup.object().shape({
    email: Yup.string()
    .required('O e-mail é obrigatório'),
    password: Yup.string().required('A senha é obrigatória'),
  });

export default function SignIn() {
    const { loading, handleSubmit, getCompany } = useContext(AuthContext);

    const [company, setCompany] = useState();


    useEffect(() => {
      async function loadCompanies() {
        const response = await api.get('/companies');

        setCompany(response.data);
      }

      loadCompanies();
    }, []); 

    async function handleLoading(data) {
      console.log(company);
      getCompany(company);
      handleSubmit(data);

      console.log(company);
    }
  
    return (
      <div className={styles.containerSignIn}>      
        <div className={styles.containerForm}>
            <img src='./logo.png' alt="logobela" height="500px" />
    
            <Form schema={schema} onSubmit={handleLoading}>
            <div className={styles.ContainerSelect}>
              <ReactSelect   
                name={company} 
                value={company}
                placeholder={'Empresa'}                    
                ref={company}
                options={company}
                isClearable={false}
                              
              />
            </div>

            <Input name="email" type="text" placeholder="Seu usuário" />
            <Input
                name="password"
                type="password"
                placeholder="Sua senha secreta"
            />
            <button type="submit">{loading ? 'Carregando...' : 'Acessar'}</button>

            </Form>
        </div>
    </div>
    );
  }