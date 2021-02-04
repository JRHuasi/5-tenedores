/**
 * Guía para ubicar TextInput como campo password
 * Password TextInput in React-Native
 * https://swairaq.medium.com/password-textinput-in-react-native-5ac3e89bcf4f
 */
import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Input, Icon, Button } from "react-native-elements";

const RegisterForm = () => {
  const [secure, setSecure] = useState(true);

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.inputForm}
        password={true}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        rightIcon={
          <Icon
            type="material-community"
            name={secure ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconPass}
            size={20}
            color="gray"
          />
        }
      />

      <TextInput
        secureTextEntry={true}
        placeholder="Repita Contraseña"
        containerStyle={styles.iconPass}
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "90%",
    color: "red",
    marginTop: 20,
  },
  iconPass: {
    width: "90%",
    color: "red",
    marginTop: 20,
    textDecorationColor: "red",
  },
  btnContainerRegister: {
    marginTop: 20,
    width: "95%",
  },
  btnRegister: {
    backgroundColor: "#00a680",
  },
  iconRight: {},
});

export default RegisterForm;
