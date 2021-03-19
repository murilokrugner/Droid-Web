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
    description: Yup.string().required('obrigatório'),
    made_by: Yup.string().email().required('obrigatorio'),
    entry_date: Yup.string().required('obrigatorio'),
    password_device: Yup.string().required('obrigatorio'),
    imei: Yup.string().required('obrigatorio'),
    damaged: Yup.string().required('obrigatorio'),
    accessories: Yup.string().required('obrigatorio'),
    defect_problem: Yup.string().required('obrigatorio'),
    comments: Yup.string().required('obrigatorio'),
    delivery_forecast: Yup.string().required('obrigatória'),
    delivery_forecast_hour: Yup.string().required('obrigatória'),
    value: Yup.string().required('obrigatória'),
  });

export default function FormOrder({ address }) {
    const router = useRouter();

    const { token, company } = useContext(AuthContext);

    const typeDocumentRef = useRef(null);
    const typeDeviceRef = useRef(null);
    const typeEmployeeRef = useRef(null);
    const typeClientRef = useRef(null);
    const typeStatusRef = useRef(null);

    const [loading, setLoading] = useState(false);

    const [code, setCode] = useState(0);
    const [loadingCode, setLoadingCode] = useState(false);

    const [devices, setDevices] = useState([]);
    const [clients, setClients] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [status, setStatus] = useState([        
        {
            'value': 'NÃO INICIADO',
            'label': 'NÃO INICIADO',
        },
        {
            'value': 'INICIADO',
            'label': 'INICIADO',
        },
        {
            'value': 'FINALIZADO',
            'label': 'FINALIZADO',
        },
        {
            'value': 'AGUARDANDO',
            'label': 'AGUARDANDO',
        },    
    ]);

    const [selectEmployye, setSelectEmployye] = useState();
    const [selectClient, setSelectClient] = useState();
    const [selectDevice, setSelectDevice] = useState();
    const [selectStatus, setSelectStatus] = useState();

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

    async function loadDevices() {
        const response = await api.get(`list-devices?company=${company}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setDevices(response.data);
    }

    async function loadClients() {
        const response = await api.get(`list-clients?company=${company}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setClients(response.data);
    }

    async function loadEmployees() {
        const response = await api.get(`list-employees?company=${company}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setEmployees(response.data);
    }

    useEffect(() => {      
        if (token) {
            loadCode();
            loadDevices();
            loadClients();
            loadEmployees();
        }


    }, [token, selectTypeDocument]);

    async function handleSubmit(data) {           
        try {
            const response = await api.post(`${address}?company=${company}`, {
                description: data.description,
                employee_id: employees.value,
                made_by: data.madeBy,
                client_id: clients.value,
                entry_date: data.entry_date,
                password_device: data.password_device,
                device_id: devices.value,
                imei: data.imei,
                damaged: data.damaged,
                accessories: data.accessories,
                defect_problem: data.defect_problem,
                comments: data.service_performed,
                delivery_forecast: data.delivery_forecast,
                delivery_forecast_hour: data.delivery_forecast_hour,
                value: data.value,
                status: status.value,
                company_id: company,
                                           
            }, {
                headers: { Authorization: `Bearer ${token}` }  
            });

            toast.success('O.S. criada com sucesso!');

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
                    <Loading />
                </>
            ) : (
                <div className={styles.containerForm}>
    
                    <Form onSubmit={handleSubmit} schema={schema}>
                    <Input name="code" type="text" placeholder="Código" value={code} disabled />
                    <Input
                        name="description"
                        type="text"
                        placeholder="Descrição"
                    /> 
                    <div className={styles.ContainerSelect2}>
                        <ReactSelect   
                            name={selectEmployye} 
                            value={selectEmployye}
                            onChange={value => setSelectEmployye(value)}
                            placeholder={'Técnico'}                    
                            ref={typeEmployeeRef}
                            options={employees}
                            isClearable={false}
                            isLoading={loading}
                            
                        />
                    </div>
                    <Input
                        name="madeBy"
                        type="text"
                        placeholder="Data da O.S."
                    /> 
                    <div className={styles.ContainerSelect2}>
                        <ReactSelect   
                            name={selectClient} 
                            value={selectClient}
                            onChange={value => setSelectClient(value)}
                            placeholder={'Cliente'}                    
                            ref={typeClientRef}
                            options={clients}
                            isClearable={false}
                            isLoading={loading}
                            
                        />
                    </div>
                    <Input
                        name="entry_date"
                        type="text"
                        placeholder="Entry Date"
                    /> 
                    <Input
                        name="password_device"
                        type="text"
                        placeholder="Senha do aparelho"
                    /> 
                    <div className={styles.ContainerSelect2}>
                        <ReactSelect   
                            name={selectDevice} 
                            value={selectDevice}
                            onChange={value => setSelectDevice(value)}
                            placeholder={'Aparelho'}                    
                            ref={typeDeviceRef}
                            options={devices}
                            isClearable={false}
                            isLoading={loading}
                            
                        />
                    </div>
                    <Input
                        name="imei"
                        type="text"
                        placeholder="IMEI"
                    />
                    <Input
                        name="damaged"
                        type="text"
                        placeholder="Damaged"
                    />
                    <Input
                        name="accessories"
                        type="text"
                        placeholder="Acessorios"
                    />
                    <Input
                        name="defect_problem"
                        type="text"
                        placeholder="Defeito"
                    />
                    <Input
                        name="service_performed"
                        type="text"
                        placeholder="Service Performed"
                    />
                    <Input
                        name="delivery_forecast"
                        type="text"
                        placeholder="Delivery"
                    />
                    <Input
                        name="delivery_forecast_hour"
                        type="text"
                        placeholder="Delivery Hour"
                    />
                    <Input
                        name="value"
                        type="text"
                        placeholder="Valor"
                    />
                    <div className={styles.ContainerSelect2}>
                        <ReactSelect   
                            name={selectStatus} 
                            value={selectStatus}
                            onChange={value => setSelectStatus(value)}
                            placeholder={'Status'}                    
                            ref={typeStatusRef}
                            options={status}
                            isClearable={false}
                            isLoading={loading}
                            
                        />
                    </div>
                                                         
                    <button type="submit">{loading ? 'Carregando...' : 'Gravar'}</button>

                    </Form>
                </div>
            )}
        </div>
    );
}