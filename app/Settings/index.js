import React, { useState } from 'react';
import { View, Text, Linking, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header/Index';
import ListItem from '../../components/ListItem';
import { styles } from './styles';
import EditableBox from '../../components/EditableBox';
import Button from "../../components/Button"

const Settings = () => {
    const [editing, setEditing] = useState(false)
    const [values, setValues] = useState({name: 'Madli', email: 'madli@mail.com'})

    const onChange = (key, value) => {
        setValues(v => ({...v, [key]: value}))
    }

    const onEditPress = () => {
        setEditing(true)
    }

    const onSave = () => {
        setEditing(false)
    }

    const onItemPress = () => {
        Linking.openURL('https://google.com')
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <Header title="Settings" />
            <View style={styles.container} >
                <View style={styles.sectionHeader} >
                    <Text style={styles.sectionTitle}>Personal Information</Text>
                    <Pressable onPress={onEditPress} >
                        <Image style={styles.icon} source={require('../../assets/edit.png')} />
                    </Pressable>
                </View>
                <EditableBox onChangeText={(v) => onChange('name', v)} label="Name" value={values.name} editable={editing}  />
                <EditableBox onChangeText={(v) => onChange('email', v)} label="Email" value={values.email} editable={editing}  />
                {editing ? (<Button style={styles.button} onPress={onSave} title="Save"/>) : null}
                <View style={{ height: 20 }} /> 

                <Text style={styles.sectionTitle}>Help Center</Text>
                <ListItem onPress={onItemPress} style={styles.item} title="FAQ"/>
                <ListItem onPress={onItemPress} style={styles.item} title="Contact Us" />
                <ListItem onPress={onItemPress} style={styles.item} title="Privacy & Terms" />
            </View>
        </SafeAreaView>
    )
}

export default React.memo(Settings)