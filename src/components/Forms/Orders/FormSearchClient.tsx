import {useEffect, useState, useContext} from 'react';
import { AuthContext } from '../../../context/AuthContext';
import api from '../../../services/api';
import { useRouter } from 'next/router';
import styles from '../../../styles/components/Forms/FormDescriptionOnly.module.css';
import { Form, Input } from '@rocketseat/unform';


import stylesLoading from '../../../styles/components/Loading.module.css';

import HashLoader from "react-spinners/HashLoader";

import { RadioGroup, RadioButton } from 'react-radio-buttons';

interface Data {
    map: (data: object) => void;
    item: Array<object>,
}

export default function FormSearchClient({address}) {
    const router = useRouter();

    const { token, company } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);

    const [data, setData] = useState<Data>(null);

    const [search, setSearch] = useState('');

    const [checked, setChecked] = useState('document');

    async function handleSearch(data) {
        if (checked === 'document') {
            setLoading(true);

            const response = await api.get(`clients-document?company=${company}&search=${data.search}`, 
            {
                headers: { Authorization: `Bearer ${token}` }  
            });

            console.log(response.data);

            setData(response.data);

            setLoading(false);
        } 

        if (checked === 'name') {
            setLoading(true);

            const response = await api.get(`clients-name?company=${company}&search=${data.search}`, 
            {
                headers: { Authorization: `Bearer ${token}` }  
            });

            setData(response.data);

            setLoading(false);
        }
    }

    async function handleNext(id) {
        router.push({
            pathname: 'CreateOrderData',
            query: {
                id: id,
            }
        });
    }

    return (
        <div className={styles.containerForm}>
            <>
            <Form onSubmit={handleSearch}>
                <div className={styles.ContainerSelected}>
                <RadioGroup onChange={ setChecked } horizontal value={checked}>
                    <RadioButton value="document" rootColor={'#000'}
                        pointColor={'#fff'}
                    >
                        CPF
                    </RadioButton>
                    <RadioButton value="name" rootColor={'#000'}
                        pointColor={'#fff'}>
                        Nome
                    </RadioButton>
                </RadioGroup>
                    
                </div>
                <Input name="search" type="text" 
                    placeholder="Pesquisar"
                />
                </Form>

                { loading ? (
                    <div className={stylesLoading.Container}>
                        <HashLoader color='#fff' loading={loading} size={60} />
                    </div>
                ) : (
                    <>
                        {data === null ? (
                            <span>Nenhum cliente encontrado</span>
                        ) : (
                            <>
                                {data.map(item => (
                                    <div className={styles.ContainerClient}>  
                                        <button type="button" onClick={() => {handleNext(item.id)}}>
                                            <span>{item.id}</span>
                                            <span>{item.first_name}</span>
                                            <span>{item.last_name}</span>
                                        </button>
                                    </div>
                                ))}
                            </>
                        )}
                    </>
                )}
                </>
        </div>
    )
}