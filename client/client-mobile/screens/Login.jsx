import { StyleSheet, Text, View, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";
import talk from "../assets/pages/talk.png";
import { Button } from "react-native-paper";
import { useUser } from "../hooks/useUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../helpers/axios";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const { setUser } = useUser();
  // TODO: Change to androidClientId foxy008
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "274735990607-jine6ql1192k9vqbrve5h80d00v5r4ro.apps.googleusercontent.com",
    iosClientId:
      "274735990607-jine6ql1192k9vqbrve5h80d00v5r4ro.apps.googleusercontent.com",
    expoClientId:
      "274735990607-5qb855ni8u2o8d7v18gmjuur2pbsnhbl.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      api
        .post("/login", {
          token: response.authentication.accessToken,
          role: "user",
        })
        .then(async ({ data }) => {
          setUser(data.user);
          await AsyncStorage.setItem("access_token", data.access_token);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>We want get to know you better.</Text>
      <Image source={talk} style={styles.images} />
      <Button
        mode="contained"
        icon="google"
        style={styles.button}
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
        textColor="#fefefe"
        buttonColor="#4285F4"
      >
        Sign in with Google
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    padding: 20,
    justifyContent: "space-evenly",
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
  },
  images: {
    height: 200,
    width: "100%",
    resizeMode: "contain",
    maxWidth: 400,
  },
  header: {
    backgroundColor: "#fefefe",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  cancelButton: {
    backgroundColor: "#fefefe",
  },
  button: {
    borderRadius: 10,
    maxWidth: 400,
  },
});
