import styles from '../../styles/pages/Devices/ListDevices.module.css'

import Header from '../../components/Header';

import ListData from '../../components/Forms/ListData';

import { useRouter } from 'next/router';

export default function ListClients() {
    const router = useRouter();

    return (
        <div className={styles.Container}>
            <Header />

            <h2>Clientes</h2>   

        

            <ListData address={'clients'}/>

        </div>
    );
}