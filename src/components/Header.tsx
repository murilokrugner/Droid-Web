import { useContext } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import styles from '../styles/components/Header.module.css';

import Link from 'next/link'

import { AuthContext } from '../context/AuthContext';

export default function NavBar() {
    const { handleExit, user, userNickname, company_name } = useContext(AuthContext);

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
                    <Link href="/Registers/"><a>Cadastros</a></Link> 
                    <Link href="/Clients/ListClients"><a>Clientes</a></Link>
                    <Link href="/Orders/ListOrders"><a>Ordem de serviço</a></Link>
                    <button type="submit" onClick={enterExit}>Sair</button>
                </div>

                <div className={styles.Profile}>
                    <img src="/profile.png" alt="profile" />
                    <strong>{userNickname}</strong>
                </div>
            </div>
        </div>
    );
}