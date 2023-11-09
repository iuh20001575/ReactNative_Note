import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
    Button,
    HelperText,
    Surface,
    Text,
    TextInput,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/user/userSlice';

export default function Login({ navigation }) {
    const [hiddenPassword, setHiddenPassword] = useState(true);
    const [username, setUsername] = useState('thaoanhhaa1');
    const [password, setPassword] = useState('111111');
    const [error, setError] = useState(false);
    const loading = useSelector((state) => state.user.loading);

    const dispatch = useDispatch();

    const handleLogin = async () => {
        setError(false);

        const res = await dispatch(login({ username, password })).unwrap();

        if (res.status === 200) navigation.navigate('Home');
        else setError(true);
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
