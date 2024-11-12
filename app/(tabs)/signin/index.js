import { View, Text, Alert } from 'react-native';
import React, { useState } from 'react';
import AuthHeader from '@/components/AuthHeader';
import styles from './styles';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Separator from '@/components/Separator';
import GoogleLogin from '@/components/GoogleLogin';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { signIn } from '@/lib/appwrite';

const SignIn = ({ navigation, onSignInSuccess  }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onBack = () => {
        navigation.goBack();
    };

    const onSignup = () => {
        navigation.navigate('Signup');
    };

    const handleSignIn = async () => {
        setIsLoading(true); 
        try {
            await signIn(email, password);
            onSignInSuccess(); 
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <AuthHeader onBackPress={onBack} title="Sign In" />
                <Input label="Email" placeholder="example@gmail.com" value={email} onChangeText={setEmail} />
                <Input isPassword label="Password" placeholder="******" value={password} onChangeText={setPassword} />
                <Button style={styles.button} title="Sign In" onPress={handleSignIn} loading={isLoading} />
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