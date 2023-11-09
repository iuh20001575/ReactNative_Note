import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
    Button,
    HelperText,
    Surface,
    Text,
    TextInput,
} from 'react-native-paper';
import configs from '../configs';

export default function Login({ navigation }) {
    const [hiddenPassword, setHiddenPassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('thaoanhhaa1');
    const [password, setPassword] = useState('111111');
    const [error, setError] = useState(false);

    const handleLogin = async () => {
        setError(false);
        setLoading(true);

        const res = await fetch(`${configs.ENDPOINT_DEV}/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ username, password }),
        });

        if (res.status === 200) navigation.navigate('Home');
        else {
            setError(true);
            setLoading(false);
        }
    };

    const handleToggleShowPassword = () => setHiddenPassword((prev) => !prev);

    return (
        <View style={styles.container}>
            <Surface style={styles.wrapper} elevation={4}>
                <Text variant='displayMedium' style={styles.title}>
                    Login
                </Text>
                <TextInput
                    mode='outlined'
                    label='Username'
                    value={username}
                    onChangeText={setUsername}
                />
                <View>
                    <TextInput
                        mode='outlined'
                        label='Password'
                        secureTextEntry={hiddenPassword}
                        right={
                            <TextInput.Icon
                                onPress={handleToggleShowPassword}
                                icon='eye'
                            />
                        }
                        value={password}
                        onChangeText={setPassword}
                    />
                    {error && (
                        <HelperText
                            style={styles.error}
                            type='error'
                            visible={error}
                        >
                            Username or password is incorrect
                        </HelperText>
                    )}
                </View>
                <Button
                    loading={loading}
                    mode='contained'
                    onPress={handleLogin}
                >
                    Login
                </Button>
            </Surface>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        justifyContent: 'center',
    },
    wrapper: {
        padding: 20,
        gap: 20,
        borderRadius: 8,
    },
    title: {
        textAlign: 'center',
    },
});
