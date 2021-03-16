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

export default function FormClient({ address }) {
    const router = useRouter();

    const { token, company } = useContext(AuthContext);

    const typeDocumentRef = useRef(null);

    const [loading, setLoading] = useState(false);

    const [code, setCode] = useState(0);
    const [loadingCode, setLoadingCode] = useState(false);

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

    useEffect(() => {      
        if (token) {
            loadCode();
        }


    }, [token, selectTypeDocument]);

    async function handleSubmit(data) {
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
                ${company}_id: 1,
                first_name: data.first_name, 
                last_name: data.last_name, 
                email: data.email,
                phone: data.phone,
                mobile_phone: data.mobile_phone,
                document: data.document,
                rg: data.document2,
                address: data.address,
                number_address: data.number_address,
                point_address: data.point_address,
                neighborhood_address: data.neighborhood_address,
                cep_address: getAddress.data.cep,
                state_address: getAddress.data.uf,
                city: getAddress.data.localidade,
                type_document: selectTypeDocument.value === 'CPF' ? 1 : 2,                             
            }, {
                headers: { Authorization: `Bearer ${token}` }  
            });

            toast.success('Cadastro realizado com sucesso!');

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
                    <Loading />
                </>
            ) : (
                <div className={styles.containerForm}>
    
                    <Form onSubmit={handleSubmit} >
                    <Input name="code" type="text" placeholder="Código" value={code} disabled />
                    <Input
                        name="first_name"
                        type="text"
                        placeholder="Primeiro Nome"
                    />
                    <Input
                        name="last_name"
                        type="text"
                        placeholder="Último Nome"
                    /> 
                    <Input
                        name="email"
                        type="text"
                        placeholder="E-mail"
                    /> 
                    <Input
                        name="phone"
                        type="text"
                        placeholder="Telefone"
                    /> 
                    <Input
                        name="mobile_phone"
                        type="text"
                        placeholder="Celular"
                    /> 
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
                    {selectTypeDocument.value === 'CPF' || selectTypeDocument === 'CPF' ? (
                        <>
                            <Input
                                name="document"
                                type="text"
                                placeholder="CPF"
                            /> 
                            <Input
                                name="document2"
                                type="text"
                                placeholder="RG"
                            /> 

                        </>
                    ) : (
                        <>
                            <Input
                                name="document"
                                type="text"
                                placeholder="CNPJ"
                            /> 
                            <Input
                                name="document2"
                                type="text"
                                placeholder="IE"
                            /> 
                        </>
                    )}                    
                    <Input
                        name="address"
                        type="text"
                        placeholder="Endereço"
                    /> 
                    <Input
                        name="number_address"
                        type="text"
                        placeholder="Número"
                    /> 
                    <Input
                        name="neighborhood_address"
                        type="text"
                        placeholder="Bairro"
                    /> 
                    <Input
                        name="point_address"
                        type="text"
                        placeholder="Ponto de Referencia"
                    /> 
                    <Input
                        name="cep_address"
                        type="text"
                        placeholder="CEP"
                    /> 
                  {/* <Input
                        name="state_address"
                        type="text"
                        placeholder="Estado"
                    /> 
                    <Input
                        name="city"
                        type="text"
                        placeholder="Cidade"
                  /> */}                    
                    
                    <button type="submit">{loading ? 'Carregando...' : 'Gravar'}</button>

                    </Form>
                </div>
            )}
        </div>
    );
}