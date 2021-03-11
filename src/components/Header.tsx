import { useContext } from 'react';

import styles from '../styles/components/Header.module.css';

import Link from 'next/link'

import { AuthContext } from '../context/AuthContext';

export default function NavBar() {
    const { handleExit } = useContext(AuthContext);

    async function enterExit() {
        handleExit(); 
    }

    return (
        <div className={styles.HeaderContainer}>
            <div>
                <h1>
                    Droid Assistencia Técnica                    
                </h1>

                <div className={styles.Nav}>
                    <Link href="/Dashboard"><a>Home</a></Link> 
                    <Link href="/Registers/"><a>Cadastros</a></Link> 
                    <Link href="/Clients/ListClients"><a>Clientes</a></Link>
                    <Link href="/OrdersServices/"><a>Ordem de serviço</a></Link>
                    <button type="submit" onClick={enterExit}>Sair</button>
                </div>

                <div className={styles.Profile}>
                    <img src="/profile.png" alt="profile" />
                    <strong>Matheus Andreta</strong>
                </div>
            </div>
        </div>
    );
}