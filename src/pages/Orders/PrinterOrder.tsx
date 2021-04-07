import { useEffect, useState, useContext } from 'react';

import styles from '../../styles/pages/Devices/ListDevices.module.css'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';

import Header from '../../components/Header';

import stylesLoading from '../styles/components/Loading.module.css';

import HashLoader from "react-spinners/HashLoader"; 

import { AuthContext } from '../../context/AuthContext';

import { useRouter } from 'next/router';
import api from '../../services/api';
import { string } from 'yup/lib/locale';

interface Data {
    imei: string,
    password_device: string,
    accessories: string,
    defect_problem: string,
    comments: string,
    delivery_forecast: string, 
    value: string,
    password_printer: string,
    employee: {first_name: string},
    clerk: {first_name: string},
    client: {first_name: string, address: string, neighborhood_address: string, document: string, rg: string, mobile_phone: string},
    device: {group: {description: string}, description: string, brand: {description: string}},
}

export default function PrinterOrder() {
    const router = useRouter();

    const id = router.query.id;

    const { token, company } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Data>(null);

    useEffect(() => {
        async function loadData() {
            const response = await api.get(`get-orders-code?company=${company}&id=${id}}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setData(response.data);

            console.log(response.data);

            setLoading(false);
        }

        loadData();
    }, []);

    

    function MyDocument() {
        return (
            <Document>
                <Page size={data.password_printer ? {width: 200, height: 420} : {width: 200, height: 370}} style={stylesS.page}>
                    <View style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: 'auto', width: 200}}>
                        <Text style={{fontSize: 8, fontWeight: 'bold'}}>
                            DROID ASSISTÊNCIA TÉCNICA                                                                                
                        </Text>
                        <Text style={{fontSize: 8}}>AV. BARRA BONITA, 15 BELA VISTA</Text>
                        <Text style={{fontSize: 8}}>DOIS CÓRREGOS-SP</Text>
                        <Text style={{fontSize: 8}}>CNPJ:32.674.575/0001-86</Text>
                        <Text style={{fontSize: 8}}>WhatsApp: (14)98110-5545</Text>

                        <View style={{width: '100%',  marginTop: 20, flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 7}}>Data: 25/03/2020</Text>
                            <Text style={{fontSize: 7}}>Hora: 14:00:00</Text>
                        </View>

                        <View style={{width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Text style={{fontSize: 7}}>------------------------------------------------------------------------------------</Text>
                            <Text style={{fontSize: 7}}>ORDEM DE SERVIÇO --- OS: 903</Text>
                            <Text style={{fontSize: 7}}>------------------------------------------------------------------------------------</Text>
                        </View>

                        <View style={{width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                            <Text style={{fontSize: 7}}>Atendente: {data.clerk.first_name}</Text>
                            <Text style={{fontSize: 7}}>Técnico: {data.employee.first_name}</Text>
                            <Text style={{fontSize: 7}}>Nome: {data.client.first_name}</Text>
                            <Text style={{fontSize: 7}}>Endereço: {data.client.address}</Text>
                            <Text style={{fontSize: 7}}>Bairro: {data.client.neighborhood_address}</Text>
                            <Text style={{fontSize: 7}}>CNPJ/CPF: {data.client.document}</Text>
                            <Text style={{fontSize: 7}}>IE/RG: {data.client.rg}</Text>
                            <Text style={{fontSize: 7}}>Equipamento: {data.device.group.description}</Text>
                            <Text style={{fontSize: 7}}>Marca: {data.device.brand.description}</Text>
                            <Text style={{fontSize: 7}}>Modelo: {data.device.description}</Text>
                            <Text style={{fontSize: 7}}>N° Série: {data.imei}</Text>
                            <Text style={{fontSize: 7}}>Senha: {data.password_device}</Text>
                            <Text style={{fontSize: 7}}>Acessórios: {data.accessories}</Text>
                            <Text style={{fontSize: 7}}>Danificado: {data.defect_problem}</Text>
                        </View>

                        <View style={{width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 10}}>
                            <Text style={{fontSize: 7}}>Defeito: {data.defect_problem}</Text>
                            <Text style={{fontSize: 7}}>Obs: {data.comments}</Text>
                        </View>

                        <View style={{width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 10}}>
                            <Text style={{fontSize: 7}}>Tel/Cel: {data.client.mobile_phone}</Text>
                            <Text style={{fontSize: 7}}>Data Entrega: {data.delivery_forecast}</Text>
                            <Text style={{fontSize: 7}}>Valor/Conserto: {data.value}</Text>
                        </View>

                        {data.password_printer && (
                            <View style={{width: 100, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 10, marginLeft: 60 }}>
                                <View style={{width: 100, flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                    <Text style={{fontSize: 7, textAlign: 'justify'}}>0     </Text>
                                    <Text style={{fontSize: 7, textAlign: 'justify'}}>0     </Text>
                                    <Text style={{fontSize: 7, textAlign: 'justify'}}>0     </Text>
                                </View>
                                <View style={{width: 100, flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                    <Text style={{fontSize: 7, textAlign: 'justify'}}>0     </Text>
                                    <Text style={{fontSize: 7, textAlign: 'justify'}}>0     </Text>
                                    <Text style={{fontSize: 7, textAlign: 'justify'}}>0     </Text>
                                </View>
                                <View style={{width: 100, flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                    <Text style={{fontSize: 7, textAlign: 'justify'}}>0     </Text>
                                    <Text style={{fontSize: 7, textAlign: 'justify'}}>0     </Text>
                                    <Text style={{fontSize: 7, textAlign: 'justify'}}>0     </Text>
                                </View>
                            </View>
                        )}

                        <View style={{width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 10}}>
                            <Text style={{fontSize: 7}}>Estou ciente de que o equipamento que deixei não da para testar e que caso seja encontrado 
                                algum defeito diferente do informado imunizo esta Assistência de qualquer responsabilidades sobre defeitos adicionais 
                                encontrados 
                            </Text>
                            <Text style={{fontSize: 7, textAlign: 'justify'}}>..................................................................................................................................</Text>
                        </View>

                        <View style={{width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 30}}>
                        <Text style={{fontSize: 7, textAlign: 'justify'}}>_______________________________________________________________________________________________________________________________________</Text>
                            <Text style={{fontSize: 7}}>*** Obrigado e volte sempre ***</Text>                            
                        </View>
                        
                    </View>
                </Page>
            </Document>
        )
    }

    return (
        <div className={styles.Container}>
            <Header />

            <h2>Imprimir ordem de serviço</h2>   
            
            {loading ? (
                <div className={stylesLoading.Container}>
                    <HashLoader color='#fff' loading={loading} size={60} />
                </div>
            ) : (
                <div className={styles.containerPrinter}>
                    <PDFViewer height={800} width={500}>
                        <MyDocument />
                    </PDFViewer>
                </div>
            )}
            
        </div>
    );
}

const stylesS = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
  });
  