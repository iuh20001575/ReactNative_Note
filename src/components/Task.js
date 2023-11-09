import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export default function Task() {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/check_icon.png')}
                style={styles.image}
            />
            <Text style={styles.title}>To check email</Text>
            <Image
                source={require('../../assets/edit_icon.png')}
                style={styles.image}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 22,
        paddingVertical: 12,
        marginHorizontal: 20,
        gap: 12,
        flexDirection: 'row',
        backgroundColor: 'rgba(222, 225, 230, 0.47)',
        shadowColor: 'rgba(23, 26, 31, 0.15)',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowRadius: 17,
        borderRadius: 999,
    },
    image: {
        width: 24,
        height: 24,
    },
    title: {
        flex: 1,
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 26,
        color: 'rgba(23, 26, 31, 1)',
    },
});
