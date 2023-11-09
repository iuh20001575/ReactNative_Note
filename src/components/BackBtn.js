import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';

export default function BackBtn() {
    return (
        <Pressable style={styles.btn}>
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
