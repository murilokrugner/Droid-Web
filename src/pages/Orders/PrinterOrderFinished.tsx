import { useEffect, useState, useContext } from 'react';

import styles from '../../styles/pages/Devices/ListDevices.module.css'
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
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
    service_performed: string,
    employee: {first_name: string},
    clerk: {first_name: string},
    client: {first_name: string, address: string, neighborhood_address: string, document: string, rg: string, mobile_phone: string, city: string, state_address: string},
    device: {group: {description: string}, id: string, description: string, brand: {description: string}},
}

export default function PrinterOrderFinished() {
    const router = useRouter();

    const id = router.query.id;

    const { token, company } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Data>(null);

    console.log(data);

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
                <Page size={{width: 2480, height: 3508}} style={stylesS.page}>
                    <View style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: 3250, width: '100%'}}>

                        <View style={{flex: 1, display: 'flex',  flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>

                            <View style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Image source={'https://scontent.fqcj2-1.fna.fbcdn.net/v/t1.6435-9/104568258_1467590646761801_2588765545781789609_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=973b4a&_nc_ohc=-uwbc4HOtfgAX_wzELX&_nc_ht=scontent.fqcj2-1.fna&oh=1b6cd83aa6cc9258c29d25ddd05c1bf2&oe=614BAA1E'} />
                            </View>

                            <View style={{width: 1, height: '100%', backgroundColor: '#000'}}></View>

                            <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: 1500, height: 'auto'}}>
                                <Text style={{fontSize: 50, fontWeight: 'bold', marginTop: 40}}>
                                    DROID ASSISTÊNCIA TÉCNICA                                                                                
                                </Text>
                                <Text style={{fontSize: 50, marginTop: 40}}>
                                    AV. BARRA BONITA, 15 BELA VISTA - DOIS CÓRREGOS-SP                                                                             
                                </Text>
                                <Text style={{fontSize: 50, marginTop: 40}}>
                                    TELEFONE/WHATSAPP: (14) 98110-5545                                                                           
                                </Text>
                            </View>

                            <View style={{width: 1, height: '100%', backgroundColor: '#000'}}></View>

                            <View style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Text style={{fontSize: 50, fontWeight: 'bold', marginTop: 40}}>
                                    O.S.                                                                                
                                </Text>
                                <Text style={{fontSize: 50, marginTop: 40}}>
                                    Fechada                                                                             
                                </Text>
                                <Text style={{fontSize: 50, marginTop: 40}}>
                                    {data.id}                                                                           
                                </Text>
                            </View>                            
                        </View>                       

                        <View style={{width: '100%', height: 1, backgroundColor: '#000'}}></View>

                            <View style={{display: 'flex',  flexDirection: 'row', justifyContent: 'flex-start', width: '100%'}}>

                                <View style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: 40, marginLeft: 40, marginRight: 320}}>

                                    <Text style={{fontSize: 50, fontWeight: 'bold', marginTop: 40}}>
                                        Cliente: {data.client.first_name}                                                                             
                                    </Text>
                                    <View style={{display: 'flex',  flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                                        <Text style={{fontSize: 50, fontWeight: 'bold', marginTop: 40}}>
                                            CNPJ/CPF: {data.client.document}                                                                             
                                        </Text>
                                        <Text style={{fontSize: 50, fontWeight: 'bold', marginTop: 40}}>
                                            IE/RG: {data.client.rg}                                                                               
                                        </Text>
                                        <Text style={{fontSize: 50, fontWeight: 'bold', marginTop: 40}}>
                                            Fone: {data.client.mobile_phone}                                                                               
                                        </Text>
                                    </View>
                                    
                                    <Text style={{fontSize: 50, fontWeight: 'bold', marginTop: 40}}>
                                        Endereço: {data.client.address}                                                                              
                                    </Text>

                                    <View style={{display: 'flex',  flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                                        <Text style={{fontSize: 50, fontWeight: 'bold', marginTop: 40}}>
                                            Bairro: {data.client.neighborhood_address}                                                                              
                                        </Text>
                                        <Text style={{fontSize: 50, fontWeight: 'bold', marginTop: 40}}>
                                            Cidade: {data.client.city}                                                                               
                                        </Text>
                                        <Text style={{fontSize: 50, fontWeight: 'bold', marginTop: 40}}>
                                            UF: {data.client.state_address}                                                                               
                                        </Text>
                                    </View>
                                    
                                    <Text style={{fontSize: 50, fontWeight: 'bold', marginTop: 40}}>
                                        Vendedor(a): {data.clerk.first_name}                                                                               
                                    </Text>

                                </View>   

                            </View>

                            <View style={{width: '100%', height: 1, backgroundColor: '#000'}}></View>

                            <View style={{display: 'flex',  flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginLeft: 80}}>
                                <Text style={{fontSize: 55, fontWeight: 'bold', marginTop: 20, marginBottom: 40}}>
                                    Aparelho:
                                </Text>                                
                            </View>  
                            <View style={{display: 'flex',  flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginBottom: 40}}>

                                <View style={{display: 'flex',  flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{fontSize: 50, fontWeight: 'bold'}}>
                                        Código
                                    </Text>
                                    <Text style={{fontSize: 50, fontWeight: 'bold', marginTop: 20}}>
                                        {data.device.id}   
                                    </Text>
                                </View>

                                <View style={{display: 'flex',  flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{fontSize: 50, fontWeight: 'bold'}}>
                                        Descrição do aparelho
                                    </Text>
                                    <Text style={{fontSize: 50, fontWeight: 'bold', marginTop: 20}}>
                                        {data.device.description}
                                    </Text>
                                </View>
                                

                                <View style={{display: 'flex',  flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{fontSize: 50, fontWeight: 'bold'}}>
                                        Marca
                                    </Text>
                                    <Text style={{fontSize: 50, fontWeight: 'bold', marginTop: 20}}>
                                        {data.device.brand.description}
                                    </Text>
                                </View>
                                

                                <View style={{display: 'flex',  flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{fontSize: 50, fontWeight: 'bold'}}>
                                        IMEI
                                    </Text>
                                    <Text style={{fontSize: 50, fontWeight: 'bold', marginTop: 20}}>
                                        {data.imei}
                                    </Text>
                                </View>
                                
                            </View> 

                            <View style={{width: '100%', height: 1, backgroundColor: '#000'}}></View>

                            <View style={{display: 'flex',  flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginLeft: 80}}>
                                <Text style={{fontSize: 55, fontWeight: 'bold', marginTop: 40, marginBottom: 40}}>
                                    Defeitos:
                                </Text>                                
                            </View> 
                            <View style={{display: 'flex',  flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginLeft: 80}}>
                                    <Text style={{fontSize: 50, fontWeight: 'bold'}}>
                                        - {data.defect_problem}
                                    </Text>                                    
                            </View>

                            <View style={{display: 'flex',  flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginLeft: 80}}>
                                <Text style={{fontSize: 55, fontWeight: 'bold', marginTop: 40, marginBottom: 40}}>
                                    Observações:
                                </Text>                                
                            </View> 
                            <View style={{display: 'flex',  flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginLeft: 80, marginBottom: 40}}>
                                    <Text style={{fontSize: 50, fontWeight: 'bold'}}>
                                        - {data.comments}
                                    </Text>                                    
                            </View>
                            
                            <View style={{width: '100%', height: 1, backgroundColor: '#000'}}></View>

                            <View style={{display: 'flex',  flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginLeft: 80}}>
                                <Text style={{fontSize: 55, fontWeight: 'bold', marginTop: 40, marginBottom: 40}}>
                                    Serviços Realizados:
                                </Text>                                
                            </View> 
                            <View style={{display: 'flex',  flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginLeft: 80, marginBottom: 40}}>
                                    <Text style={{fontSize: 50, fontWeight: 'bold'}}>
                                        - {data.service_performed}  
                                    </Text>                                    
                            </View>

                            <View style={{width: '100%', height: 1, backgroundColor: '#000'}}></View>

                            <View style={{display: 'flex',  flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginLeft: 80}}>
                                <Text style={{fontSize: 55, fontWeight: 'bold', marginTop: 40, marginBottom: 40}}>
                                    Valor Total:
                                </Text>                                
                            </View> 
                            <View style={{display: 'flex',  flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginLeft: 80, marginBottom: 40}}>
                                    <Text style={{fontSize: 50, fontWeight: 'bold'}}>
                                        R$ - {data.value !== null && data.value} Reais
                                    </Text>                                    
                            </View>

                            <View style={{width: '100%', height: 1, backgroundColor: '#000'}}></View>

                            <View style={{display: 'flex',  flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginLeft: 80}}>
                                <Text style={{fontSize: 55, fontWeight: 'bold', marginTop: 40, marginBottom: 40}}>
                                    Data de Entrega
                                </Text>                                
                            </View> 
                            <View style={{display: 'flex',  flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginLeft: 80, marginBottom: 40}}>
                                    <Text style={{fontSize: 50, fontWeight: 'bold'}}>
                                        {data.delivery_forecast !== null && data.delivery_forecast.slice(8, 10) + '/' 
                                            +  data.delivery_forecast.slice(5, 7) + '/' 
                                                + data.delivery_forecast.slice(0, 4) }
                                    </Text>                                    
                            </View>

                            <View style={{width: '100%', height: 1, backgroundColor: '#000'}}></View>

                            <View style={{display: 'flex',  flexDirection: 'column', alignItems: 'center'}}>
                                <View style={{display: 'flex',  flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: 40, marginLeft: 40}}>
                                        <Text style={{fontSize: 55, fontWeight: 'bold'}}>
                                            Termo de Garantia
                                        </Text>                                    
                                </View> 
                                <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', flexWrap: 'wrap', width: '100%', padding: 80}}>
                                        <Text style={{fontSize: 55, fontWeight: 'bold', textAlign: 'justify'}}>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.    
                                        </Text>                                    
                                </View>     
                            </View>

                            <View style={{display: 'flex',  flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 130}}>
                                <View style={{display: 'flex',  flexDirection: 'column', alignItems: 'center'}}>
                                    <Text style={{fontSize: 55, fontWeight: 'bold'}}>
                                        ________________________________
                                    </Text> 
                                    <Text style={{fontSize: 55, fontWeight: 'bold', marginTop: 20}}>
                                        Assinatura do Cliente
                                    </Text> 
                                </View>
                                <View style={{display: 'flex',  flexDirection: 'column', alignItems: 'center'}}>
                                    <Text style={{fontSize: 55, fontWeight: 'bold'}}>
                                        _____________________________
                                    </Text> 
                                    <Text style={{fontSize: 55, fontWeight: 'bold', marginTop: 20}}>
                                        Assinatura do Técnico
                                    </Text> 
                                </View>  
                            </View>
                    </View>
                </Page>
            </Document>
        )
    }

    return (
        <div className={styles.Container}>
            <Header />

            <h2>Imprimir ordem de serviço finalizada</h2>   
            
            {loading ? (
                <div className={stylesLoading.Container}>
                    <HashLoader color='#fff' loading={loading} size={50} />
                </div>
            ) : (
                <div className={styles.containerPrinter}>
                    <PDFViewer height={3508} width={2480}>
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
      backgroundColor: '#E4E4E4',
    },
  });
  