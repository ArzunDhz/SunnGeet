import axios from "axios";

export const getMp3UrlFromRapidApi = async (videoId: string): Promise<string> =>
{
    const options = {
        method: "GET",
        url: "https://youtube-mp36.p.rapidapi.com/dl",
        params: { id: videoId },
        headers: {
            "X-RapidAPI-Key": 'dcc30b2b2fmshac3b7e241a8fc6cp1061bdjsn8937e7e638cb',
            "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
        },
    };
    const { data } = await axios.request(options);
    return data.link; // Return the link extracted from data
};
