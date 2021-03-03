import styles from '../styles/pages/Dashboard.module.css'

import Header from '../components/Header';
import NavBar from '../components/NavBar';

export default function Dashboard() {
    return(
        <div className={styles.containerDashboard}>
            <Header />
        </div>
    );
}