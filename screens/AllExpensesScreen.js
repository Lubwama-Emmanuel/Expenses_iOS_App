import { View, StyleSheet } from "react-native";
import ExpensesList from "../components/ExpensesList";
import ExpenseTitle from "../components/ExpenseTitle";
import { useSelector } from "react-redux";

export default function AllExpensesScreen() {
  const expenseStore = useSelector((state) => state.expenses);

  const expenses = expenseStore.expenses;

  const expensesTotal = expenses.reduce((acc, { amount }) => acc + amount, 0);

  return (
    <View style={styles.container}>
      <ExpenseTitle total={expensesTotal} />
      <ExpensesList expenses={expenses} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginVertical: 15,
  },
});
