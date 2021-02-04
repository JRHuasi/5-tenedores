import React from "react";
import { StyleSheet, ScrollView, Text, View, Image } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const UserGuest = () => {
  const navigation = useNavigation();

  return (
    <ScrollView centerContent={true} style={styles.viewBody}>
      <Image
        source={require("../../../assets/img/user-guest.jpg")}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.title}>Consulta tu perfil de 5 Tenedores</Text>
      <Text style={styles.decription}>
        ¿Cómo describirías tu restaurante? Busca y visualiza los mojores
        restaurantes en forma sencilla, vota cuál te ha gustado más y comenta
        como ha sido tu experiencia.
      </Text>
      <View style={styles.viewBtn}>
        <Button
          buttonStyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
          title="Ver tu perfil"
          onPress={() => navigation.navigate("login")}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30,
  },
  image: {
    height: 300,
    width: "100%",
    marginBottom: 40,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center",
  },
  decription: {
    textAlign: "center",
    marginBottom: 20,
  },
  viewBtn: {
    flex: 1,
    alignItems: "center",
  },
  btnStyle: {
    backgroundColor: "#00a680",
  },
  btnContainer: {
    width: "70%",
  },
});

export default UserGuest;
