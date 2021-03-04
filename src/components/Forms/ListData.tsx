import { useState, useEffect } from 'react';

import api from '../../services/api';

import { useRouter } from 'next/router';

import styles from '../../styles/components/Forms/ListData.module.css';

import Loading from '../Loading';


export default function ListData({ address }) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({});

    useEffect(() => {
        async function loadData() {
            const response = await api.get('/devices');

            setData(response.data);

            setLoading(false);
        };

    }, );

    function handleNavigationEdit() {
        router.push('EditDevice');
    }

    async function handleDelete(id) {
        const response = await api.delete(`${address}?id=${id}`);
        
        
    }

    return(
        <> 
        { loading ? (
            <Loading loading={loading}/>
        ) : (
            <>
                <div className={styles.ContainerData}>            
                    <strong>1</strong>
                    <strong>Samsung Galaxy Folder 64gb</strong>
                    <div className={styles.Buttons}>
                        <button type="submit" onClick={handleNavigationEdit}>Editar</button>
                        <button type="submit" onClick={() => {handleDelete(1)}}>Excluir</button>
                    </div>            
                    </div>
                <div className={styles.Line} />
            </>
        )}                          
        </>
    );
}
