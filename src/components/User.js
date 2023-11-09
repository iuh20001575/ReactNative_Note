import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

export default function User() {
    const user = useSelector((state) => state.user.user);

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/avatar.png')}
                style={styles.avatar}
            />
            <View>
                <Text style={styles.name}>Hi {user.name}</Text>
                <Text style={styles.desc}>Have agrate day a head</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    name: {
        marginLeft: 19,
        fontWeight: '700',
        fontSize: 20,
        lineHeight: 30,
        color: 'rgba(23, 26, 31, 1)',
    },
    desc: {
        marginLeft: 7,
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 22,
        color: 'rgba(23, 26, 31, 0.75)',
    },
});
