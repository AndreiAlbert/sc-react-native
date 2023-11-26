import { Text, View, Button } from "react-native"
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../../App";

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};


function HomeScreen({navigation}: Props) {
    return (
        <View>
            <Button
                title = 'See all products'
                onPress={() => navigation.navigate('List')}
            />
            <Button
                title="Add product" 
                onPress={() => navigation.navigate('AddEdit', {})}
            />
        </View>
    ) 
}

export default HomeScreen;