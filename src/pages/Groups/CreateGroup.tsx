import styles from '../../styles/pages/Devices/CreateDevice.module.css';

import FormDescriptionOnly from "../../components/Forms/FormDescriptionOnly";

import Header from '../../components/Header';

export default function createDevice() {
    return(
        <div className={styles.Container}>
            <Header />
            <h2>Cadastro de grupos</h2>
            <FormDescriptionOnly address={'groups'} />
        </div>
    );
};