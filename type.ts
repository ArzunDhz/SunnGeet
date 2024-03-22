export interface IVideo
{
    channelName: string;
    channelThumbnail: {
        height: number;
        url: string;
        width: number;
    };
    duration: string;
    id: string;
    link: string;
    publishedTime: string;
    thumbnails: {
        height: number;
        url: string;
        width: number;
    };
    title: string;
    type: string;
    viewCount: string;
}