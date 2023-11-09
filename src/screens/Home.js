import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

export default function Home() {
    const user = useSelector((state) => state.user);
    console.log('🚀 ~ Home ~ user:', user);

    return (
        <View>
            <Text>Home</Text>
        </View>
    );
}

const styles = StyleSheet.create({});
