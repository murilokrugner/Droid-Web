import { useState, useEffect, useContext } from 'react';

import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { useRouter } from 'next/router';

import { confirmAlert } from 'react-confirm-alert'; 

import 'react-confirm-alert/src/react-confirm-alert.css';

import styles from '../../styles/components/Forms/ListData.module.css';

import HashLoader from "react-spinners/HashLoader"; 
import stylesLoading from '../../styles/components/Loading.module.css';
import { toast } from 'react-toastify';
import ReactSelect from 'react-select';

interface Data {
    map: (data: object) => void;
    item: Array<object>,
}

export default function ListData({ address }) {
    const { token, company } = useContext(AuthContext);

    const router = useRouter();

    const [loading, setLoading] = useState(true);

    const [status, setStatus] = useState([
        {
            'value': 'TODOS',
            'label': 'TODOS',
        },
        {
            'value': 'AGUARDANDO',
            'label': 'AGUARDANDO',
        },
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
        }
    ]);

    const [selectStatus, setSelectStatus] = useState(
        {
            'value': 'TODOS',
            'label': 'TODOS',
        },
    );

    const [data, setData] = useState<Data>(null);

    const [page, setPage] = useState(1);

    async function loadData() {
        setLoading(true);

        if (address === 'orders') {
            const response = await api.get(`${address}-filters?company=${company}&page=${page}&status=${selectStatus.value}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log('aqui' + response.data.lenght);
    
            if (response.data.length === 0 || response.data === 'empty') {
                setData(null);
            } else {
                setData(response.data);
            }
    
            setLoading(false);
        } else {
            const response = await api.get(`${address}?company=${company}&page=${page}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            if (response.data.length === 0) {
                setData(null);
            } else {
                setData(response.data);
            }
    
            setLoading(false);
        }

        
    };

    useEffect(() => {  
        if (token) {
            loadData();
        }

    }, [token, page, selectStatus]);

    console.log(data);

    function handleNavigationEdit(id) {
        if (address === 'brands') {
            router.push({
                pathname: 'EditBrand',
                query: {
                    id: id,
                    address: address,
                }
            });
        } else if (address === 'groups') {
            router.push({
                pathname: 'EditGroup',
                query: {
                    id: id,
                    address: address,
                }
            });
        } else if (address === 'devices') {
            router.push({
                pathname: 'EditDevice',
                query: {
                    id: id,
                    address: address,
                }
            });
        } else if (address === 'clients') {
            router.push({
                pathname: 'EditClient',
                query: {
                    id: id,
                    address: address,
                }
            });
        } else if (address === 'positions') {
            router.push({
                pathname: 'EditPosition',
                query: {
                    id: id,
                    address: address,
                }
            });
        } else if (address === 'users') {
            router.push({
                pathname: 'EditUser',
                query: {
                    id: id,
                    address: address,
                }
            });
        } else if (address === 'employees') {
            router.push({
                pathname: 'EditEmployee',
                query: {
                    id: id,
                    address: address,
                }
            });
        }  else if (address === 'orders') {
            router.push({
                pathname: 'EditOrder',
                query: {
                    id: id,
                    address: address,
                }
            });
        }        
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
                        const response = await api.delete(`${address}?company=${company}&id=${id}`, {
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

    async function handlePrinter(id) {
        router.push({
            pathname: 'PrinterOrder',
            query: {
                id: id,
                address: address,
            }
        });
    }

    async function handleNavigationView(id) {
        if (address === 'brands') {
            router.push({
                pathname: 'EditBrand',
                query: {
                    id: id,
                    address: address,
                }
            });
        } else if (address === 'groups') {
            router.push({
                pathname: 'EditGroup',
                query: {
                    id: id,
                    address: address,
                }
            });
        } else if (address === 'devices') {
            router.push({
                pathname: 'EditDevice',
                query: {
                    id: id,
                    address: address,
                }
            });
        } else if (address === 'clients') {
            router.push({
                pathname: 'EditClient',
                query: {
                    id: id,
                    address: address,
                }
            });
        } else if (address === 'positions') {
            router.push({
                pathname: 'EditPosition',
                query: {
                    id: id,
                    address: address,
                }
            });
        } else if (address === 'users') {
            router.push({
                pathname: 'EditUser',
                query: {
                    id: id,
                    address: address,
                }
            });
        } else if (address === 'employees') {
            router.push({
                pathname: 'EditEmployee',
                query: {
                    id: id,
                    address: address,
                }
            });
        }  else if (address === 'orders') {
            router.push({
                pathname: 'ViewOrder',
                query: {
                    id: id,
                    address: address,
                }
            });
        } 
    }

    async function handleFinished(id, status) {
        if (status !== 'INICIADO') {
            alert('Você não pode finalizar esse serviço');
            return;
        }


        router.push({
            pathname: 'FinishedOrder',
            query: {
                id: id,
                address: address,
            }
        });
    }

    return(
        <>         
        { loading ? (
            <div className={stylesLoading.Container}>
            <HashLoader color='#fff' loading={loading} size={60} />
            </div>
        ) : (
            <div className={styles.Container}>
                {data === null? (
                    <>
                        <strong>Acabou :(</strong>
                    </>
                ): (
                    <> 
                    <>   
                    <div className={styles.ContainerSelect}>
                        {address === 'orders' && (
                                <div className={styles.Select}>
                                    <ReactSelect   
                                        name={selectStatus} 
                                        value={selectStatus}
                                        onChange={value => setSelectStatus(value)}
                                        placeholder={'Filtro'}                    
                                        options={status}
                                        isClearable={false}                                
                                    />
                                </div>
                            )}
                            <button type="button" onClick={() => {router.push('CreateOrder')}}>Nova O.S.</button>
                        </div>  
                        
                        </>                                                                              
                        {data.map(item => (
                            <>                            
                                <div className={styles.ContainerData}>   
                                    {address === 'brands' || address === 'groups' || address === 'positions' ? (
                                        <strong>{item.value}</strong>
                                    ) : (
                                        <>
                                            {address === 'orders' && (
                                                <>
                                                    {item.status === 'NÃO INICIADO' && (
                                                        <div className={styles.ContainerStatus}></div>
                                                    )}
                                                    {item.status === 'FINALIZADO' && (
                                                        <div className={styles.ContainerStatusFinished}></div>
                                                    )}
                                                    {item.status === 'INICIADO' && (
                                                        <div className={styles.ContainerStatusProgress}></div>
                                                    )}
                                                    {item.status === 'AGUARDANDO' && (
                                                        <div className={styles.ContainerStatusWaiting}></div>
                                                    )}
                                                
                                                </>
                                            )}                                            
                                            <strong>{item.id}</strong>
                                        </>
                                    )}         
                                    
                                    {address === 'brands' || address === 'groups' || address === 'positions' ? (
                                        <>                                         
                                        <strong>{item.label}</strong>

                                        <div className={styles.Buttons}>
                                        {address === 'orders' && (
                                                        <button type="submit" onClick={() => {handleNavigationView(item.id)}}>
                                                            <img src="https://image.flaticon.com/icons/png/128/2235/2235419.png" alt="view" />
                                                        </button>
                                                    )}
                                            <button type="submit" onClick={() => {handleNavigationEdit(item.value)}}>
                                                <img src="https://image.flaticon.com/icons/png/128/1828/1828270.png" alt="edit" />
                                            </button>
                                            <button type="submit" onClick={() => {handleDelete(item.value, item.label)}}>
                                                <img src="https://image.flaticon.com/icons/png/128/2603/2603105.png" alt="delete" />
                                            </button>
                                        </div> 
                                        
                                        </>
                                    ) : (
                                        <>
                                        {address === 'users' ? (
                                            <>
                                                <strong>{item.nickname}</strong>

                                                <div className={styles.Buttons}>
                                                    {address === 'orders' && (
                                                        <button type="submit" onClick={() => {handleNavigationView(item.id)}}>
                                                            <img src="https://image.flaticon.com/icons/png/128/2235/2235419.png" alt="view" />
                                                        </button>
                                                    )}
                                                    <button type="submit" onClick={() => {handleNavigationEdit(item.id)}}>
                                                        <img src="https://image.flaticon.com/icons/png/128/1828/1828270.png" alt="edit" />
                                                    </button>
                                                    <button type="submit" onClick={() => {handleDelete(item.id, item.nickname)}}>
                                                        <img src="https://image.flaticon.com/icons/png/128/2603/2603105.png" alt="delete" />
                                                    </button>
                                                </div> 
                                            </>
                                        ) : (
                                            <> 
                                                {address === 'orders' && (
                                                    <div className={styles.ContainerInfo}>
                                                        <strong>Data: {item.entry_date.slice(8, 10) + '/' + item.entry_date.slice(5, 7) + '/' + item.entry_date.slice(0, 4)}</strong> 
                                                        <strong>Cliente: {item.client.first_name}</strong>
                                                        <strong>Aparelho: {item.device.description}</strong>
                                                        <strong>Serviço: {item.defect_problem}</strong>                                                                                                      
                                                    </div> 
                                                )}      
                                                 
                                                <strong>{item.description && address === 'devices' ? item.description : item.first_name}</strong>                                   
                                               
                                                <div className={styles.Buttons}>
                                                    {address === 'orders' && (
                                                        <button type="submit" onClick={() => {handleNavigationView(item.id)}}>
                                                            <img src="https://image.flaticon.com/icons/png/128/2235/2235419.png" alt="view" />
                                                        </button>
                                                    )}
                                                    <button type="submit" onClick={() => {handleNavigationEdit(item.id)}}>
                                                    <img src="https://image.flaticon.com/icons/png/128/1828/1828270.png" alt="edit" />
                                                    </button>
                                                    <button type="submit" onClick={() => {handleDelete(item.id, item.description ? item.description : item.first_name)}}>
                                                    <img src="https://image.flaticon.com/icons/png/128/2603/2603105.png" alt="delete" />
                                                    </button>
                                                </div> 
                                            </>
                                        )}

                                        <>
                                            {address === 'orders' && (
                                               <>
                                                <div className={styles.Buttons}>
                                                    <button type="submit" onClick={() => {handlePrinter(item.id)}}>
                                                        <img src="https://image.flaticon.com/icons/png/128/3233/3233468.png" alt="printer" />                                                   
                                                    </button>  
                                                    <button type="submit" onClick={() => {handleFinished(item.id, item.status)}}>
                                                        <img src="https://image.flaticon.com/icons/png/128/190/190411.png" alt="finished" />                                                   
                                                    </button>                                                   
                                                </div>
                                               </> 
                                            )}
                                        </>

                                        
                                        </>
                                    )}
                                               
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
            </div>
        )}                          
        </>
    );
}
