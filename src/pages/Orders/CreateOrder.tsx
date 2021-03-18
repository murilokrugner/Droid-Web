import styles from '../../styles/pages/Devices/CreateDevice.module.css';

import FormOrder from '../../components/Forms/Orders/FormOrder';

import Header from '../../components/Header';

export default function createOrder() {
    return(
        <div className={styles.Container}>
            <Header />
            <h2>Nova O.S.</h2>
            <FormOrder address={'orders'} />
        </div>
    );
};