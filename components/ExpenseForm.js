import { View, StyleSheet, Alert, Image, Text } from "react-native";
import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addExpense } from "../store/expenseSlice";
import IconBtn from "../ui/IconBtn";

import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  launchImageLibraryAsync,
  useMediaLibraryPermissions,
} from "expo-image-picker";

const intialState = {
  amount: "",
  date: "",
  description: "",
};

export default function ExpenseForm({ isEditing }) {
  const navigation = useNavigation();
  const [cameraPermissionStatus, requestCameraPermission] =
    useCameraPermissions();
  const [mediaPermissionStatus, requestMediaPermission] =
    useMediaLibraryPermissions();
  const [selectedImage, setSelectedImage] = useState("");
  const [inputValues, setInputValues] = useState(intialState);
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
    imageUri: selectedImage,
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

  async function verifyCameraPermission() {
    if (cameraPermissionStatus.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestCameraPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionStatus.status === PermissionStatus.DENIED) {
      const permissionResponse = await requestCameraPermission();

      return permissionResponse.granted;
      // Alert.alert(
      //   "Insufficient Permissions",
      //   "Please allow the app to access your camera",
      //   "Okay"
      // );
    }

    return true;
  }

  async function verifyMediaPermission() {
    if (mediaPermissionStatus.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestMediaPermission();

      return permissionResponse.granted;
    }

    if (mediaPermissionStatus.status === PermissionStatus.DENIED) {
      const permissionResponse = await requestMediaPermission();

      return permissionResponse.granted;
    }

    return true;
  }

  async function handleTakeImage() {
    const cameraPermissions = await verifyCameraPermission();

    if (!cameraPermissions) {
      return;
    }

    const image = await launchCameraAsync({
      // allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
      mediaTypes: "All",
      presentationStyle: "popover",
    });

    setSelectedImage(image.uri);
  }

  async function handleChooseImage() {
    const mediaPermissions = await verifyMediaPermission();

    if (!mediaPermissions) {
      return;
    }
    const media = await launchImageLibraryAsync({ allowsEditing: true });

    setSelectedImage(media.uri);
  }

  // let imagePreview = <Text>No Image yet</Text>;

  // if (selectedImage) {
  //   imagePreview = (
  //     <Image
  //       source={{ uri: selectedImage }}
  //       style={{
  //         width: "100%",
  //         height: "100%",
  //       }}
  //     />
  //   );
  // }

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
      {/* <View
        style={{
          width: "100%",
          height: 200,
        }}
      >
        {imagePreview}
      </View> */}
      <Button onPress={handleTakeImage}>Take Image</Button>
      <Button onPress={handleChooseImage}>Choose Image</Button>
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
