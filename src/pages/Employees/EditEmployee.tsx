import styles from '../../styles/pages/Devices/EditDevice.module.css';

import EditDataEmployee from "../../components/Forms/Employees/EditDataEmployee";

import Header from '../../components/Header';

export default function EditEmployee() {
    return(
        <div className={styles.Container}>
            <Header />
            <h2>Editar funcionario</h2>
            <EditDataEmployee address={'employees'} />
        </div>
    );
};