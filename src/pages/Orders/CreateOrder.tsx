import styles from '../../styles/pages/Devices/CreateDevice.module.css';

// import FormOrder from '../../components/Forms/Orders/FormOrder';
import FormSearchClient from '../../components/Forms/Orders/FormSearchClient';

import Header from '../../components/Header';

import { useRouter } from 'next/router';

export default function createOrder() {
    const router = useRouter();

    function handleNavigate() {
        router.push({
            pathname: '../Clients/CreateClient',
        });
    }


    return(
        <div className={styles.Container}>
            <Header />
            <h2>Nova O.S.</h2>
            <button type="button" onClick={handleNavigate}>Novo Cliente</button>
            <FormSearchClient address={'orders'} />
        </div>
    );
};