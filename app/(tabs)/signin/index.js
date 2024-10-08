import { View, Text } from 'react-native'
import React, {useState} from 'react'
import AuthHeader from '@/components/AuthHeader'
import styles from "./styles"
import Checkbox from '@/components/Checkbox'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Separator from '@/components/Separator'
import { router } from 'expo-router'


const signup = () => {
  const [checked, setChecked] = useState(false)
  return (
    <View style={styles.container}>
      <AuthHeader title="Sign In"/>
      <Input label="Email" placeholder="example@gmail.com"/>
      <Input isPassword label="Password" placeholder="*****"/>

      <View style={styles.agreeRow}>
      <Checkbox checked={checked} onCheck={setChecked}/>
                <Text style={styles.agreeText}>I agree with 
                    <Text style={styles.agreeTextBold}> Terms</Text> & 
                    <Text style={styles.agreeTextBold}> Privacy</Text>
                </Text>
      </View>
      <Button style={styles.button} title="Sign Up" />
      <Separator text="Or sign in with"/>
      <Text style={styles.footerText}>Don't have an account? <Text style={styles.footerLink} onPress={() => router.push('/(tabs)/signup')}>Sign Up</Text></Text>
    </View>
 
)
}

export default signup