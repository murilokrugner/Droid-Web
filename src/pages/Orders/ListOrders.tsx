import styles from '../../styles/pages/Devices/ListDevices.module.css'

import Header from '../../components/Header';

import Search from '../../components/Search';

import { useRouter } from 'next/router';

export default function ListOrders(props) {
    const router = useRouter();
    const status = router.query.status;


    return (
        <div className={styles.Container}>
            <Header />

            <h2>ORDENS DE SERVIÇO - {status}</h2>   

            <Search status={status} />            

        </div>
    );
}