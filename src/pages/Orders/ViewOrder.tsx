import styles from '../../styles/pages/Devices/EditDevice.module.css';

import ViewDataOrder from "../../components/Forms/Orders/ViewDataOrder";

import Header from '../../components/Header';

export default function ViewGroup() {
    return(
        <div className={styles.Container}>
            <Header />
            <h2>Visualizar O.S.</h2>
            <ViewDataOrder address={'orders'} />
        </div>
    );
};