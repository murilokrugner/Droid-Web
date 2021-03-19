import styles from '../../styles/pages/Devices/EditDevice.module.css';

import EditData from "../../components/Forms/EditData";

import Header from '../../components/Header';

export default function EditUser() {
    return(
        <div className={styles.Container}>
            <Header />
            <h2>Editar Usuários</h2>
            <EditData address={'users'} />
        </div>
    );
};