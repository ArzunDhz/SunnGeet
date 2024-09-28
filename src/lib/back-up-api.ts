import axios from "axios";

export const getMp3UrlFromRapidApi = async (videoId: string): Promise<string> =>
{
    const options = {
        method: "GET",
        url: "https://youtube-mp36.p.rapidapi.com/d",
        params: { id: videoId },
        headers: {
            "X-RapidAPI-Key": '',
            "X-RapidAPI-Host": "",
        },
    };
    const { data } = await axios.request(options);
    return data.link; // Return the link extracted from data
};
