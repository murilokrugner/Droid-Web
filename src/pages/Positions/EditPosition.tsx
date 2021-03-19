import styles from '../../styles/pages/Devices/EditDevice.module.css';

import EditData from "../../components/Forms/EditData";

import Header from '../../components/Header';

export default function EditPosition() {
    return(
        <div className={styles.Container}>
            <Header />
            <h2>Editar cargo</h2>
            <EditData address={'positions'} />
        </div>
    );
};