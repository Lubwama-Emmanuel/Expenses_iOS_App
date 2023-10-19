import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { colors } from "../resources/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { logInUser } from "../utils/Auth";
import { useDispatch } from "react-redux";
import { addToken } from "../store/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  email: "",
  password: "",
};

export default function LogInForm() {
  const navigation = useNavigation();
  const [inputValues, setInputValues] = useState(initialState);
  const dispatch = useDispatch();

  function handleInputValues(inputIdentifier, enteredValue) {
    setInputValues((currentValues) => {
      return {
        ...currentValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  function resetState() {
    setInputValues((currentValues) => {
      return {
        ...currentValues,
        ...initialState,
      };
    });
  }

  async function handleLogin() {
    try {
      const res = await logInUser(inputValues.email, inputValues.password);
      const token = res.idToken;

      await AsyncStorage.setItem("token", token);
      dispatch(addToken(token));
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Incorrect Email or Password",
        "Check your email or password and try again",
        "Okay"
      );
    }
    resetState();
  }

  function handleCreateAccount() {
    navigation.replace("signUp");
  }

  return (
    <View style={styles.container}>
      <View>
        <Input
          label={"Email Address"}
          textInputConfig={{
            placeholder: "Enter Email Address",
            value: inputValues.email,
            onChangeText: handleInputValues.bind(this, "email"),
            keyboardType: "email-address",
          }}
          isRounded={true}
        />
        <Input
          label={"Password"}
          textInputConfig={{
            placeholder: "Enter password",
            value: inputValues.password,
            onChangeText: handleInputValues.bind(this, "password"),
            secureTextEntry: true,
          }}
          isRounded={true}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button onPress={handleLogin} isRounded={true}>
          login
        </Button>
        <Text style={styles.textOr}>or</Text>
        <View style={styles.logInContainer}>
          <Pressable onPress={handleCreateAccount}>
            <View>
              <Text style={styles.logInText}>Create Account</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary950,
    paddingHorizontal: 10,
    paddingVertical: 25,
    marginVertical: 40,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  btnContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  logInContainer: {
    alignItems: "center",
  },
  logInText: {
    fontSize: 20,
    padding: 10,
    color: colors.primary400,
  },
  textOr: {
    fontSize: 20,
    color: colors.primary400,
  },
});
