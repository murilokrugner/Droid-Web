import styles from '../../styles/pages/Devices/ListDevices.module.css'

import Header from '../../components/Header';

import ListData from '../../components/Forms/ListData';

import { useRouter } from 'next/router';

export default function ListGroups() {
    const router = useRouter();

    return (
        <div className={styles.Container}>
            <Header />

            <h2>Grupos</h2>   

            <div className={styles.buttonAdd}>
                <button type="button" onClick={() => {router.push('CreateGroup')}}>Novo Grupo</button>
            </div>

            <ListData address={'groups'}/>

        </div>
    );
}