import styles from '../../styles/pages/Devices/ListDevices.module.css'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';

import Header from '../../components/Header';

import { useRouter } from 'next/router';

export default function PrinterOrder() {
    const router = useRouter();

    function MyDocument() {
        return (
            <Document>
                <Page size={{width: 200, height: 200}} style={stylesS.page}>
                    <View style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: 'auto'}}>
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
                    </View>
                </Page>
            </Document>
        )
    }

    return (
        <div className={styles.Container}>
            <Header />

            <h2>Imprimir ordem de serviço</h2>   

            

            <div className={styles.containerPrinter}>
                <PDFViewer height={800} width={500}>
                    <MyDocument />
                </PDFViewer>
            </div>
            
        </div>
    );
}

const stylesS = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
  });
  