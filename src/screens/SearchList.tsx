import { View, Text, SafeAreaView, Button, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios, { all } from 'axios'
import { IVideo } from '../../type'
import { getYoutubeSearchedData } from '../services'
import CardContainer from '../components/CardContainer'
import SearchBox from '../components/SearchBox'
import SuggestionBox from '../components/SuggestionBox'
import { FlashList } from '@shopify/flash-list'
import { useSearchInput } from '../store/store'


const SearchList = ({ _, route }: any) =>
{
    const setSearchInput = useSearchInput().setInput;
    const store = useSearchInput();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [searchedData, setSearchedData] = useState<IVideo[]>();
    useEffect(() =>
    {
        store.toggleSuggestion(false)

        if (route.params.SearchData)
        {
            setIsLoading(true);
            (async () =>
            {
                const data = await getYoutubeSearchedData(route.params.SearchData);
                if (data)
                {
                    setSearchedData(data);
                }
            })();
            setIsLoading(false)
        }
    }, [route.params.SearchData])

    return (
        <>
            <SearchBox />
            <SuggestionBox />
            {isLoading && <ActivityIndicator className=' mt-44' size={50} color={'cyan'} />}
            {searchedData &&
                <FlashList
                    estimatedItemSize={10}
                    data={searchedData}
                    renderItem={({ item }: { item: IVideo }) =>
                    {
                        return <CardContainer data={item} />;
                    }} />
            }

        </>
    )
}

export default SearchList