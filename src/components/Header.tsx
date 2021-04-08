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
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="#home">{company_name} </Navbar.Brand>
            <Nav className="mr-auto">
            <div className={styles.Nav}>
                    <Link href="/Registers/"><a>Cadastros</a></Link> 
                    <Link href="/Clients/ListClients"><a>Clientes</a></Link>
                    <Link href="/Orders/ListOrders"><a>Ordem de serviço</a></Link>
                    <button type="submit" onClick={enterExit}>Sair</button>
                </div>
            </Nav>
            <div className={styles.Profile}>
                    <img src="/profile.png" alt="profile" />
                    <strong>{userNickname}</strong>
                </div>
        </Navbar>
        </div>
    );
}