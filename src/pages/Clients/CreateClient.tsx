import styles from '../../styles/pages/Devices/CreateDevice.module.css';

import FormClient from "../../components/Forms/Clients/FormClient";

import Header from '../../components/Header';

export default function CreateClient() {
    return(
        <div className={styles.Container}>
            <Header />
            <h2>Cadastro de clientes</h2>
            <FormClient address={'clients'} />
        </div>
    );
};