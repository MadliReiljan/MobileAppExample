import React, { useState, useContext } from 'react';
import { UserContext } from "../../index";
import { View, Text, Alert } from "react-native";
import AuthHeader from "../../../components/AuthHeader";
import Input from '../../../components/Input';
import Checkbox from '../../../components/Checkbox';
import Button from '../../../components/Button';
import { styles } from './styles';
import Separator from '../../../components/Separator';
import GoogleLogin from '../../../components/GoogleLogin';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Client, Account } from 'appwrite';

const Signup = ({ navigation }) => {
    const [checked, setChecked] = useState(false);
    const [values, setValues] = useState({});
    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const client = new Client();
    client
        .setEndpoint('https://cloud.appwrite.io/v1')  
        .setProject('6721dc4d0037014bdb63');  
    
    const account = new Account(client);

    const onBack = () => {
        navigation.goBack();
    };

    const onSignin = () => {
        navigation.navigate('Signin');
    };

    const onChange = (key, value) => {
        setValues(v => ({ ...v, [key]: value }));
    };

    const onSubmit = async () => {
        if (!values?.fullName || !values?.email || !values?.password) {
            Alert.alert('All fields are required!');
            return;
        }
        if (!checked) {
            Alert.alert('Please agree with the terms');
            return;
        }

        setLoading(true);
        try {
            const user = await account.create(
                'unique()',  
                values.email,
                values.password,
                values.fullName
            );
            console.log('User registered:', user);

            const session = await account.createEmailPasswordSession(values.email, values.password);
            console.log('Login successful:', session);

            const accessToken = session.$id;  
            setUser({ accessToken });
        } catch (error) {
            Alert.alert('Error', error.message || 'An error occurred');
            console.error('Signup/Login Error:', error);
        } finally {
            setLoading(false);
        }

        console.log('values => ', values);
    };

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <AuthHeader onBackPress={onBack} title="Sign up" />
                <Input value={values.fullName} onChangeText={(v) => onChange('fullName', v)} label="Name" placeholder="John Doe" />
                <Input value={values.email} onChangeText={(v) => onChange('email', v)} label="Email" placeholder="example@gmail.com" />
                <Input value={values.password} onChangeText={(v) => onChange('password', v)} isPassword label="Password" placeholder="******" />
                <View style={styles.agreeRow}>
                    <Checkbox checked={checked} onCheck={setChecked} />
                    <Text style={styles.agreeText}>I agree with<Text style={styles.agreeTextBold}> Terms </Text>&<Text style={styles.agreeTextBold}> Privacy</Text></Text>
                </View>
                <Button onPress={onSubmit} style={styles.button} title={loading ? "Signing up..." : "Sign up"} disabled={loading} />
                <Separator text="Or sign up with" />
                <GoogleLogin />
                <Text style={styles.footerText}>Already have an account?
                    <Text onPress={onSignin} style={styles.footerLink}> Sign In</Text>
                </Text>
            </View>
        </SafeAreaProvider>
    );
};

export default React.memo(Signup);