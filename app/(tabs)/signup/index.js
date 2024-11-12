import React, { useState, useContext } from 'react';
import { UserContext } from "@/app/index";
import { View, Text, Alert } from "react-native";
import AuthHeader from "@/components/AuthHeader";
import Input from '@/components/Input';
import Checkbox from '@/components/Checkbox';
import Button from '@/components/Button';
import { styles } from './styles';
import Separator from '@/components/Separator';
import GoogleLogin from '@/components/GoogleLogin';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createUser, signIn } from '@/lib/appwrite';

const Signup = ({ navigation, setIsAuthenticated }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    
    const onBack = () =>  {
        navigation.goBack()
    }

    const onSignin = () =>  {
        navigation.navigate('Signin')
    }

    const onSignup = async () => {
        if (!checked) {
            Alert.alert("Agreement Required", "Please agree to the Terms and Privacy policy.");
            return;
        }

        try {

            const user = await createUser(email, password, name);
            if (user) {
                Alert.alert("Signup Successful", "Welcome to the app!");
                
                const signInUser = await signIn(email, password); 
                if (signInUser) {
                    setIsAuthenticated(true); 
                    navigation.navigate('Tabs'); 
                }
            }
        } catch (error) {
            Alert.alert("Signup Failed", error.message || "An error occurred during signup.");
        }
    };
    

    return (
    <SafeAreaProvider>
        <View style={styles.container}>
            <AuthHeader onBackPress={onBack} title="Sign up" />
            <Input label="Name" placeholder="John Doe" value={name} onChangeText={setName} />
                <Input label="Email" placeholder="example@gmail.com" value={email} onChangeText={setEmail} />
                <Input isPassword label="Password" placeholder="******" value={password} onChangeText={setPassword} />
            <View style={styles.agreeRow}>
                <Checkbox checked={checked} onCheck={setChecked}/>
                <Text style={styles.agreeText}>I agree with<Text style={styles.agreeTextBold}> Terms </Text>&<Text style={styles.agreeTextBold}> Privacy</Text></Text>
            </View>
            <Button style={styles.button} title="Sign up" onPress={onSignup} />
            <Separator text="Or sign up with" />
            <GoogleLogin />
            <Text style={styles.footerText}>Already have an account?
                <Text onPress={onSignin} style={styles.footerLink}> Sign In</Text>
            </Text>
        </View>
    </SafeAreaProvider>
    )
}

export default Signup;