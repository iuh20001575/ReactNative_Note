import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { jobApi } from '../services/job';

const PRIORITY_3 = 'rgba(209, 69, 59, 0.4)';
const PRIORITY_2 = 'rgba(235, 137, 9, 0.4)';
const PRIORITY_1 = 'rgba(222, 225, 230, 0.47)';

const getColor = (priority) =>
    priority === 1 ? PRIORITY_1 : priority === 2 ? PRIORITY_2 : PRIORITY_3;

export default function Task({ task, refetch }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleEditJob = () => {
        navigation.navigate('Screen03', {
            isEdit: true,
            task,
        });
    };

    const handleDeleteJob = async () => {
        await dispatch(jobApi.endpoints.delete.initiate(task.id)).unwrap();
        refetch();
    };

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: getColor(task.priority) },
            ]}
        >
            <Image
                source={require('../../assets/check_icon.png')}
                style={styles.image}
            />
            <Text style={styles.title}>{task.title}</Text>
            <Pressable onPress={handleEditJob}>
                <Image
                    source={require('../../assets/edit_icon.png')}
                    style={styles.image}
                />
            </Pressable>
            <Pressable onPress={handleDeleteJob}>
                <Image
                    source={require('../../assets/delete.png')}
                    style={styles.image}
                />
            </Pressable>
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
        alignItems: 'center',
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
