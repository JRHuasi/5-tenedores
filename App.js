/**
 * https://github.com/xAgustin93/5-tenedores-react-native
 */
import React, { useEffect } from "react";
import { LogBox } from "react-native";
import { firebaseApp } from "./app/utils/firebase";
import Navigation from "./app/navigations/Navigation";

LogBox.ignoreAllLogs("Setting a timer");

import * as firebase from "firebase";

export default function App() {
  /* useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
    });
  }, []); */
  return <Navigation />;
}
