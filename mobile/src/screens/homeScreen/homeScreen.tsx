import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import styles from './homeScreen.styles';

type RootStackParamList = {
  'Pagina teste': undefined;
};

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>tela inicial</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Pagina teste')} style={styles.button}>
        <Text style={styles.buttonText}>Ir para Pagina Teste</Text>
      </TouchableOpacity>

    </View>
  );
}
