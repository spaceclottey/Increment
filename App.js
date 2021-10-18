import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default function App() {
  const [text, setText] = useState("https://en.wikipedia.org/wiki/Wikipedia");
  const [links, setLinks] = useState([]);
  const [data, setData] = useState("No data yet");

  useEffect(() => {
    fetch("http:localhost:3001/api").then((res) => console.log(res));
    // .then((res) => res.json())
    // .then((data) => setData(data.message));
  }, []);

  const appendToLinks = (link) => {
    let newArray = links;
    newArray.push(link);
    setLinks(newArray);
  };

  const addLink = () => {
    appendToLinks(text);
    setText("");
  };

  const getPageData = async (link) => {
    const response = await fetch("/express_backend");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    console.log(response);

    setText(response);

    return body;
  };

  // const getVideoTitle = async (url) => {
  //   var yt_api_key = "AIzaSyDsAVyRBK1UNb-CA1qc0-r43BJkhxsuh8w";
  //   var yt_video_id = getURLCode(url);
  //   var yt_snippet_endpoint =
  //     "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" +
  //     yt_video_id +
  //     "&key=" +
  //     yt_api_key;

  //   const response = await fetch(yt_snippet_endpoint);
  //   if (response.ok) {
  //     var json = await response.json();
  //   } else {
  //     alert("HTTP-Error: " + response.status);
  //   }

  //   console.log("finished the response");

  //   console.log("yt snippet endpoint", yt_snippet_endpoint);
  //   console.log("json", json);
  //   console.log(json["items"][0]["snippet"]["title"]);
  //   return json["items"][0]["snippet"]["title"];
  // };

  return (
    <View style={styles.container}>
      <TextInput
        style={{ height: 40 }}
        placeholder="Add URL!"
        onChexangeText={(text) => setText(text)}
        // defaultValue={text}
        value={text}
      />
      <Button title="Add URL" onPress={addLink}></Button>
      <Text style={{ color: "blue" }}> {text} </Text>
      <Text>{links.map((word) => word && "🍕").join(" ")}</Text>
      <Text>{links.map((word) => word).join(",")}</Text>
      <Button title="GetURL" onPress={() => getPageData(text)}></Button>

      <Text> {data} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
