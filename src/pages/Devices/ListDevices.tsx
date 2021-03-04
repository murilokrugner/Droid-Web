import styles from '../../styles/pages/Devices/ListDevices.module.css'

import Header from '../../components/Header';

import ListData from '../../components/Forms/ListData';

export default function ListDevices() {
    return (
        <div className={styles.Container}>
            <Header />

            <h2>Aparelhos</h2>   

            <ListData address={'devices'}/>
        </div>
    );
}