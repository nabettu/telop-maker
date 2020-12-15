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

export const ShareScreen = ({ route }) => {
  // const { id } = route.params;
  const id = "V4PEvuJ";

  const share = async () => {
    const hashtags = "テロップメーカー";
    const shareUrl = "https://telopmaker.nabettu.com/Share?id=" + id;

    if (!Constants.platform.web) {
      const url = `twitter://post?message=${shareUrl}&hashtags=${hashtags}`;
      await Linking.openURL(url);
    } else {
      await WebBrowser.openBrowserAsync(
        `https://twitter.com/intent/tweet?url=${shareUrl}&hashtags=${hashtags}`
      );
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://i.imgur.com/${id}.png` }}
        style={styles.img}
      />
      <TouchableOpacity style={styles.btn} onPress={share}>
        <Text style={styles.btnText}>Twitterでシェア</Text>
      </TouchableOpacity>
      <View style={styles.space} />
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
    backgroundColor: "#55acee",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  btnText: {
    color: "#fff",
  },
});
