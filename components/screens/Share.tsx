import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
  Linking,
} from "react-native";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";

export const ShareScreen = ({ route, navigation }) => {
  const { id } = route.params;
  // const id = "V4PEvuJ";

  const share = async () => {
    const hashtags = "テロップメーカー";
    const shareUrl = "https://telop-maker.tokyo/share?id=" + id;

    if (!Constants.platform.web) {
      const url = `twitter://post?message=${shareUrl}&hashtags=${hashtags}`;
      await Linking.openURL(url);
    } else {
      await WebBrowser.openBrowserAsync(
        `https://twitter.com/intent/tweet?url=${shareUrl}&hashtags=${hashtags}`
      );
    }
  };
  const back = () => {
    navigation.navigate("About");
  };
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://i.imgur.com/${id}.png` }}
        style={styles.img}
      />
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: "#55acee" }]}
        onPress={share}
      >
        <Text style={styles.btnText}>Twitterでシェア</Text>
      </TouchableOpacity>
      <View style={styles.space} />
      <TouchableOpacity style={styles.btn} onPress={back}>
        <Text style={styles.btnText}>最初から作る</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  space: {
    marginTop: 32,
  },
  img: {
    width: 300,
    height: 200,
    resizeMode: "cover",
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
