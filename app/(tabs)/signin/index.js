import { View, Text, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import AuthHeader from '@/components/AuthHeader';
import styles from './styles';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Separator from '@/components/Separator';
import GoogleLogin from '@/components/GoogleLogin';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserContext } from "@/app/index";
import { Client, Account } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1')  
  .setProject('6721dc4d0037014bdb63'); 

const account = new Account(client);

const SignIn = ({ navigation }) => {
    const { setUser } = useContext(UserContext);
    console.log("User context:", setUser);
    const [values, setValues] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const onBack = () => {
        navigation.goBack();
    };

    const onSignup = () => {
        navigation.navigate('Signup');
    };

    const onChange = (key, value) => {
        setValues((prev) => ({ ...prev, [key]: value }));
    };

    const onSubmit = async () => {
        if (!values.email || !values.password) {
            Alert.alert('All fields are required!');
            return;
        }

        setLoading(true);
        try {
            
            const response = await account.createEmailPasswordSession(values.email, values.password);
            const accessToken = response.$id; 
            setUser({ accessToken });
            navigation.navigate('Home'); 
        } catch (error) {
            Alert.alert('Error', error.message || 'An error occurred');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <AuthHeader onBackPress={onBack} title="Sign In" />
                <Input
                    label="Email"
                    placeholder="example@gmail.com"
                    onChangeText={(v) => onChange('email', v)} 
                    value={values.email} 
                />
                <Input
                    isPassword
                    label="Password"
                    placeholder="******"
                    onChangeText={(v) => onChange('password', v)} 
                    value={values.password} 
                />
                <Button
                    style={styles.button}
                    title={loading ? "Signing In..." : "Sign In"}
                    onPress={onSubmit}
                    disabled={loading} 
                />
                <Separator text="Or sign up with" />
                <GoogleLogin />
                <Text style={styles.footerText}>
                    Don't have an account?
                    <Text onPress={onSignup} style={styles.footerLink}> Sign Up</Text>
                </Text>
            </View>
        </SafeAreaProvider>
    );
};

export default React.memo(SignIn);