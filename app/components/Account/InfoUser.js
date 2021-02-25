import React from "react";

import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";

import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
// import * as MediaLibrary from "expo-media-library";

const InfoUser = (props) => {
  const {
    userInfo: { uid, photoURL, displayName, email },
    toastRef,
  } = props;

  console.log(props.userInfo);

  const avatarSource = photoURL
    ? { uri: photoURL }
    : require("../../../assets/img/avatar-default.jpg");

  const handleOnAvatarEditPress = async () => {
    const resultPermissions = await Permissions.askAsync(Permissions.CAMERA);
    const resultPermissionsCamera = resultPermissions.permissions.camera.status;

    if (resultPermissionsCamera === "denied") {
      toastRef.currrent.show("Es necesario aceptar los permisos de la galería");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (result.cancelled) {
        toastRef.currrent.show("Has cerrado la selección de imágenes");
      } else {
        uploadImage(result.uri)
          .then(() => {
            updatePhotoUrl();
          })
          .catch(() => {
            toastRef.currrent.show("Error al actualizar el avatar");
          });
      }
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase.storage().ref().child(`avatar/${uid}`);
    return ref.put(blob);
  };

  const updatePhotoUrl = () => {
    firebase
      .storage()
      .ref(`avatar/${uid}`)
      .getDownloadURL()
      .then(async (response) => {
        const update = {
          photoURL: response,
        };
        await firebase.auth().currrentUser.updateProfile(update);
      });
  };

  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        size="large"
        containerStyle={styles.avatarContainer}
        source={avatarSource}
      >
        <Avatar.Accessory size={22} onPress={handleOnAvatarEditPress} />
      </Avatar>
      <View>
        <Text style={styles.displayName}>
          {displayName ? displayName : "Anónimous"}
        </Text>
        <Text>{email ? email : "Social Login"}</Text>
      </View>
      {/* <h3>{props.infoUser.last_name}</h3> */}
    </View>
  );
};

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30,
  },
  userInfoAvatar: {
    marginRight: 20,
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
});

export default InfoUser;
