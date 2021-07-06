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
//import ReactSelect from 'react-select';
import isEqual from 'date-fns/isEqual'
import { formatDistance } from 'date-fns';
import { format } from 'date-fns';

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

interface Data {
    map: (data: object) => void;
    item: Array<object>,
}

interface Warranty {
    map: (data: object) => void;
    item: Array<object>,
}

export default function ListData({ address }) {
    const { token, company } = useContext(AuthContext);

    const router = useRouter();

    const [loading, setLoading] = useState(true);

    const status = router.query.status;

    const [data, setData] = useState<Data>(null);
    const [warrantys, setWarrantys] = useState<Warranty>(null);
    const [warrantysinitial, setWarrantysinitial] = useState<Warranty>(null);
    const [warrantysfinished, setWarrantysfinished] = useState<Warranty>(null);
    const [warrantysdelivery, setWarrantysDelivery] = useState<Warranty>(null);
    
    const [page, setPage] = useState(1);

    async function loadData() {
        setLoading(true);

        if (address === 'orders') {
            const response = await api.get(`${address}-filters?company=${company}&page=${page}&status=${status}`, {
                headers: { Authorization: `Bearer ${token}` }
            });            
    
            if (response.data.length === 0 || response.data === 'empty') {
                setData(null);
            } else {
                setData(response.data);
            }

            if (status === 'NÃO INICIADO') {
                const responseWarranty = await api.get(`warranty?company=${company}&type=0`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
    
                if (responseWarranty.data.length === 0) {
                    setWarrantys(null);
                } else {
                    setWarrantys(responseWarranty.data);
                }
            }

            if (status === 'INICIADO') {
                const responseWarranty = await api.get(`warranty?company=${company}&type=1`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
    
                if (responseWarranty.data.length === 0) {
                    setWarrantysinitial(null);
                } else {
                    setWarrantysinitial(responseWarranty.data);
                }
            }

            if (status === 'FINALIZADO') {
                const responseWarrantyfinished = await api.get(`warranty?company=${company}&type=2`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
    
                if (responseWarrantyfinished.data.length === 0) {
                    setWarrantysfinished(null);
                } else {
                    setWarrantysfinished(responseWarrantyfinished.data);
                }
            }

            if (status === 'ENTREGUE') {
                const responseWarrantydelivery = await api.get(`warranty?company=${company}&type=3`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
    
                if (responseWarrantydelivery.data.length === 0) {
                    setWarrantysDelivery(null);
                } else {
                    setWarrantysDelivery(responseWarrantydelivery.data);
                }
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

    }, [token, page]);


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

    async function handleWarranty(id, description, delivery_forecast) {
        var deliveryDate = delivery_forecast.slice(0, 4) + ',' + delivery_forecast.slice(5, 7) + ',' + delivery_forecast.slice(8, 10);

        const distanceInWords = formatDistanceToNow(new Date(deliveryDate), { addSuffix: true });

        if (parseInt(distanceInWords.slice(0,1)) >= 3) {
            alert('Ordem com garantia vencida');
            return;
        }

        confirmAlert({
            title: 'Ativar Garantia',
            message: `Deseja realmente informar que o item: ${description} irá ativar a garantia?`,
            buttons: [
              {
                label: 'Sim',
                onClick: async () => {
                    await api.put(`status-order?id=${id}&status=${'GARANTIA'}`)
                    await api.post('warranty', {
                        date: new Date(),
                        company: 1,
                        order: 1
                    })
                }
              },
              {
                label: 'Não',
                onClick: () => { return }
              }
            ]
        }) 
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

    async function handleUpdateWarrant(type, order) {
        confirmAlert({
            title: 'Atualizar registro',
            message: `Deseja realmente atualizar o status da garantia?`,
            buttons: [
              {
                label: 'Sim',
                onClick: async () => {
                    await api.put(`warranty`, {                    
                        date: new Date(),
                        company: company,
                        order: order,
                        type: type,
                    }, {
                        headers: { Authorization: `Bearer ${token}` },
                    })

                    loadData();
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
                                                        {status === 'NÃO INICIADO' || status === 'INICIADO' && (
                                                            <button type="submit" onClick={() => {handleNotRepair(item.id, item.description)}}>
                                                                <img src="https://image.flaticon.com/icons/png/512/753/753345.png" alt="not repair" />                                                   
                                                            </button> 
                                                        )}                                                        
                                                    </>
                                                    )}                                                    
                                                    <>
                                                        {address === 'orders' && (
                                                        <>
                                                            
                                                                <button type="submit" onClick={() => {handlePrinter(item.id)}}>
                                                                    <img src="https://image.flaticon.com/icons/png/128/3233/3233468.png" alt="printer" />                                                   
                                                                </button>  
                                                                {status === 'FINALIZADO' && (
                                                                    <button type="submit" onClick={() => {handleFinished(item.id, item.status)}}>
                                                                        <img src="https://image.flaticon.com/icons/png/128/190/190411.png" alt="finished" />                                                   
                                                                    </button>  
                                                                )}      
                                                                {status === 'ENTREGUE' && (
                                                                    <button type="submit" onClick={() => {handleWarranty(item.id, item.status, item.delivery_forecast)}}>
                                                                        <img src="https://image.flaticon.com/icons/png/512/2039/2039079.png" alt="garantia" />                                                   
                                                                    </button>  
                                                                )}                                           
                                                          
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

                 {status === 'NÃO INICIADO' && warrantys !== null &&  (
                            <div className={styles.ContainerData}>
                                {warrantys.map(item => (
                                    <>
                                <div className={styles.ContainerInfo}>
                                    <div className={styles.ContainerWarranty}>
                                        <p>Garantia</p>
                                    </div>
                                    <strong>{item.id}</strong>
                                               
                                    <div className={styles.ContainerInfo2}>
                                        <strong>Data</strong>
                                        <span>{item.entry_date.slice(8, 10) + '/' + item.entry_date.slice(5, 7) + '/' + item.entry_date.slice(0, 4)}</span>
                                    </div>
                                    <div className={styles.ContainerInfo2}>
                                        <strong>Cliente</strong>
                                        <span>{item.order_services.client.first_name}</span> 
                                    </div>
                                    <div className={styles.ContainerInfo2}>
                                        <strong>Aparelho</strong>
                                        <span>{item.order_services.device.description}</span> 
                                    </div>
                                    <div className={styles.ContainerInfo2}>
                                        <strong>Serviço</strong>
                                        <span>{item.order_services.defect_problem}</span> 
                                    </div>                                                                                                   
                                    </div> 
                                    <div className={styles.Buttons}>
                                        <button type="submit" onClick={() => {handleNavigationView(item.id)}}>
                                            <img src="https://image.flaticon.com/icons/png/128/2235/2235419.png" alt="view" />
                                        </button>
                                        <button type="submit" onClick={() => {handleUpdateWarrant(1, item.id)}}>
                                            <img src="https://image.flaticon.com/icons/png/128/190/190411.png" alt="finished" />                                                   
                                        </button>                                                                     
                                    </div>  
                                    </>
                                ))}                                                                      
                            </div> 
                        )}

                        {status === 'INICIADO' && warrantysinitial !== null && (
                            <div className={styles.ContainerData}>
                            {warrantysinitial.map(item => (
                                <>
                            <div className={styles.ContainerInfo}>
                                <div className={styles.ContainerWarranty}>
                                    <p>Garantia</p>
                                </div>
                                <strong>{item.id}</strong>
                                           
                                <div className={styles.ContainerInfo2}>
                                    <strong>Data Iniciado</strong>
                                    <span>{item.initial_date.slice(8, 10) + '/' + item.initial_date.slice(5, 7) + '/' + item.initial_date.slice(0, 4)}</span>
                                </div>
                                <div className={styles.ContainerInfo2}>
                                    <strong>Cliente</strong>
                                    <span>{item.order_services.client.first_name}</span> 
                                </div>
                                <div className={styles.ContainerInfo2}>
                                    <strong>Aparelho</strong>
                                    <span>{item.order_services.device.description}</span> 
                                </div>
                                <div className={styles.ContainerInfo2}>
                                    <strong>Serviço</strong>
                                    <span>{item.order_services.defect_problem}</span> 
                                </div>                                                                                                   
                                </div> 
                                <div className={styles.Buttons}>
                                    <button type="submit" onClick={() => {handleNavigationView(item.id)}}>
                                        <img src="https://image.flaticon.com/icons/png/128/2235/2235419.png" alt="view" />
                                    </button>
                                    <button type="submit" onClick={() => {handleUpdateWarrant(2, item.id)}}>
                                        <img src="https://image.flaticon.com/icons/png/128/190/190411.png" alt="finished" />                                                   
                                    </button>                                                                     
                                </div>  
                                </>
                            ))}                                                                      
                        </div>
                        )} 

                        {status === 'FINALIZADO' && warrantysfinished !== null && (
                           <div className={styles.ContainerData}>
                           {warrantysfinished.map(item => (
                               <>
                           <div className={styles.ContainerInfo}>
                               <div className={styles.ContainerWarranty}>
                                   <p>Garantia</p>
                               </div>
                               <strong>{item.id}</strong>
                                          
                               <div className={styles.ContainerInfo2}>
                                   <strong>Data finalizado</strong>
                                   <span>{item.finished_date.slice(8, 10) + '/' + item.finished_date.slice(5, 7) + '/' + item.finished_date.slice(0, 4)}</span>
                               </div>
                               <div className={styles.ContainerInfo2}>
                                   <strong>Cliente</strong>
                                   <span>{item.order_services.client.first_name}</span> 
                               </div>
                               <div className={styles.ContainerInfo2}>
                                   <strong>Aparelho</strong>
                                   <span>{item.order_services.device.description}</span> 
                               </div>
                               <div className={styles.ContainerInfo2}>
                                   <strong>Serviço</strong>
                                   <span>{item.order_services.defect_problem}</span> 
                               </div>                                                                                                   
                               </div> 
                               <div className={styles.Buttons}>
                                   <button type="submit" onClick={() => {handleNavigationView(item.id)}}>
                                       <img src="https://image.flaticon.com/icons/png/128/2235/2235419.png" alt="view" />
                                   </button>
                                   <button type="submit" onClick={() => {handleUpdateWarrant(3, item.id)}}>
                                       <img src="https://image.flaticon.com/icons/png/128/190/190411.png" alt="finished" />                                                   
                                   </button>                                                                     
                               </div>  
                               </>
                           ))}                                                                      
                       </div> 
                    )}    

                        {status === 'ENTREGUE' && warrantysdelivery !== null &&  (
                            <div className={styles.ContainerData}>
                                {warrantysdelivery.map(item => (
                                    <>
                                <div className={styles.ContainerInfo}>
                                    <div className={styles.ContainerWarranty}>
                                        <p>Garantia</p>
                                    </div>
                                    <strong>{item.id}</strong>
                                               
                                    <div className={styles.ContainerInfo2}>
                                        <strong>Data da entrega</strong>
                                        <span>{item.delivery_date.slice(8, 10) + '/' + item.delivery_date.slice(5, 7) + '/' + item.delivery_date.slice(0, 4)}</span>
                                    </div>
                                    <div className={styles.ContainerInfo2}>
                                        <strong>Cliente</strong>
                                        <span>{item.order_services.client.first_name}</span> 
                                    </div>
                                    <div className={styles.ContainerInfo2}>
                                        <strong>Aparelho</strong>
                                        <span>{item.order_services.device.description}</span> 
                                    </div>
                                    <div className={styles.ContainerInfo2}>
                                        <strong>Serviço</strong>
                                        <span>{item.order_services.defect_problem}</span> 
                                    </div>                                                                                                   
                                    </div> 
                                    <div className={styles.Buttons}>
                                        <button type="submit" onClick={() => {handleNavigationView(item.id)}}>
                                            <img src="https://image.flaticon.com/icons/png/128/2235/2235419.png" alt="view" />
                                        </button>                                                                  
                                    </div>  
                                    </>
                                ))}                                                                      
                            </div> 
                        )}      
                 
                 {data !== null && (
                     <div className={styles.ContainerNavigation}>
                        <button type="submit" onClick={backPage}>Voltar</button>
                        <button type="submit" onClick={nextPage}>Avançar</button>
                    </div>   
                 )}
                                            
            </div>
        )}                                     
        </>
    );
}
