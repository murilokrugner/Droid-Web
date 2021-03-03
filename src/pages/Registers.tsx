import styles from '../styles/pages/Registers.module.css'

import Header from '../components/Header';
import NavBar from '../components/NavBar';

import { useRouter } from 'next/router';

export default function Registers() {
    const router = useRouter()

    function routing(url) {
        router.push('Devices/CreateDevice');
    }

    return(
        <div className={styles.Container}> 
            <Header /> 

            <div className={styles.ContainerBox}>
                <button type="submit" onClick={() => {routing('Devices')}}>                                                
                    <strong>Aparelhos</strong>  
                </button>
                <button type="submit">                                                
                    <strong>Aparelhos</strong>  
                </button>
                <button type="submit">                                                
                    <strong>Aparelhos</strong>  
                </button>
                <button type="submit">                                                
                    <strong>Aparelhos</strong>  
                </button>
                <button type="submit">                                                
                    <strong>Aparelhos</strong>  
                </button>
                <button type="submit">                                                
                    <strong>Aparelhos</strong>  
                </button>
            </div>
        </div>
    );
}