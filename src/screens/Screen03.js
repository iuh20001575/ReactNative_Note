import React, { useState } from 'react';
import {
    Image,
    Platform,
    SafeAreaView,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import BackBtn from '../components/BackBtn';
import User from '../components/User';
import { jobApi } from '../services/job';

export default function Screen03({ navigation }) {
    const [job, setJob] = useState('');
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleAddJob = async () => {
        setLoading(true);

        await dispatch(
            jobApi.endpoints.postNotes.initiate({
                title: job,
                date: new Date(),
                priority: 1,
                isLongTerm: true,
                user: user.id,
            }),
        ).unwrap();

        setLoading(false);
        navigation.navigate('Home');
    };

    return (
        <SafeAreaView style={styles.flex1}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <User />
                    <BackBtn />
                </View>

                <Text style={styles.title}>ADD YOUR JOB</Text>

                <View style={styles.searchWrapper}>
                    <Image
                        source={require('../../assets/job_icon.png')}
                        style={styles.searchImage}
                    />
                    <TextInput
                        placeholder='input your job'
                        placeholderTextColor='rgba(23, 26, 31, 1)'
                        style={[
                            styles.searchInput,
                            Platform.OS === 'web' && { outline: 'none' },
                        ]}
                        value={job}
                        onChangeText={setJob}
                    />
                </View>

                <Button
                    loading={loading}
                    style={styles.btn}
                    mode='contained'
                    onPress={handleAddJob}
                >
                    <Image
                        resizeMode='contain'
                        source={require('../../assets/finish.png')}
                        style={styles.btnText}
                    />
                </Button>

                <View
                    style={[
                        styles.flex1,
                        { justifyContent: 'center', alignItems: 'center' },
                    ]}
                >
                    <Image
                        source={require('../../assets/image.png')}
                        style={styles.image}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    flex1: { flex: 1 },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 20,
        paddingTop: 17,
    },
    title: {
        fontWeight: '700',
        fontSize: 32,
        lineHeight: 48,
        marginTop: 52,
        textAlign: 'center',
        color: 'rgba(23, 26, 31, 1)',
    },
    searchWrapper: {
        borderWidth: 1,
        borderColor: 'rgba(144, 149, 160, 1)',
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        gap: 9,
        marginTop: 30,
        marginHorizontal: 20,
    },
    searchImage: {
        width: 24,
        height: 24,
    },
    searchInput: {
        fontSize: 14,
        lineHeight: 22,
        height: 44,
        color: 'rgba(23, 26, 31, 1)',
    },
    btn: {
        width: 190,
        height: 44,
        backgroundColor: 'rgba(0, 189, 214, 1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginTop: 63,
        alignSelf: 'center',
    },
    btnText: {
        width: 72,
        height: 26,
    },
    image: {
        width: 190,
        height: 170,
    },
});
