import styles from '../../styles/pages/Devices/ListDevices.module.css'

import Header from '../../components/Header';

import ListData from '../../components/Forms/ListData';

import { useRouter } from 'next/router';

export default function ListOrders() {
    const router = useRouter();
    const status = router.query.status;
    return (
        <div className={styles.Container}>
            <Header />

            <h2>ORDENS DE SERVIÇO - {status}</h2>   

            <ListData address={'orders'}/>

        </div>
    );
}