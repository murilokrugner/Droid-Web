import { useState, useEffect } from 'react';

import api from '../../services/api';

import styles from '../../styles/components/Forms/FormDescriptionOnly.module.css';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';

const schema = Yup.object().shape({
    description: Yup.string().required('A descrição é obrigatória'),
  });

export default function FormDescriptionOnly({ address }) {
    const [loadingScreen, setLoadingScreen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [code, setCode] = useState(0);

    useEffect(() => {
        async function loadCode() {
            const response = await api.get('/devices');

            setCode(response.data);

            setLoadingScreen(false);
        };

    }, );

    async function handleSubmit(data) {
        try {
            setLoading(true);

            const response = await api.post(`${address}`, {
                description: data.description,
            });

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <div className={styles.Container}>
            {loadingScreen ? (
                <></>
            ) : (
                <div className={styles.containerForm}>
    
                    <Form schema={schema} onSubmit={handleSubmit}>
                    <Input name="code" type="text" placeholder="Código" value={code} disabled />
                    <Input
                        name="Description"
                        type="text"
                        placeholder="Descrição do aparelho"
                    />
                    <button type="submit">{loading ? 'Carregando...' : 'Gravar'}</button>

                    </Form>
                </div>
            )}
        </div>
    );
}