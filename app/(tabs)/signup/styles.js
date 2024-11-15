import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors'

export const styles = StyleSheet.create({
    container: {},
    inputContainer: {
        borderWidth: 1
    },
    input: {
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 20
    },
    agreeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    agreeText : {
        color: colors.blue,
        marginHorizontal: 14
    },
    agreeTextBold : {
        fontWeight: 'bold'
    },
    button: {
        marginVertical: 20
    },
    footerText: {
        color: colors.blue,
        marginBottom: 56,
        textAlign: 'center'
    },
    footerLink: {
        fontWeight: 'bold'
    }
})

export default styles;