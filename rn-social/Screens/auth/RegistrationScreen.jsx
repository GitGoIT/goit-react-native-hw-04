import React, { useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground, Image, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Dimensions, } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const initialState = {
    login: "",
    email: "",
    password: "",
}

export default function RegistrationScreen({navigation}) {

    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [state, setState] = useState(initialState);
    const [dimensions, setDimentions] = useState(Dimensions.get("window").width - 16 * 2);

    const [fontsLoaded] = useFonts({
      "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
      "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
    });
    
    const keyboardHide = () => {
        setIsShowKeyboard(false)
        Keyboard.dismiss()
        console.log(state)
        setState(initialState)
    };

    const onLayoutRootView = useCallback(async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
      return null;
    }

    return (
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <ImageBackground
            style={styles.bgImage}
            source={require("../../assets/images/photo-bg2x.jpg")}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View
                style={{
                  ...styles.wrapperForm,
                  paddingBottom: isShowKeyboard ? 20 : 66,
                  with: dimensions,
                }}
              >
                <View style={styles.imageWrapper}>
                  <Image />
                  <Image
                    source={require("../../assets/add.png")}
                    style={styles.addIcon}
                  />
                </View>
                <View style={styles.form}>
                  <Text style={styles.title}>Реєстрація</Text>
                  <View>
                    <TextInput
                      style={styles.input}
                      textAlign={"left"}
                      placeholder="Логін"
                      onFocus={() => setIsShowKeyboard(true)}
                      value={state.login}
                      onChangeText={(value) =>
                        setState((prevState) => ({
                          ...prevState,
                          login: value,
                        }))
                      }
                    />
                    <TextInput
                      style={styles.input}
                      textAlign={"left"}
                      placeholder="Адреса електронної пошти"
                      onFocus={() => setIsShowKeyboard(true)}
                      value={state.email}
                      onChangeText={(value) =>
                        setState((prevState) => ({
                          ...prevState,
                          email: value,
                        }))
                      }
                    />
                    <View>
                      <TextInput
                        style={styles.input}
                        textAlign={"left"}
                        placeholder="Пароль"
                        secureTextEntry={true}
                        onFocus={() => setIsShowKeyboard(true)}
                        value={state.password}
                        onChangeText={(value) =>
                          setState((prevState) => ({
                            ...prevState,
                            password: value,
                          }))
                        }
                      />
                      <Text style={styles.textPassword}>Показати</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.btn}
                    onPress={keyboardHide}
                  >
                    <Text style={styles.btnTitle}>Зареєструватися</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.containerLink}>
                  <Text style={styles.txtLink}>Вже є акаунт?</Text>
                  <TouchableOpacity
                    style={styles.opacityLink}
                    onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.btnLink}>Увійти</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ImageBackground>
          <StatusBar style="auto" />
        </View>
      </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  input: {
    fontFamily: "Roboto-Regular",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    height: 50,
    fontSize: 16,
    lineHeight: 19,
    padding: 16,
    color: "#212121",
    marginBottom: 16,
  },
  wrapperForm: {
    paddingTop: 92,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  form: {
    marginHorizontal: 16,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginBottom: 33,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    height: 51,
    borderRadius: 100,
    padding: 16,
    marginTop: 26,
    marginBottom: 16,
  },
  btnTitle: {
    fontFamily: "Roboto-Regular",
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
  },
  containerLink: {
    flexDirection: "row",
    justifyContent: "center",
  },
  txtLink: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    textAlign: "center",
  },
  btnLink: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "blue",
    marginLeft: 5,
  },
  imageWrapper: {
    position: "absolute",
    left: "35%",
    top: "-15%",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addIcon: {
    position: "absolute",
    left: "90%",
    top: "65%",
    width: 25,
    height: 25,
  },
  textPassword: {
    position: "absolute",
    top: "23%",
    left: "74%",
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
  },
});
