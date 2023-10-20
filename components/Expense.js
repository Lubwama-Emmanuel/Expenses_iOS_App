import { Image, Pressable } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";

export default function Expense({ item }) {
  const { name, amount, id, date, imageUri } = item;
  const navigation = useNavigation();

  function handleOnPress() {
    navigation.navigate("ManageExpenses", {
      expenseId: id,
    });
  }

  return (
    <Pressable
      onPress={handleOnPress}
      style={({ pressed }) => pressed && [{ opacity: 0.75 }]}
    >
      <View style={styles.container}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <View style={styles.info}>
          <View>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.text}>{date}</Text>
          </View>
          <View style={styles.amountCon}>
            <Text style={styles.amount}>{amount.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    width: 380,
    backgroundColor: "#2e1065",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    marginVertical: 8,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    color: "#fff",
  },
  amountCon: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
  },
  amount: {
    color: "#2e1065",
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    height: 80,
  },
  info: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
});
