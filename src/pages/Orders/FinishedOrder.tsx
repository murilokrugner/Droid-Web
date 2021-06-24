import styles from '../../styles/pages/Devices/EditDevice.module.css';

import FinishedOrder from "../../components/Forms/Orders/FinishedOrder";

import Header from '../../components/Header';

export default function EditOrder() {
    return(
        <div className={styles.Container}>
            <Header />
            <h2>Entregar O.S.</h2>
            <FinishedOrder address={'orders'} />
        </div>
    );
};