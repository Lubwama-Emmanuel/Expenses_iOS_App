import { useLayoutEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import Button from "../ui/Button";
import IconBtn from "../ui/IconBtn";
import ExpenseForm from "../components/ExpenseForm";

export default function ManageExpense({ route, navigation }) {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function handleCancel() {
    navigation.goBack();
  }
  function handleAdd() {
    navigation.goBack();
  }
  function handleDelete() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm isEditing={isEditing} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 40,
    marginHorizontal: 10,
  },
});
