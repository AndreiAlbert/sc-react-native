import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useProducts } from '../ProductContext';
import { RootStackParamList } from '../../App';
import {StackNavigationProp} from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type AddEditScreenRouteProp = RouteProp<RootStackParamList, 'AddEdit'>;
type AddEditScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddEdit'>;

interface AddEditScreenProps {
  route: AddEditScreenRouteProp;
  navigation: AddEditScreenNavigationProp;
}

function AddEditScreen({ route, navigation }: AddEditScreenProps) {
    const { addProduct, updateProduct } = useProducts();
    const [name, setName] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [location, setLocation] = useState<string>('');

    const product = route.params?.product;

    useEffect(() => {
        if(product) {
            setName(product.name);
            setPrice(product.price.toString());
            setLocation(product.location);
        } 
    }, [product])

    const handleSave = () => {
        const productPrice = parseFloat(price);
        if(product) {
            updateProduct(product.id, name, productPrice, location);
        } else {
            addProduct(name, productPrice, location); 
        }
        navigation.navigate('List');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Product name:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName} 
                placeholder='Enter product name'
            />
            <Text style={styles.label}>Price: </Text>
            <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                placeholder="Enter product price"
                keyboardType="numeric" // Set keyboard type for numeric input
            />

            <Text style={styles.label}>Location: </Text>
            <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
                placeholder='Enter location'
            />
            <Text style={styles.label}>Upload a picture</Text>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save product</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'flex-start',
      backgroundColor: '#f5f5f5', // Light gray background
    },
    label: {
      fontSize: 18,
      marginBottom: 8,
      color: '#333333', // Dark text for better readability
    },
    input: {
      borderWidth: 1,
      borderColor: '#cccccc', // Light gray border
      borderRadius: 8, // Rounded corners
      padding: 12,
      marginBottom: 20,
      fontSize: 16,
    },
    button: {
      backgroundColor: '#007bff', // Blue background for the button
      padding: 15,
      borderRadius: 8, // Rounded corners for the button
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold', // Bold text for the button
    },
  });


export default AddEditScreen;
