import { useState, useEffect, useRef, useContext } from 'react';

import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import styles from '../../styles/components/Forms/FormDescriptionOnly.module.css';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import ReactSelect from 'react-select';

import { useRouter } from 'next/router';

import stylesLoading from '../../styles/components/Loading.module.css';

import HashLoader from "react-spinners/HashLoader";               



import { toast } from 'react-toastify';
import { string } from 'yup/lib/locale';

const schema = Yup.object().shape({
    description: Yup.string().required('A descrição é obrigatória'),
  });

export default function EditData({address}) {
    const router = useRouter();

    const id = router.query.id;

    const addressEdit = router.query.address;

    const { token, company } = useContext(AuthContext);

    const brandRef = useRef(null);
    const groupRef = useRef(null);
    const descriptionRef = useRef(null);    

    const [loading, setLoading] = useState(true);
    const [loadingCode, setLoadingCode] = useState(true);    
    const [loadingBrandGroup, setLoadingBrandGroup] = useState(true);

    const [code, setCode] = useState(0);
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState(null);
    const [group, setGroup] = useState(null);

    const [brands, setBrands] = useState();
    const [groups, setGroups] = useState();
    

    async function loadBrands() {
        const response = await api.get(`brands?company=${company}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setBrands(response.data);

        setLoading(false);
        
    }

    async function loadGroups() {   
        const response = await api.get(`groups?company=${company}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setGroups(response.data);      
        
        setLoadingBrandGroup(false);
    }

    async function loadData() {
        const response = await api.get(`get-${addressEdit}-code?company=${company}&id=${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setCode(response.data.id);

        setDescription(response.data.description);

        if (addressEdit === 'devices') {
            setGroup([
                {
                    'value': response.data.group.id,
                    'label': response.data.group.description
                }
            ]);
    
            setBrand([
                {
                    'value': response.data.id,
                    'label': response.data.brand.description
                }
            ]);
        }

        setLoadingCode(false);
    };

    useEffect(() => {      
        if (token) {
            loadData();
        }

        if (addressEdit === 'devices' && token) {            
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

        if (addressEdit === 'devices') {
            if (brand === undefined) {
                toast.warn('Selecione uma marca');
                return;
            }
    
            if (group === undefined) {
                toast.warn('Selecione um grupo');
                return;
            }
        }

        if (addressEdit === 'devices') {
            try {
                setLoading(true);
    
                const response = await api.put(`${addressEdit}?company=${company}&id=${id}`, {
                    description: data.description,
                    brand_id: brand.value,
                    group_id: group.value,
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setLoading(false);
    
                toast.success('Alteração realizada com sucesso');

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
    
                const response = await api.put(`${addressEdit}?company=${company}&id=${id}`, {
                    description: data.description,
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setLoading(false);
    
                toast.success('Alteração realizada com sucesso');

                router.back();
    
            } catch (error) {   
                if (error.response.status) {
                    toast.info('Já existe um registro cadastrado com esse nome');
                    setLoading(false);
                    return
                }         

                toast.error('Erro ao realizar o cadastro');
                setLoading(false);
            }
        }
    }

    return (
        <div className={styles.Container}>
            {loading || loadingCode || loadingBrandGroup ? (
                <>
                    <div className={stylesLoading.Container}>
                        <HashLoader color='#fff' loading={loading} size={60} />
                    </div>
                </>
            ) : (
                <div className={styles.containerForm}>
    
                    <Form onSubmit={handleSubmit}>
                    <Input name="code" type="text" placeholder="Código" value={code}  disabled />
                    <Input
                        name="description"
                        type="text"
                        value={description}
                        onChange={value => setDescription(value[0])}
                        defaultValue={description}
                        placeholder="Descrição"
                        ref={descriptionRef}
                    />

                    {addressEdit === 'devices' && (
                        <div className={styles.ContainerSelect}>
                            <ReactSelect    
                                name={brand}
                                value={brand}
                                defaultValue={brand}
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