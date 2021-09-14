import React, { useContext, useEffect, useRef, useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { TextInput } from "react-native-paper";
import UserContext from "./Context";
import axios from "axios";
import { Appbar } from "react-native-paper";
import Message from "./Message";
import Sound from "react-native-sound";
import Pusher from "pusher-js/react-native";

const color = [`red`, `blue`, `grey`, `green`, `orange`, `purple`, `bronze`, `pes`, `olivie`, `#004E61`];

function Chat() {
  const [newmessage, setnewmessage] = useState(``);
  const { Token, User, setyourmessage, yourmessage, setNewMessage, NewMessage } = useContext(UserContext);
  const ref = useRef();

  useEffect(async () => {
    try {
      const message = await axios.get(`https://api.chat.besoft.kg/v1/message`, {
        headers: {
          "Authorization": `Bearer ${Token.Token}`,
        },
      });
      const pusher = new Pusher(`f627dc3c7678f7e7a735`, {cluster: `ap2`});
      const channel = pusher.subscribe(`message`);
      channel.bind(`on-create`, (data) => {
        console.log(data);
        setyourmessage(a => [...a, data.item]);
        if (data.item.user.id !== User.User.id) {
          const s = new Sound('newmessagetone.mp3', Sound.MAIN_BUNDLE, () => {
            s.play();
          });
        }else {
          const s = new Sound('tweet416.mp3', Sound.MAIN_BUNDLE, () => {
            s.play();
          });
        }
      });
      setyourmessage(message.data.payload);
    }finally {
      setTimeout(() => ref.current.scrollToEnd({animated: false,}), 500);
    }
  }, []);

  const as = async () => {
    const data = newmessage;
    setnewmessage(``);
    try {
      const items = await axios.post(`https://api.chat.besoft.kg/v1/message`, {
        text: data,
      }, {
        headers: {
          "Authorization": `Bearer ${Token.Token}`,
        },
      });
    } catch (e) {
      console.log(e);
    }finally {
      ref.current.scrollToEnd();
    }
  };

  return (
    <ImageBackground
      source={require("../Image/5eee75b1db2936.11796907.jpg")}
      style={{
        width: `100%`,
        height: `100%`,
        backgroundColor: `black`,
        flex: 1,
      }}
      resizeMode={`cover`}
    >
      <TouchableOpacity>
        <Appbar.Header
          style={{
            backgroundColor: `green`,
          }}
        >
          <Appbar.Content title="Title" subtitle={"Subtitle"} />
          <Appbar.Action icon="magnify" onPress={() => {
          }} />
          <Appbar.Action icon={`dots-vertical`} onPress={() => {
          }} />
        </Appbar.Header>
      </TouchableOpacity>
      <FlatList
        ref={ref}
        data={yourmessage}
        renderItem={({ item, index }) => {
          return <Message color={color} User={User} item={item} index={index} yourmessage={yourmessage} />
        }}
        style={{
          padding: 8,
        }}
        initialNumToRender={yourmessage.length}
        contentContainerStyle={{ flexGrow: 1, justifyContent: `flex-end` }}
      />
      <TextInput
        placeholder={`Введите сообщение`}
        onChangeText={(text) => setnewmessage(text)}
        value={newmessage}
        multiline={true}
        right={
          <TextInput.Icon
            name="send"
            onPress={() => {newmessage === `` ? () => {} : as()}}
          />
        }
      />
    </ImageBackground>
  );
}

export default Chat;
