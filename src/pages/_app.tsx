import '../styles/global.css';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from '../context/AuthContext'

function MyApp({ Component, pageProps }) {
  return ( 
    <AuthProvider>   
      <Component {...pageProps} /> 
      <ToastContainer autoClose={3000} />    
    </AuthProvider>
  );
  
}

export default MyApp
