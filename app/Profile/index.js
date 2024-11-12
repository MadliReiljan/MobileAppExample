import React, { useContext, useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import Header from "@/components/Header/Index";
import ListItem from "@/components/ListItem";
import Button from "@/components/Button";
import { logOut, getCurrentUser } from "@/lib/appwrite";
import { UserContext } from "@/context/usercontext";

const Profile = ({ navigation }) => {
    const { setIsAuthenticated } = useContext(UserContext);  
    const [user, setUser] = useState(null);  
    const num = 10;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = await getCurrentUser();
                if (currentUser) {
                    setUser(currentUser);
                } else {
                    console.warn('No user is currently logged in');
                    Alert.alert("Error", "User data not found. Please log in.");
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                Alert.alert("Error", "Unable to fetch user data.");
            }
        };

        fetchUserData();
    }, []);

    const onLogout = async () => {
        try {
            const currentUser = await getCurrentUser();

            if (!currentUser) {
                console.warn('No user is currently logged in');
                Alert.alert("Logout Error", "No active session found. Please log in again.");
                return; 
            }

            await logOut();
            setIsAuthenticated(false); 
            navigation.navigate('Splash'); 
        } catch (error) {
            console.error('Logout error:', error);
            Alert.alert("Logout Error", error.message || "An error occurred during logout. Please try again.");
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
                    <Text style={styles.name}>{user?.username || "Username"}</Text>
                    <Text style={styles.email}>{user?.email || "User email"}</Text>
                    
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