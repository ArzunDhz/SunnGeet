

import * as React from 'react';
import { View, Text, TouchableOpacity, Pressable, Button, StatusBar, Image, SafeAreaView, TextInput, ActivityIndicator } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GuitarImage, SImage } from './assets/images';
import SearchScreen from './src/screens/Search';
import SearchList from './src/screens/SearchList';
import SelectedVideo from './src/screens/SelectedVideo';
import axios from 'axios';


export function HomeScreen()
{

  const navigation = useNavigation()
  const [isLoading, setIsLoading] = React.useState(false)
  React.useEffect(() =>
  {
    (async () =>
    {
      try
      {
        setIsLoading(true)
        //@ts-ignore
        await axios.request('https://youtube-api-t3u3.onrender.com')
      } catch (error)
      {
        console.log(error)
      } finally
      {
        setIsLoading(false)
      }
    })()
  }, [])
  return (
    <View className=' flex-1 gap-y-10  bg-white justify-center items-center ' >
      {/* top poriton */}
      <View className=' flex flex-row items-center gap-x-[-25px]'>
        <Image className=' w-20 h-20' source={SImage} />
        <Text className=' text-black text-3xl font-extrabold'>unnGeet</Text>
      </View>

      <Image
        className=' w-64 h-64'
        source={GuitarImage}
      />

      <Text className=' text-black  font-extrabold text-xl'>Search , Download , Play </Text>

      <TouchableOpacity
        disabled={isLoading}
        //@ts-ignore
        onPress={() => navigation.navigate("Search")}
        className=' bg-cyan-400  w-[160px] h-[50px] justify-center items-center rounded-lg '>
        {
          isLoading ?
            <ActivityIndicator size={30} color={'white'} />
            :
            <Text className=' font-bold  '>
              Continue
            </Text>
        }
      </TouchableOpacity>

    </View>
  );
}

function InfoScreen({ _, route }: any)
{
  return (
    <View>
      <Text>GG</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App()
{
  return (
    <>
      <StatusBar
        hidden
      />
      <NavigationContainer>


        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false
            }}
          />

          <Stack.Screen
            options={{ headerBackVisible: false, headerRight: () => (<Button title="Info" color="red" />), }}
            name="Info" component={InfoScreen} />



          <Stack.Screen
            name='Search'
            component={SearchScreen}
            options={{ headerShown: false }}
          />


          <Stack.Screen
            name='SearchList'
            component={SearchList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='SelectedVideo'
            component={SelectedVideo}
            options={{ headerShown: false }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;