import React, { useState } from 'react';
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import {
    Button,
    RadioButton,
    SegmentedButtons,
    Text,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import BackBtn from '../components/BackBtn';
import User from '../components/User';
import { jobApi } from '../services/job';

export default function Screen03({ navigation, route }) {
    const isEdit = route.params?.isEdit ?? false;
    const task = route.params?.task;

    const [isLongTerm, setLongTerm] = useState(false);
    const [priority, setPriority] = useState(1);
    const [job, setJob] = useState(task?.title ?? '');
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleAddJob = async () => {
        setLoading(true);

        if (job)
            if (isEdit) {
                await dispatch(
                    jobApi.endpoints.patchNotes.initiate({
                        id: user.id,
                        body: {
                            ...task,
                            title: job,
                            priority,
                            date: new Date(),
                            isLongTerm,
                        },
                    }),
                ).unwrap();
            } else {
                await dispatch(
                    jobApi.endpoints.postNotes.initiate({
                        title: job,
                        date: new Date(),
                        priority,
                        isLongTerm,
                        user: user.id,
                    }),
                ).unwrap();
            }

        setLoading(false);
        navigation.navigate('Home');
    };

    return (
        <SafeAreaView style={[styles.flex1, styles.safeAreaView]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <TouchableWithoutFeedback
                    onPress={() => Platform.OS !== 'web' && Keyboard.dismiss()}
                >
                    <View>
                        <View style={styles.header}>
                            <User />
                            <BackBtn />
                        </View>

                        <Text style={styles.title}>
                            {isEdit ? 'EDIT' : 'ADD'} YOUR JOB
                        </Text>

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
                                    Platform.OS === 'web' && {
                                        outline: 'none',
                                    },
                                ]}
                                value={job}
                                onChangeText={setJob}
                            />
                        </View>

                        <View style={styles.priority}>
                            <Text style={styles.priorityTitle}>Priority</Text>
                            <SegmentedButtons
                                value={priority}
                                onValueChange={setPriority}
                                buttons={[
                                    {
                                        value: 1,
                                        label: '1',
                                        style: {
                                            backgroundColor:
                                                'rgba(222, 225, 230, 0.47)',
                                        },
                                        showSelectedCheck: true,
                                    },
                                    {
                                        value: 2,
                                        label: '2',
                                        style: {
                                            backgroundColor:
                                                'rgba(235, 137, 9, 0.4)',
                                        },
                                        showSelectedCheck: true,
                                    },
                                    {
                                        value: 3,
                                        label: '3',
                                        style: {
                                            backgroundColor:
                                                'rgba(209, 69, 59, 0.4)',
                                        },
                                        showSelectedCheck: true,
                                    },
                                ]}
                            />
                        </View>

                        <View style={styles.radios}>
                            <View style={styles.radio}>
                                <RadioButton
                                    value='Short Term'
                                    status={
                                        isLongTerm ? 'unchecked' : 'checked'
                                    }
                                    onPress={() => setLongTerm(false)}
                                />
                                <Text style={styles.priorityTitle}>
                                    Short Term
                                </Text>
                            </View>
                            <View style={styles.radio}>
                                <RadioButton
                                    value='Long Term'
                                    status={
                                        isLongTerm ? 'checked' : 'unchecked'
                                    }
                                    onPress={() => setLongTerm(true)}
                                />
                                <Text style={styles.priorityTitle}>
                                    Long Term
                                </Text>
                            </View>
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
                                { marginTop: 70, alignItems: 'center' },
                            ]}
                        >
                            <Image
                                source={require('../../assets/image.png')}
                                style={styles.image}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
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
        marginTop: 15,
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
        marginTop: 15,
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
        flex: 1,
    },
    btn: {
        width: 190,
        height: 44,
        backgroundColor: 'rgba(0, 189, 214, 1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginTop: 15,
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
    priority: {
        marginHorizontal: 20,
        marginTop: 15,
        gap: 6,
    },
    priorityTitle: {
        fontSize: 16,
        lineHeight: 24,
    },
    radios: {
        marginHorizontal: 20,
        marginTop: 15,
        gap: 6,
        flexDirection: 'row',
    },
    radio: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    safeAreaView: {
        paddingTop: StatusBar.currentHeight,
    },
});
