import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../resources/GlobalStyles";

export default function Button({ children, onPress, isRounded = false }) {
  return (
    <View style={[styles.container, isRounded && styles.rounded]}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && [styles.btnPressed]}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.text}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: colors.primary400,
    paddingVertical: 15,
    paddingHorizontal: 15,
    margin: 8,
    alignItems: "center",
  },
  innerContainer: {},
  text: {
    fontSize: 18,
    textTransform: "uppercase",
  },
  btnPressed: {
    opacity: 0.5,
  },
  rounded: {
    borderRadius: 100,
    paddingHorizontal: 25,
  },
});
