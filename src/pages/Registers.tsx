import styles from '../styles/pages/Registers.module.css'

import Header from '../components/Header';
import NavBar from '../components/NavBar';

export default function Registers() {
    return(
        <div> 
            <Header />                   
            <div className={styles.registerContainer}>
                <NavBar />
                <div>
                    
                </div>
            </div>
        </div>
    );
}