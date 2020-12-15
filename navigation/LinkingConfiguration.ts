import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      About: "",
      ImagePick: "imagePick",
      Edit: "edit",
      Share: "share",
      NotFound: "*",
    },
  },
};
