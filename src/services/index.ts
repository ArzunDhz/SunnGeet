import axios, { AxiosResponse } from "axios";

export const getYoutubeSearchedData = async (searchedData: string) =>
{
    try
    {
        //@ts-ignore
        const response: AxiosResponse = await axios.request(`https://youtube-api-t3u3.onrender.com/searchVideo?search=${searchedData}`)
        return response.data;
    } catch (error)
    {
        // Handle errors
        console.log(error);
        return null
    }
}