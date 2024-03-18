

import * as React from 'react';
import { View, Text, TouchableOpacity, Pressable, Button, StatusBar } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen()
{
  const navigation = useNavigation()
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title='GG'
        //@ts-ignore
        onPress={() => navigation.navigate('Info')}
      />

    </View>
  );
}

function InfoScreen()
{
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity>
        <Text>GG</Text>
      </TouchableOpacity>
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
          />
          <Stack.Screen
            options={{ headerBackVisible: false, headerRight: () => (<Button title="Info" color="red" />), }}
            name="Info" component={InfoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;