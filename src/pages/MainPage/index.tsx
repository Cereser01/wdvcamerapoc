import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Button from '../../components/Button';
import donwloadDocuments from '../../service/donwloadDocuments';
import RNFS from 'react-native-fs';
import { directories } from '@kesha-antonov/react-native-background-downloader';
import FileViewer from 'react-native-file-viewer';

const MainPage = () => {
    const [filePresent, setFilePresent] = useState(false);
    const [jobUrl, setJobUrl] = useState('https://www.clickdimensions.com/links/TestPDFfile.pdf');
    const controlUrl = 'https://www.clickdimensions.com/links/TestPDFfile.pdf';
    const problematicUrl = 'https://www.weg.net/campaigns/dw/';

    const downloadsDirectory = directories.documents;
    const filePath = `${downloadsDirectory}/file.pdf`;

    const handleSubmit = () => {
        const downloadParams = {
            onComplete: handleDownloadComplete,
            jobUrl: jobUrl,
        };
        donwloadDocuments(downloadParams);
    }

    const handleDownloadComplete = () => {
        checkFilePresence();
    };

    useEffect(() => {
        checkFilePresence();
    }, []);

    const checkFilePresence = async () => {
        try {
            const fileExists = await RNFS.exists(filePath);
            setFilePresent(fileExists);
        } catch (error) {
            console.error('Error checking file presence:', error);
        }
    };

    const openPDFFile = async () => {
        try {
            await FileViewer.open(filePath);
        } catch (err) {
            console.log('Error Lib OpenFile:', err);
        }
    };

    const deletePDFFile = async () => {
        try {
            await RNFS.unlink(filePath);
            setFilePresent(false);
            console.log('PDF file deleted successfully.');
        } catch (error) {
            console.error('Error deleting PDF file:', error);
        }
    };

    const toggleJobUrl = () => {
        setJobUrl(jobUrl === controlUrl ? problematicUrl : controlUrl);
    };

    return (
        <>
            <Text style={styles.subtitle}>
                Download {jobUrl === controlUrl ? 'Control Url' : 'Problematic Url'}: {jobUrl}
            </Text>
            <Button title={'Attempt Download'} callback={handleSubmit} />
            <Button title={'Toggle Job URL'} callback={toggleJobUrl} />
            {filePresent && (
                <View>
                    <Button title={'Open PDF'} callback={openPDFFile} />
                    <Button title={'Delete PDF'} callback={deletePDFFile} />
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    subtitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 250,
        marginTop: 250,
        fontSize: 20,
    },
});

export default MainPage;
