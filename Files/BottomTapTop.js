import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Chat from "./Chat";
import Settings from "./Settings";
import Propfil from "./Propfil";
import Context from "./Context";

const Tab = createMaterialTopTabNavigator();

function BottomTapTop() {
  const { NewMessage } = useContext(Context)
  return(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name={`Chat`} component={Chat}/>
        <Tab.Screen name={`Settings`} component={Settings}/>
        <Tab.Screen name={`Propfil`} component={Propfil}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}
export default BottomTapTop;
