import styles from '../styles/components/Header.module.css';

import Link from 'next/link'

export default function NavBar() {
    return (
        <div className={styles.HeaderContainer}>
            <div>
                <h1>
                    Droid Assistencia Técnica                    
                </h1>

                <div className={styles.Profile}>
                    <img src="/profile.png" alt="profile" />
                    <strong>Matheus Andreta</strong>
                </div>
            </div>
        </div>
    );
}