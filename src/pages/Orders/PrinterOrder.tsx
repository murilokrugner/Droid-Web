import { useEffect, useState, useContext } from 'react';

import styles from '../../styles/pages/Devices/ListDevices.module.css'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import { format } from 'date-fns'
import getHours from 'date-fns/getHours'
import getMinutes from 'date-fns/getMinutes'
import getSeconds from 'date-fns/getSeconds'
import Header from '../../components/Header';

import stylesLoading from '../../styles/components/Loading.module.css';

import HashLoader from "react-spinners/HashLoader"; 

import { AuthContext } from '../../context/AuthContext';

import { useRouter } from 'next/router';
import api from '../../services/api';
import { string } from 'yup/lib/locale';

interface Data {
    id: string,
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

            (response.data);

            setLoading(false);
        }

        loadData();
    }, []);

    function MyDocument() {
        const date = format(new Date(), 'dd/MM/yyyy');

        const hour = getHours(new Date());
        const minutes = getMinutes(new Date());
        const seconds = getSeconds(new Date());

        const currentHour = hour + ':' + minutes + ':' + seconds;

        return (
            <Document>
                <Page size={{width: 200, height: 500}} style={stylesS.page}>
                    <View style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: 'auto', width: 200, padding: 5}}>
                        <Text style={{fontSize: 9, fontWeight: 'bold'}}>
                            DROID ASSISTÊNCIA TÉCNICA                                                                                
                        </Text>
                        <Text style={{fontSize: 9}}>AV. PIRACICABA, 895B</Text>
                        <Text style={{fontSize: 9}}>CHACARAS CALIFORNIA</Text>
                        <Text style={{fontSize: 9}}>DOIS CÓRREGOS-SP</Text>
                        <Text style={{fontSize: 9}}>CNPJ:32.674.575/0001-86</Text>
                        <Text style={{fontSize: 9}}>WhatsApp: (14) 98110-5545</Text>

                        <View style={{width: '100%',  marginTop: 20, flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 8}}>Data: {date}</Text>
                            <Text style={{fontSize: 8}}>Hora: {currentHour}</Text>
                        </View>

                        <View style={{width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Text style={{fontSize: 8}}>------------------------------------------------------------------------------------</Text>
                            <Text style={{fontSize: 8}}>ORDEM DE SERVIÇO --- OS: {data.id}</Text>
                            <Text style={{fontSize: 8}}>------------------------------------------------------------------------------------</Text>
                        </View>

                        <View style={{width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                            <Text style={{fontSize: 8}}>Atendente: {data.clerk.first_name}</Text>
                            <Text style={{fontSize: 8}}>Técnico: {data.employee.first_name}</Text>
                            <Text style={{fontSize: 8}}>Nome: {data.client.first_name}</Text>
                            <Text style={{fontSize: 8}}>Endereço: {data.client.address}</Text>
                            <Text style={{fontSize: 8}}>Bairro: {data.client.neighborhood_address}</Text>
                            <Text style={{fontSize: 8}}>CNPJ/CPF: {data.client.document}</Text>
                            <Text style={{fontSize: 8}}>IE/RG: {data.client.rg}</Text>
                            <Text style={{fontSize: 8}}>Equipamento: {data.device.group.description}</Text>
                            <Text style={{fontSize: 8}}>Marca: {data.device.brand.description}</Text>
                            <Text style={{fontSize: 8}}>Modelo: {data.device.description}</Text>
                            <Text style={{fontSize: 8}}>N° Série: {data.imei}</Text>
                            <Text style={{fontSize: 8}}>Senha: {data.password_device}</Text>
                            <Text style={{fontSize: 8}}>Acessórios: {data.accessories}</Text>
                            <Text style={{fontSize: 8}}>Danificado: {data.defect_problem}</Text>
                        </View>

                        <View style={{width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 10}}>
                            <Text style={{fontSize: 8}}>Defeito: {data.defect_problem}</Text>
                            <Text style={{fontSize: 8}}>Obs: {data.comments}</Text>
                        </View>

                        <View style={{width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 10}}>
                            <Text style={{fontSize: 8}}>Tel/Cel: {data.client.mobile_phone}</Text>
                            <Text style={{fontSize: 8}}>Data Entrega: {data.delivery_forecast !== null && data.delivery_forecast.slice(8, 10) + '/' 
                                        +  data.delivery_forecast.slice(5, 7) + '/' 
                                            + data.delivery_forecast.slice(0, 4) }</Text>
                            <Text style={{fontSize: 8}}>Valor/Conserto: {data.value !== null && data.value}</Text>
                        </View>

                        {data.password_printer && (
                            <View style={{width: 100, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 10, marginLeft: 60 }}>
                                <View style={{width: 100, flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                    <Text style={{fontSize: 8, textAlign: 'justify'}}>0     </Text>
                                    <Text style={{fontSize: 8, textAlign: 'justify'}}>0     </Text>
                                    <Text style={{fontSize: 8, textAlign: 'justify'}}>0     </Text>
                                </View>
                                <View style={{width: 100, flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                    <Text style={{fontSize: 8, textAlign: 'justify'}}>0     </Text>
                                    <Text style={{fontSize: 8, textAlign: 'justify'}}>0     </Text>
                                    <Text style={{fontSize: 8, textAlign: 'justify'}}>0     </Text>
                                </View>
                                <View style={{width: 100, flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                    <Text style={{fontSize: 8, textAlign: 'justify'}}>0     </Text>
                                    <Text style={{fontSize: 8, textAlign: 'justify'}}>0     </Text>
                                    <Text style={{fontSize: 8, textAlign: 'justify'}}>0     </Text>
                                </View>
                            </View>
                        )}

                        <View style={{width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 10}}>
                            <Text style={{fontSize: 8, textAlign: 'justify'}}>Estou ciente de que o equipamento que deixei não da para testar e que caso seja encontrado 
                                algum defeito diferente do informado imunizo esta Assistência de qualquer responsabilidades sobre defeitos adicionais 
                                encontrados 
                            </Text>
                            <Text style={{fontSize: 8, textAlign: 'justify'}}>..................................................................................................................................</Text>
                        </View>

                        <View style={{width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 30}}>
                        <Text style={{fontSize: 8, textAlign: 'justify'}}>_______________________________________________________________________________________________________________________________________</Text>
                            <Text style={{fontSize: 8}}>*** Obrigado e volte sempre ***</Text>                            
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
  