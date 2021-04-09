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

import stylesLoading from '../../../styles/components/Loading.module.css';

import HashLoader from "react-spinners/HashLoader";                   



import { toast } from 'react-toastify';

const schema = Yup.object().shape({
    first_name: Yup.string().required('O primeiro nome é obrigatório'),
    last_name: Yup.string().required('O ultimo nome é obrigatório'),
    email: Yup.string().email().required('O e-mail é obrigatorio'),
    phone: Yup.string().required('O telefone é obrigatorio'),
    mobile_phone: Yup.string().required('O celular é obrigatorio'),
    document: Yup.string().required('O documento é obrigatorio'),
    rg: Yup.string().required('O documento é obrigatorio'),
    address: Yup.string().required('O endereço é obrigatorio'),
    number_address: Yup.string().required('O número é obrigatorio'),
    neighborhood_address: Yup.string().required('O bairro é obrigatorio'),
    cep_address: Yup.string().required('O CEP é obrigatorio'),
    state_address: Yup.string().required('O estado é obrigatorio'),
    city: Yup.string().required('A cidade é obrigatória'),
  });

export default function FormEmployee({ address }) {
    const router = useRouter();

    const { token, company } = useContext(AuthContext);

    const typeDocumentRef = useRef(null);
    const positionRef = useRef(null);
    const userRef = useRef(null);

    const [loading, setLoading] = useState(false);

    const [code, setCode] = useState(0);
    const [loadingCode, setLoadingCode] = useState(false);

    const [selectPosition, setSelectPosition] = useState(null);
    const [position, setPosition] = useState([]);

    const [user, setUser] = useState([]);
    const [selectUser, setSelectUser] = useState(null);

    const [typeDocument, setTypeDocument] = useState([
        {
            'value': 'CPF',
            'label': 'CPF',
        },
        {
            'value': 'CNPJ',
            'label': 'CNPJ',
        },
    ]);

    const [selectTypeDocument, setSelectTypeDocument] = useState(
        {
            'value': 'CPF',
            'label': 'CPF',
        },
    );
    
    async function loadCode() {
        const response = await api.get(`${address}-code?company=${company}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setCode(response.data + 1);

        setLoadingCode(false);
        setLoading(false);

        
    };

    async function loadUsers() {
        const response = await api.get(`list-users?company=${company}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setUser(response.data);

        setLoadingCode(false);
        setLoading(false);        
    };

    async function loadPositions() {
        const response = await api.get(`positions?company=${company}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setPosition(response.data);

        setLoadingCode(false);
        setLoading(false);        
    };

    useEffect(() => {      
        if (token) {
            loadCode();
            loadPositions();
            loadUsers();
        }


    }, [token, selectTypeDocument]);

    async function handleSubmit(data) {
        setLoading(true);

        if (selectTypeDocument.value === 'CPF') {
            if (validateCpf.isValid(data.document) === false) {
                toast.info('O CPF digitado não existe');
                return;
            }
        } else {
            if (validateCnpj.isValid(data.document) === false) {
                toast.info('O CNPJ digitado não existe');
                return;
            }
        }

        try {
            const getAddress = await apiZipcode.get(`${data.cep_address}/json`);

        } catch (error) {            
            toast.info('O CEP digitado não existe');
            return;
        }

        const getAddress = await apiZipcode.get(`${data.cep_address}/json`);
            
        try {
            const response = await api.post(`${address}?company=${company}`, {
                company_id: 1,
                first_name: data.first_name, 
                last_name: data.last_name, 
                email: data.email,
                phone: data.phone,
                mobile_phone: data.mobile_phone,
                document: data.document,                
                address: data.address,
                number_address: data.number_address,
                point_address: data.point_address,
                neighborhood_address: data.neighborhood_address,
                cep_address: getAddress.data.cep,
                state_address: getAddress.data.uf,
                city: getAddress.data.localidade,
                type_document: selectTypeDocument.value === 'CPF' ? 1 : 2,   
                user_id: selectUser.value,
                position_id: selectPosition.value,    
                rg: data.document2,                      
            }, {
                headers: { Authorization: `Bearer ${token}` }  
            });

            toast.success('Cadastro realizado com sucesso!');

            setLoading(false);

            router.back();

        } catch (error) {
            if (error.response.status === 400) {
                toast.info('Já existe um cliente cadastrado com esse CPF/CNPJ');
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
                    <div className={stylesLoading.Container}>
                        <HashLoader color='#fff' loading={loading} size={60} />
                    </div>
                </>
            ) : (
                <div className={styles.containerForm}>
    
                    <Form onSubmit={handleSubmit} >
                    <div className={styles.ContainerTitle}>
                        <strong>Código</strong>
                    <Input name="code" type="text" placeholder="Código" value={code} disabled />
                    </div>
                    <div className={styles.ContainerTitle}>
                        <strong>Primeiro Nome</strong>
                    <Input
                        name="first_name"
                        type="text"
                        placeholder="Primeiro Nome"
                    />
                    </div>
                    <div className={styles.ContainerTitle}>
                        <strong>Ultimo Nome</strong>/
                    <Input
                        name="last_name"
                        type="text"
                        placeholder="Último Nome"
                    /> 
                    </div>
                    <div className={styles.ContainerTitle}>
                        <strong>E-mail</strong>
                    <Input
                        name="email"
                        type="text"
                        placeholder="E-mail"
                    /> 
                    </div>
                    <div className={styles.ContainerTitle}>
                        <strong>Telefone</strong>
                    <Input
                        name="phone"
                        type="text"
                        placeholder="Telefone"
                    /> 
                    </div>
                    <div className={styles.ContainerTitle}>
                        <strong>Celular</strong>
                    <Input
                        name="mobile_phone"
                        type="text"
                        placeholder="Celular"
                    /> 
                    </div>
                    <div className={styles.ContainerTitle}>
                        <strong>Tipo do documento</strong>
                    <div className={styles.ContainerSelect2}>
                        <ReactSelect   
                            name={selectTypeDocument} 
                            value={selectTypeDocument}
                            onChange={value => setSelectTypeDocument(value)}
                            placeholder={'Tipo do documento'}                    
                            ref={typeDocumentRef}
                            options={typeDocument}
                            isClearable={false}
                            isLoading={loading}
                            
                        />
                    </div>
                    </div>
                    <div className={styles.ContainerTitle}>
                        <strong>Cargo</strong>
                    <div className={styles.ContainerSelect2}>
                        <ReactSelect   
                            name={selectPosition} 
                            value={selectPosition}
                            onChange={value => setSelectPosition(value)}
                            placeholder={'Cargo'}                    
                            ref={positionRef}
                            options={position}
                            isClearable={false}
                            isLoading={loading}
                            
                        />
                    </div>
                    </div>
                    <div className={styles.ContainerTitle}>
                        <strong>Usuário</strong>
                    <div className={styles.ContainerSelect2}>
                        <ReactSelect   
                            name={selectUser} 
                            value={selectUser}
                            onChange={value => setSelectUser(value)}
                            placeholder={'Usuário'}                    
                            ref={userRef}
                            options={user}
                            isClearable={false}
                            isLoading={loading}
                            
                        />
                    </div>
                    </div>
                    {selectTypeDocument.value === 'CPF'  ? (
                        <>
                            <div className={styles.ContainerTitle}>
                                <strong>CPF</strong>
                            <Input
                                name="document"
                                type="text"
                                placeholder="CPF"
                            /> 
                            </div>
                            <div className={styles.ContainerTitle}>
                                <strong>RG</strong>
                            <Input
                                name="document2"
                                type="text"
                                placeholder="RG"
                            /> 
                            </div>
                        </>
                    ) : (
                        <>
                        <div className={styles.ContainerTitle}>
                            <strong>CNPJ</strong>
                            <Input
                                name="document"
                                type="text"
                                placeholder="CNPJ"
                            /> 
                            </div>
                            <div className={styles.ContainerTitle}>
                                <strong>IE</strong>
                            <Input
                                name="document2"
                                type="text"
                                placeholder="IE"
                            /> 
                            </div>
                        </>
                    )}           
                    <div className={styles.ContainerTitle}>
                        <strong>Endereço</strong>         
                    <Input
                        name="address"
                        type="text"
                        placeholder="Endereço"
                    /> 
                    </div>
                    <div className={styles.ContainerTitle}>
                        <strong>Número</strong>
                    <Input
                        name="number_address"
                        type="text"
                        placeholder="Número"
                    /> 
                    </div>
                    <div className={styles.ContainerTitle}>
                        <strong>Bairro</strong>
                    <Input
                        name="neighborhood_address"
                        type="text"
                        placeholder="Bairro"
                    /> 
                    </div>
                    <div className={styles.ContainerTitle}>
                        <strong>Ponto de referencia</strong>
                    <Input
                        name="point_address"
                        type="text"
                        placeholder="Ponto de Referencia"
                    /> 
                    </div>
                    <div className={styles.ContainerTitle}>
                        <strong>CEP</strong>
                    <Input
                        name="cep_address"
                        type="text"
                        placeholder="CEP"
                    /> 
                    </div>
                                
                    <button type="submit">{loading ? 'Carregando...' : 'Gravar'}</button>

                    </Form>
                </div>
            )}
        </div>
    );
}