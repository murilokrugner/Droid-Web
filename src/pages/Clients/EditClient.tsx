import styles from '../../styles/pages/Devices/EditDevice.module.css';

import EditDataClient from '../../components/Forms/Clients/EditDataClient';

import Header from '../../components/Header';

export default function EditDevice() {
    return(
        <div className={styles.Container}>
            <Header />
            <h2>Editar Cliente</h2>
            <EditDataClient address={'devices'} />
        </div>
    );
};