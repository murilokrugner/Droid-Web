import React, {useState, useEffect, useContext, useCallback} from 'react';
import { Form, Input } from '@rocketseat/unform';

import styles from '../../styles/pages/SignIn.module.css';

import ReactSelect from 'react-select';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

import InputMask2 from '../../components/Input';

import ListData from '../../components/Forms/ListData';
import ListDataSearch from '../../components/Forms/ListDataSearch';
import { toast } from 'react-toastify';

interface DataMask {
    cep: string;
    cpf: string;
    currency: number;
    hour: string;
    date: string;
    date2: string;
  }

export default function Search({status}) {
    const { token, company } = useContext(AuthContext);

    const [filter, setFilter] = useState(
          [
            { value: 'CLIENTE', label: 'CLIENTE' },
            { value: 'CÓDIGO O.S.', label: 'CÓDIGO O.S.' },
            { value: 'DATA DE ENTREGA', label: 'DATA DE ENTREGA' }
          ]
    );
    const [selectFilter, setSelectFilter] = useState({ value: 'CLIENTE', label: 'CLIENTE' });
    const [resultSearch, setResultSearch] = useState(null);

    const [dataMask, setDataMask] = useState<DataMask>({} as DataMask);
    const [dataMask2, setDataMask2] = useState<DataMask>({} as DataMask);

    async function loadSearchClients(search) {
        try {
            const response = await api.get(`/search-orders?company=${company}&status=${status}&type=client&search=${search.search}`,{
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.empty) {
                toast.warn('Nenhum registro encontrado');
                setResultSearch(null);
            } else {
                setResultSearch(response.data);
            }
        } catch (error) {
            
        }
    }

    async function loadSearchCode(search) {
        try {
            const response = await api.get(`/search-orders?company=${company}&status=${status}&type=code&search=${search.search}`,{
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.empty) {
                toast.warn('Nenhum registro encontrado');
                setResultSearch(null);
            } else {
                setResultSearch(response.data);
            }
  
        } catch (error) {
            
        }
    }

    async function loadSearchDate(search) {
        const dateFormated = dataMask.date.slice(3, 5) + '/' + dataMask.date.slice(0, 2) + '/' + dataMask.date.slice(6, 10);
        const dateFormated2 = dataMask2.date2.slice(3, 5) + '/' + dataMask2.date2.slice(0, 2) + '/' + dataMask2.date2.slice(6, 10);

       try {
            const response = await api.get(`/search-orders?company=${company}&status=${status}&type=date&search=${dateFormated}&search2=${dateFormated2}`,{
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.empty) {
                toast.warn('Nenhum registro encontrado');
                setResultSearch(null);
            } else {
                setResultSearch(response.data);
            }
           

        } catch (error) {
            
        }
    }

    async function handleLoading(search) {
        if (selectFilter.value === 'CLIENTE') {
            loadSearchClients(search);
        } else if (selectFilter.value === 'CÓDIGO O.S.') {
            loadSearchCode(search);
        } else if (selectFilter.value === 'DATA DE ENTREGA') {
            loadSearchDate(search);
        }
    }

    const handleChange = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            setDataMask({
            ...dataMask,
            [e.currentTarget.name]: e.currentTarget.value,
          });
        },
        [dataMask]
      )

      const handleChange2 = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            setDataMask2({
            ...dataMask,
            [e.currentTarget.name]: e.currentTarget.value,
          });
        },
        [dataMask2]
      )

      useEffect(() => {

      }, [resultSearch]);

    return (
        <>
        <div className={styles.containerForm}>
        <Form onSubmit={handleLoading}>
            <div className={styles.ContainerSelect}>
              <ReactSelect   
                name={filter} 
                placeholder={'Filtros'}  
                onChange={value => setSelectFilter(value)}                  
                ref={filter}
                options={filter}
                isClearable={false}
                              
              />
            </div>

            {selectFilter.value === 'DATA DE ENTREGA' ? (
                <>
                   

                    <div className={styles.containerDate}>
                        <InputMask2
                            name="date"
                            mask="date"
                            onChange={handleChange}
                            placeholder="99/99/9999"
                        />

                        <div className={styles.containerStrong}>
                            <strong>Até</strong>
                        </div>
                        
                        <InputMask2
                            name="date2"
                            mask="date"
                            onChange={handleChange2}
                            placeholder="99/99/9999"
                        />
                    </div>
                    
                </>
            ) : (
                <Input
                    name="search"
                    type="text"
                    placeholder="Pesquisa"
                />
            )}
            
            <button type="submit">Pesquisar</button>
        </Form>
        </div>

        {resultSearch === null ? (
            <ListData address={'orders'} />
        ) : (
            <ListDataSearch address={'orders'} result={resultSearch}/>
        )}
                
        </>
    )
}