import { Text, View, TextInput, StyleSheet } from "react-native";

export default function Input({ label, textInputConfig, isRounded = false }) {
  const isMultiline = !!textInputConfig?.multiline;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          {...textInputConfig}
          style={[
            styles.textInput,
            isMultiline && styles.multilineTextInput,
            isRounded && styles.rounded,
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  label: {
    textTransform: "capitalize",
    color: "#a78bfa",
    fontSize: 18,
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: "#a78bfa",
    color: "#2e1065",
    fontSize: 20,
    paddingHorizontal: 4,
    paddingVertical: 10,
  },
  multilineTextInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  rounded: {
    borderRadius: 15,
  },
});
