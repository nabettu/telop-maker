import React from "react";
import { TouchableOpacity, StyleSheet, Text, Image, View } from "react-native";
const sampleImg = require("../../assets/images/sample.png");

export const AboutScreen = ({ navigation }) => {
  const gotoImagePickScreen = () => {
    navigation.navigate("ImagePick");
  };
  return (
    <View style={styles.container}>
      <Text>
        このアプリは以下のようなニュース風テロップ付きの画像が作れるアプリです。
      </Text>
      <Image source={sampleImg} style={styles.img} />
      <TouchableOpacity onPress={gotoImagePickScreen} style={styles.btn}>
        <Text style={styles.btnText}>遊んでみる</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    margin: 16,
    width: 300,
    height: 200,
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
