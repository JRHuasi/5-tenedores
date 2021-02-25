/**
 * Guía para ubicar TextInput como campo password
 * Password TextInput in React-Native
 * https://swairaq.medium.com/password-textinput-in-react-native-5ac3e89bcf4f
 */
import React, { useState } from "react";
import Loading from "../Loading";
import { StyleSheet, View, TextInput } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/vadations";
import { size, isEmpty } from "lodash";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

const RegisterForm = (props) => {
  const { toastRef } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const onSubmit = () => {
    if (
      isEmpty(formData.email) ||
      isEmpty(formData.password) ||
      isEmpty(formData.repeatPassword)
    ) {
      toastRef.current.show("todos los campos son obligatorios");
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show("El email no es válido");
    } else if (size(formData.password) < 6) {
      toastRef.current.show(
        "La contraseña debe tener un mínimo de 6 caracteres"
      );
    } else if (formData.password !== formData.repeatPassword) {
      toastRef.current.show("Las contraseñas no coinciden");
    } else if (true) {
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then((response) => {
          // console.log(response);
          setLoading(false);
          navigation.navigate("account");
        })
        .catch(() => {
          setLoading(false);
          toastRef.current.show("La dirección email ya está registrada");
        });
    }
  };

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  return (
    <View style={styles.formContainer}>
      <Input
        onChange={(e) => onChange(e, "email")}
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
      <View style={styles.searchSection}>
        <TextInput
          secureTextEntry={showPassword ? false : true}
          placeholder="Contraseña"
          onChange={(e) => onChange(e, "password")}
          // containerStyle={}
          style={styles.input}
        />
        <Icon
          type="material-community"
          name={showPassword ? "eye-off-outline" : "eye-outline"}
          iconStyle={styles.searchIcon}
          size={20}
          color="gray"
          onPress={() => setShowPassword(!showPassword)}
        />
      </View>

      <View style={styles.searchSection}>
        <TextInput
          onChange={(e) => onChange(e, "repeatPassword")}
          secureTextEntry={showRepeatPassword ? false : true}
          placeholder="Repita Contraseña"
          style={styles.input}
        />
        <Icon
          type="material-community"
          name={showRepeatPassword ? "eye-off-outline" : "eye-outline"}
          iconStyle={styles.searchIcon}
          size={20}
          color="gray"
          onPress={() => setShowRepeatPassword(!showRepeatPassword)}
        />
      </View>
      <Button
        title="Unirse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Creando cuenta" />
    </View>
  );
};

const defaultFormValue = () => {
  return {
    email: "",
    password: "",
    repeatPassword: "",
  };
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
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "85%",
    marginBottom: 10,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: "#fff",
  },
});

export default RegisterForm;
