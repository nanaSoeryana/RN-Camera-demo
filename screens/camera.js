import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
// import { withNavigationFocus } from 'react-navigation';
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

export default function CameraDemo(navigation) {
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  // const { isFocused } = this.props
  // const [isFocused, setIsFocused] = React.useState(null);
  // useFocusEffect(
  //   React.useCallback(() => {
  //     const unsubscribe = API.subscribe(userId, user => setUser(data));

  //     return () => unsubscribe();
  //     // Return the function to unsubscribe from the event so it gets removed on unmount
  //     // return unsubscribe;

  //     // return () => unsubscribe();
  //   }, [navigation])
  // );
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  console.log("isFocused",isFocused);
  return (
    <View style={{ flex: 1 }}>
    {isFocused ? 
      <Camera style={{ flex: 1 }} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    :null}
    </View>
  );
}
