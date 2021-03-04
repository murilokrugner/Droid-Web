import { useState, useEffect, useRef } from 'react';

import api from '../../services/api';

import styles from '../../styles/components/Forms/FormDescriptionOnly.module.css';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import ReactSelect from 'react-select';

import Loading from '../Loading';

import { toast } from 'react-toastify';

const schema = Yup.object().shape({
    description: Yup.string().required('A descrição é obrigatória'),
  });


export default function FormDescriptionOnly({ address }) {
    const brandRef = useRef(null);
    const groupRef = useRef(null);

    const [loading, setLoading] = useState(true);

    const [code, setCode] = useState(0);

    const [brands, setBrands] = useState([]);
    const [brand, setBrand] = useState();

    const [groups, setGroups] = useState([]);
    const [group, setGroup] = useState();

    useEffect(() => {  
        async function loadBrands() {
            const response = await api.get('brands?company=1', {
                headers: { Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjE0ODEzODc4LCJleHAiOjE2MTU0MTg2Nzh9.g5ZIghKcm9OBqwpKiSL-LITnueHo4OdT1mgA8mI07QU'}` }
            });

            setBrands(response.data);
            
        }

        async function loadGroups() {   
            const response = await api.get('groups?company=1', {
                headers: { Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjE0ODEzODc4LCJleHAiOjE2MTU0MTg2Nzh9.g5ZIghKcm9OBqwpKiSL-LITnueHo4OdT1mgA8mI07QU'}` }
            });

            setGroups(response.data);

            setLoading(false);
        }

        async function loadCode() {
            const response = await api.get(`device-code?company=1`, {
                headers: { Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjE0ODEzODc4LCJleHAiOjE2MTU0MTg2Nzh9.g5ZIghKcm9OBqwpKiSL-LITnueHo4OdT1mgA8mI07QU'}` }
            });

            setCode(response.data);

            setLoading(false);
        };

        if (address === 'devices') {            
            loadBrands();
            loadGroups();
            loadCode();
        }

    }, []);

    async function handleSubmit(data) {
        
        if (data.description === '') {
            toast.error('Informe um descrição');
            return;
        }

        if (address === 'devices') {
            if (brand === undefined) {
                toast.error('Selecione uma marca');
                return;
            }
    
            if (group === undefined) {
                toast.error('Selecione um grupo');
                return;
            }
        }

        if (address === 'devices') {
            try {
                setLoading(true);
    
                const response = await api.post(`${address}`, {
                    description: data.description,
                    brand_id: brand.value,
                    group_id: group.value,
                    company_id: 1,
                }, {
                    headers: { Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjE0ODEzODc4LCJleHAiOjE2MTU0MTg2Nzh9.g5ZIghKcm9OBqwpKiSL-LITnueHo4OdT1mgA8mI07QU'}` }
                });
    
                setLoading(false);
    
                toast.success('Cadastro realizado com sucesso!');
    
            } catch (error) {
                console.log(error);
                toast.error('Erro ao realizar o cadastro');
                setLoading(false);
            }
        } else {
            try {
                setLoading(true);
    
                const response = await api.post(`${address}`, {
                    description: data.description,
                    company_id: 1,
                }, {
                    headers: { Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjE0ODEzODc4LCJleHAiOjE2MTU0MTg2Nzh9.g5ZIghKcm9OBqwpKiSL-LITnueHo4OdT1mgA8mI07QU'}` }
                });
    
                setLoading(false);
    
                toast.success('Cadastro realizado com sucesso!');
    
            } catch (error) {
                console.log(error);
                toast.error('Erro ao realizar o cadastro');
                setLoading(false);
            }
        }
    }

    return (
        <div className={styles.Container}>
            {loading ? (
                <>
                    <Loading />
                </>
            ) : (
                <div className={styles.containerForm}>
    
                    <Form onSubmit={handleSubmit}>
                    <Input name="code" type="text" placeholder="Código" value={code} disabled />
                    <Input
                        name="description"
                        type="text"
                        placeholder="Descrição do aparelho"
                    />

                    {address === 'devices' && (
                        <div className={styles.ContainerSelect}>
                            <ReactSelect    
                                name={brand}
                                value={brand}
                                onChange={value => setBrand(value)}
                                placeholder={'Marca'}                    
                                ref={brandRef}
                                options={brands}
                                isClearable={true}
                                isLoading={loading}
                            />

                            <ReactSelect   
                                name={group} 
                                value={group}
                                onChange={value => setGroup(value)}
                                placeholder={'Grupo'}                    
                                ref={groupRef}
                                options={groups}
                                isClearable={true}
                                isLoading={loading}
                            />
                        </div>
                    )}
                    
                    <button type="submit">{loading ? 'Carregando...' : 'Gravar'}</button>

                    </Form>
                </div>
            )}
        </div>
    );
}