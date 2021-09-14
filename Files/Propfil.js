import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  ToastAndroid,
} from "react-native";
import Context from "./Context";
import {
  TextInput,
  Avatar,
} from "react-native-paper";
import axios from "axios";

function Propfil(props) {
  const { Token, User, setNewMessage, yourmessage, NewMessage } = useContext(Context);
  const [Text, setText] = useState(User.User.full_name);

  const dat = async () => {
    try {
      const lemon = await axios.post(`https://api.chat.besoft.kg/v1/auth/me`, {
        full_name: Text,
      }, {
        headers: {
          "Authorization": `Bearer ${Token.Token}`,
        },
      });
      if (lemon.data.status === `success`) {
        ToastAndroid.show(`Успешно сохранено`, ToastAndroid.LONG);
        User.setUser(lemon.data.payload);
      }
    } catch (e) {
    }
  };

  return (
    <View
      style={{
        justifyContent: `center`,
      }}>
      <View
        style={{
          width: `100%`,
          alignItems: `center`,
        }}
      >
        <Avatar.Image
          source={!User.User.picture ? require(`../Image/unnamed.jpg`) : { uri: `https://api.chat.besoft.kg/${User.User.picture.path.original}` }}
          size={200} />
      </View>
      <TextInput
        mode="outlined"
        style={{
          padding: 10,
        }}
        left={<TextInput.Icon name="account" />}
        editable={false}
        value={User.User.phone_number}
      />
      <TextInput
        mode="outlined"
        label="Введите имя"
        placeholder="Введите имя"
        style={{
          padding: 10,
        }}
        left={<TextInput.Icon name="account" />}
        onChangeText={(text) => setText(text)}
        value={Text}
      />
      <Button disabled={Text === User.User.full_name} title={`Сохранить`} onPress={() => dat()} />
    </View>
  );
}

export default Propfil;
