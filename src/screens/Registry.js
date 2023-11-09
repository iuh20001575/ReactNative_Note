import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Surface, Text, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { registry } from '../features/user/userSlice';

export default function Registry({ navigation }) {
    const [hiddenPassword, setHiddenPassword] = useState(true);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const loading = useSelector((state) => state.user.loading);
    const dispatch = useDispatch();

    const handleToggleShowPassword = () => setHiddenPassword((prev) => !prev);
    const handleRegistry = async () => {
        await dispatch(registry({ name, username, password })).unwrap();

        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Surface style={styles.wrapper} elevation={4}>
                <Text variant='displayMedium' style={styles.title}>
                    Registry
                </Text>
                <TextInput
                    mode='outlined'
                    label='Name'
                    value={name}
                    onChangeText={setName}
                />
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
                </View>
                <Button
                    mode='contained'
                    loading={loading}
                    onPress={handleRegistry}
                >
                    Registry
                </Button>
                <Button
                    mode='text'
                    onPress={() => navigation.navigate('Login')}
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
