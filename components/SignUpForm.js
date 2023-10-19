import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { colors } from "../resources/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { createUser, signUpUser } from "../utils/Auth";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  email: "",
  password: "",
  confirm: "",
};
export default function SignUpForm() {
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

  async function handleSignUp() {
    if (inputValues.confirm !== inputValues.password) {
      Alert.alert(
        "Passwords Don't Match",
        "Make sure the passwords match to create account",
        "okay"
      );
    } else {
      try {
        const res = await signUpUser(inputValues.email, inputValues.password);

        const token = res.idToken;
        dispatch(addToken(token));
        await AsyncStorage.setItem("token", token);
      } catch (error) {
        console.log(error);
        Alert.alert(
          "Unable to create user",
          "Something wrong happened, Please try again letter",
          "Okay"
        );
      }
    }
    resetState();
  }

  function handleLogInInstead() {
    navigation.replace("logIn");
  }
  return (
    <View style={styles.container}>
      <View>
        <Input
          label={"Email Address"}
          textInputConfig={{
            placeholder: "Enter Email Address",
            keyboardType: "email-address",
            value: inputValues.email,
            onChangeText: handleInputValues.bind(this, "email"),
          }}
          isRounded={true}
        />
        <Input
          label={"Password"}
          textInputConfig={{
            textContentType: "newPassword",
            placeholder: "Enter password",
            secureTextEntry: true,
            value: inputValues.password,
            onChangeText: handleInputValues.bind(this, "password"),
          }}
          isRounded={true}
        />
        <Input
          label={"Confirm Password"}
          textInputConfig={{
            placeholder: "Comfirm Password",
            secureTextEntry: true,
            value: inputValues.confirm,
            onChangeText: handleInputValues.bind(this, "confirm"),
          }}
          isRounded={true}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button onPress={handleSignUp} isRounded={true}>
          Signup
        </Button>
        <Text style={styles.textOr}>or</Text>
        <View style={styles.logInContainer}>
          <Pressable onPress={handleLogInInstead}>
            <View>
              <Text style={styles.logInText}>Log in instead</Text>
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
