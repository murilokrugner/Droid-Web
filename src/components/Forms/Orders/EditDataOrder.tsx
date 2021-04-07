import { useState, useEffect, useRef, useContext } from 'react';

import api from '../../../services/api';
import apiZipcode from '../../../services/apiZipcode';

import { AuthContext } from '../../../context/AuthContext';
import styles from '../../../styles/components/Forms/FormDescriptionOnly.module.css';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import ReactSelect from 'react-select';

import stylesLoading from '../styles/components/Loading.module.css';

import HashLoader from "react-spinners/HashLoader"; 

import { useRouter } from 'next/router';

';

import { toast } from 'react-toastify';

export default function EditDataOrder({address}) {
    const router = useRouter();

    const addressEdit = router.query.address;

    const id = router.query.id;

    const { token, company } = useContext(AuthContext);

    const typeDeviceRef = useRef(null);
    const typeEmployeeRef = useRef(null);
    const typeClientRef = useRef(null);
    const typeStatusRef = useRef(null);

    const [loading, setLoading] = useState(true);

    const [loadingSave, setLoadingSave] = useState(false);

    const [code, setCode] = useState(0);
    const [description, setDescription] = useState('');
    const [employees, setEmployees] = useState(null);
    const [made_by, setMadeBy] = useState('');
    const [clients, setClients] = useState(null);
    const [entry_date, setEntryDate] = useState('');
    const [password_device, setPasswordDevice] = useState('');
    const [devices, setDevices] = useState(null);
    const [imei, setImei] = useState('');
    const [damaged, setDamaged] = useState('');
    const [accessroes, setAcessories] = useState('');
    const [defect_problem, setDefectProblem] = useState('');
    const [comments, setComments] = useState('');
    const [service_performed, setServicePerformed] = useState('');
    const [delivery_forecast, setDeliveryForecast] = useState('');
    const [delivery_forecast_hour, setDeliveryForecastHour] = useState('');
    const [value, setValue] = useState('');
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

    const [selectEmployye, setSelectEmployye] = useState(null);
    const [selectClient, setSelectClient] = useState(null);
    const [selectDevice, setSelectDevice] = useState(null);
    const [selectStatus, setSelectStatus] = useState(null);

    const [loadingCode, setLoadingCode] = useState(true);

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

    
    async function loadData() {
        const response = await api.get(`get-${addressEdit}-code?company=${company}&id=${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log(response.data);

        setCode(response.data.id);
        setDescription(response.data.description);
        setSelectEmployye([
            {
                'value': response.data.employee.id,
                'label': response.data.employee.first_name,
            }
        ]);

        setSelectClient([
            {
                'value': response.data.client.id,
                'label': response.data.client.first_name,
            }
        ]);
        setMadeBy(response.data.made_by.slice(8, 10) + '/' 
            +  response.data.made_by.slice(5, 7) + '/' 
                + response.data.made_by.slice(0, 4)); 

        setEntryDate(response.data.entry_date.slice(8, 10) + '/' 
            +  response.data.entry_date.slice(5, 7) + '/' 
                + response.data.entry_date.slice(0, 4)); 


        setPasswordDevice(response.data.password_device);
        setSelectDevice([
            {
                'value': response.data.device.id,
                'label': response.data.device.description,
            }
        ]);
        setImei(response.data.imei);
        setDamaged(response.data.damaged);
        setAcessories(response.data.accessories);
        setDefectProblem(response.data.defect_problem);
        setServicePerformed(response.data.service_performed);
        setDeliveryForecast(response.data.delivery_forecast)
        setDeliveryForecastHour(response.data.delivery_forecast_hour);
        setValue(response.data.value);
        setSelectStatus([
            {
                'value': response.data.status,
                'label': response.data.status,
            }
        ]);
        
        setLoadingCode(false);
        setLoading(false);
        
    };

    useEffect(() => {      
        if (token) {
            loadData();
            loadDevices();
            loadEmployees();
            loadClients();
        }


    }, [token]);

    async function handleSubmit(data) { 
        setLoadingSave(true);

        try {
            const response = await api.put(`${addressEdit}`, {
                id: code,
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
                status: selectStatus.value,
                company: company,
                                           
            }, {
                headers: { Authorization: `Bearer ${token}` }  
            });

            toast.success('O.S. editada com sucesso!');

            setLoadingSave(false);

            router.back();

        } catch (error) {            
            toast.error('Erro ao editar a O.S.');
            setLoadingSave(false);
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
            <Form onSubmit={handleSubmit}>
                <Input name="code" type="text" placeholder="Código" value={code} disabled />
                    <Input
                        name="description"
                        type="text"
                        placeholder="Descrição"
                        value={description}
                        onChange={value => setDescription(value[0])}
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
                        value={made_by}
                        onChange={value => setMadeBy(value[0])}
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
                        placeholder="Data de entrada"
                        value={entry_date}
                        onChange={value => setEntryDate(value[0])}
                    /> 
                    <Input
                        name="password_device"
                        type="text"
                        placeholder="Senha do aparelho"
                        value={password_device}
                        onChange={value => setPasswordDevice(value[0])}
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
                        value={imei}
                        onChange={value => setImei(value[0])}
                    />
                    <Input
                        name="accessories"
                        type="text"
                        placeholder="Acessorios"
                        value={accessroes}
                        onChange={value => setAcessories(value[0])}
                    />
                    <Input
                        name="defect_problem"
                        type="text"
                        placeholder="Defeito/ Problema apresentado"
                        value={defect_problem}
                        onChange={value => setDefectProblem(value[0])}
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