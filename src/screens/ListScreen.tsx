import { Button, View, FlatList, Text, TouchableOpacity, Alert, Platform, Image } from "react-native";
import { RootStackParamList } from "../../App";
import { StackNavigationProp } from '@react-navigation/stack'
import { useProducts } from "../ProductContext";
import { StyleSheet } from "react-native";

type ListScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'List'
>;

type Props = {
    navigation: ListScreenNavigationProp;
};


function ListScreen({ navigation }: Props) {
    const { products, deleteProduct } = useProducts();

    const confirmDelete = (id: number) => {
        if(Platform.OS === "android" || Platform.OS === "ios") {
            Alert.alert(
                "Delete product", 
                "Are you sure you want to delete this product?", 
                [
                    {
                        text: 'Cancel', 
                        style: 'cancel'
                    }, 
                    {
                        text: 'Ok', 
                        onPress: () => deleteProduct(id)
                    }
                ]
            )
        }
        else if(Platform.OS === "web") {
            const confirm = window.confirm("Are you sure you want to delete this product?");
            if(confirm) {
                deleteProduct(id);
            }
        }
    }

    return (
        <View style={styles.container}>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={styles.infoContainer}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                  <Text style={styles.price}>{item.location}</Text>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('AddEdit', { product: item })}>
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => confirmDelete(item.id)}>
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddEdit', {})}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0', // Light background color
    },
    item: {
      backgroundColor: 'white',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10, 
      flexDirection: 'row', 
      alignItems: 'center',
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 25, // Circular image
      marginRight: 16,
    },
    title: {
      flex: 1, // Take up remaining space
      fontSize: 18,
      color: '#333', // Darker text for readability
    },
    buttonContainer: {
      flexDirection: 'row',
    },
    button: {
      marginLeft: 10,
      backgroundColor: '#007bff',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    addButton: {
      position: 'absolute',
      right: 20,
      bottom: 20,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#0A84FF',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    addButtonText: {
      fontSize: 30,
      color: 'white',
    },
    price: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
      },
    infoContainer: {
      flex: 1, 
      justifyContent: 'center'
    }
  });
  

export default ListScreen;