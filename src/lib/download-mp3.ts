import axios, { AxiosInstance } from 'axios';
import { PermissionsAndroid, Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'


const downloadUrl = 'https://rr2---sn-jboxuo2-3uhe.googlevideo.com/videoplayback?expire=1711037935&ei=jwn8ZdHmCJeJ9fwPuf-noAo&ip=54.254.162.138&id=o-AC1B8YV8LOEQd-tK-7dIXs6dNF8BcIzFu-sD5EQ4lUtT&itag=251&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&vprv=1&svpuc=1&mime=audio%2Fwebm&gir=yes&clen=4171750&dur=263.241&lmt=1699201773229926&keepalive=yes&c=ANDROID&txp=4532434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cvprv%2Csvpuc%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgDz8IilfQID2S_f8rwUB0xW7V0vT8c7K4Rp5-VyX9A1cCIANfM8jFA85rapyGNajEU7Eh7h7Pwd9BlltmMZTxd5TR&redirect_counter=1&rm=sn-npozy7l&req_id=80a575b1bf10a3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=Ql&mip=103.156.26.21&mm=31&mn=sn-jboxuo2-3uhe&ms=au&mt=1711016217&mv=m&mvi=2&pcm2cms=yes&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pcm2cms,pl&lsig=ALClDIEwRQIhALBXGbzO2X-aZzoxGi8o5wr0m4flPhGbIxDRWIN2EomEAiBpweEnmgBjL-LUqJ7sTR4j8egAqDLAfmvZot-NCN3Tzw%3D%3D'
const REMOTE_IMAGE_PATH = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

export const checkPermissionAndDownload = async (videoTitle: string, videoUrl: string) =>
{
    if (Platform.OS === 'ios')
    {
        return await getVideoURLFromAPI(videoUrl, videoTitle);
    } else
    {
        try
        {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Download Permission',
                    message:
                        'SunnGeet App needs access to your Download  ' +
                        'so baby pls baby deu na.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED)
            {
                // Once user grant the permission start downloading
                console.log('Storage Permission Granted.');
                return getVideoURLFromAPI(videoUrl, videoTitle);
            } else
            {
                // If permission denied then show alert
                //@ts-ignore
                alert('Storage Permission Not Granted');
            }
        } catch (err)
        {
            // To handle permission related exception
            console.warn(err);
        }
    }

};

const getVideoURLFromAPI = async (videoUrl: string, title: string) =>
{
    //@ts-ignore
    const { data } = await axios.request(`https://youtube-api-t3u3.onrender.com/download-mp3?video_url=${videoUrl}`)
    return await downloadImage(data.download_url, title)
}

const downloadImage = async (videoUrl: string, title: string) =>
{

    let image_URL = videoUrl;
    const { config, fs } = RNFetchBlob;
    let dwnDir = fs.dirs.DownloadDir;
    let options = {
        fileCache: true,
        addAndroidDownloads: {
            // Related to the Android only
            useDownloadManager: true,
            notification: true,
            path:
                dwnDir +
                `/${title}` +
                '.mp3',
            description: 'Video',
        },
    };
    await config(options)
        .fetch('GET', image_URL)
        .progress((received, total) =>
        {
            console.log('progress', received / total)
        })
        .then(() => true)
        .catch(() => false)
};

