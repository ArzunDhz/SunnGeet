import { View, Text, TouchableOpacity, Image, Touchable, Linking } from 'react-native'
import React, { useState } from 'react'
import { IVideo } from '../../type'
import Icon from 'react-native-vector-icons/Ionicons';
import { checkPermissionAndDownload } from '../lib/download-mp3';
import { ActivityIndicator } from 'react-native';

const SelectedVideo = ({ _, route }: any) =>
{
    const youtubeIcon = <Icon name="logo-youtube" size={30} color="red" />;
    const downloadIcon = <Icon name="download-outline" size={30} color="black" />;
    const [isVideoDownloading, setIsVideoDownloading] = useState(false)
    const data: IVideo = route.params?.data

    const handelDownload = async () =>
    {
        setIsVideoDownloading(true)
        try
        {
            await checkPermissionAndDownload(data.title, data.link)
        } catch (error)
        {
            console.log(error)
        }
        setIsVideoDownloading(false)
    }
    return (
        <>
            <View
                className='  py-2   h-fit flex justify-center bg-white items-center mt-10'
            >
                <Image className='  w-[350px] h-[190px] rounded-md' source={{ uri: data.thumbnails.url }} />
                <View className='  w-[350px] flex flex-row items-center  space-x-3 pb-10 ml-4'>
                    <Image className=' w-[50px] h-[50px] rounded-full ' source={{ uri: data.channelThumbnail.url }} />
                    <View className=' w-[290px] '>
                        <Text className=' text-black text-[16px]  font-semibold'>{data.title}</Text>
                        <View className=' flex flex-row  gap-x-2 flex-wrap  items-start justify-start'>
                            <Text className=' text-black/50 text-[12px] '>{data.channelName}</Text>
                            <Text className=' text-black/50 text-[12px] '>{data.viewCount}</Text>
                            <Text className=' text-black/50 text-[12px] '>{data.publishedTime}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View className='  flex-1 bg-white  gap-y-9 items-center'>
                <TouchableOpacity
                    onPress={() => Linking.openURL(data.link)}
                    style={{
                        backgroundColor: '#fff',
                        width: 300,
                        height: 60,
                        shadowColor: '#000',
                        shadowOffset: { width: 1, height: 1 },
                        shadowOpacity: 0.4,
                        shadowRadius: 3,
                        elevation: 5,
                    }} className='  rounded-xl space-x-4   px-20   items-center  flex flex-row'>
                    {youtubeIcon}
                    <Text className='  text-black'>Open In Youtube</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className=' flex items-center justify-center rounded-xl'
                    disabled={isVideoDownloading}
                    onPress={() => handelDownload()}
                    style={{
                        backgroundColor: '#fff',
                        width: 300,
                        height: 60,
                        shadowColor: '#000',
                        shadowOffset: { width: 1, height: 1 },
                        shadowOpacity: 0.4,
                        shadowRadius: 3,
                        elevation: 5,
                    }} >

                    {isVideoDownloading ?
                        <View className='  rounded-xl  space-x-7  items-center  px-20  flex flex-row'>
                            <ActivityIndicator size={40} color={'cyan'} />
                        </View>
                        :
                        <View className='  rounded-xl  space-x-7  items-center  px-20  flex flex-row'>
                            {downloadIcon}
                            <Text className='  text-black translate-x-[-10px] '>Download</Text>
                        </View>
                    }





                </TouchableOpacity>

            </View>


        </>
    )
}

export default SelectedVideo