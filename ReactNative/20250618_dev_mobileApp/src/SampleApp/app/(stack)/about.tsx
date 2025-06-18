import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
export default function AboutScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>ABOUT</Text>
            <Link href="/" style={styles.button}>
                app/(stack)/index.tsx へ戻る
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 24,
        marginBottom: 20,
    },
      button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },

});
