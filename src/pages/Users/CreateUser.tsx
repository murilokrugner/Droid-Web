import styles from '../../styles/pages/Devices/CreateDevice.module.css';

import FormUser from "../../components/Forms/Users/FormUser";

import Header from '../../components/Header';

export default function CreateUser() {
    return(
        <div className={styles.Container}>
            <Header />
            <h2>Cadastro de usuários</h2>
            <FormUser address={'users'} />
        </div>
    );
};