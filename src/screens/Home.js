import React from 'react';
import {
    Image,
    Platform,
    Pressable,
    SafeAreaView,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { useSelector } from 'react-redux';
import BackBtn from '../components/BackBtn';
import Task from '../components/Task';
import User from '../components/User';
import { useGetNotesByUserQuery } from '../services/job';

export default function Home({ navigation }) {
    const user = useSelector((state) => state.user);
    const { data, isLoading } = useGetNotesByUserQuery(user?.user.id);

    const handleAddJob = () => navigation.navigate('Screen03');

    return (
        <SafeAreaView style={styles.flex1}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <BackBtn />
                    <User />
                </View>

                <View style={styles.searchWrapper}>
                    <Image
                        source={require('../../assets/search_icon.png')}
                        style={styles.searchImage}
                    />
                    <TextInput
                        placeholder='Search'
                        placeholderTextColor='rgba(23, 26, 31, 1)'
                        style={[
                            styles.searchInput,
                            Platform.OS === 'web' && { outline: 'none' },
                        ]}
                    />
                </View>

                {isLoading && (
                    <ActivityIndicator
                        size='large'
                        style={styles.loading}
                        animating={true}
                        color={MD2Colors.red800}
                    />
                )}

                <View style={styles.list}>
                    {isLoading ||
                        data.map((task) => <Task task={task} key={task.id} />)}
                </View>

                <Pressable style={styles.addBtn} onPress={handleAddJob}>
                    <Image
                        source={require('../../assets/add_icon.png')}
                        style={styles.addImage}
                    />
                </Pressable>
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
        width: 26,
        height: 26,
    },
    searchInput: {
        fontSize: 14,
        lineHeight: 22,
        height: 44,
        color: 'rgba(23, 26, 31, 1)',
    },
    list: {
        marginTop: 67,
        gap: 18,
    },
    addBtn: {
        width: 69,
        height: 69,
        borderRadius: 99,
        backgroundColor: 'rgba(0, 189, 214, 1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 28,
        alignSelf: 'center',
    },
    addImage: {
        width: 32,
        height: 32,
    },
    loading: {
        marginTop: 40,
    },
});
