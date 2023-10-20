import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { store } from "./store/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

import RecentExpensesScreen from "./screens/RecentExpensesScreen";
import AllExpensesScreen from "./screens/AllExpensesScreen";
import ManageExpense from "./screens/ManageExpense";
import IconBtn from "./ui/IconBtn";
import { colors } from "./resources/GlobalStyles";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import { addToken, logOut } from "./store/authSlice";
import { init } from "./utils/database";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

function AuthNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary950,
          height: 110,
        },
        headerTintColor: "#fff",
        contentStyle: {
          backgroundColor: "#4c1d95",
        },
      }}
    >
      <Stack.Screen
        name="signUp"
        component={SignUpScreen}
        options={{
          title: "SignUp",
        }}
      />
      <Stack.Screen
        name="logIn"
        component={LoginScreen}
        options={{
          title: "LogIn",
        }}
      />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  const dispatch = useDispatch();

  function loggingOut() {
    dispatch(logOut());
  }
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: colors.primary900,
      }}
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: colors.primary950,
          height: 110,
        },
        headerTintColor: "#fff",

        headerLeft: ({ tintColor }) => (
          <IconBtn
            name={"exit"}
            size={24}
            color={tintColor}
            onPress={loggingOut}
          />
        ),
        headerRight: ({ tintColor }) => (
          <IconBtn
            name={"add"}
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageExpenses");
            }}
          />
        ),
        tabBarStyle: {
          backgroundColor: colors.primary950,
        },
        tabBarActiveTintColor: "#fff",
      })}
    >
      <Tab.Screen
        name="Recent"
        component={RecentExpensesScreen}
        options={{
          title: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="All Expenses"
        component={AllExpensesScreen}
        options={{
          title: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function ProtectedScreens() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary950,
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="Expenses"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ManageExpenses"
        component={ManageExpense}
        options={{
          presentation: "modal",
          contentStyle: {
            backgroundColor: "#4c1d95",
          },
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const [isCheckingLoading, setIsCheckingLoading] = React.useState(true);
  const authStore = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const token = authStore.token;

  React.useEffect(() => {
    async function fetchToken() {
      const dbRes = await init();

      console.log(dbRes);
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        dispatch(addToken(storedToken));
      }

      setIsCheckingLoading(false);

      // Hide the splash screen when the initialization is complete
      SplashScreen.hideAsync();
    }

    // Show the splash screen while initializing

    fetchToken();
  }, []);

  if (isCheckingLoading) {
    // Return null here to hide the content and show the splash screen
    return null;
  }

  return (
    <>
      {!token && <AuthNavigation />}
      {token && <ProtectedScreens />}
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
}
