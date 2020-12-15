import React, { useState } from "react";
import { useHeaderHeight } from "@react-navigation/stack";
import * as MediaLibrary from "expo-media-library";
import {
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
  Text,
  View,
} from "react-native";
import Constants from "expo-constants";
import { captureRef } from "react-native-view-shot-with-web-support";
import { postImage } from "../../lib/imgur";
const flame = require("../../assets/images/flame.png");

export const EditScreen = ({ route, navigation }) => {
  const { photoUri = "https://placehold.jp/150x150.png" } = route.params;
  const headerHeight = useHeaderHeight();

  const [text, setText] = useState("サンプルテキスト");
  const [captureContainerRef, setCaptureContainerRef] = useState(null);
  const [captureImageUri, setcaptureImageUri] = useState(null);

  const captureImage = async () => {
    if (!captureContainerRef) {
      return;
    }
    const result = await captureRef(captureContainerRef, {
      result: "tmpfile",
      width: 600,
      height: 400,
      quality: 1,
      format: "png",
    });
    if (result) {
      setcaptureImageUri(result);
    }
  };

  const saveImage = () => {
    MediaLibrary.saveToLibraryAsync(captureImageUri);
    Alert.alert("ライブラリに保存しました");
  };

  const uploadImage = async () => {
    console.log(captureImageUri);
    const id = await postImage(captureImageUri);
    navigation.navigate("Share", { id });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={headerHeight}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text>テロップに載せるテキストを入力してください。</Text>
        <View
          style={styles.captureArea}
          ref={ref => setCaptureContainerRef(ref)}
        >
          <Image source={flame} style={styles.flame} />
          <Image source={{ uri: photoUri }} style={styles.img} />
          <Text style={styles.telopText}>{text}</Text>
        </View>
        <TextInput
          defaultValue={text}
          style={styles.textInput}
          onChangeText={inputText => setText(inputText)}
        />
        <TouchableOpacity style={styles.btn} onPress={captureImage}>
          <Text style={styles.btnText}>画像を生成する</Text>
        </TouchableOpacity>
        {captureImageUri && (
          <>
            <Image
              source={{ uri: captureImageUri }}
              style={styles.captureImage}
            />
            {Constants.platform.web ? (
              <Text>画像を長押しして保存してください</Text>
            ) : (
              <TouchableOpacity style={styles.btn} onPress={saveImage}>
                <Text style={styles.btnText}>画像を保存する</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.btn} onPress={uploadImage}>
              <Text style={styles.btnText}>画像シェア用URLを発行</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingVertical: 32,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  captureArea: {
    position: "relative",
    overflow: "hidden",
    marginTop: 32,
    width: 300,
    height: 200,
  },
  img: {
    position: "absolute",
    top: 40,
    left: 30,
    width: 80,
    height: 80,
  },
  captureImage: {
    marginTop: 32,
    marginBottom: 16,
    width: 300,
    height: 200,
  },
  flame: {
    width: 300,
    height: 201,
    resizeMode: "cover",
  },
  telopText: {
    position: "absolute",
    bottom: 12,
    height: 45,
    lineHeight: 45,
    width: "100%",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
    color: "#660000",
    left: 0,
  },
  textInput: {
    backgroundColor: "#ccc",
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 4,
    marginTop: 16,
    padding: 8,
    fontSize: 20,
    width: 300,
  },
  btn: {
    marginTop: 32,
    backgroundColor: "#099",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  btnText: {
    color: "#fff",
  },
});
