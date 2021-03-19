import { useState, useEffect, useRef, useContext } from 'react';

import api from '../../../services/api';
import apiZipcode from '../../../services/apiZipcode';

import { AuthContext } from '../../../context/AuthContext';
import styles from '../../../styles/components/Forms/FormDescriptionOnly.module.css';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import ReactSelect from 'react-select';

import { cnpj as validateCnpj, cpf as validateCpf } from 'cpf-cnpj-validator';

import { useRouter } from 'next/router';

import Loading from '../../Loading';

import { toast } from 'react-toastify';

const schema = Yup.object().shape({
    nickname: Yup.string().required('obrigatório'),
    password: Yup.string().required('obrigatório'),
  });

export default function FormUser({ address }) {
    const router = useRouter();

    const { token, company } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);

    const [code, setCode] = useState(0);
    const [loadingCode, setLoadingCode] = useState(false);
    
    async function loadCode() {
        const response = await api.get(`${address}-code?company=${company}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setCode(response.data + 1);

        setLoadingCode(false);
        setLoading(false); 
    };

    useEffect(() => {      
        if (token) {
            loadCode();
        }


    }, [token]);

    async function handleSubmit(data) {        
        try {
            const response = await api.post(`${address}?company=${company}`, {
                company_id: 1,
                nickname: data.nickname,
                password: data.password,                            
            }, {
                headers: { Authorization: `Bearer ${token}` }  
            });

            toast.success('Cadastro realizado com sucesso!');

            router.back();

        } catch (error) {
            if (error.response.status === 400) {
                toast.info('Já existe um usuario cadastrado com esse nick');
                setLoading(false);
                return
            }         

            toast.error('Erro ao realizar o cadastro');
            setLoading(false);
        }
        
    }

    return (
        <div className={styles.Container}>
            {loading && loadingCode ? (
                <>
                    <Loading />
                </>
            ) : (
                <div className={styles.containerForm}>
    
                    <Form onSubmit={handleSubmit} >
                    <Input name="code" type="text" placeholder="Código" value={code} disabled />
                    <Input
                        name="nick_name"
                        type="text"
                        placeholder="Primeiro Nome"
                    />
                    <Input
                        name="password"
                        type="text"
                        placeholder="Último Nome"
                    /> 
                                        
                    <button type="submit">{loading ? 'Carregando...' : 'Gravar'}</button>

                    </Form>
                </div>
            )}
        </div>
    );
}