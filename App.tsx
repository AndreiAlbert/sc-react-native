import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import ListScreen from './src/screens/ListScreen';
import AddEditScreen from './src/screens/AddEditScreen';
import { ProductsProvider } from './src/ProductContext';
import { Product } from './src/ProductContext';

export type RootStackParamList = {
  Home: undefined;
  List: undefined;
  AddEdit: { product?: Product};
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ProductsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='List' component={ListScreen} />
          <Stack.Screen name='AddEdit' component={AddEditScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProductsProvider>
  );
}
