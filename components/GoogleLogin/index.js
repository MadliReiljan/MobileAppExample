import {Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './style'

const GoogleLogin = () => {
  return (
    <TouchableOpacity activeOpacity={0.6} style={styles.container}>
        <Image style={styles.image} source={require('@/assets/Google.png')} />
    </TouchableOpacity>
  )
}
export default React.memo(GoogleLogin)