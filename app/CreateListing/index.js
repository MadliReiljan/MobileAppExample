import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Pressable, ActivityIndicator, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from '../../components/Header/Index';
import Button from "../../components/Button"
import Input from "../../components/Input";
import { styles } from './styles';

import { launchCamera, launchImageLibrary} from 'react-native-image-picker'

const CreateListing = ({ navigation }) => {
    const [images, setImages] = useState([])
    const [values, setValues] = useState({})

    const categories = [
        { id: 1, label: 'Chair', value: 'Chair' },
        { id: 2, label: 'Table', value: 'Table' },
        { id: 3, label: 'Armchair', value: 'Armchair' },
        { id: 4, label: 'Sofa', value: 'Sofa' },
        { id: 5, label: 'Bed', value: 'Bed' },
    ];

    const goBack = () => {
        navigation.goBack()
    }
    
    const uploadNewImage = async () => {
        const result = await launchImageLibrary()
        console.log(result)
        if(result?.assets?.length) {
            setImages(list => ([...list,result?.assets]))
        }
    }

    const onDeleteImage = (image) => {
        setImages((list) => {
            const filteredImages = list.filter((img) => img?.fileName != image?.fileName)
            return filteredImages
        })
    }

    const onChange = (value, key) => {
        setValues((val) => ({...val, [key]: value}))
    }

    return (
        <SafeAreaView style={{flex: 1}} >
            <KeyboardAvoidingView behavior="position">
            <Header showBack={true} onBackPress={goBack} title="Create a new listing"/>
            <View style={styles.container}>
                <Text style={styles.sectionTitle}>Upload photos</Text>
                    <View style={styles.imageRow}>
                    <TouchableOpacity style={styles.uploadContainer} onPress={uploadNewImage}>
                        <View style={styles.uploadCircle}>
                            <Text style={styles.uploadPlus}>+</Text>
                        </View>
                    </TouchableOpacity>
                    {images?.map(image => (
                        <View key={image?.fileName} style={styles.imageContainer}>
                            <Image source={{uri: image?. uri}}/>
                            <Pressable hitSlop={20} onPress={() => onDeleteImage(image)} >
                                <Image style={styles.delete} source={require('../../assets/close.png')}/>
                            </Pressable>
                        </View>
                    ))}
                </View>
                <Input label="Title" placeholder="Listing Title" value={values.title} onChangeText={(v) => onChange(v, 'title')}/>
                <Input label="Category" placeholder="Select the category" value={values.category} onChangeText={(v) => onChange(v, 'category')} type="picker" options={categories}/>
                <Input label="Price" placeholder="Enter price in USD" value={values.price} onChangeText={(v) => onChange(v, 'price')} keyboardType="numeric"/>
                <Input style={styles.textarea} label="Description" placeholder="Tell us more..." value={values.description} onChangeText={(v) => onChange(v, 'description')} multiline/>
                <Button title="Submit"/>
            </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default React.memo(CreateListing)