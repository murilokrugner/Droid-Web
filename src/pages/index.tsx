import Head from 'next/head'
import SignIn from '../components/SignIn';
import { AuthProvider } from '../context/AuthContext'

import styles from '../styles/pages/Home.module.css';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

interface HomeProps {
  signed: boolean;
}

export default function Home(props: HomeProps) {
  return (
    <AuthProvider
      signed={props.signed}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | Droid</title>
        </Head>

        {!props.signed && (
          <SignIn />
        )}

       <ToastContainer autoClose={3000} />       
      </div>
      
    </AuthProvider>
  )
}
