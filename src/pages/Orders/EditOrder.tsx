import styles from '../../styles/pages/Devices/EditDevice.module.css';

import EditDataOrder from "../../components/Forms/Orders/EditDataOrder";

import Header from '../../components/Header';

export default function EditGroup() {
    return(
        <div className={styles.Container}>
            <Header />
            <h2>Editar O.S.</h2>
            <EditDataOrder address={'orders'} />
        </div>
    );
};