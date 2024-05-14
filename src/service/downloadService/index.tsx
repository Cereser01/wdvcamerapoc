import { Platform } from 'react-native';
import {
    download,
    completeHandler,
    directories,
} from '@kesha-antonov/react-native-background-downloader';

const DownloadService = (jobId, url, onComplete) => {
    let task = download({
        id: jobId,
        url: url,
        destination: `${directories.documents}/file.pdf`,
        metadata: {},
    })
        .begin(({ expectedBytes, headers }) => {
            console.log(`Going to download ${expectedBytes} bytes!`);
        })
        .progress(({ bytesDownloaded, bytesTotal }) => {
            console.log(`Downloaded: ${(bytesDownloaded / bytesTotal) * 100}%`);
        })
        .done(({ bytesDownloaded, bytesTotal }) => {
            console.log('Download is done!', { bytesDownloaded, bytesTotal });
            onComplete();
            completeHandler(jobId);
        })
        .error(({ error, errorCode }) => {
            console.log('Download canceled due to error: ', { error, errorCode });
        });
}

export default DownloadService;