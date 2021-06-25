import styles from '../styles/pages/Registers.module.css'

import Header from '../components/Header';

import { useRouter } from 'next/router';

export default function Registers() {
    const router = useRouter();

    function routing(url) {
        router.push(url);
    }

    return(
        <div className={styles.Container}> 
            <Header /> 

            <div className={styles.ContainerBox}>
                <button type="submit" onClick={() => {routing('Devices/ListDevices')}}>                                                
                    <strong>Aparelhos</strong>  
                </button>
                <button type="submit" onClick={() => {routing('Groups/ListGroups')}}>                                                
                    <strong>Grupos</strong>  
                </button>
                <button type="submit" onClick={() => {routing('Brands/ListBrands')}}>                                                
                    <strong>Marcas</strong>  
                </button>
                <button type="submit" onClick={() => {routing('Positions/ListPositions')}}>                                                
                    <strong>Cargos</strong>  
                </button>
                <button type="submit" onClick={() => {routing('Users/ListUsers')}}>                                                
                    <strong>Usuários</strong>  
                </button>
                <button type="submit" onClick={() => {routing('Employees/ListEmployees')}}>                                                
                    <strong>Funcionarios</strong>  
                </button>
            </div>
        </div>
    );
}