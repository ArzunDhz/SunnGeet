import { View, Text, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSearchInput } from '../store/store';
import axios from 'axios';
import { FlashList } from '@shopify/flash-list';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SuggestionBox = () =>
{
    const searchInput = useSearchInput().input;
    const store = useSearchInput()
    const setSearchInput = useSearchInput().setInput;
    const [suggestionBox, setSuggestionBox] = useState<string[] | null>();
    const navigation = useNavigation();


    const Item = ({ title }: any) => (
        <View className="  w-full px-4  bg-slate-50 rounded-md  ">
            <TouchableOpacity onPress={() => 
            {
                console.log(title)
                setSearchInput(title)
                store.toggleSuggestion(false)
                //@ts-ignore
                navigation.navigate("SearchList", { "SearchData": title })
            }
            }>
                <Text className=" text-xl py-2 border-b-slate-300/20 border-b-[1px] text-black  border-slate-300/50">{title}</Text>
            </TouchableOpacity>
        </View>
    );

    useEffect(() =>
    {
        const getSearchSuggestion = async () =>
        {
            try
            {
                if (searchInput != null)
                {
                    const { data } = await axios.request(
                        //@ts-ignore
                        `https://clients1.google.com/complete/search?client=youtube&gs_ri=youtube&ds=yt&q=${searchInput}`
                    );
                    const suggestions = JSON.parse(data.substring(data.indexOf('['), data.lastIndexOf(']') + 1))[1].map(([suggestion]: [string]) => suggestion);
                    setSuggestionBox(suggestions)
                }

            } catch (error)
            {
                console.log(error);
            }
        }
        getSearchSuggestion();
    }, [searchInput])


    return (
        <View className=' w-full'>
            {suggestionBox && store.showSuggestion &&
                <FlatList
                    className=' w-[95%] mt-4  h-fit'
                    data={suggestionBox}
                    renderItem={({ item }) => <Item title={item} />}
                />}
        </View>
    )
}



export default SuggestionBox