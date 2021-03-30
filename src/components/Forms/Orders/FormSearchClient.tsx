import {useEffect, useState, useContext} from 'react';
import { AuthContext } from '../../../context/AuthContext';
import api from '../../../services/api';
import { useRouter } from 'next/router';
import styles from '../../../styles/components/Forms/FormDescriptionOnly.module.css';
import { Form, Input } from '@rocketseat/unform';
import Loading from '../../Loading';

import { RadioGroup, RadioButton } from 'react-radio-buttons';

export default function FormSearchClient() {
    const router = useRouter();

    const { token, company } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);

    const [data, setData] = useState('empty');

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
                    <Loading />
                ) : (
                    <>
                        {data === 'empty' ? (
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