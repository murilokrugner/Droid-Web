import styles from '../../styles/pages/Devices/ListDevices.module.css'

import Header from '../../components/Header';

import ListData from '../../components/Forms/ListData';

import { useRouter } from 'next/router';

export default function ListUsers() {
    const router = useRouter();

    return (
        <div className={styles.Container}>
            <Header />

            <h2>Usuários</h2>   

            <div className={styles.buttonAdd}>
                <button type="button" onClick={() => {router.push('CreateUser')}}>Novo Usuário</button>
            </div>

            <ListData address={'users'}/>

        </div>
    );
}