import {createContext, useState, ReactNode, useEffect} from 'react';

import { toast } from 'react-toastify';

import Cookies from 'js-cookie';

import api from '../services/api';

interface AuthContextData {
    handleSubmit: (data: object) => void;
    token: string;
    user: object;
    loading: boolean;
    signed: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
    user: object;
    token: string;
    loading: boolean;
    signed: boolean;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children, ...rest }: AuthProviderProps) {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [token, setToken] = useState('');
    const [signed, setSigned] = useState(false);

    async function handleSubmit(data) {
        try {
            setLoading(true);

            const response = await api.post('/users', {
                email: data.email,
                password: data.password,
            });
    
            const { token, user } = response.data;
    
            api.defaults.headers.Authorization = `Bearer ${token}`;

            Cookies.set('name', String(user.name));
            Cookies.set('email', String(user.email));
            Cookies.set('token', String(token));

            setToken(token);
            setUser(user);
            setLoading(false);
            setSigned(true);

        } catch (error) {
            toast.error('Falha na autenticação, verifique seus dados');
            setLoading(false);
            return;
        }
    }

    useEffect(() => {
        const response = Cookies.get('token');

        if (!response) {
            setSigned(false);
        } else {
            setSigned(true);
        }
    }, []);

    return (
        <AuthContext.Provider 
            value={{             
                handleSubmit,  
                token,
                user,
                loading,   
                signed,                        
              }}
            >

            {children}
                        
        </AuthContext.Provider>
    );
}