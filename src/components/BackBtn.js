import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';

export default function BackBtn() {
    const navigation = useNavigation();

    const handleBack = () => navigation.goBack();

    return (
        <Pressable style={styles.btn} onPress={handleBack}>
            <Image
                source={require('../../assets/back_icon.png')}
                style={styles.backImage}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    btn: {
        width: 36,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backImage: {
        width: 22,
        height: 22,
    },
});
