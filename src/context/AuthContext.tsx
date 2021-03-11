import {createContext, useState, ReactNode, useEffect } from 'react';

import { toast } from 'react-toastify';

import Cookies from 'js-cookie';

import api from '../services/api';

import { useRouter } from 'next/router';

interface AuthContextData {
    handleSubmit: (data: object) => void;
    handleExit: (data: object) => void;
    getCompany: (data: object) => void;
    token: string;
    user: object;
    loading: boolean;
    signed: boolean;
    company: number;
}

interface AuthProviderProps {
    children: ReactNode;
    user: object;
    token: string;
    loading: boolean;
    signed: boolean;
    company: number;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children, ...rest }: AuthProviderProps) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [token, setToken] = useState('');
    const [signed, setSigned] = useState(false);
    const [company, setCompany] = useState(0);
    
    useEffect(() => {
        const response = Cookies.get('token');

        if (response) {
            setToken(response);
            api.defaults.headers.Authorization = `Bearer ${token}`;
        }
    }, []);

    async function handleExit() {
        setSigned(false);

        const response = Cookies.remove('token');

        router.push({
            pathname: '/',
        });
    }

    async function handleSubmit(data) {
        try {
            setLoading(true);

            const response = await api.post('/sessions', {
                nickname: data.email,
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

            router.push('/Dashboard');

        } catch (error) {
            toast.error('Falha na autenticação, verifique seus dados');
            setLoading(false);
            return;
        }
    }

    async function getCompany(id) {
        setCompany(id[0].value);
    }

    return (
        <AuthContext.Provider 
            value={{             
                handleSubmit, 
                handleExit, 
                token,
                user,
                loading,   
                signed,  
                getCompany,
                company,                     
              }}
            >

            {children}
                        
        </AuthContext.Provider>
    );
}