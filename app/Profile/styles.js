import  { StyleSheet } from 'react-native'
import { colors } from '@/constants/colors'

export const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: colors.white,
        flex: 1,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.black,
        marginBottom: 12
    },
    email: {
        fontSize: 14,
        color: colors.grey,
        marginBottom: 24
    },
    content: {
        flex: 1
    }
})

export default styles;