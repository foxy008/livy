import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Change to deployed orchestra URL
export const api = axios.create({
  baseURL: "https://api.livy.foxhub.space",
});

api.interceptors.request.use(async (config) => {
  const access_token = await AsyncStorage.getItem("access_token");

  if (access_token) {
    config.headers.access_token = access_token;
  }
  return config;
});
