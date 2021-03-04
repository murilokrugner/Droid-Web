import styles from '../styles/components/Loading.module.css';

import HashLoader from "react-spinners/HashLoader";

export default function Loading({ loading }) {
    return (
        <div className={styles.Container}>
            <HashLoader color='#fff' loading={loading} size={60} />
        </div>
    );
}