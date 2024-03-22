import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlashList } from "@shopify/flash-list";
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { ManImage } from '../../assets/images';
import { useNavigation } from '@react-navigation/native';
import SearchBox from '../components/SearchBox';
import SuggestionBox from '../components/SuggestionBox';
import SearchList from './SearchList';

const myIcon = <Icon name="search" size={30} color="gray" />;
const SearchScreen = () =>
{
    return (
        <>
            {/* search container */}
            <View className=' bg-white h-screen justify-start items-center'>
                <SearchBox />
                <SuggestionBox />

            </View>

        </>
    )
}

export default SearchScreen
