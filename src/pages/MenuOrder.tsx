import styles from '../styles/pages/Registers.module.css'

import Header from '../components/Header';

import { useRouter } from 'next/router';

export default function MenuOrder() {
    const router = useRouter();

    function routing(url, status) {
        router.push({
            pathname: url,
            query: {
                status: status,
            }
        });
    }

    return(
        <div className={styles.Container}> 
            <Header /> 

            <button type="button" onClick={() => {router.push('Orders/CreateOrder')}}>Nova O.S.</button>

            <div className={styles.ContainerBox}>
                <button type="submit" onClick={() => {routing('Orders/ListOrders', 'NÃO INICIADO')}}>                                                
                    <strong>Não Iniciados</strong>  
                </button>
                <button type="submit" onClick={() => {routing('Orders/ListOrders', 'INICIADO')}}>                                                
                    <strong>Iniciados</strong>  
                </button>
                <button type="submit" onClick={() => {routing('Orders/ListOrders', 'AGUARDANDO PEÇA')}}>                                                
                    <strong>Aguardando Peça</strong>  
                </button>
                <button type="submit" onClick={() => {routing('Orders/ListOrders', 'FINALIZADO')}}>                                                
                    <strong>Finalizados</strong>  
                </button>
                <button type="submit" onClick={() => {routing('Orders/ListOrders', 'ENTREGUE')}}>                                                
                    <strong>Entregues</strong>  
                </button>
                <button type="submit" onClick={() => {routing('Orders/ListOrders', 'GARANTIA')}}>                                                
                    <strong>Na Garantia</strong>  
                </button>
            </div>            
        </div>
    );
}