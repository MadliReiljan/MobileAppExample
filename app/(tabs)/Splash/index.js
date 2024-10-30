import React, {useContext} from "react";
import { UserContext } from "../../index"
import {Image, Pressable, Text, View} from 'react-native'
import {styles} from "./styles"
import Button from "../../../components/Button"
import { router } from 'expo-router'

const Splash = ({navigation}) => {
    const user = useContext(UserContext)
    console.log('user => ', user)

    const onSignup = () => {
        navigation.navigate('Signup')
    }
    const onSignin = () =>  {
        navigation.navigate('Signin')
    }

    return (
        <View style={styles.container}>
            <Image  resizeMode="contain" style={styles.image} source={require('../../../assets/images/splash_image.png')}/>
            
            <View style={styles.titleContainer}>
                <Text style={styles.title}>You'll find</Text>
                <Text style={[styles.innerTitle, styles.title]}> All you need
                </Text>
                <Text style={styles.title}>Here!</Text>
            </View>

            <Button onPress={onSignup} title="Sign up" />
            
            <Pressable onPress={onSignin} hitSlop={20}>
                <Text style={styles.footerText} onPress={() => router.push('/(tabs)/Signin')} >Sign In</Text>
            </Pressable>
        </View>
    )
}
export default Splash