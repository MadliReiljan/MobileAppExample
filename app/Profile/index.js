import React, { useContext } from "react";
import { View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import Header from "@/components/Header/Index";
import ListItem from "@/components/ListItem";
import Button from "@/components/Button";
import { Client, Account } from 'appwrite';
import { UserContext } from "@/app/index";

const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6721dc4d0037014bdb63');  

const account = new Account(client);

const Profile = ({ navigation }) => {
    const { setUser } = useContext(UserContext);
    const num = 10;

    const onLogout = async () => {
        try {
            await account.deleteSession('current');
            console.log('Logout successful');
            setUser(null);  
            navigation.navigate('Signin'); 
        } catch (error) {
            Alert.alert('Error', error.message || 'Failed to log out');
            console.error('Logout Error:', error);
        }
    };

    const onSettingsPress = () => {
       navigation.navigate('Settings');
    };

    const onNewListingPress = () => {
        navigation.navigate('CreateListing');
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Header title="Profile" showLogout onLogout={onLogout} />
                    <Text style={styles.name}>User name</Text>
                    <Text style={styles.email}>User email</Text>
                    
                    <ListItem title="My Listings" subtitle={`Already have ${num} listings`} />
                    <View style={{ height: 20 }} /> 
                    <ListItem title="Settings" subtitle="Account, FAQ, Contact" onPress={onSettingsPress} />
                </View>
                <Button onPress={onNewListingPress} title="Add New Listing" />
            </View>
        </SafeAreaView>
    );
};

export default React.memo(Profile);