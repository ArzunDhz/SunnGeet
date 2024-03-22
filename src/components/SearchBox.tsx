import { View, Text, TouchableOpacity, SafeAreaView, TextInput } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useSearchInput } from '../store/store';
import { useNavigation } from '@react-navigation/native';


const myIcon = <Icon name="search" size={30} color="gray" />;
const SearchBox = () =>
{
    const navigation = useNavigation()
    const store = useSearchInput()
    const searchInput = useSearchInput().input;
    const setSearchInput = useSearchInput().setInput

    return (
        <SafeAreaView>
            <View className=' relative  mx-2 bg-white    flex items-center justify-center mt-4 flex-row'>
                <TextInput
                    placeholderTextColor={'black'}
                    //@ts-ignore
                    value={searchInput}
                    onChangeText={(e: string) =>
                    {
                        store.toggleSuggestion(true)
                        setSearchInput(e)
                    }}
                    className='  w-full border-2 pl-4   text-black  rounded-full  border-slate-400 '
                    placeholder='Search ...'
                    onSubmitEditing={() =>
                    {
                        store.toggleSuggestion(false)
                        //@ts-ignore
                        navigation.navigate("SearchList", { "SearchData": searchInput })
                    }}
                />
                <TouchableOpacity className=' absolute right-2'>
                    {myIcon}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default SearchBox