import React, {useState, useEffect} from "react";
import Registration from "./Registration";
import BottomTapTop from "./BottomTapTop";
import Context from "./Context";
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Image,
  View
} from "react-native";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#53d014',
    accent: '#f1c40f',
  },
};

function App() {
  const [FirstTimeCheck, setFirstTimeCheck] = useState(``);
  const [Seconds, setSeconds] = useState(true);
  const [yourmessage, setyourmessage] = useState([]);
  const [User, setUser] = useState(null);
  const [Token, setToken] = useState([]);
  const [NewMessage, setNewMassage] = useState(null);

  useEffect(() => {
    if (User !== null) AsyncStorage.setItem(`User`, JSON.stringify(User));
  }, [User])

  useEffect(async () => {
    const data = AsyncStorage.getItem(`firstTime`);
    const User = AsyncStorage.getItem(`User`);
    const Token = AsyncStorage.getItem(`Token`);
    Token.then((res) => {
      setToken(res);
    })
    User.then((res) => {
      setUser(JSON.parse(res));
    })
    data.then((res) => {
      setFirstTimeCheck(res === null ? `first` : `notFirst`);
    })
  }, []);

  useEffect(() => {
    const data = AsyncStorage.setItem(`Token`, Token);
  }, [Token])

  if (Seconds) {
    setTimeout(() => setSeconds(false), 300)
    return (
      <View
        style={{
          flex: 1,
          alignItems: `center`,
          justifyContent: `center`,
          backgroundColor: `white`,
        }}
      >
        <Image
          source={require("../Image/Photo.png")}
          style={{ width: `90%`, height: `90%` }}
          resizeMode={`contain`}
        />
      </View>
    )
  }

  return(
    <>
      <Context.Provider
        value={{
          setFirstTimeCheck: setFirstTimeCheck,
          User: {User, setUser},
          Token: {Token, setToken},
          setyourmessage,
          yourmessage,
          setNewMassage,
          NewMessage,
        }}
      >
        <PaperProvider theme={theme}>
          {FirstTimeCheck === `first` ?
            <Registration/> :
            <BottomTapTop/>}
        </PaperProvider>
      </Context.Provider>
    </>
  )
}
export default App;
