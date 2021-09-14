import React, { useContext, useState } from "react";
import {
  ImageBackground,
  ToastAndroid,
  View,
  Text,
} from "react-native";
import Context from "./Context";
import { TextInput, Button } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Registration() {
  const [Indicator, setIndicator] = useState(false)
  const [Stage, setStage] = useState(`stage1`);
  const [Text1, setText1] = useState(``);
  const [Text2, setText2] = useState(``);
  const data = useContext(Context);

  const Sage1 = async () => {
    setIndicator(true);
    try {
      const a = await axios.post(`https://api.chat.besoft.kg/v1/auth`, {
        phone_number: Text1,
      });
      console.log(a.data)
      if (a.data.status === `code_is_incorrect` || a.data.status === `invalid_params` || a.data.status === `code_is_invalid`) {
        ToastAndroid.show(`Неправильно введён номер`, ToastAndroid.LONG);
      }
      if (a.data.status === "not_exists_code_is_sent" || a.data.status === "not_exists_code_was_sent") {
        setStage(`stage2`);
      }else if (a.data.status === "exists_code_is_sent" || a.data.status === "exists_code_was_sent") {
        const da = AsyncStorage.setItem(`first`, `notFirst`);
        data.User.setFirstTimeCheck(`notFirst`);
      }
      if (a.data.status === "not_exists_code_is_sent" || a.data.status === "exists_code_is_sent") {
        ToastAndroid.show(`Мы отправили вам код`, ToastAndroid.LONG);
      } else if (a.data.status === "not_exists_code_was_sent" || a.data.status === "exists_code_was_sent") {
        ToastAndroid.show(`Код был отправлен вам`, ToastAndroid.LONG);
      }
    } catch {
      ToastAndroid.show(`Что-то произошло нетак`, ToastAndroid.LONG);
    } finally {
      setTimeout(() => setIndicator(false), 1000)
    }
  }

  const Sage2 = async () => {
    setIndicator(true);
    try {
      const response = await axios.post(`https://api.chat.besoft.kg/v1/auth/register`, {
        phone_number: Text1,
        verification_code: Text2,
        platform: `android`,
        version_code: 1,
        full_name: data.User.User,
      });
      if (response.data.status === `code_is_invalid`) {
        ToastAndroid.show(`Код недействителен`, ToastAndroid.LONG);
      }else if (response.data.status === `code_is_incorrect` || response.data.status === `invalid_params`) {
        ToastAndroid.show(`Неравильный код`, ToastAndroid.LONG);
      }else if (response.data.status === `success`) {
        ToastAndroid.show(`Добро пожаловать!!!`,ToastAndroid.LONG)
        const da = AsyncStorage.setItem(`firstTime`, `notFirst`);
        const dat = AsyncStorage.setItem(`User`, JSON.stringify(response.data.payload.user));
        data.User.setUser(response.data.payload.user);
        data.Token.setToken(response.data.payload.token)
        data.setFirstTimeCheck(`notFirst`);
      }
    } catch (e) {
      ToastAndroid.show(`${e}`, ToastAndroid.LONG);
    }finally {
      setTimeout(() => setIndicator(false), 1000)
    }
  }

    return(
      <>
        <ImageBackground
          source={require("../Image/e8c9a8e8-d1fb-4419-a176-07dabfdc2dfe.jpg")}
          style={{
            width: `100%`,
            height: `100%`,
            backgroundColor: `rgb(47,255,0)`,
            justifyContent: `flex-end`,
          }}
          resizeMode={`contain`}
        >
          {Stage === `stage2` ?
            <View
              style={{
                width: `100%`,
                alignSelf: `flex-start`,
              }}
            >
              <Text
                onPress={() => setStage(`stage1`)}
              >Назад</Text>
            </View>
          : null}
          <View
            style={{
              width: `100%`,
              backgroundColor: `rgba(112,111,111,0.5)`,
              margin: 3,
            }}
          >
            {Stage === `stage1` ? (
              <TextInput
                mode="outlined"
                label="Введите номер телефона"
                keyboardType={`numeric`}
                placeholder="Введите номер телефона"
                style={{
                  paddingBottom: 10,
                }}
                left={<TextInput.Icon name="account" />}
                onChangeText={(text) => setText1(text)}
                value={Text1}
              />
            ) : Stage === `stage2` ? (
              <>
                <TextInput
                  mode="outlined"
                  label="Введите код подтверждения"
                  keyboardType={`numeric`}
                  placeholder="Введите код подтверждения"
                  style={{
                    paddingBottom: 10,
                  }}
                  onChangeText={(text) => setText2(text)}
                  value={Text2}
                />
                <TextInput
                  mode="outlined"
                  label="Введите имя"
                  placeholder="Введите имя"
                  style={{
                    paddingBottom: 10,
                  }}
                  left={<TextInput.Icon name="account" />}
                  onChangeText={(text) => data.User.setUser(text)}
                  value={data.User.User}
                />
              </>
              ) : null}
            <Button loading={Indicator} disabled={Stage === `stage1` ? !Text1: !Text2 || !data.User.User} mode="contained" color={`rgba(0,255,118,0.5)`} onPress={() => {Stage === `stage1` ? Sage1() : Sage2()}}>
              Войти
            </Button>
          </View>
        </ImageBackground>
      </>
    )
}
export default Registration;
