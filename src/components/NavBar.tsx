import styles from '../styles/components/NavBar.module.css';

import Link from 'next/link'

export default function NavBar() {
    return (
        <div className={styles.NavBarContainer}>
             <nav>
                <Link href="/Dashboard"><a>Home</a></Link> 
                <Link href="/Registers/"><a>Cadastros</a></Link> 
                <Link href="/Clients/"><a>Clientes</a></Link>
                <Link href="/OrdersServices/"><a>Ordem de serviço</a></Link>  
            </nav> 

            <button type="submit">Sair</button>
        </div>
    );
}