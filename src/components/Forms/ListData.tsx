import { useState, useEffect, useContext } from 'react';

import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { useRouter } from 'next/router';

import { confirmAlert } from 'react-confirm-alert'; 

import 'react-confirm-alert/src/react-confirm-alert.css';

import styles from '../../styles/components/Forms/ListData.module.css';

import Loading from '../Loading';

import { toast } from 'react-toastify';

export default function ListData({ address }) {
    const { token } = useContext(AuthContext);

    const router = useRouter();

    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({});

    const [page, setPage] = useState(1);

    async function loadData() {
        setLoading(true);

        const response = await api.get(`${address}?company=1&page=${page}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.length === 0) {
            setData('empty');
        } else {
            setData(response.data);
        }

        setLoading(false);
    };

    console.log(data);

    useEffect(() => {  
        if (token) {
            loadData();
        }

    }, [token, page]);

    function handleNavigationEdit(id) {
        router.push({
            pathname: 'EditDevice',
            query: {
                id: id,
                address: 'devices',
            }
        });
    }

    function nextPage() {
        setPage(page + 1);

    }

    function backPage() {        
        if (page !== 1) {
            console.log('back');

            setPage(page - 1);

            return;
        }
    }

    async function handleDelete(id, description) {
        confirmAlert({
              title: 'Excluir registro',
              message: `Deseja realmente excluir o item: ${description}`,
              buttons: [
                {
                  label: 'Sim',
                  onClick: async () => {
                    try {
                        const response = await api.delete(`${address}?company=1&id=${id}`, {
                            headers: { Authorization: `Bearer ${token}` }
                        });

                        toast.success('Registro excluido com sucesso!');

                        loadData();
                    } catch (error) {
                        toast.error('Não foi possivel excluir o registro, tente novamente mais tarde');  
                    }
                  }
                },
                {
                  label: 'Não',
                  onClick: () => { return }
                }
              ]
          });           
        }

    return(
        <> 
        { loading ? (
            <Loading loading={loading}/>
        ) : (
            <>
                {data === 'empty' ? (
                    <>
                        <strong>Acabou :(</strong>
                    </>
                ): (
                    <>
                        {data.map(item => (
                            <>
                                <div className={styles.ContainerData}>            
                                    <strong>{item.id}</strong>
                                    <strong>{item.description}</strong>
                                    <div className={styles.Buttons}>
                                        <button type="submit" onClick={() => {handleNavigationEdit(item.id)}}>Editar</button>
                                        <button type="submit" onClick={() => {handleDelete(item.id, item.description)}}>Excluir</button>
                                    </div>            
                                    </div>                            
                                <div className={styles.Line} />
                            </>                    
                        ))}    
                    </>
                )}
                <div className={styles.ContainerNavigation}>
                    <button type="submit" onClick={backPage}>Voltar</button>
                    <button type="submit" onClick={nextPage}>Avançar</button>
                </div>                
            </>
        )}                          
        </>
    );
}
