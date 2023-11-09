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
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Registry from './src/screens/Registry';

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
    },
    {
        name: 'Home',
        component: Home,
    },
    {
        name: 'Registry',
        component: Registry,
    },
];

function App() {
    return (
        <Provider store={store}>
            <PaperProvider theme={theme}>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{ headerShown: false }}
                        initialRouteName='Login'
                    >
                        {screens.map((screen) => (
                            <Stack.Screen key={uuid.v4()} {...screen} />
                        ))}
                    </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        </Provider>
    );
}

export default App;
