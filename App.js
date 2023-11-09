import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Platform } from 'react-native';
import {
    configureFonts,
    MD3LightTheme,
    PaperProvider,
} from 'react-native-paper';
import uuid from 'react-native-uuid';
import Home from './src/screens/Home';
import Login from './src/screens/Login';

const Stack = createNativeStackNavigator();

const fontConfig = {
    customVariant: {
        fontFamily: Platform.select({
            web: 'Inter, Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
            ios: 'System',
            default: 'sans-serif',
        }),
        fontWeight: '400',
        letterSpacing: 0.5,
        lineHeight: 22,
        fontSize: 20,
    },
};

const theme = {
    ...MD3LightTheme,
    fonts: configureFonts({ config: fontConfig }),
};

const screens = [
    {
        name: 'Login',
        component: Login,
        options: {
            headerShown: false,
        },
    },
    {
        name: 'Home',
        component: Home,
        options: {
            headerShown: false,
        },
    },
];

function App() {
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Login'>
                    {screens.map((screen) => (
                        <Stack.Screen key={uuid.v4()} {...screen} />
                    ))}
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}

export default App;
