import { Text, View } from "react-native";
import { Avatar } from "react-native-paper";
import React, { useState } from "react";

function Message({item, User, color, index, yourmessage}) {
  const [width, setWidth] = useState(0);
  const name = item.user.full_name.toUpperCase().split(' ');
  return (
    <>
      {item.user_id === User.User.id
        ? (
          <View
            style={{
              backgroundColor: `rgb(127, 231, 91)`,
              padding: 10,
              alignSelf: `center`,
              marginBottom: 10,
              borderRadius: 10,
            }}>
            <Text style={{ fontSize: 13 }}>Вы</Text>
            <Text style={{ fontSize: 16, color: `rgb(59, 59, 59)` }}>  {item.text}</Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: `row`,
              marginBottom: 5,
              justifyContent: `center`,
              alignItems: `center`,
              flexWrap: `wrap`,
            }}
          >
            {width > 370 ? (
              <View style={{marginBottom: 8}}>
                { yourmessage[index === 0 ? 0 : index - 1].user_id !== item.user_id || index === 0 ?
                  item.user.picture === null ?
                    <Avatar.Text size={40} label={`${name[0][0]}${name[1] !== undefined ? name[1][0] : ``}`}/> :
                    <Avatar.Image size={40} source={{uri: `https://api.chat.besoft.kg/${item.user.picture.path.original}`}}/>
                  : null
                }
              </View>
            ) : null}
            <View
              onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
              style={{
                marginLeft: width <= 370 ? 20 : 0,
                backgroundColor: `white`,
                padding: 10,
                alignSelf: "flex-start",
                marginBottom: 10,
                borderRadius: 10,
                position: 'relative',
              }}>
              {width <= 370 ? (
                <View
                  style={{
                    marginRight: 3,
                    flexWrap: `wrap`,
                    position: 'absolute',
                    top: 0,
                    left: -48,
                  }}>
                  {yourmessage[index === 0 ? 0 : index - 1].user_id !== item.user_id || index === 0 ?
                    item.user.picture === null ?
                      <Avatar.Text size={40} label={`${name[0][0]}${name[1] !== undefined ? name[1][0] : ``}`}/> :
                      <Avatar.Image size={40} source={{uri: `https://api.chat.besoft.kg/${item.user.picture.path.original}`}}/>
                    : null
                  }
                </View>
              ) : null}
              {yourmessage[index === 0 ? 0 : index - 1].user_id !== item.user_id ?
                <Text style={{ fontSize: 13, color: color[item.user_id % 10] }}>{item.user.full_name}</Text>
                : null}
              <Text style={{ fontSize: 16 }}>  {item.text}</Text>
            </View>
          </View>
        )
      }
    </>
  );
}

export default Message;
