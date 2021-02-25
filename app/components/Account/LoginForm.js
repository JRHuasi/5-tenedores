import React, { useState } from "react";
import Loading from "../Loading";
import { StyleSheet, View, TextInput } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/vadations";
import { size, isEmpty } from "lodash";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

const LoginForm = (props) => {
  const { toastRef } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const onSubmit = () => {
    console.log(formData.password);
    if (isEmpty(formData.email) || isEmpty(formData.password)) {
      toastRef.current.show("todos los campos son obligatorios");
    } else if (!validateEmail(formData.email)) {
      // console.log("objecto");
      toastRef.current.show("El email no es válido");
    } else if (size(formData.password) < 6) {
      toastRef.current.show(
        "La contraseña debe tener un mínimo de 6 caracteres"
      );
    } else if (true) {
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then((response) => {
          setLoading(false);
          navigation.navigate("account");
        })
        .catch(() => {
          setLoading(false);
          toastRef.current.show("Los datos suministrados no son correctos");
        });
    }
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
      <Button
        title="Iniciar sesión"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnLogin}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Loading..." />
    </View>
  );
};

const defaultFormValue = () => {
  return {
    email: "",
    password: "",
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
    width: "100%",
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
  btnLogin: {
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

export default LoginForm;
