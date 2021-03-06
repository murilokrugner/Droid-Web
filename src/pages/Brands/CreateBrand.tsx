import styles from '../../styles/pages/Devices/CreateDevice.module.css';

import FormDescriptionOnly from "../../components/Forms/FormDescriptionOnly";

import Header from '../../components/Header';

export default function createDevice() {
    return(
        <div className={styles.Container}>
            <Header />
            <h2>Cadastro de marcas</h2>
            <FormDescriptionOnly address={'brands'} />
        </div>
    );
};