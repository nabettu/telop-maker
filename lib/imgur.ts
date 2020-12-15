import axios from "axios";

const CLIENT_ID = "7217b02f08a07fb";
const API_PATH = "https://api.imgur.com/3/image";

export const postImage = async base64 => {
  const res = await axios({
    method: "POST",
    url: API_PATH,
    data: {
      image: base64.replace(new RegExp("data.*base64,"), ""),
      type: "base64",
    },
    headers: { Authorization: "Client-ID " + CLIENT_ID },
  }).then(res => res.data.data);
  const { deletehash, id } = res;
  return id;
};
