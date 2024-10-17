import { View, Text, Image, Pressable } from 'react-native'
import React, {useState} from 'react'
import AuthHeader from '../../../components/AuthHeader'
import styles  from './styles';
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import Separator from '../../../components/Separator'
import GoogleLogin from '../../../components/GoogleLogin';
import { SafeAreaProvider } from "react-native-safe-area-context"


const SignIn = ({navigation}) => { 
    const onBack = () =>  {
        navigation.goBack()
    }

    const onSignup = () => {
      navigation.navigate('Signup')
  }

  return (

  <SafeAreaProvider>
    <View style={styles.container}>
        <AuthHeader onBackPress={onBack} title="Sign In" />
        <Input label="Email" placeholder="example@gmail.com" />
        <Input isPassword label="Password" placeholder="******" />
        <Button style={styles.button} title="Sign In" />
        <Separator text="Or sign up with" />
        <GoogleLogin />
        <Text style={styles.footerText}>Don't have an account?
            <Text onPress={onSignup} style={styles.footerLink}> Sign Up</Text>
        </Text>
    </View>
  </SafeAreaProvider>
 
)
}

export default React.memo(SignIn)