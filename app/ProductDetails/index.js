import React, { useState, useEffect } from "react";
import { Text, ScrollView, Image, View, Pressable, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from "@/components/Button"
import ImageCarusel from "@/components/ImageCarusel";
import { styles } from "./styles"
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProductDetails = ({ navigation, route }) => {
    const { products } = route.params || {}; 
    const [isBookmarked, setIsBookmarked] = useState(false);  
  
    useEffect(() => {
      const checkIfFavorite = async () => {
        const savedFavorites = await AsyncStorage.getItem('favorites');
        const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
        const isProductFavorite = favorites.some(item => item.id === products?.id);
        setIsBookmarked(isProductFavorite);
      };
  
      checkIfFavorite();
    }, [products?.id]);  
  
    const onBackPress = () => {
      navigation.goBack(); 
    };
  
    const onContact = () => {
      let phone = 'real phone number';
      Linking.openURL(`tel:${phone}`);  
      let email = 'real email';
      Linking.openURL(`mailto:${email}`);  
    };
  
    const toggleBookmark = async () => {
      let savedFavorites = await AsyncStorage.getItem('favorites');
      savedFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];
  
      if (isBookmarked) {
        savedFavorites = savedFavorites.filter(item => item.id !== products?.id);
      } else {
        savedFavorites.push(products);
      }
  
      setIsBookmarked(!isBookmarked);  
      await AsyncStorage.setItem('favorites', JSON.stringify(savedFavorites));  
    };
  
    return (
      <SafeAreaView style={styles.save}>
        <ScrollView style={styles.container}>
          {products?.images?.length ? (
            <ImageCarusel images={products?.images} />  
          ) : (
            <Image style={styles.image} source={{ uri: products?.image }} /> 
          )}
          <View style={styles.content}>
            <Text style={styles.title}>{products?.title}</Text>
            <Text style={styles.price}>{products?.price}</Text>
            <Text style={styles.description}>{products?.description}</Text>
          </View>
          <Pressable onPress={onBackPress} style={styles.backContainer}>
            <Image style={styles.backIcon} source={require('@/assets/back.png')} />
          </Pressable>
        </ScrollView>
        <View style={styles.footer}>
          <Pressable onPress={toggleBookmark} style={styles.bookmarkContainer}>
            <Image
              style={styles.bookmarkIcon}
              source={
                isBookmarked
                  ? require('@/assets/bookmark.png') 
                  : require('@/assets/bookmark_inactive.png')  
              }
            />
          </Pressable>
          <Button onPress={onContact} title="Contact Seller" />
        </View>
      </SafeAreaView>
    );
  };
  
  export default React.memo(ProductDetails);