import { StyleSheet } from "react-native";

import {colors} from "@/constants/colors"

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        paddingHorizontal: 20,
    },
    text: {
        color: colors.blue,
        fontWeight: '500'
    },
    line: {
        backgroundColor: colors.lightGrey,
        height: 1,
        flex: 1,
        marginVertical: 8
    }
})