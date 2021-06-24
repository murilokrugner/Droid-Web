import { useState, useEffect, useRef, useContext } from 'react';

import api from '../../../services/api';
import apiZipcode from '../../../services/apiZipcode';

import { format } from 'date-fns'

import { AuthContext } from '../../../context/AuthContext';
import styles from '../../../styles/components/Forms/FormDescriptionOnly.module.css';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import ReactSelect from 'react-select';

import stylesLoading from '../../../styles/components/Loading.module.css';

import HashLoader from "react-spinners/HashLoader";       

import { cnpj as validateCnpj, cpf as validateCpf } from 'cpf-cnpj-validator';

import { useRouter } from 'next/router';



import { toast } from 'react-toastify';

const schema = Yup.object().shape({
    description: Yup.string().required('obrigatório'),
    made_by: Yup.string().required('obrigatorio'),
    entry_date: Yup.string().required('obrigatorio'),
    password_device: Yup.string().required('obrigatorio'),
    damaged: Yup.string().required('obrigatorio'),
    comments: Yup.string().required('obrigatorio'),
    delivery_forecast: Yup.string().required('obrigatória'),
    delivery_forecast_hour: Yup.string().required('obrigatória'),
    value: Yup.string().required('obrigatória'),
  });

export default function FormOrder({ address }) {
    const router = useRouter();

    const idClient = router.query.id;

    const { token, company, userId } = useContext(AuthContext);

    const typeDeviceRef = useRef(null);
    const typeEmployeeRef = useRef(null);
    const typeClientRef = useRef(null);
    const typeStatusRef = useRef(null);

    const [loading, setLoading] = useState(false);

    const [code, setCode] = useState(0);
    const [loadingCode, setLoadingCode] = useState(false);

    const [loadingSave, setLoadingSave] = useState(false);

    const [currentDate, setCurrentDate] = useState(format(new Date(), 'dd/MM/yyyy'));
    const [currentDateSave, setCurrentDateSave] = useState(format(new Date(), 'yyyy-MM-dd'));

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
            'value': 'AGUARDANDO PEÇA',
            'label': 'AGUARDANDO PEÇA',
        },    
    ]);

    const [selectEmployye, setSelectEmployye] = useState(null);
    const [selectClient, setSelectClient] = useState(null);
    const [selectDevice, setSelectDevice] = useState(null);
    const [selectStatus, setSelectStatus] = useState(null);

    const [checking, setCheking] = useState(false);

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

     function handleChangeCheck(e) {
         if (checking === false) {
             setCheking(true);
         } 

         if (checking === true) {
            setCheking(false);
        } 


      }

    async function handleSubmit(data) { 
        setLoadingSave(true);

        try {
            const response = await api.post(`${address}?company=${company}`, {
                description: data.description,
                employee_id: selectEmployye.value,
                made_by: currentDateSave,
                client_id: idClient,
                entry_date: currentDateSave,
                password_device: data.password_device,
                device_id: selectDevice.value,
                imei: data.imei,
                accessories: data.accessories,
                defect_problem: data.defect_problem,
                comments: data.service_performed,

                status: 'NÃO INICIADO',
                company_id: company,
                clerk_id: userId,
                password_printer: checking,
                                           
            }, {
                headers: { Authorization: `Bearer ${token}` }  
            });

            toast.success('O.S. criada com sucesso!');

            setLoadingSave(false);

            router.push({
                pathname: 'PrinterOrder',
                query: {
                    id: response.data.id,
                    address: address,
                }
            });

        } catch (error) {            
            toast.error('Erro ao realizar o cadastro');
            setLoadingSave(false);
        }
        
    }

    function handleNavigateNewDevice() {
        router.push({
            pathname: '../Devices/CreateDevice'
        });
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
    
                    <Form onSubmit={handleSubmit}>
                    <div className={styles.ContainerTitle}>
                        <strong>Código</strong>
                        <Input name="code" type="text" placeholder="Código" value={code} disabled />
                    </div>     
                    <div className={styles.ContainerTitle}>
                        <strong>Descrição</strong>               
                    <Input
                        name="description"
                        type="text"
                        placeholder="Descrição"
                    /> 
                    </div>
                    <div className={styles.ContainerTitle}>
                        <strong>Técnico</strong>
                    <div className={styles.ContainerSelect3}>
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
                    </div>
                    <div className={styles.ContainerTitle}>
                        <strong>Criado em</strong>
                    <Input
                        name="madeBy"
                        type="text"
                        placeholder="Data da O.S."
                        value={currentDate}
                        disabled
                    /> 
                    </div>
                    <div className={styles.ContainerTitle}>
                        <strong>Data de entrada</strong>
                    <Input
                        name="entry_date"
                        type="text"
                        placeholder="Data de entrada"                    
                        value={currentDate}
                        disabled
                    /> 
                    </div>
                    <div className={styles.ContainerTitle}>
                        <strong>Senha do aparelho</strong>
                    <Input
                        name="password_device"
                        type="text"
                        placeholder="Senha do aparelho"
                    /> 
                    </div>
                    <div className={styles.ContainerTitle}>
                        <strong>Aparelho</strong>
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
                        <button type="button" onClick={handleNavigateNewDevice}>Novo Aparelho</button>
                    </div>
                    </div>
                    <div className={styles.ContainerTitle}>
                        <strong>IMEI</strong>
                    <Input
                        name="imei"
                        type="text"
                        placeholder="IMEI"
                    />
                    </div>
                    <div className={styles.ContainerTitle}>
                        <strong>Acessorios</strong>
                    <Input
                        name="accessories"
                        type="text"
                        placeholder="Acessorios"
                    />
                    </div>
                    <div className={styles.ContainerTitle}>
                        <strong>Defeito/Problema apresentado</strong>
                    <Input
                        name="defect_problem"
                        type="text"
                        placeholder="Defeito/ Problema apresentado"
                    />
                    </div>

                    <div className={styles.ContainerCheck}>
                        <label>Imprimir Senha</label>
                        <Input name="checkbox" type="checkbox" defaultChecked={checking} onChange={handleChangeCheck}/>
                        
                    </div>
                   {/**  <div className={styles.ContainerTitle}>
                        <strong>Status</strong>
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
                    </div>*/}
                                                         
                    <button type="submit">{loadingSave ? 'Carregando...' : 'Gravar'}</button>

                    </Form>
                </div>
            )}
        </div>
    );
}