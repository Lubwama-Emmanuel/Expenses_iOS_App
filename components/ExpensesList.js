import { FlatList } from "react-native";
import Expense from "./Expense";

export default function ExpensesList({ expenses }) {
  function renderExpense({ item }) {
    return <Expense item={item} />;
  }
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.name}
      renderItem={renderExpense}
    />
  );
}
