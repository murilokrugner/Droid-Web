import { useState, useEffect, useRef, useContext } from 'react';

import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import styles from '../../styles/components/Forms/FormDescriptionOnly.module.css';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import ReactSelect from 'react-select';

import { useRouter } from 'next/router';

import Loading from '../Loading';

import { toast } from 'react-toastify';

const schema = Yup.object().shape({
    description: Yup.string().required('A descrição é obrigatória'),
  });


export default function FormDescriptionOnly({ address }) {
    const router = useRouter();

    const { token, company } = useContext(AuthContext);

    const brandRef = useRef(null);
    const groupRef = useRef(null);

    const [loading, setLoading] = useState(true);

    const [code, setCode] = useState(0);
    const [loadingCode, setLoadingCode] = useState(true);
    
    const [loadingBrandGroup, setLoadingBrandGroup] = useState(true);

    const [brands, setBrands] = useState([]);
    const [brand, setBrand] = useState();

    const [groups, setGroups] = useState([]);
    const [group, setGroup] = useState();

    async function loadBrands() {
        const response = await api.get(`brands?company=${company}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setBrands(response.data);

        setLoading(false);
        
    }

    console.log(address);

    async function loadGroups() {   
        const response = await api.get(`groups?company=${company}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setGroups(response.data);      
        
        setLoadingBrandGroup(false);
    }

    async function loadCode() {
        const response = await api.get(`${address}-code?company=${company}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setCode(response.data + 1);

        setLoadingCode(false);

        
    };

    useEffect(() => {      
        if (token) {
            loadCode();
        }

        if (address === 'devices' && token) {            
            loadBrands();
            loadGroups(); 
                                        
        } else {
            setLoadingBrandGroup(false);
            setLoading(false);
        }

    }, [token]);

    async function handleSubmit(data) {
        
        if (data.description === '') {
            toast.warn('Informe um descrição');
            return;
        }

        if (address === 'devices') {
            if (brand === undefined) {
                toast.warn('Selecione uma marca');
                return;
            }
    
            if (group === undefined) {
                toast.warn('Selecione um grupo');
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
                    headers: { Authorization: `Bearer ${token}` }
                });

                setLoading(false);
    
                toast.success('Cadastro realizado com sucesso!');

                router.back();
    
            } catch (error) {   
                if (error.response.status) {
                    toast.info('Já existe um aparelho cadastrado com esse nome');
                    setLoading(false);
                    return
                }         

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
                    headers: { Authorization: `Bearer ${token}` }
                });
    
                setLoading(false);
    
                toast.success('Cadastro realizado com sucesso!');

                router.back();
    
            } catch (error) {
                console.log(error);
                toast.error('Erro ao realizar o cadastro');
                setLoading(false);
            }
        }
    }

    return (
        <div className={styles.Container}>
            {loading && loadingCode && loadingBrandGroup ? (
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
                        placeholder="Descrição"
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