import styles from '../../styles/pages/Devices/CreateDevice.module.css';

import FormEmployee from "../../components/Forms/Employees/FormEmployee";

import Header from '../../components/Header';

export default function CreateEmployee() {
    return(
        <div className={styles.Container}>
            <Header />
            <h2>Cadastro de funcionarios</h2>
            <FormEmployee address={'employees'} />
        </div>
    );
};