import styles from '../../styles/pages/Devices/CreateDevice.module.css';

import FormDescriptionOnly from "../../components/Forms/FormDescriptionOnly";

import Header from '../../components/Header';

export default function CreatePositions() {
    return(
        <div className={styles.Container}>
            <Header />
            <h2>Cadastro de cargos</h2>
            <FormDescriptionOnly address={'positions'} />
        </div>
    );
};