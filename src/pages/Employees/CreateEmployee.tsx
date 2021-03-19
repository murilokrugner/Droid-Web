import styles from '../../styles/pages/Devices/CreateDevice.module.css';

import FormDescriptionOnly from "../../components/Forms/FormDescriptionOnly";

import Header from '../../components/Header';

export default function CreateEmployee() {
    return(
        <div className={styles.Container}>
            <Header />
            <h2>Cadastro de funcionarios</h2>
            <FormDescriptionOnly address={'employees'} />
        </div>
    );
};