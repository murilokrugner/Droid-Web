import { useState, useEffect, useRef, useContext, useCallback } from 'react';

import api from '../../../services/api';
import apiZipcode from '../../../services/apiZipcode';

import { AuthContext } from '../../../context/AuthContext';
import styles from '../../../styles/components/Forms/FormDescriptionOnly.module.css';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import ReactSelect from 'react-select';

import { useRouter } from 'next/router';

import InputMask2 from '../../../components/Input';

import Loading from '../../../components/Loading';

import stylesLoading from '../styles/components/Loading.module.css';

import HashLoader from "react-spinners/HashLoader";                   

import { toast } from 'react-toastify';

import { InputGroup, FormControl } from 'react-bootstrap';

import InputMask from "react-input-mask";
import IntlCurrencyInput from "react-intl-currency-input"

interface DataMask {
    cep: string;
    cpf: string;
    currency: number;
    hour: string;
    date: string;
  }


const schema = Yup.object().shape({
   service_performed: Yup.string().required('obrigatorio'),
   value: Yup.string().required('obrigatorio'),
  });


export default function FinishedOrder() {
    
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

    const testeData = '';

    const [code, setCode] = useState(0);
    const [description, setDescription] = useState('');
    const [employees, setEmployees] = useState('');
    const [made_by, setMadeBy] = useState('');
    const [clients, setClients] = useState('');
    const [entry_date, setEntryDate] = useState('');
    const [password_device, setPasswordDevice] = useState('');
    const [devices, setDevices] = useState('');
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

    const currencyConfig = {
        locale: "pt-BR",
        formats: {
          number: {
            BRL: {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            },
          },
        },
      };
      

    const [dataMask, setDataMask] = useState<DataMask>({} as DataMask);

    const handleChange = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            setDataMask({
            ...dataMask,
            [e.currentTarget.name]: e.currentTarget.value,
          });
        },
        [dataMask]
      );

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

        if (dataMask.date === undefined) {
            alert('Informe a data de entrega');
            return;
        }


        if (dataMask.hour === undefined) {
            alert('Informe a hora de entrega');
            return;
        }

        const dateSave = dataMask.date.slice(6, 10) + '-' 
                            +  dataMask.date.slice(3, 5) + '-' 
                                + dataMask.date.slice(0, 2); 

        try {
            const response = await api.put(`${addressEdit}-finished?id=${code}`, {
                service_performed: data.service_performed,
                delivery_forecast: dateSave,
                delivery_forecast_hour: dataMask.hour,                
                value: value,
                status: 'FINALIZADO',
                                           
            }, {
                headers: { Authorization: `Bearer ${token}` }  
            });

            toast.success('O.S. finalizada com sucesso!');

            setLoadingSave(false);

            router.push({
                pathname: 'PrinterOrder',
                query: {
                    id: id,
                    address: addressEdit,
                }
            });

        } catch (error) {            
            toast.error('Erro ao finalizar O.S.');
            setLoadingSave(false);
        }

        console.log(value);
        
    } 

    function handleChangeMask(event, value, maskedValue) {
        event.preventDefault();
    
        setValue(value); // value without mask (ex: 1234.56)
       // console.log(maskedValue); // masked value (ex: R$1234,56)
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
            <Form onSubmit={handleSubmit} > {/**schema={schema} */}
                <Input name="code" type="text" placeholder="Código" value={code} disabled />
                    <Input
                        name="description"
                        type="text"
                        placeholder="Descrição"
                        value={description}
                        onChange={value => setDescription(value[0])}
                        disabled
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
                            disabled
                            
                        />
                    </div>
                    <Input
                        name="madeBy"
                        type="text"
                        placeholder="Data da O.S."
                        value={made_by}
                        onChange={value => setMadeBy(value[0])}
                        disabled
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
                            disabled
                        />
                    </div>
                    <Input
                        name="entry_date"
                        type="text"
                        placeholder="Data de entrada"
                        value={entry_date}
                        onChange={value => setEntryDate(value[0])}
                        disabled
                    /> 
                    <Input
                        name="password_device"
                        type="text"
                        placeholder="Senha do aparelho"
                        value={password_device}
                        onChange={value => setPasswordDevice(value[0])}
                        disabled
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
                            disabled
                            
                        />
                    </div>
                    <Input
                        name="imei"
                        type="text"
                        placeholder="IMEI"
                        value={imei}
                        onChange={value => setImei(value[0])}
                        disabled
                    />
                    <Input
                        name="accessories"
                        type="text"
                        placeholder="Acessorios"
                        value={accessroes}
                        onChange={value => setAcessories(value[0])}
                        disabled
                    />
                    <Input
                        name="defect_problem"
                        type="text"
                        placeholder="Defeito/ Problema apresentado"
                        value={defect_problem}
                        onChange={value => setDefectProblem(value[0])}
                        disabled
                    />
                    <Input
                        name="service_performed"
                        type="text"
                        placeholder="Serviço realizado"
                        value={service_performed}
                        onChange={value => setServicePerformed(value[0])}
                    />
                    
                    <InputMask2
                        name="date"
                        mask="date"
                        onChange={handleChange}
                        placeholder="99/99/9999"
                    />
                    
                    <InputMask2
                        name="hour"
                        mask="hour"
                        onChange={handleChange}
                        placeholder="00:00"
                    />

                    <IntlCurrencyInput currency="BRL" config={currencyConfig}
                        onChange={handleChangeMask} value={value}/>
                             
                    <button type="submit">{loading ? 'Carregando...' : 'Finalizar'}</button>

                </Form> 
                </div>               
             )}
        </div>
    );
}