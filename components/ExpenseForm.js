import { View, StyleSheet } from "react-native";
import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addExpense } from "../store/expenseSlice";
import IconBtn from "../ui/IconBtn";

export default function ExpenseForm({ isEditing }) {
  const navigation = useNavigation();
  const [inputValues, setInputValues] = useState({
    amount: "",
    date: "",
    description: "",
  });
  const dispatch = useDispatch();

  function handleInputValues(inputField, enteredValue) {
    setInputValues((currentState) => {
      return { ...currentState, [inputField]: enteredValue };
    });
  }

  function handleCancel() {
    navigation.goBack();
  }

  const expense = {
    id: Math.random(3),
    name: inputValues.description,
    amount: +inputValues.amount,
    date: inputValues.date,
  };

  function handleAddExpense() {
    dispatch(addExpense(expense));
    navigation.goBack();
  }
  function handleUpdateExpense() {
    dispatch(addExpense(expense));
    navigation.goBack();
  }
  function handleDeleteExpense() {
    dispatch(addExpense(expense));
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Input
          label={"amount"}
          textInputConfig={{
            onChangeText: handleInputValues.bind(this, "amount"),
            value: inputValues.amount,
          }}
        />
        <Input
          label={"date"}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            onChangeText: handleInputValues.bind(this, "date"),
            value: inputValues.date,
          }}
        />
      </View>
      <Input
        label={"description"}
        textInputConfig={{
          placeholder: "What did you spend on ",
          multiline: true,
          onChangeText: handleInputValues.bind(this, "description"),
          value: inputValues.description,
        }}
      />
      <View style={styles.btnContainer}>
        <Button onPress={handleCancel}>cancel</Button>
        {isEditing ? (
          <Button onPress={handleUpdateExpense}>Update</Button>
        ) : (
          <Button onPress={handleAddExpense}>Add</Button>
        )}
      </View>
      {isEditing && (
        <View style={{ alignItems: "center" }}>
          <View style={styles.line}></View>
          <IconBtn
            onPress={handleDeleteExpense}
            name="trash"
            color={"red"}
            size={26}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flexDirection: "row",
  },
  btnContainer: {
    flexDirection: "row",
  },
  line: {
    height: 2,
    width: "100%",
    backgroundColor: "#a78bfa",
    marginTop: 10,
  },
});
