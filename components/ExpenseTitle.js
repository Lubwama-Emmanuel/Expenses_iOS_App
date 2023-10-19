import { Text, StyleSheet } from "react-native";
import { View } from "react-native";
import { colors } from "../resources/GlobalStyles";

export default function ExpenseTitle({ total }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Last 7 days</Text>
      <Text style={styles.total}>${total.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "90%",
    backgroundColor: colors.primary400,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 5,
    justifyContent: "space-between",
  },
  text: {
    color: colors.primary950,
  },
  total: {
    fontWeight: "bold",
    color: colors.primary950,
  },
});
