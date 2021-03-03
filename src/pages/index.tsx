import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import Head from 'next/head'
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import Registers from './Registers';

import { AuthProvider } from '../context/AuthContext'

import styles from '../styles/pages/Home.module.css';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


interface HomeProps {
  signed: boolean;
}

export default function Home(props: HomeProps) {
  const [signed, setSigned] = useState(props.signed);

  useEffect(() => {
    const response = Cookies.get('token');

    if (response === undefined) {
        setSigned(false);
    } else {
        setSigned(true);
    }
}, [props.signed]);

  console.log(signed);

  return (
    <AuthProvider
      signed={props.signed}
    >
      <div>
        <Head>
          <title>Início | Droid</title>
        </Head> 

        {!signed ? (
          <SignIn />
        ) : (
          <>          
            <Dashboard />
          </>
        )}

       <ToastContainer autoClose={3000} />         
       
      </div>
      
    </AuthProvider>
  )
}
