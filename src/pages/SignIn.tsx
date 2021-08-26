import React, { useContext, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';

import styles from '../styles/pages/SignIn.module.css';
import { AuthContext } from '../context/AuthContext';

import ReactSelect from 'react-select';
import api from '../services/api';

const schema = Yup.object().shape({
    password: Yup.string().required('A senha é obrigatória'),
  });

export default function SignIn() {
    const { loading, handleSubmit, getCompany, getUser } = useContext(AuthContext);

    const [company, setCompany] = useState();
    const [selectCompany, setSelectCompany] = useState(null);

    const [users, setUsers] = useState();
    const [selectUser, setSelectUser] = useState(null);


    useEffect(() => {
      async function loadCompanies() {
        const response = await api.get('/companies');

        setCompany(response.data);
      }

      async function loadUsers() {
        const response = await api.get('/users-signin');

        setUsers(response.data);
      } 

      loadCompanies();
      loadUsers();
    }, []); 

    async function handleLoading(data) {
      if (selectCompany === undefined) {
        alert('Selecione a empresa');
        return;
      }

      if (selectUser === undefined) {
        alert('Selecione um usuário');
        return;
      }

      getCompany(selectCompany.value, selectCompany.label);
      getUser(selectUser.value, selectUser.label);

      handleSubmit(data);
     
    }
  
    return (
      <div className={styles.containerSignIn}>      
        <div className={styles.containerForm}>
            <img src='./logo.png' alt="logo" height="500px" />
    
            <Form schema={schema} onSubmit={handleLoading}>
            <div className={styles.ContainerSelect}>
              <ReactSelect   
                name={company} 
                placeholder={'Empresa'}  
                onChange={value => setSelectCompany(value)}                  
                ref={company}
                options={company}
                isClearable={false}
                              
              />
            </div>

            <div className={styles.ContainerSelect}>
              <ReactSelect   
                name={users} 
                placeholder={'Usuário'}  
                onChange={value => setSelectUser(value)}                  
                ref={users}
                options={users}
                isClearable={false}
                              
              />
            </div>
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