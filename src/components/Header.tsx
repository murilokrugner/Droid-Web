import { useContext } from 'react';

import styles from '../styles/components/Header.module.css';

import Link from 'next/link'

import { AuthContext } from '../context/AuthContext';

export default function NavBar() {
    const { handleExit, user, company_name } = useContext(AuthContext);

    async function enterExit() {
        handleExit(); 
    }

    return (
        <div className={styles.HeaderContainer}>
            <div>
                <h1>
                    {company_name}                   
                </h1>

                <div className={styles.Nav}>
                    <Link href="/Dashboard"><a>Home</a></Link> 
                    <Link href="/Registers/"><a>Cadastros</a></Link> 
                    <Link href="/Clients/ListClients"><a>Clientes</a></Link>
                    <Link href="/Orders/ListOrders"><a>Ordem de serviço</a></Link>
                    <button type="submit" onClick={enterExit}>Sair</button>
                </div>

                <div className={styles.Profile}>
                    <img src="/profile.png" alt="profile" />
                    <strong>{user.nickname}</strong>
                </div>
            </div>
        </div>
    );
}