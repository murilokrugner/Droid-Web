import { useState, useEffect, useRef, useContext } from 'react';

import api from '../../../services/api';
import apiZipcode from '../../../services/apiZipcode';

import { AuthContext } from '../../../context/AuthContext';
import styles from '../../../styles/components/Forms/FormDescriptionOnly.module.css';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import ReactSelect from 'react-select';

import { useRouter } from 'next/router';

import Loading from '../../Loading';

import { toast } from 'react-toastify';

import stylesLoading from '../styles/components/Loading.module.css';

import HashLoader from "react-spinners/HashLoader";                   

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

export default function EditDataEmployee() {
    const router = useRouter();

    const addressEdit = router.query.address;

    const id = router.query.id;

    const { token, company } = useContext(AuthContext);

    const typeDocumentRef = useRef(null);

    const [loading, setLoading] = useState(true);

    const [code, setCode] = useState(0);
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [mobile_phone, setMobilePhone] = useState('');
    const [document, setDocument] = useState('');
    const [rg, setRg] = useState('');
    const [addressDescription, setAddressDescription] = useState('');
    const [number_address, setNumberAddress] = useState('');
    const [point_address, setPointAddress] = useState('');
    const [neighborhood_address, setNeighborhoodAddress] = useState('');
    const [cep_address, setCepAddress] = useState('');
    const [state_address, setStateAddress] = useState('');
    const [city, setCity] = useState('');

    const [loadingCode, setLoadingCode] = useState(true);

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
    
    async function loadData() {
        const response = await api.get(`get-${addressEdit}-code?company=${company}&id=${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setCode(response.data.id);
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setMobilePhone(response.data.mobile_phone);
        setDocument(response.data.document);
        setRg(response.data.rg);
        setAddressDescription(response.data.address);
        setNumberAddress(response.data.number_address);
        setPointAddress(response.data.point_address);
        setNeighborhoodAddress(response.data.neighborhood_address);
        setCepAddress(response.data.cep_address);
        setStateAddress(response.data.state_address);
        setCity(response.data.city);
        
        setLoadingCode(false);
        setLoading(false);

        
    };

    useEffect(() => {      
        if (token) {
            loadData();
        }


    }, [token, selectTypeDocument]);

    async function handleSubmit(data) {   
        setLoading(true);

        try {
            const getAddress = await apiZipcode.get(`${data.cep_address}/json`);

        } catch (error) {            
            toast.info('O CEP digitado não existe');
            return;
        }

        const getAddress = await apiZipcode.get(`${data.cep_address}/json`);
            
        try {
            const response = await api.put(`${addressEdit}?company=${company}&id=${id}`, {
                first_name: data.first_name, 
                last_name: data.last_name, 
                phone: data.phone,
                mobile_phone: data.mobile_phone,
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

            toast.success('Cadastro atualizado com sucesso!');

            setLoading(false);

            router.back();

        } catch (error) {       
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
                    <Input name="code" type="text" placeholder="Código" value={code} disabled />
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
                    <Input
                        name="first_name"
                        type="text"
                        placeholder="Primeiro Nome"
                        value={first_name}
                        onChange={value => setFirstName(value[0])}
                    />
                    <Input
                        name="last_name"
                        type="text"
                        placeholder="Último Nome"
                        value={last_name}
                        onChange={value => setLastName(value[0])}
                    /> 
                    <Input
                        name="email"
                        type="text"
                        placeholder="E-mail"
                        value={email}
                        onChange={value => setEmail(value[0])}
                        disabled
                    /> 
                    <Input
                        name="phone"
                        type="text"
                        placeholder="Telefone"
                        value={phone}
                        onChange={value => setPhone(value[0])}
                    /> 
                    <Input
                        name="mobile_phone"
                        type="text"
                        placeholder="Celular"
                        value={mobile_phone}
                        onChange={value => setMobilePhone(value[0])}
                    />                     
                    {selectTypeDocument.value === 'CPF' || selectTypeDocument === 'CPF' ? (
                        <>
                            <Input
                                name="document"
                                type="text"
                                placeholder="CPF"
                                value={document}
                                onChange={value => setDocument(value[0])}
                                disabled
                            /> 
                            <Input
                                name="document2"
                                type="text"
                                placeholder="RG"
                                value={rg}
                                onChange={value => setRg(value[0])}
                            /> 

                        </>
                    ) : (
                        <>
                            <Input
                                name="document"
                                type="text"
                                placeholder="CNPJ"
                                value={document}
                                onChange={value => setDocument(value[0])}
                                disabled
                            /> 
                            <Input
                                name="document2"
                                type="text"
                                placeholder="IE"
                                value={rg}
                                onChange={value => setRg(value[0])}
                            /> 
                        </>
                    )}                    
                    <Input
                        name="address"
                        type="text"
                        placeholder="Endereço"
                        value={addressDescription}
                        onChange={value => setAddressDescription(value[0])}
                    /> 
                    <Input
                        name="number_address"
                        type="text"
                        placeholder="Número"
                        value={number_address}
                        onChange={value => setNumberAddress(value[0])}
                    /> 
                    <Input
                        name="neighborhood_address"
                        type="text"
                        placeholder="Bairro"
                        value={neighborhood_address}
                        onChange={value => setNeighborhoodAddress(value[0])}
                    /> 
                    <Input
                        name="point_address"
                        type="text"
                        placeholder="Ponto de Referencia"
                        value={point_address}
                        onChange={value => setPointAddress(value[0])}
                    /> 
                    <Input
                        name="cep_address"
                        type="text"
                        placeholder="CEP"
                        value={cep_address}
                        onChange={value => setCepAddress(value[0])}
                    /> 
                  <Input
                        name="state_address"
                        type="text"
                        placeholder="Estado"
                        value={state_address}
                        onChange={value => setStateAddress(value[0])}
                        disabled
                    /> 
                    <Input
                        name="city"
                        type="text"
                        placeholder="Cidade"
                        value={city}
                        onChange={value => setCity(value[0])}
                        disabled
                  />                   
                    
                    <button type="submit">{loading ? 'Carregando...' : 'Gravar'}</button>

                    </Form>
                </div>
            )}
        </div>
    );
}