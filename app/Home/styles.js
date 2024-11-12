import  { StyleSheet } from 'react-native'
import { colors } from '@/constants/colors'

export const styles = StyleSheet.create({
    container: {
        padding: 24,
        flexDirection: "column",
        borderWidth: 0,
        backgroundColor: colors.white
    },
    title: {
        color: colors.black,
        fontSize: 16,
        fontWeight: "bold"
    },
    icon: {
        width: 24,
        height: 24
    }, 
    space: {
        width: 24
    },
    list: {
        paddingVertical: 24
    }
    
})