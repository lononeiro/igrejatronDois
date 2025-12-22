import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from '@react-navigation/native';

import styles from './paginaTeste.styles';

type RootStackParamList = {
  Home: undefined;
};

export default function PaginaTeste() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pagina teste</Text>


      <TouchableOpacity onPress={() => navigation.navigate("Home") } style={styles.button}>
        <Text>Voltar para Início</Text>
      </TouchableOpacity>
    </View>
  );
}
    