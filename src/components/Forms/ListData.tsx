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
            'value': 'AGUARDANDO PEÇA',
            'label': 'AGUARDANDO PEÇA',
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

            ('aqui' + response.data.lenght);
    
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
            ('back');

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
        if (status !== 'FINALIZADO') {
            alert('Você não pode entregar esse serviço');
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

    async function handleNotRepair(id, description) {
        confirmAlert({
            title: 'Atualizar registro',
            message: `Deseja realmente informar que o item: ${description} não tem concerto?`,
            buttons: [
              {
                label: 'Sim',
                onClick: async () => {
                    await api.put(`status-order?id=${id}&status=${'SEM CONCERTO'}`)
                }
              },
              {
                label: 'Não',
                onClick: () => { return }
              }
            ]
        })                
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
                            {address === 'orders' && (
                                <button type="button" onClick={() => {router.push('CreateOrder')}}>Nova O.S.</button>
                            )}
                    </div>
                ): (
                    <> 
                    <>   
                    <div className={styles.ContainerSelect}>
                        
                            {address === 'brands' && (
                                 <button type="button" onClick={() => {router.push('CreateBrand')}}>Nova Marca</button>
                            )}
                            {address === 'groups' && (
                                 <button type="button" onClick={() => {router.push('CreateGroup')}}>Novo Grupo</button>
                            )}
                            {address === 'employees' && (
                                 <button type="button" onClick={() => {router.push('CreateEmployee')}}>Novo Funcionario</button>
                            )}
                           {address === 'devices' && (
                                 <button type="button" onClick={() => {router.push('CreateDevice')}}>Novo Aparelho</button>
                            )}
                            {address === 'users' && (
                                 <button type="button" onClick={() => {router.push('CreateUser')}}>Novo Usuário</button>
                            )}
                           {address === 'positions' && (
                                 <button type="button" onClick={() => {router.push('CreatePositions')}}>Novo Cargo</button>
                            )} 
                            {address === 'clients' && (
                                 <button type="button" onClick={() => {router.push('CreateClient')}}>Novo Cliente</button>
                            )}
                        </div>  
                        
                        </>                                                                              
                        {data.map(item => (
                            <>                            
                                <div className={styles.ContainerData}>   
                                          
                                    
                                    {address === 'brands' || address === 'groups' || address === 'positions' ? (
                                        <>    
                                        <div className={styles.ContainerAll}>
                                            <div className={styles.ContainerAll2}>
                                                <strong>{item.value}</strong>
                                                <strong>{item.label}</strong>
                                            </div>  
                                            <div className={styles.Buttons}>
                                                        <button type="submit" onClick={() => {handleNavigationEdit(item.value)}}>
                                                        <img src="https://image.flaticon.com/icons/png/128/1828/1828270.png" alt="edit" />
                                                        </button>
                                                        <button type="submit" onClick={() => {handleDelete(item.id, item.description ? item.description : item.first_name)}}>
                                                            <img src="https://image.flaticon.com/icons/png/128/2603/2603105.png" alt="delete" />                                                   
                                                        </button>
                                                    </div>                                          
                                        </div>

                                        

                                        <div className={styles.Buttons}>
                                        {address === 'orders' && (
                                                        <button type="submit" onClick={() => {handleNavigationView(item.id)}}>
                                                            <img src="https://image.flaticon.com/icons/png/128/2235/2235419.png" alt="view" />
                                                        </button>
                                                    )}
                                            
                                        </div> 
                                        
                                        </>
                                    ) : (
                                        <>
                                        {address === 'users' ? (
                                            <div className={styles.ContainerAll}>
                                                <div className={styles.ContainerAll2}>
                                                <strong>{item.id}</strong>
                                                <strong>{item.nickname}</strong>

                                                <div className={styles.Buttons}>
                                                                                                                                                               
                                                    <button type="submit" onClick={() => {handleNavigationEdit(item.id)}}>
                                                        <img src="https://image.flaticon.com/icons/png/128/1828/1828270.png" alt="edit" />
                                                    </button>
                                                    <button type="submit" onClick={() => {handleDelete(item.id, item.nickname)}}>
                                                        <img src="https://image.flaticon.com/icons/png/128/2603/2603105.png" alt="delete" />
                                                    </button>
                                                </div>
                                                </div>
                                            </div>
                                            
                                        ) : (
                                            <> 
                                                {address === 'orders' && (
                                                    <div className={styles.ContainerInfo}>
                                                        <>
                                           
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
                                                    {item.status === 'AGUARDANDO PEÇA' && (
                                                        <div className={styles.ContainerStatusWaiting}></div>
                                                    )}
                                                     {item.status === 'ENTREGUE' && (
                                                        <div className={styles.ContainerStatusDelivered}></div>
                                                    )}
                                                    {item.status === 'ABANDONADO' && (
                                                        <div className={styles.ContainerStatusAbandoned}></div>
                                                    )}
                                                    {item.status === 'SEM CONCERTO' && (
                                                        <div className={styles.ContainerStatusConcert}></div>
                                                    )}
                                                    {item.status === 'GARANTIA' && (
                                                        <div className={styles.ContainerStatusWarranty}></div>
                                                    )}
                                                
                                                    </>
                                                                                     
                                                    <strong>{item.id}</strong>
                                                </>
                                                        <div className={styles.ContainerInfo2}>
                                                            <strong>Data</strong>
                                                            <span>{item.entry_date.slice(8, 10) + '/' + item.entry_date.slice(5, 7) + '/' + item.entry_date.slice(0, 4)}</span> 
                                                        </div>
                                                        <div className={styles.ContainerInfo2}>
                                                            <strong>Cliente</strong>
                                                            <span>{item.client.first_name}</span> 
                                                        </div>
                                                        <div className={styles.ContainerInfo2}>
                                                            <strong>Aparelho</strong>
                                                            <span>{item.device.description}</span> 
                                                        </div>
                                                        <div className={styles.ContainerInfo2}>
                                                            <strong>Serviço</strong>
                                                            <span>{item.defect_problem}</span> 
                                                        </div>                                                                                                   
                                                    </div> 
                                                )}     

                                                {address === 'devices' && (
                                                    <div className={styles.ContainerAll}>    
                                                    <div className={styles.ContainerAll2}>                                                                                                  
                                                        <strong>{item.id}</strong>
                                                        <strong>{item.description && address === 'devices' ? item.description : item.first_name} {item.last_name}</strong>                                   
                                                    </div> 
                                                    <div className={styles.Buttons}>
                                                        <button type="submit" onClick={() => {handleNavigationEdit(item.id)}}>
                                                        <img src="https://image.flaticon.com/icons/png/128/1828/1828270.png" alt="edit" />
                                                        </button>
                                                        <button type="submit" onClick={() => {handleDelete(item.id, item.description ? item.description : item.first_name)}}>
                                                            <img src="https://image.flaticon.com/icons/png/128/2603/2603105.png" alt="delete" />                                                   
                                                        </button>
                                                    </div>
                                                </div>
                                                )}

                                                {address === 'clients' && (
                                                    <div className={styles.ContainerAll}>    
                                                    <div className={styles.ContainerAll2}>                                                                                                  
                                                        <strong>{item.id}</strong>
                                                        <strong>{item.description && address === 'devices' ? item.description : item.first_name} {item.last_name}</strong>                                   
                                                    </div> 
                                                    <div className={styles.Buttons}>
                                                        <button type="submit" onClick={() => {handleNavigationEdit(item.id)}}>
                                                        <img src="https://image.flaticon.com/icons/png/128/1828/1828270.png" alt="edit" />
                                                        </button>
                                                        <button type="submit" onClick={() => {handleDelete(item.id, item.description ? item.description : item.first_name)}}>
                                                            <img src="https://image.flaticon.com/icons/png/128/2603/2603105.png" alt="delete" />                                                   
                                                        </button>
                                                    </div>
                                                </div>
                                                )}

                                             {address === 'employees' && (
                                                    <div className={styles.ContainerAll}>    
                                                    <div className={styles.ContainerAll2}>                                                                                                  
                                                        <strong>{item.id}</strong>
                                                        <strong>{item.description && address === 'devices' ? item.description : item.first_name} {item.last_name}</strong>                                   
                                                    </div> 
                                                    <div className={styles.Buttons}>
                                                        <button type="submit" onClick={() => {handleNavigationEdit(item.id)}}>
                                                        <img src="https://image.flaticon.com/icons/png/128/1828/1828270.png" alt="edit" />
                                                        </button>
                                                        <button type="submit" onClick={() => {handleDelete(item.id, item.description ? item.description : item.first_name)}}>
                                                            <img src="https://image.flaticon.com/icons/png/128/2603/2603105.png" alt="delete" />                                                   
                                                        </button>
                                                    </div>
                                                </div>
                                                )}
                                                
                                                <div className={styles.Buttons}>
                                                    {address === 'orders' && (
                                                        <>
                                                        <button type="submit" onClick={() => {handleNavigationEdit(item.id)}}>
                                                        <img src="https://image.flaticon.com/icons/png/128/1828/1828270.png" alt="edit" />
                                                    </button>
                                                        <button type="submit" onClick={() => {handleNavigationView(item.id)}}>
                                                            <img src="https://image.flaticon.com/icons/png/128/2235/2235419.png" alt="view" />
                                                        </button>
                                                        <button type="submit" onClick={() => {handleNotRepair(item.id, item.description)}}>
                                                            <img src="https://image.flaticon.com/icons/png/512/753/753345.png" alt="not repair" />                                                   
                                                         </button>                                                         
                                                    </>
                                                    )}                                                    
                                                    <>
                                                        {address === 'orders' && (
                                                        <>
                                                            
                                                                <button type="submit" onClick={() => {handlePrinter(item.id)}}>
                                                                    <img src="https://image.flaticon.com/icons/png/128/3233/3233468.png" alt="printer" />                                                   
                                                                </button>  
                                                                <button type="submit" onClick={() => {handleFinished(item.id, item.status)}}>
                                                                    <img src="https://image.flaticon.com/icons/png/128/190/190411.png" alt="finished" />                                                   
                                                                </button>                                                   
                                                          
                                                        </> 
                                                        )}
                                                    </>
                                                </div> 
                                            </>
                                        )}

                                        

                                        
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
