import DownloadService from '../downloadService';


const donwloadDocuments = (params) => {
    const jobUrl = params.jobUrl;
    const jobId = new Date().getTime().toString();
    console.log(`Attempting to download file from: ${jobUrl}`);
    DownloadService(jobId, jobUrl, params.onComplete);
}

export default donwloadDocuments;