import React, { useState, useEffect } from 'react';
import { View, Text, Linking, Image, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header/Index';
import ListItem from '@/components/ListItem';
import { styles } from './styles';
import EditableBox from '@/components/EditableBox';
import Button from "@/components/Button"
import { getCurrentUser, updateUser } from "@/lib/appwrite"; 

const Settings = () => {
    const [editing, setEditing] = useState(false);
    const [values, setValues] = useState({ name: "", email: "" });
    const [userId, setUserId] = useState(null); 

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getCurrentUser();
            if (user) {
                setValues({ name: user.username, email: user.email });
                setUserId(user.$id); 
            } else {
                Alert.alert("Error", "Failed to fetch user data.");
            }
        };
        fetchUser();
    }, []);

    const onChange = (key, value) => {
        setValues(v => ({...v, [key]: value}))
    }

    const onEditPress = () => {
        setEditing(true)
    }

    const onSave = async () => {
        setEditing(false);
        try {
            await updateUser(userId, { username: values.name, email: values.email });
            Alert.alert("Success", "Your profile has been updated.");
    
            const user = await getCurrentUser();
            if (user) {
                setValues({ name: user.username, email: user.email });
            }
        } catch (error) {
            console.error("Error saving profile:", error);
            Alert.alert("Error", "Failed to update profile.");
        }
    };

    const onItemPress = () => {
        Linking.openURL('https://google.com')
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Header title="Settings" />
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}> Personal Information</Text>
                    <Pressable onPress={onEditPress}>
                        <Image style={styles.icon} source={require('@/assets/edit.png')} />
                    </Pressable>
                </View>
                <EditableBox
                    onChangeText={(v) => onChange("name", v)}
                    label="Name"
                    value={values.name}
                    editable={editing}
                />
                <EditableBox
                    onChangeText={(v) => onChange("email", v)}
                    label="Email"
                    value={values.email}
                    editable={editing}
                />
                {editing ? (
                    <Button style={styles.button} onPress={onSave} title="Save" />
                ) : null}

                <Text style={styles.sectionTitle}>Help Center</Text>
                <ListItem onPress={onItemPress} style={styles.item} title="FAQ" />
                <ListItem onPress={onItemPress} style={styles.item} title="Contact Us" />
                <ListItem onPress={onItemPress} style={styles.item} title="Privacy & Terms" />
            </View>
        </SafeAreaView>
    )
}

export default React.memo(Settings)