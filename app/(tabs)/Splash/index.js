import React, { useContext, useEffect } from "react";
import { UserContext } from "../../index"; 
import { Image, Pressable, Text, View } from 'react-native';
import { styles } from "./styles";
import Button from "../../../components/Button";
import { useNavigation } from '@react-navigation/native'; 

const Splash = () => {
    const { user } = useContext(UserContext);
    const navigation = useNavigation(); 
    console.log('user => ', user);

    useEffect(() => {
        if (user) {
            navigation.navigate('Tabs');
        } else {
            navigation.navigate('Signin'); 
        }
    }, [user, navigation]);

    const onSignup = () => {
        navigation.navigate('Signup');
    };

    return (
        <View style={styles.container}>
            <Image resizeMode="contain" style={styles.image} source={require('../../../assets/images/splash_image.png')} />
            
            <View style={styles.titleContainer}>
                <Text style={styles.title}>You'll find</Text>
                <Text style={[styles.innerTitle, styles.title]}> All you need</Text>
                <Text style={styles.title}>Here!</Text>
            </View>

            <Button onPress={onSignup} title="Sign up" />
            <Pressable onPress={() => navigation.navigate('Signin')} hitSlop={20}>
                <Text style={styles.footerText}>Sign In</Text>
            </Pressable>
        </View>
    );
};

export default Splash;