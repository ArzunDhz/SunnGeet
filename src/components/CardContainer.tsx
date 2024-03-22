import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { IVideo } from '../../type'
import { useNavigation } from '@react-navigation/native'

const CardContainer = ({ data }: { data: IVideo }) =>
{
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            onPress={() =>
            {
                //@ts-ignore
                navigation.navigate('SelectedVideo', { data })
            }}
            className='  my-2   h-fit flex justify-center items-center'
        >
            <Image className=' w-[350px] h-[190px] rounded-md' source={{ uri: data.thumbnails.url }} />
            <View className='  w-[350px] flex flex-row items-center  space-x-3 p-2'>
                <Image className=' w-[40px] h-[40px] rounded-full text-' source={{ uri: data.channelThumbnail.url }} />
                <View className=' w-[290px] '>
                    <Text className=' text-black text-[16px] font-semibold'>{data.title}</Text>
                    <View className=' flex flex-row  gap-x-2 flex-wrap  items-start justify-start'>
                        <Text className=' text-black/50 text-[12px] '>{data.channelName}</Text>
                        <Text className=' text-black/50 text-[12px] '>{data.viewCount}</Text>
                        <Text className=' text-black/50 text-[12px] '>{data.publishedTime}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}


export default CardContainer