import styles from '../../styles/pages/Devices/EditDevice.module.css';

import EditData from "../../components/Forms/EditData";

import Header from '../../components/Header';

export default function EditGroup() {
    return(
        <div className={styles.Container}>
            <Header />
            <h2>Editar O.S.</h2>
            <EditData address={'orders'} />
        </div>
    );
};